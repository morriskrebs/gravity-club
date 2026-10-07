import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { ALL_ROUTES, type Lang, type PageId } from "./i18n";
import { getHeadHtml, sitemapXml } from "./seo";

export const routes = ALL_ROUTES;

export function render(lang: Lang, page: PageId) {
  return renderToString(
    <React.StrictMode>
      <App lang={lang} page={page} />
    </React.StrictMode>
  );
}

export { getHeadHtml, sitemapXml };
