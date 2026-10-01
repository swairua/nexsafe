/** Render rich/HTML copy from the admin editor safely on the public site. */
export function RichText({ value, className = "" }) {
  const html = String(value || "")
  if (!/<\s*(p|br|strong|em|ul|ol|li|a|h3|h4|blockquote)[\s/>]/i.test(html)) return null
  const clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
  return <div className={className} dangerouslySetInnerHTML={{ __html: clean }} />
}

/**
 * Text renderer: plain strings render as plain text (exactly as before);
 * strings the admin rich-text editor saved with formatting render as safe
 * HTML inside the chosen tag. Use for every content field that can hold
 * editor output so bold/links/lists survive the trip to the page.
 */
export function Rich({ as: Tag = "span", className = "", children, ...rest }) {
  const value = children
  const html = String(value == null ? "" : value)
  if (/<\s*(p|br|strong|em|ul|ol|li|a|h3|h4|blockquote)[\s/>]/i.test(html)) {
    const clean = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    // Block-level editor output must not nest inside <p>/<span>: promote to a div.
    const block = /<\s*(p|ul|ol|blockquote|h3|h4)[\s/>]/i.test(clean)
    const Use = block ? "div" : Tag
    return <Use className={className} dangerouslySetInnerHTML={{ __html: clean }} {...rest} />
  }
  return <Tag className={className} {...rest}>{value}</Tag>
}

/** Small red kicker/eyebrow label used above section headings */
export default function SectionTag({ children, light = false }) {
  return (
    <span
      className={`inline-block text-xs font-bold uppercase tracking-[0.14em] ${
        light ? 'text-shell-yellow' : 'text-shell-red'
      }`}
    >
      {children}
    </span>
  )
}
