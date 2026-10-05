// Clipboard hand-off helpers (plan analyst-teacher-code-prefill-2026-10-04, item S1).
import { afterEach, describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { iosCodeMarker, isIosDevice } from "./iosCodeMarker";

const UA = {
  iphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
  ipad: "Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
  mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
  android: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
  windows: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
};
const setDevice = (userAgent: string, maxTouchPoints = 0) => {
  Object.defineProperty(window.navigator, "userAgent", { configurable: true, get: () => userAgent });
  Object.defineProperty(window.navigator, "maxTouchPoints", { configurable: true, get: () => maxTouchPoints });
};
afterEach(() => {
  Reflect.deleteProperty(window.navigator, "userAgent");
  Reflect.deleteProperty(window.navigator, "maxTouchPoints");
});

describe("S1: isIosDevice / iosCodeMarker", () => {
  it("is true for an iPhone user agent", () => {
    setDevice(UA.iphone, 5);
    expect(isIosDevice()).toBe(true);
  });
  it("is true for an iPad user agent", () => {
    setDevice(UA.ipad, 5);
    expect(isIosDevice()).toBe(true);
  });
  it("is true for iPadOS desktop mode (Macintosh with touch points)", () => {
    setDevice(UA.mac, 5);
    expect(isIosDevice()).toBe(true);
  });
  it("is false for a real Mac (Macintosh with 0 touch points)", () => {
    setDevice(UA.mac, 0);
    expect(isIosDevice()).toBe(false);
  });
  it("is false for Android Chrome, even with touch points", () => {
    setDevice(UA.android, 5);
    expect(isIosDevice()).toBe(false);
  });
  it("is false for Windows", () => {
    setDevice(UA.windows, 0);
    expect(isIosDevice()).toBe(false);
  });
  it("builds the marker the app expects", () => {
    expect(iosCodeMarker("PRO-ABCDEFGHJK")).toBe("YLC-T:PRO-ABCDEFGHJK");
    expect(iosCodeMarker("ANNA3XK")).toMatch(/^YLC-T:((?:PRO-)?[A-Za-z0-9]{4,20})$/i);
  });
});

// Source scan: the marker literal must live in one place only, so no page can write it unguarded.
describe("S1: the marker literal lives only in iosCodeMarker.ts", () => {
  const srcRoot = resolve(__dirname, "../..");
  const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((name) => {
      const p = join(dir, name);
      return statSync(p).isDirectory() ? walk(p) : [p];
    });
  it("YLC-T occurs in no other non-test file under src/", () => {
    const hits = walk(srcRoot)
      .filter((f) => /\.(ts|tsx)$/.test(f) && !/\.test\.(ts|tsx)$/.test(f))
      .filter((f) => readFileSync(f, "utf8").includes("YLC-T"))
      .map((f) => f.slice(srcRoot.length + 1));
    expect(hits).toEqual(["lib/yourlangcoach/iosCodeMarker.ts"]);
  });
});
