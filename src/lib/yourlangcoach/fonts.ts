// Yuston's web fonts (the app's: Bricolage Grotesque for headings, Inter for text).
// Loaded only on Yuston pages so Family Huddle keeps its own typography; index.html
// does the same before first paint when the page opens on a /yourlangcoach URL.
export const YLC_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap";

export const ensureYlcFonts = () => {
  if (typeof document === "undefined" || document.getElementById("ylc-fonts")) return;
  const link = document.createElement("link");
  link.id = "ylc-fonts";
  link.rel = "stylesheet";
  link.href = YLC_FONTS_HREF;
  document.head.appendChild(link);
};
