/** True in iPhone / iPad / iPod browsers. iPadOS in desktop mode reports "Macintosh" with touch points. */
export const isIosDevice = (): boolean => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent ?? "";
  return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && (navigator.maxTouchPoints ?? 0) > 1);
};

/**
 * Clipboard hand-off marker for iOS. The app reads the clipboard once, on first launch, and accepts
 * only this exact shape (yourlangcoach repo: src/lib/teacher-referral.ts, CLIPBOARD_MARKER_RE).
 * Android gets the code through the Play install referrer and never reads the clipboard, and the
 * marker is not something a person can paste into the app. Write it only when isIosDevice() is true.
 */
export const iosCodeMarker = (code: string) => `YLC-T:${code}`;
