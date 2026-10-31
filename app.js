// ---------- Search + filters: title/tag text, difficulty and topic ----------
const search = document.getElementById("search");
const questions = document.querySelectorAll(".question");
const noResults = document.getElementById("no-results");
const filterCount = document.getElementById("filter-count");
const filters = { difficulty: null, topic: null };

const difficultyOf = (q) => {
  const badge = q.querySelector(".q-meta .badge");
  return badge ? ["easy", "medium", "hard"].find((d) => badge.classList.contains(d)) || null : null;
};
const topicsOf = (q) => [...q.querySelectorAll(".q-meta .tag")].map((t) => t.textContent.trim());

function applyFilters() {
  const term = search.value.trim().toLowerCase();
  let visible = 0;
  questions.forEach((q) => {
    const text = (q.querySelector(".q-title").textContent + " " + (q.dataset.tags || "")).toLowerCase();
    const match =
      text.includes(term) &&
      (!filters.difficulty || difficultyOf(q) === filters.difficulty) &&
      (!filters.topic || topicsOf(q).includes(filters.topic));
    q.hidden = !match;
    if (match) visible++;
  });
  noResults.hidden = visible !== 0;
  const active = term || filters.difficulty || filters.topic;
  filterCount.textContent = active ? `Showing ${visible} of ${questions.length}` : "";
}

search.addEventListener("input", () => {
  applyFilters();
  // Searching from the dock while scrolled down: bring the results into view.
  if (search.value.trim() && document.getElementById("question-list").getBoundingClientRect().top < 0) {
    window.scrollTo({ top: 0 });
  }
});

// Chips are built from the cards, so new problems and tags show up automatically.
function buildChips(containerId, key, options) {
  const box = document.getElementById(containerId);
  const chips = options.map(({ value, label, count }) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "filter-chip";
    chip.setAttribute("aria-pressed", "false");
    chip.append(label);
    const n = document.createElement("span");
    n.className = "chip-count";
    n.textContent = String(count);
    n.setAttribute("aria-label", `(${count} question${count === 1 ? "" : "s"})`);
    chip.append(n);
    chip.addEventListener("click", () => {
      // Click again to clear: one difficulty and one topic at a time.
      filters[key] = filters[key] === value ? null : value;
      chips.forEach((c) => c.el.setAttribute("aria-pressed", String(filters[key] === c.value)));
      applyFilters();
    });
    box.append(chip);
    return { el: chip, value };
  });
}

(function setUpFilters() {
  const diffCounts = {};
  const topicCounts = {};
  questions.forEach((q) => {
    const d = difficultyOf(q);
    if (d) diffCounts[d] = (diffCounts[d] || 0) + 1;
    topicsOf(q).forEach((t) => (topicCounts[t] = (topicCounts[t] || 0) + 1));
  });
  buildChips(
    "filter-difficulty",
    "difficulty",
    ["easy", "medium", "hard"]
      .filter((d) => diffCounts[d])
      .map((d) => ({ value: d, label: d[0].toUpperCase() + d.slice(1), count: diffCounts[d] }))
  );
  buildChips(
    "filter-topics",
    "topic",
    Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t, count]) => ({ value: t, label: t, count }))
  );
})();

// ---------- Dock: the magnifier opens and closes the search box ----------
const dock = document.getElementById("dock");
const searchToggle = document.getElementById("search-toggle");

function setSearchOpen(open) {
  search.hidden = !open;
  dock.classList.toggle("is-searching", open);
  searchToggle.setAttribute("aria-expanded", String(open));
  searchToggle.setAttribute("aria-label", open ? "Close search" : "Search questions");
  searchToggle.title = open ? "Close search" : "Search by name or tag";
  if (open) {
    search.focus();
  } else if (search.value) {
    // Closing clears the typed search (the chips stay as they are).
    search.value = "";
    applyFilters();
  }
}

searchToggle.addEventListener("click", () => setSearchOpen(search.hidden));
search.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    setSearchOpen(false);
    searchToggle.focus();
  }
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
  // Clear the typed search, but keep the difficulty/topic chips: with
  // "Two Pointers" selected, Surprise me practices that topic.
  if (search.value) {
    search.value = "";
    applyFilters();
  }

  // Pick from the questions currently shown, avoiding the one already open.
  const all = Array.from(questions);
  const shown = all.filter((q) => !q.hidden);
  const candidates = shown.length ? shown : all;
  const pool = candidates.length > 1 ? candidates.filter((q) => !q.open) : candidates;
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
  const label = dark ? "Switch to light mode" : "Switch to dark mode";
  themeToggle.setAttribute("aria-label", label);
  themeToggle.title = label;
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

// ---------- Jump bar: links to each section of an open card ----------
// Built from the card's own sections, so new problems get one automatically.
const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

