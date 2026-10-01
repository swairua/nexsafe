# Nexsate — production image for Render.
#
# Render has no native PHP runtime (Node/Python/Ruby/Go/Rust/Elixir only), so the
# PHP API needs a container. One image serves everything through router.php:
#   /api/*    -> PHP + SQLite API
#   /uploads/*-> uploaded media
#   /*        -> the built Vite SPA (dist/)
#
# Writable state (SQLite store + uploads) must live on a Render persistent disk;
# see render.yaml, which mounts it at /data and points NX_DATA_DIR / NX_UPLOAD_DIR
# at it. Without a disk, every deploy would wipe the content store.

# ---- Stage 1: build the Vite SPA -------------------------------------------
FROM node:20-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# BASE_URL "/" because Render serves the site at the domain root.
ENV BASE_URL=/
RUN npm run build


# ---- Stage 2: PHP runtime serving SPA + API --------------------------------
FROM php:8.3-cli-bookworm

# pdo_sqlite backs api/db.php; fileinfo type-checks uploads.
RUN apt-get update \
 && apt-get install -y --no-install-recommends libsqlite3-dev \
 && docker-php-ext-install pdo_sqlite \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY api ./api
COPY router.php ./
# Shipped media/brand artwork: copied into the image so a fresh boot has the
# library populated even before an upload happens.
COPY public ./public

# Persistent-disk mount points (no-ops when no disk is attached).
RUN mkdir -p /data/db /data/uploads \
 && chmod -R 0777 /data

ENV NX_DATA_DIR=/data/db \
    NX_UPLOAD_DIR=/data/uploads \
    NX_UPLOAD_URL=/uploads \
    NX_SITE_BASE=/ \
    PORT=10000

EXPOSE 10000

# Seed any images from the image into the (empty) disk volume on first boot.
RUN cp -rn /app/public/uploads/. /data/uploads/ 2>/dev/null || true

# php -S is single-threaded by default; the admin fires several API calls at
# once, so allow workers to serve them concurrently.
ENV PHP_CLI_SERVER_WORKERS=4

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD php -r 'exit(@file_get_contents("http://127.0.0.1:10000/api/content.php") === false ? 1 : 0);'

CMD ["sh", "-c", "php -S 0.0.0.0:${PORT} -t /app /app/router.php"]