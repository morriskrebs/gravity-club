import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const ssrDir = resolve(".ssr");
const { render } = await import(pathToFileURL(resolve(ssrDir, "entry-server.mjs")).href);

const html = render();
const indexPath = resolve("dist/index.html");
const template = readFileSync(indexPath, "utf-8");
if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
}
writeFileSync(indexPath, template.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerender: injected ${html.length} chars into dist/index.html`);
