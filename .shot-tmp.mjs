import { chromium } from 'playwright';
const url = process.env.URL || 'http://localhost:5173/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto(url, { waitUntil: 'networkidle' });
for (const id of ['company', 'industries']) {
  await page.evaluate((id) => document.getElementById(id)?.scrollIntoView(), id);
  await page.evaluate(() => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible')));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `/tmp/${id}.png`, fullPage: false });
}
console.log('errors:', errors.length, errors.slice(0, 5));
await browser.close();