questions.forEach((q) => {
  const body = q.querySelector(".q-body");
  if (!body) return;
  const qid = "q-" + slugify(q.querySelector(".q-title").textContent);
  q.id = q.id || qid;

  const targets = [];
  const keyIdea = body.querySelector(":scope > .key-idea");
  if (keyIdea) targets.push({ el: keyIdea, label: "Key idea", slug: "key-idea" });
  let n = 0;
  body.querySelectorAll(":scope > section").forEach((sec) => {
    const h2 = sec.querySelector("h2");
    if (!h2) return;
    // The heading's own text, without its badges or links ("Optimal", "View on LeetCode").
    const heading = [...h2.childNodes].filter((c) => c.nodeType === Node.TEXT_NODE).map((c) => c.textContent).join(" ").trim();
    if (sec.classList.contains("approach")) {
      n++;
      targets.push({
        el: sec, label: `Approach ${n}`, slug: `approach-${n}`, title: heading,
        optimal: !!h2.querySelector(".label.optimal"),
      });
    } else {
      targets.push({ el: sec, label: heading, slug: slugify(heading) });
    }
  });
  if (!targets.length) return;

  const nav = document.createElement("nav");
  nav.className = "q-jump";
  nav.setAttribute("aria-label", "Sections of this question");
  const top = document.createElement("a");
  top.href = "#" + q.id;
  top.textContent = "↑ Top";
  top.title = "Back to the question title";
  top.addEventListener("click", (e) => {
    e.preventDefault();
    q.scrollIntoView({ block: "start" });
    q.querySelector("summary").focus({ preventScroll: true });
  });
  nav.append(top);

  const links = targets.map((t) => {
    t.el.id = t.el.id || `${q.id}-${t.slug}`;
    const a = document.createElement("a");
    a.href = "#" + t.el.id;
    a.textContent = t.label + (t.optimal ? " ✓" : "");
    if (t.title) a.title = t.title + (t.optimal ? " (optimal)" : "");
    if (t.optimal) a.classList.add("is-optimal");
    a.addEventListener("click", (e) => {
      e.preventDefault(); // don't change the URL or let the hash scroll fight the sticky bar
      // Right after a click, highlight what was clicked, even if the page
      // ends before that section can reach the bar.
      q.jumpClicked = { el: t.el, until: performance.now() + 700 };
      t.el.scrollIntoView({ block: "start" });
      requestAnimationFrame(updateJump);
    });
    nav.append(a);
    return { a, el: t.el };
  });
  body.prepend(nav);
  q.jump = { nav, links };
});

// Highlight the section being read in the open card's jump bar.
function updateJump() {
  const q = [...questions].find((x) => x.open && x.jump);
  if (!q) return;
  const { nav, links } = q.jump;
  // A section counts as "current" once its top reaches just below the bar
  // (jump targets land about 10px below it, thanks to scroll-margin-top).
  const line = nav.getBoundingClientRect().bottom + 24;
  let current = null;
  links.forEach((l) => {
    if (l.el.getBoundingClientRect().top <= line) current = l;
  });
  // The last section can't always scroll up to the bar, because the page ends
  // first. When the page can't scroll any further and the card's end is on
  // screen, count the last section as current.
  const last = links[links.length - 1];
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  if (atBottom && q.getBoundingClientRect().bottom <= window.innerHeight + 2 && last.el.getBoundingClientRect().top > line) {
    current = last;
  }
  if (q.jumpClicked && performance.now() < q.jumpClicked.until) {
    current = links.find((l) => l.el === q.jumpClicked.el) || current;
  }
  links.forEach((l) => {
    const on = l === current;
    if (on !== (l.a.getAttribute("aria-current") === "true")) {
      if (on) {
        l.a.setAttribute("aria-current", "true");
        // Keep the highlighted chip visible inside the bar (it scrolls sideways on phones).
        const ar = l.a.getBoundingClientRect();
        const nr = nav.getBoundingClientRect();
        if (ar.left < nr.left || ar.right > nr.right) nav.scrollLeft += ar.left - nr.left - 16;
      } else {
        l.a.removeAttribute("aria-current");
      }
    }
  });
}

// ---------- Floating controls: fade while scrolling, step aside for the visualizer ----------
// Is any visualizer panel (in Visualize mode) on screen? Then the dock hides,
// so it can't cover the pinned Prev / Play / Next.
function updateVizInView() {
  const inView = [...document.querySelectorAll(".viz")].some((v) => {
    if (v.hidden || !v.offsetParent) return false;
    const r = v.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  });
  document.body.classList.toggle("viz-in-view", inView);
}

let scrollIdle = null;
let scrollFrame = null;
window.addEventListener(
  "scroll",
  () => {
    document.body.classList.add("is-scrolling");
    clearTimeout(scrollIdle);
    scrollIdle = setTimeout(() => document.body.classList.remove("is-scrolling"), 450);
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = null;
      updateJump();
      updateVizInView();
    });
  },
  { passive: true }
);

// Switching Code / Visualize or opening a card changes the layout without scrolling.
document.addEventListener("click", (e) => {
  if (e.target.closest(".viz-mode")) requestAnimationFrame(updateVizInView);
});
questions.forEach((q) =>
  q.addEventListener("toggle", () =>
    requestAnimationFrame(() => {
      updateVizInView();
      updateJump();
    })
  )
);
window.addEventListener("resize", updateVizInView);
