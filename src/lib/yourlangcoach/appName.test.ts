// Rename to Yuston (plan analyst-rename-yuston-2026-10-12, item R2.1).
// Source scans: the visible text and meta of the website say "Yuston". Identifiers that still carry the
// old name (YourLangCoachContent, YourLangCoachIndex) are allowed because an identifier character follows.
import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const repoRoot = resolve(__dirname, "../../..");
const srcRoot = join(repoRoot, "src");
const publicRoot = join(repoRoot, "public", "yourlangcoach");
const socialScript = join(repoRoot, "scripts", "generate-social-pages.mjs");

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const rel = (f: string) => f.slice(repoRoot.length + 1);
const read = (f: string) => readFileSync(f, "utf8");

const OLD_NAME = /YourLangCoach(?![A-Za-z0-9_])/;

describe("R2.1: the old product name is gone from visible text", () => {
  const sourceFiles = walk(srcRoot).filter((f) => /\.(ts|tsx)$/.test(f) && !/\.test\.(ts|tsx)$/.test(f));
  const staticPages = walk(publicRoot).filter((f) => f.endsWith(".html"));

  it("scans a non-trivial set of files (guards against an empty walk)", () => {
    expect(sourceFiles.length).toBeGreaterThan(20);
    expect(staticPages.map(rel).sort()).toEqual(
      expect.arrayContaining([
        "public/yourlangcoach/privacy.html",
        "public/yourlangcoach/privacy/index.html",
        "public/yourlangcoach/t/index.html",
        "public/yourlangcoach/terms.html",
        "public/yourlangcoach/terms/index.html",
      ]),
    );
    expect(existsSync(socialScript)).toBe(true);
  });

  it("no .ts/.tsx file under src/, no static page and not the social-pages script uses the standalone old name", () => {
    const hits = [...sourceFiles, ...staticPages, socialScript]
      .flatMap((f) =>
        read(f)
          .split("\n")
          .map((line, i) => (OLD_NAME.test(line) ? `${rel(f)}:${i + 1}` : null))
          .filter((x): x is string => x !== null),
      );
    expect(hits).toEqual([]);
  });

  it("the new name is actually present in the site (not just the old one removed)", () => {
    const count = [...sourceFiles, ...staticPages, socialScript].reduce(
      (n, f) => n + (read(f).match(/Yuston/g) ?? []).length,
      0,
    );
    expect(count).toBeGreaterThan(100);
  });
});

describe("R2.1: social-preview meta", () => {
  const script = read(socialScript);

  it("every page title in generate-social-pages.mjs contains Yuston", () => {
    const titles = [...script.matchAll(/^\s*title:\s*(['"`])(.*?)\1/gm)].map((m) => m[2]);
    expect(titles.length).toBeGreaterThanOrEqual(4);
    for (const t of titles) expect(t).toContain("Yuston");
  });

  it("og:site_name is Yuston", () => {
    expect(script).toContain('<meta property="og:site_name" content="Yuston" />');
  });
});

describe("R2.1: static legal and teacher-link pages", () => {
  const titleOf = (file: string) => {
    const m = read(join(publicRoot, file)).match(/<title>([\s\S]*?)<\/title>/i);
    return m ? m[1] : "";
  };

  it.each(["privacy.html", "terms.html", "t/index.html"])("the <title> of %s contains Yuston", (file) => {
    expect(titleOf(file)).toContain("Yuston");
  });

  it("privacy/index.html is identical to privacy.html", () => {
    expect(read(join(publicRoot, "privacy/index.html"))).toBe(read(join(publicRoot, "privacy.html")));
  });

  it("terms/index.html is identical to terms.html", () => {
    expect(read(join(publicRoot, "terms/index.html"))).toBe(read(join(publicRoot, "terms.html")));
  });
});
