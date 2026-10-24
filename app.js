// ---------- Search: filter questions by title or tags ----------
const search = document.getElementById("search");
const questions = document.querySelectorAll(".question");
const noResults = document.getElementById("no-results");

search.addEventListener("input", () => {
  const term = search.value.trim().toLowerCase();
  let visible = 0;
  questions.forEach((q) => {
    const text = (
      q.querySelector(".q-title").textContent +
      " " +
      (q.dataset.tags || "")
    ).toLowerCase();
    const match = text.includes(term);
    q.hidden = !match;
    if (match) visible++;
  });
  noResults.hidden = visible !== 0;
});

// ---------- Accordion: only one question open at a time ----------
questions.forEach((q) => {
  q.addEventListener("toggle", () => {
    if (!q.open) return;
    questions.forEach((other) => {
      if (other !== q) other.open = false;
    });
    // Closing a long question above can push this one off-screen.
    // Bring its header back into view if that happened.
    const top = q.getBoundingClientRect().top;
    if (top < 0) q.scrollIntoView({ block: "start" });
  });
});

// ---------- Surprise me: open a random question ----------
const surpriseBtn = document.getElementById("surprise");
const surpriseStatus = document.getElementById("surprise-status");

surpriseBtn.addEventListener("click", () => {
  // Pick from ALL questions, so clear any active search first.
  if (search.value) {
    search.value = "";
    search.dispatchEvent(new Event("input"));
  }

  // Avoid re-picking the question that's already open.
  const all = Array.from(questions);
  const pool = all.length > 1 ? all.filter((q) => !q.open) : all;
  const pick = pool[Math.floor(Math.random() * pool.length)];

  // Collapse the others BEFORE scrolling, so the layout doesn't shift
  // under the scroll and leave the picked question off-screen.
  all.forEach((q) => {
    q.open = q === pick;
  });
  // Wait one frame so the collapsed layout is in place, then scroll.
  requestAnimationFrame(() => {
    pick.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  pick.querySelector("summary").focus({ preventScroll: true });

  // Brief highlight so it's clear which one was picked.
  pick.classList.remove("picked");
  void pick.offsetWidth; // restart the animation
  pick.classList.add("picked");

  surpriseStatus.textContent =
    "Opened " + pick.querySelector(".q-title").textContent.trim();
});

// ---------- Light / dark theme toggle (default: light) ----------
const THEME_KEY = "solutions-theme";
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const themeLabel = themeToggle.querySelector(".theme-label");

// The button names the mode it switches TO.
function applyTheme(theme) {
  const dark = theme === "dark";
  if (dark) {
    document.documentElement.dataset.theme = "dark";
  } else {
    delete document.documentElement.dataset.theme;
  }
  themeIcon.textContent = dark ? "☀" : "☾";
  themeLabel.textContent = dark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute(
    "aria-label",
    dark ? "Switch to light mode" : "Switch to dark mode"
  );
}

applyTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");

themeToggle.addEventListener("click", () => {
  const next =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (e) {
    /* storage unavailable; theme still applies for this visit */
  }
});

// ---------- Code tabs ----------
// Remove leading/trailing blank lines and shared indentation,
// so code can be indented neatly inside the HTML.
function dedent(text) {
  const lines = text.replace(/\t/g, "    ").split("\n");
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const indent = Math.min(
    ...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length)
  );
  return lines.map((l) => l.slice(indent)).join("\n");
}

const LANG_KEY = "solutions-preferred-lang";
const allTabGroups = [];

// Switch every code block on the page to the chosen language,
// so you only pick your language once.
function selectLang(lang) {
  allTabGroups.forEach((group) => {
    const hasLang = group.langs.includes(lang);
    const target = hasLang ? lang : group.langs[0];
    group.buttons.forEach((btn) => {
      const active = btn.dataset.lang === target;
      btn.setAttribute("aria-selected", String(active));
      btn.tabIndex = active ? 0 : -1;
    });
    group.panels.forEach((panel) => {
      panel.hidden = panel.dataset.lang !== target;
    });
  });
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {
    /* storage unavailable; ignore */
  }
}

document.querySelectorAll(".code-tabs").forEach((container, gi) => {
  const sources = container.querySelectorAll('script[type="text/plain"]');
  const tablist = document.createElement("div");
  tablist.className = "tablist";
  tablist.setAttribute("role", "tablist");
  tablist.setAttribute("aria-label", "Code language");

  const group = { langs: [], buttons: [], panels: [] };

  sources.forEach((src, i) => {
    const lang = src.dataset.lang;
    const id = `code-${gi}-${i}`;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tab";
    btn.textContent = lang;
    btn.dataset.lang = lang;
    btn.id = `${id}-tab`;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-controls", id);
    btn.addEventListener("click", () => selectLang(lang));
    tablist.appendChild(btn);

    const pre = document.createElement("pre");
    pre.id = id;
    pre.dataset.lang = lang;
    pre.setAttribute("role", "tabpanel");
    pre.setAttribute("aria-labelledby", btn.id);
    pre.tabIndex = 0;
    const code = document.createElement("code");
    code.textContent = dedent(src.textContent);
    pre.appendChild(code);

    group.langs.push(lang);
    group.buttons.push(btn);
    group.panels.push(pre);
  });

  // Arrow-key navigation between tabs
  tablist.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const idx = group.buttons.indexOf(document.activeElement);
    if (idx === -1) return;
    const step = e.key === "ArrowRight" ? 1 : -1;
    const next =
      group.buttons[(idx + step + group.buttons.length) % group.buttons.length];
    selectLang(next.dataset.lang);
    next.focus();
  });

  // Code + highlight markers for the visualizer (read before clearing).
  const vizSources = Array.from(sources).map((src) => ({
    lang: src.dataset.lang,
    code: dedent(src.textContent),
    lines: src.dataset.vizLines ? JSON.parse(src.dataset.vizLines) : {},
  }));

  container.innerHTML = "";
  container.appendChild(tablist);
  group.panels.forEach((p) => container.appendChild(p));
  allTabGroups.push(group);

  // Approaches with a visualizer get a Code | Visualize switch (Code stays the default).
  if (container.dataset.viz && window.DSAViz) {
    window.DSAViz.mount(container, container.dataset.viz, vizSources);
  }
});

