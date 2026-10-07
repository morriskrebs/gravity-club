import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve, dirname } from "node:path";

const ssrDir = resolve(".ssr");
const { render, routes, getHeadHtml, sitemapXml } = await import(pathToFileURL(resolve(ssrDir, "entry-server.mjs")).href);

const template = readFileSync(resolve("dist/index.html"), "utf-8");
if (!template.includes('<div id="root"></div>')) throw new Error('prerender: <div id="root"></div> not found');
if (!template.includes("<!--seo-head-->")) throw new Error("prerender: <!--seo-head--> marker not found");

for (const { lang, page, path } of routes) {
  const html = render(lang, page);
  const out = template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace("<!--seo-head-->", getHeadHtml(lang, page))
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const file = path === "/" ? resolve("dist/index.html") : resolve("dist", path.slice(1), "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, out);
  console.log(`prerender: ${path} (${html.length} chars)`);
}

writeFileSync(resolve("dist/sitemap.xml"), sitemapXml(routes, new Date().toISOString().slice(0, 10)));
rmSync(ssrDir, { recursive: true, force: true });
