// Liquid Glass helpers (styles are in glass.css).
//
// 1. Lens: each glass control gets its own SVG filter, sized to it, that bends what's
//    behind its edges (a displacement map: neutral in the middle, pushing inward near
//    the rim). Only Chrome / Edge can use an SVG filter in backdrop-filter, so other
//    browsers keep the plain frosted glass from glass.css.
// 2. Shine: the highlight on a control follows the pointer (--lg-x / --lg-y).
(function () {
  "use strict";

  const GLASS = [
    ".dock",
    ".theme-toggle",
    ".site-nav",
    ".view-switch",
    ".q-jump",
    ".deck-arrow",
    ".deck-back",
    ".viz-maxclose",
    ".viz-maxedit",
    "body.deck-read .deck-readtop",
    ".viz.is-max .viz-maxbar",
  ].join(",");
  const SHINE = ".dock, .theme-toggle, .site-nav, .view-switch, .deck-arrow, .deck-back, .viz-maxclose, .viz-maxedit";
  const FROST = "blur(10px) saturate(190%) brightness(1.04)";

  // ---------- pointer shine (all browsers) ----------
  document.addEventListener(
    "pointermove",
    (e) => {
      const g = e.target.closest && e.target.closest(SHINE);
      if (!g) return;
      const r = g.getBoundingClientRect();
      g.style.setProperty("--lg-x", `${Math.round(e.clientX - r.left)}px`);
      g.style.setProperty("--lg-y", `${Math.round(e.clientY - r.top)}px`);
    },
    { passive: true }
  );

  // ---------- adaptive tone (all browsers) ----------
  // Like Apple's glass, a floating control turns dark (with light icons) while it sits
  // over dark content, such as a code block, so it stays readable. Light theme only:
  // in the dark theme the glass is already dark.
  const FLOATING = ".dock, .theme-toggle, .q-jump, body.deck-read .deck-readtop, .viz.is-max .viz-maxbar";

  function bgLuminance(node) {
    for (let n = node; n && n.nodeType === 1; n = n.parentElement) {
      const c = getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
      if (c && (c.length < 4 || +c[3] > 0.5)) {
        const [r, g, b] = c.slice(0, 3).map((v) => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      }
    }
    return 1;
  }

  function toneOf(el) {
    const r = el.getBoundingClientRect();
    if (!r.width || r.bottom < 0 || r.top > innerHeight) return;
    let dark = 0;
    let total = 0;
    for (const fx of [0.2, 0.5, 0.8]) {
      const x = r.left + r.width * fx;
      const y = r.top + r.height / 2;
      if (x < 0 || x >= innerWidth || y < 0 || y >= innerHeight) continue;
      // first thing under the control that isn't the control or other glass
      const under = document.elementsFromPoint(x, y).find((n) => !el.contains(n) && !n.closest(FLOATING));
      if (!under) continue;
      total++;
      if (bgLuminance(under) < 0.18) dark++;
    }
    el.classList.toggle("lg-over-dark", total > 0 && dark * 2 > total && document.documentElement.dataset.theme !== "dark");
  }

  function watchTone() {
    let queued = false;
    const run = () => {
      queued = false;
      document.querySelectorAll(FLOATING).forEach(toneOf);
    };
    const queue = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(run);
      }
    };
    addEventListener("scroll", queue, { passive: true, capture: true });
    addEventListener("resize", queue, { passive: true });
    document.addEventListener("click", () => setTimeout(queue, 50), true);
    queue();
  }

  // ---------- lens (Chromium only) ----------
  // navigator.userAgentData exists only in Chromium browsers (not Safari, not Firefox,
  // not Chrome on iPhone, which is Safari underneath).
  const canLens = !!navigator.userAgentData;
  const lowTransparency = window.matchMedia("(prefers-reduced-transparency: reduce)");
  watchTone();
  if (!canLens) return;

  const NS = "http://www.w3.org/2000/svg";
  const defs = document.createElementNS(NS, "svg");
  defs.setAttribute("aria-hidden", "true");
  defs.setAttribute("focusable", "false");
  defs.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none";
  document.body.appendChild(defs);

  let nextId = 0;
  const ids = new WeakMap();
  const seen = new WeakSet();

  // Displacement map for a w×h box with corner radius r. Red = sideways push, green =
  // up/down push, 50% grey = no push. The gradients push inward at every edge; a
  // blurred grey rounded rectangle cancels the push away from the rim.
  function mapFor(w, h, r) {
    const e = Math.max(4, Math.min(16, Math.min(w, h) * 0.32)); // rim width that bends
    const ir = Math.max(0, r - e * 0.6);
    const svg =
      `<svg xmlns="${NS}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
      `<defs>` +
      `<linearGradient id="x" x1="0" x2="1"><stop offset="0" stop-color="#f00"/><stop offset="1" stop-color="#000"/></linearGradient>` +
      `<linearGradient id="y" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f0"/><stop offset="1" stop-color="#000"/></linearGradient>` +
      `<filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${(e / 2.2).toFixed(1)}"/></filter>` +
      `</defs>` +
      `<rect width="${w}" height="${h}" fill="#000"/>` +
      `<rect width="${w}" height="${h}" fill="url(#x)"/>` +
      `<rect width="${w}" height="${h}" fill="url(#y)" style="mix-blend-mode:screen"/>` +
      `<rect x="${e}" y="${e}" width="${Math.max(0, w - 2 * e)}" height="${Math.max(0, h - 2 * e)}" rx="${ir}" fill="rgb(128,128,128)" filter="url(#b)"/>` +
      `</svg>`;
    return { url: `data:image/svg+xml,${encodeURIComponent(svg)}`, scale: Math.round(e * 1.5) };
  }

  function radiusOf(el, w, h) {
    const v = getComputedStyle(el).borderTopLeftRadius;
    const r = v.endsWith("%") ? (parseFloat(v) / 100) * Math.min(w, h) : parseFloat(v) || 0;
    return Math.min(r, Math.min(w, h) / 2);
  }

  function update(el) {
    const w = Math.round(el.offsetWidth);
    const h = Math.round(el.offsetHeight);
    if (!w || !h || lowTransparency.matches) {
      el.style.removeProperty("backdrop-filter");
      return;
    }
    let id = ids.get(el);
    let filter;
    if (!id) {
      id = `lg-lens-${nextId++}`;
      ids.set(el, id);
      filter = document.createElementNS(NS, "filter");
      filter.id = id;
      filter.setAttribute("filterUnits", "userSpaceOnUse");
      filter.setAttribute("primitiveUnits", "userSpaceOnUse");
      filter.setAttribute("color-interpolation-filters", "sRGB");
      filter.innerHTML =
        `<feImage result="map" preserveAspectRatio="none" x="0" y="0"/>` +
        `<feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="G"/>`;
      defs.appendChild(filter);
    } else {
      filter = defs.querySelector(`#${id}`);
    }
    const key = `${w}x${h}`;
    if (filter.dataset.size !== key) {
      filter.dataset.size = key;
      const { url, scale } = mapFor(w, h, radiusOf(el, w, h));
      for (const [k, v] of [["x", 0], ["y", 0], ["width", w], ["height", h]]) filter.setAttribute(k, v);
      const img = filter.querySelector("feImage");
      img.setAttribute("width", w);
      img.setAttribute("height", h);
      img.setAttribute("href", url);
      filter.querySelector("feDisplacementMap").setAttribute("scale", scale);
    }
    el.style.setProperty("backdrop-filter", `url(#${id}) ${FROST}`);
  }

  const resize = new ResizeObserver((entries) => entries.forEach((en) => update(en.target)));

  function scan() {
    document.querySelectorAll(GLASS).forEach((el) => {
      if (seen.has(el)) return;
      seen.add(el);
      resize.observe(el);
      update(el);
    });
  }

  scan();
  // Some glass appears later (phone cards, the full-screen visualizer): look again after clicks.
  document.addEventListener("click", () => requestAnimationFrame(scan), true);
  lowTransparency.addEventListener("change", () => document.querySelectorAll(GLASS).forEach(update));
})();