let saved = null;
try {
  saved = localStorage.getItem(LANG_KEY);
} catch (e) {
  /* ignore */
}
if (allTabGroups.length) {
  selectLang(saved || allTabGroups[0].langs[0]);
}

// ---------- Phones: shrink code to fit the screen width ----------
// On narrow screens each code block's font is reduced until its longest line
// fits, but never below CODE_MIN_PX. Blocks that still don't fit scroll
// sideways, with a faded right edge (.has-more) as a hint. Desktop is untouched.
const CODE_MOBILE = window.matchMedia("(max-width: 600px)");
const CODE_MIN_PX = 9;
const codeWidths = new WeakMap();

function updateHasMore(pre) {
  const more = pre.scrollLeft + pre.clientWidth < pre.scrollWidth - 1;
  pre.classList.toggle("has-more", more);
}

function fitCode(pre) {
  pre.style.fontSize = "";
  pre.classList.remove("has-more");
  const code = pre.querySelector("code");
  if (!CODE_MOBILE.matches || !code || !pre.clientWidth) return;

  const cs = getComputedStyle(pre);
  const available =
    pre.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  // An inline <code>'s box spans its longest line; the visualizer's is max-content.
  const contentWidth = () => code.getBoundingClientRect().width;

  let size = parseFloat(cs.fontSize);
  if (contentWidth() <= available) return;

  // Monospace text scales linearly with font size; then nudge for rounding
  // and for padding that doesn't scale.
  size = Math.max(CODE_MIN_PX, Math.floor(((size * available) / contentWidth()) * 4) / 4);
  pre.style.fontSize = size + "px";
  while (size > CODE_MIN_PX && contentWidth() > available) {
    size = Math.max(CODE_MIN_PX, size - 0.25);
    pre.style.fontSize = size + "px";
  }
  updateHasMore(pre);
}

// Refit whenever a block's width changes: first shown (tab, accordion,
// Code/Visualize switch), rotated, or resized. Font changes only alter its
// height, so they don't retrigger this.
const codeObserver = new ResizeObserver((entries) => {
  entries.forEach(({ target, contentRect }) => {
    const width = Math.round(contentRect.width);
    if (codeWidths.get(target) === width) return;
    codeWidths.set(target, width);
    fitCode(target);
  });
});

function observeCode(pre) {
  codeObserver.observe(pre);
  pre.addEventListener("scroll", () => {
    if (pre.style.fontSize) updateHasMore(pre);
  }, { passive: true });
}

document.querySelectorAll(".code-tabs pre").forEach(observeCode);
CODE_MOBILE.addEventListener("change", () =>
  document.querySelectorAll(".code-tabs pre").forEach(fitCode)
);

// The visualizer creates its code pane later and swaps its contents on
// language change, so it calls these directly.
window.DSACode = { observe: observeCode, fit: fitCode };
