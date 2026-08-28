import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import fs from "fs";
import path from "path";

import { TERMS_TEXT, PRIVACY_TEXT } from "@/lib/yourlangcoach/content";
import FHPrivacy from "@/pages/Privacy";
import FHTerms from "@/pages/Terms";

const CSS = `
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body { margin:0; background:#edf7fc; color:#1f2933; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height:1.7; }
  .wrap { max-width: 780px; margin:0 auto; padding: 48px 20px 80px; }
  .card { background:#ffffff; border:1px solid rgba(15,23,42,0.08); border-radius:20px; padding:28px 24px; box-shadow:0 8px 28px rgba(15,23,42,0.06); }
  h1 { font-size: 30px; line-height:1.25; margin:0 0 8px; font-weight:700; }
  h2 { font-size: 19px; margin:32px 0 12px; font-weight:600; }
  p { margin: 0 0 14px; color:#4a5568; }
  ul { margin: 0 0 16px; padding-left: 22px; color:#4a5568; }
  li { margin-bottom: 6px; }
  a { color:#0e7490; }
  .back { display:inline-block; margin-bottom:24px; font-size:14px; color:#5b6b7c; text-decoration:none; }
  .meta { font-size:14px; color:#5b6b7c; margin-bottom:24px; }
`;

const DARK_CSS = `
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin:0; background:#0a0e1a; color:#e8ecf4; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height:1.75; }
  .wrap { max-width: 780px; margin:0 auto; padding: 48px 20px 80px; }
  h1 { font-size: 32px; line-height:1.25; margin:0 0 20px; font-weight:600; color:#f2f5fa; }
  h2 { font-size: 19px; margin:34px 0 12px; font-weight:600; color:#e8ecf4; }
  p { margin: 0 0 14px; color:#8a93a6; }
  ul { margin: 0 0 16px; padding-left: 22px; color:#8a93a6; }
  li { margin-bottom: 6px; }
  a { color:#a78bfa; }
  .back { display:inline-block; margin-bottom:28px; font-size:14px; color:#8a93a6; text-decoration:none; }
`;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const linkify = (s: string) =>
  esc(s)
    .replace(/(https?:\/\/[^\s,)]+)/g, '<a href="$1">$1</a>')
    .replace(/([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g, '<a href="mailto:$1">$1</a>');

const isHeading = (line: string) => /^\d+\.\s/.test(line) || /^[A-Z]\.\s/.test(line);

function legalTextToHtml(text: string) {
  const lines = text.split("\n");
  const out: string[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      out.push("<ul>" + list.map((i) => `<li>${linkify(i.replace(/^-\s*/, ""))}</li>`).join("") + "</ul>");
      list = [];
    }
  };
  lines.forEach((raw, idx) => {
    const line = raw.trimEnd();
    if (line.startsWith("- ")) { list.push(line); return; }
    flush();
    if (line === "") return;
    if (idx === 0) { out.push(`<h1>${linkify(line)}</h1>`); return; }
    if (isHeading(line)) { out.push(`<h2>${linkify(line)}</h2>`); return; }
    out.push(`<p>${linkify(line)}</p>`);
  });
  flush();
  return out.join("\n");
}

function doc({ title, description, css, body, canonical }: any) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<link rel="canonical" href="${canonical}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:type" content="article" />
<meta name="twitter:card" content="summary" />
<style>${css}</style>
</head>
<body>
<main class="wrap">
${body}
</main>
</body>
</html>
`;
}

function renderFH(Comp: any) {
  let html = renderToStaticMarkup(
    React.createElement(MemoryRouter, null, React.createElement(Comp)),
  );
  html = html.replace(/<svg[\s\S]*?<\/svg>/g, "");
  html = html.replace(/\s(class|className|style)="[^"]*"/g, "");
  // unwrap outer divs
  html = html.replace(/<div>/g, "").replace(/<\/div>/g, "");
  html = html.replace(/<a href="\/">\s*Back to home\s*<\/a>/, '<a class="back" href="/">&larr; Back to home</a>');
  return html;
}

const files: Array<[string, string]> = [];

const ylcPrivacy = doc({
  title: "Privacy Policy — YourLangCoach",
  description: "How YourLangCoach handles information when you use the Service.",
  css: DARK_CSS,
  canonical: "https://familyhuddletasks.com/yourlangcoach/privacy",
  body: '<a class="back" href="/yourlangcoach">&larr; Back to YourLangCoach</a>\n' + legalTextToHtml(PRIVACY_TEXT),
});
const ylcTerms = doc({
  title: "Terms of Use — YourLangCoach",
  description: "Terms of Use governing access to and use of the YourLangCoach language-learning app.",
  css: DARK_CSS,
  canonical: "https://familyhuddletasks.com/yourlangcoach/terms",
  body: '<a class="back" href="/yourlangcoach">&larr; Back to YourLangCoach</a>\n' + legalTextToHtml(TERMS_TEXT),
});

const fhPrivacyBody = renderFH(FHPrivacy);
const fhTermsBody = renderFH(FHTerms);

const fhPrivacy = doc({
  title: "Privacy Policy — Family Huddle",
  description: "How Family Huddle collects, uses, and protects your family's data.",
  css: CSS,
  canonical: "https://familyhuddletasks.com/privacy",
  body: fhPrivacyBody,
});
const fhTerms = doc({
  title: "Terms of Use — Family Huddle",
  description: "Terms of Use governing access to and use of the Family Huddle app.",
  css: CSS,
  canonical: "https://familyhuddletasks.com/terms",
  body: fhTermsBody,
});

files.push(["public/yourlangcoach/privacy.html", ylcPrivacy]);
files.push(["public/yourlangcoach/privacy/index.html", ylcPrivacy]);
files.push(["public/yourlangcoach/terms.html", ylcTerms]);
files.push(["public/yourlangcoach/terms/index.html", ylcTerms]);
files.push(["public/privacy.html", fhPrivacy]);
files.push(["public/privacy/index.html", fhPrivacy]);
files.push(["public/terms.html", fhTerms]);
files.push(["public/terms/index.html", fhTerms]);

for (const [p, content] of files) {
  const abs = path.resolve("/dev-server", p);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
  console.log("wrote", p, content.length);
}
