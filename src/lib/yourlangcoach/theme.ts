import { useCallback, useSyncExternalStore } from "react";

// Yuston pages: light ("paper") by default, dark only when the visitor picks it with the header toggle.
// The choice lives on <html data-ylc-theme> so portalled menus get it too; index.html sets it before
// first paint from the same storage key, so the page never flashes the wrong scheme.
export type YlcTheme = "light" | "dark";
export const YLC_THEME_KEY = "ylc-theme";

const read = (): YlcTheme =>
  typeof document !== "undefined" && document.documentElement.dataset.ylcTheme === "dark" ? "dark" : "light";

const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const setYlcTheme = (theme: YlcTheme) => {
  document.documentElement.dataset.ylcTheme = theme;
  try {
    window.localStorage.setItem(YLC_THEME_KEY, theme);
  } catch {
    /* storage may be unavailable */
  }
  listeners.forEach((fn) => fn());
};

export const useYlcTheme = () => {
  const theme = useSyncExternalStore(subscribe, read, () => "light" as YlcTheme);
  const toggle = useCallback(() => setYlcTheme(theme === "dark" ? "light" : "dark"), [theme]);
  return { theme, toggle };
};
