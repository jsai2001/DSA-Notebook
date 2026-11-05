// Phones (up to 600px wide, or ?mobile=1 to try it on a computer): browse by pattern
// as swipeable cards. Patterns -> a pattern's problems -> one problem, where each
// section (Key idea, Problem, Approach 1, ...) is its own card. Tap opens a card,
// sideways swipes move between cards, the phone's Back button goes back one level,
// and Visualize opens full screen. Pages without pattern groups are left alone.
// The page's own elements are reused in place (not moved), so app.js, viz.js and
// present.js keep working on them.
(function swipeDeck() {
  // Phones only (or ?mobile=1 to try it on a computer).
  const forced = /[?&]mobile=1(&|$)/.test(location.search);
  if (!forced && !window.matchMedia("(max-width: 600px)").matches) return;
  const list = document.getElementById("question-list");
  const groupEls = [...list.querySelectorAll(":scope > .pattern-group")];
  if (!groupEls.length) return;

  const groups = groupEls.map((g) => ({
    el: g,
    name: g.querySelector(".g-name").textContent.trim(),
    hint: g.querySelector(".g-hint").textContent.trim(),
    cards: [...g.querySelectorAll(".question")],
  }));
  const difficulty = (q) => (q.querySelector(".q-meta .badge").className.match(/easy|medium|hard/) || ["medium"])[0];
  const title = (q) => q.querySelector(".q-title").textContent.trim();
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  };
  const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

  document.body.classList.add("deck-on");

  // ---------- the pattern / problem deck ----------
  const deck = el("section", "deck");
  deck.setAttribute("aria-label", "Browse the problems by pattern");
  const top = el("div", "deck-top");
  const nav = document.querySelector(".site-nav");
  if (nav) top.append(nav.cloneNode(true));
  const back = el("button", "deck-back", "← Patterns");
  back.type = "button";
  back.setAttribute("aria-label", "Back to all patterns");
  const heading = el("h2", "deck-heading");
  const sub = el("p", "deck-sub"); // read by screen readers only; the cards say "Tap to open"
  const headRow = el("div", "deck-headrow");
  headRow.append(back, heading);
  top.append(headRow, sub);
  const track = el("div", "deck-track");
  track.tabIndex = 0;
  track.setAttribute("aria-roledescription", "carousel");
  const foot = el("div", "deck-foot");
  const prev = el("button", "deck-arrow", "‹");
  prev.type = "button";
  prev.setAttribute("aria-label", "Previous card");
  const dots = el("div", "deck-dots");
  dots.setAttribute("aria-hidden", "true");
  const counter = el("span", "deck-counter");
  counter.setAttribute("aria-live", "polite");
  const next = el("button", "deck-arrow", "›");
  next.type = "button";
  next.setAttribute("aria-label", "Next card");
  // Search and Surprise me share this row (they press the page's own buttons),
  // instead of taking a row of their own at the bottom.
  const proxy = (id, cls) => {
    const real = document.getElementById(id);
    if (!real) return el("span");
    const b = el("button", `deck-arrow deck-tool ${cls}`);
    b.type = "button";
    b.innerHTML = real.innerHTML; // the same icon
    b.setAttribute("aria-label", real.getAttribute("aria-label") || real.title);
    b.title = real.title;
    b.addEventListener("click", () => real.click());
    return b;
  };
  foot.append(proxy("search-toggle", "is-search"), prev, dots, counter, next, proxy("surprise", "is-surprise"));
  deck.append(top, track, foot);
  document.body.append(deck);

  // ---------- the bars around a problem being read ----------
  const readTop = el("div", "deck-readtop");
  const readRow = el("div", "deck-readrow");
  const readBack = el("button", "deck-back");
  readBack.type = "button";
  const readPrev = el("button", "deck-arrow", "‹");
  readPrev.type = "button";
  readPrev.setAttribute("aria-label", "Previous problem");
  const readPos = el("span", "deck-readpos");
  const readNext = el("button", "deck-arrow", "›");
  readNext.type = "button";
  readNext.setAttribute("aria-label", "Next problem");
  const readTitle = el("div", "deck-readtitle");
  readRow.append(readBack, readTitle, readPrev, readPos, readNext);
  const chips = el("div", "deck-chips");
  chips.setAttribute("aria-label", "Sections of this problem");
  readTop.append(readRow, chips);
  const readFoot = el("div", "deck-readfoot");
  const secPrev = el("button", "deck-arrow", "‹");
  secPrev.type = "button";
  secPrev.setAttribute("aria-label", "Previous section");
  const secDots = el("div", "deck-dots");
  secDots.setAttribute("aria-hidden", "true");
  const secCounter = el("span", "deck-counter");
  secCounter.setAttribute("aria-live", "polite");
  const secNext = el("button", "deck-arrow", "›");
  secNext.type = "button";
  secNext.setAttribute("aria-label", "Next section");
  readFoot.append(secPrev, secDots, secCounter, secNext);
  document.body.append(readTop, readFoot);

  let level = "patterns"; // "patterns" | "problems" | "read"
  let gi = 0; // current pattern
  let pi = 0; // current problem inside it
  let reading = null; // the problem being read
  let depth = 0; // history entries this script pushed, so the phone's Back button walks back through the levels
  let count = 0;

  const lock = (on) => document.documentElement.classList.toggle("deck-lock", on);

  // ---------- slides ----------
  function cta(text) {
    const c = el("span", "deck-cta");
    c.append(el("span", "", text));
    return c;
  }

  // A card acts as a button, but is a plain element so its text can scroll on iPhone too.
  function cardEl(cls) {
    const card = el("div", cls);
    card.setAttribute("role", "button");
    card.tabIndex = 0;
    return card;
  }

  function patternSlide(g, i) {
    const card = cardEl("deck-card");
    const body = el("span", "deck-body");
    body.append(el("span", "deck-title", g.name), el("span", "deck-hint", g.hint));
    const counts = el("span", "deck-counts");
    const tally = { easy: 0, medium: 0, hard: 0 };
    g.cards.forEach((q) => tally[difficulty(q)]++);
    ["easy", "medium", "hard"].forEach((d) => tally[d] && counts.append(el("span", `deck-pill ${d}`, `${tally[d]} ${d[0].toUpperCase() + d.slice(1)}`)));
    body.append(counts);
    const ul = el("ul", "deck-list");
    g.cards.forEach((q) => ul.append(el("li", "", title(q))));
    body.append(ul);
    card.append(body, cta(`Tap to see ${plural(g.cards.length, "problem")}`));
    card.open = () => {
      push();
      show("problems", i, 0);
    };
    return card;
  }

  function problemSlide(g, q, j) {
    const card = cardEl("deck-card is-problem");
    const body = el("span", "deck-body");
    body.append(el("span", "deck-title", title(q)));
    const meta = q.querySelector(".q-meta");
    if (meta) body.append(meta.cloneNode(true));
    const idea = q.querySelector(".q-body > .key-idea");
    if (idea) body.append(idea.cloneNode(true));
    card.append(body, cta("Tap to open"));
    card.open = () => {
      push();
      read(q);
    };
    return card;
  }

  function show(lv, g, start) {
    level = lv;
    gi = g;
    deck.hidden = false;
    lock(true);
    const items = lv === "patterns" ? groups.map((x, i) => patternSlide(x, i)) : groups[g].cards.map((q, j) => problemSlide(groups[g], q, j));
    count = items.length;
    track.replaceChildren(
      ...items.map((card, i) => {
        const slide = el("div", "deck-slide");
        slide.setAttribute("role", "group");
        slide.setAttribute("aria-roledescription", "slide");
        slide.setAttribute("aria-label", `${i + 1} of ${items.length}`);
        slide.append(card);
        return slide;
      })
    );
    back.hidden = lv === "patterns";
    if (lv === "patterns") {
      heading.textContent = "Patterns";
      sub.textContent = `${groups.length} patterns, ${groups.reduce((n, x) => n + x.cards.length, 0)} problems. Swipe sideways to browse, tap to open.`;
    } else {
      heading.textContent = groups[g].name;
      sub.textContent = `${plural(groups[g].cards.length, "problem")}. Swipe sideways to browse, tap to open.`;
    }
    dots.replaceChildren(...items.map(() => el("span", "deck-dot")));
    dots.hidden = true; // the counter says the same in less room
    track.scrollLeft = start * track.clientWidth;
    markCut();
    indicate();
  }

  // Fade the bottom of a card while some of its text is still below.
  const cutOne = (b) => b.classList.toggle("is-cut", b.scrollTop + b.clientHeight < b.scrollHeight - 2);
  function markCut() {
    track.querySelectorAll(".deck-body").forEach(cutOne);
  }
  track.addEventListener("scroll", (e) => e.target.classList && e.target.classList.contains("deck-body") && cutOne(e.target), true);

  function current() {
    return Math.max(0, Math.min(count - 1, Math.round(track.scrollLeft / Math.max(1, track.clientWidth))));
  }

  function indicate() {
    const i = current();
    counter.textContent = `${i + 1} / ${count}`;
    [...dots.children].forEach((d, k) => d.classList.toggle("is-current", k === i));
    prev.disabled = i === 0;
    next.disabled = i === count - 1;
    if (level === "patterns") gi = i;
    else pi = i;
  }

  let frame = 0;
  track.addEventListener("scroll", () => {
    if (!frame) frame = requestAnimationFrame(() => ((frame = 0), indicate()));
  });
  const step = (d) => track.scrollTo({ left: (current() + d) * track.clientWidth, behavior: "smooth" });
  prev.addEventListener("click", () => step(-1));
  next.addEventListener("click", () => step(1));
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      step(e.key === "ArrowRight" ? 1 : -1);
    }
  });

  // ---------- tap (or Enter) opens the card on screen ----------
  track.addEventListener("click", (e) => {
    const card = e.target.closest(".deck-card");
    if (card) card.open();
  });
  track.addEventListener("keydown", (e) => {
    const card = e.target.closest && e.target.closest(".deck-card");
    if (!card || e.target !== card || (e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault();
    card.open();
  });

  // ---------- reading one problem: each section is a card ----------
  let sections = [];
  let secIndex = 0;
  const bodyOf = (q) => q.querySelector(".q-body");

  function buildSections(q) {
    sections = [...bodyOf(q).children].filter((c) => !c.classList.contains("q-jump"));
    const links = q.jump ? q.jump.links : [];
    chips.replaceChildren(
      ...sections.map((s, k) => {
        const link = links.find((l) => l.el === s);
        const label = link ? link.a.textContent : (s.querySelector("h2") || s).textContent.trim().split("\n")[0];
        const chip = el("button", "deck-chip", label);
        chip.type = "button";
        if (link && link.a.classList.contains("is-optimal")) chip.classList.add("is-optimal");
        chip.addEventListener("click", () => goSection(k, true));
        return chip;
      })
    );
    secDots.replaceChildren(...sections.map(() => el("span", "deck-dot")));
    secDots.hidden = sections.length > 16;
  }

  function goSection(k, smooth) {
    const b = bodyOf(reading);
    b.scrollTo({ left: k * b.clientWidth, behavior: smooth ? "smooth" : "instant" });
    if (!smooth) indicateSection();
  }

  function indicateSection() {
    if (!reading) return;
    const b = bodyOf(reading);
    secIndex = Math.max(0, Math.min(sections.length - 1, Math.round(b.scrollLeft / Math.max(1, b.clientWidth))));
    const chip = chips.children[secIndex];
    [...chips.children].forEach((c, k) => (k === secIndex ? c.setAttribute("aria-current", "true") : c.removeAttribute("aria-current")));
    if (chip) {
      const cr = chip.getBoundingClientRect();
      const nr = chips.getBoundingClientRect();
      if (cr.left < nr.left || cr.right > nr.right) chips.scrollLeft += cr.left - nr.left - 20;
    }
    [...secDots.children].forEach((d, k) => d.classList.toggle("is-current", k === secIndex));
    // Number first: on narrow screens only the name (also shown in the chips) gets cut
    secCounter.textContent = `${secIndex + 1} / ${sections.length} · ${chip ? chip.textContent : ""}`;
    secPrev.disabled = secIndex === 0;
    secNext.disabled = secIndex === sections.length - 1;
    // The address follows the section, so a refresh comes back to the same card.
    const id = sections[secIndex].id;
    if (id && location.hash !== "#" + id) history.replaceState(history.state, "", location.pathname + location.search + "#" + id);
  }

  let secFrame = 0;
  function onSectionScroll() {
    if (!secFrame) secFrame = requestAnimationFrame(() => ((secFrame = 0), indicateSection()));
  }
  secPrev.addEventListener("click", () => goSection(secIndex - 1, true));
  secNext.addEventListener("click", () => goSection(secIndex + 1, true));

  function placeReadTop() {
    document.documentElement.style.setProperty("--deck-read-top", `${readTop.getBoundingClientRect().height}px`);
  }
  if ("ResizeObserver" in window) new ResizeObserver(placeReadTop).observe(readTop);

  function read(q, startAt) {
    const g = groups.findIndex((x) => x.cards.includes(q));
    if (g < 0) return;
    if (reading) leaveProblem(reading);
    reading = q;
    gi = g;
    pi = groups[g].cards.indexOf(q);
    level = "read";
    deck.hidden = true;
    lock(true);
    document.body.classList.add("deck-read");
    groups[g].el.classList.add("deck-reading");
    q.classList.add("deck-current");
    readBack.textContent = "←";
    readBack.setAttribute("aria-label", `Back to ${groups[g].name}`);
    readBack.title = `Back to ${groups[g].name}`;
    readPos.textContent = `${pi + 1} / ${groups[g].cards.length}`;
    readPrev.disabled = pi === 0;
    readNext.disabled = pi === groups[g].cards.length - 1;
    readTitle.replaceChildren(el("span", "", title(q)));
    const badge = q.querySelector(".q-meta .badge");
    if (badge) readTitle.append(badge.cloneNode(true));
    if (!q.open) q.open = true;
    buildSections(q);
    placeReadTop();
    bodyOf(q).addEventListener("scroll", onSectionScroll);
    // Start on the section a link points at (#q-...-approach-2), or the first one.
    const target = startAt || (location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1))));
    const k = Math.max(0, sections.findIndex((s) => s === target || (target && s.contains(target))));
    requestAnimationFrame(() => goSection(k, false));
  }

  function leaveProblem(q) {
    q.classList.remove("deck-current");
    q.closest(".pattern-group").classList.remove("deck-reading");
    bodyOf(q).removeEventListener("scroll", onSectionScroll);
    bodyOf(q).scrollLeft = 0;
  }

  function stopReading() {
    const q = reading;
    if (!q) return;
    reading = null;
    leaveProblem(q);
    document.body.classList.remove("deck-read");
    if (q.open) q.open = false;
    history.replaceState(history.state, "", location.pathname + location.search);
  }

  readPrev.addEventListener("click", () => pi > 0 && read(groups[gi].cards[pi - 1], groups[gi].cards[pi - 1].querySelector(".q-body > *")));
  readNext.addEventListener("click", () => pi < groups[gi].cards.length - 1 && read(groups[gi].cards[pi + 1], groups[gi].cards[pi + 1].querySelector(".q-body > *")));

  // ---------- going back (the buttons, and the phone's own Back) ----------
  function push() {
    history.pushState({ deck: true }, "", location.href);
    depth++;
  }
  function goBack() {
    if (level === "read") {
      stopReading();
      closeSearch();
      show("problems", gi, pi);
    } else if (level === "problems") {
      show("patterns", gi, gi);
    }
  }
  function backButton() {
    if (depth > 0) history.back();
    else goBack();
  }
  back.addEventListener("click", backButton);
  readBack.addEventListener("click", backButton);
  window.addEventListener("popstate", () => {
    if (depth === 0) return;
    depth--;
    if (maxViz) return closeViz();
    goBack();
  });

  // ---------- Visualize opens full screen ----------
  // viz.js shows the .viz panel when "Visualize" is tapped; on a phone we then pin that
  // same panel over the whole screen (it is not moved, so viz.js keeps working on it).
  let maxViz = null;
  function openViz(root) {
    if (!root.querySelector(".viz-maxbar")) {
      const bar = el("div", "viz-maxbar");
      const name = el("span", "viz-maxtitle");
      const close = el("button", "viz-maxclose", "✕ Close");
      close.type = "button";
      close.setAttribute("aria-label", "Close the visualizer");
      close.addEventListener("click", () => (depth > 0 ? history.back() : closeViz()));
      // The input boxes take a lot of room; they open on demand
      const edit = el("button", "viz-maxedit", "Edit input");
      edit.type = "button";
      edit.setAttribute("aria-expanded", "false");
      edit.addEventListener("click", () => {
        const on = root.classList.toggle("show-input");
        edit.setAttribute("aria-expanded", String(on));
        if (on) {
          root.scrollTop = 0;
          const first = root.querySelector(".viz-form input");
          if (first) first.focus({ preventScroll: true });
        }
      });
      bar.append(name, edit, close);
      root.prepend(bar);
    }
    const q = root.closest(".question");
    root.querySelector(".viz-maxtitle").textContent = `Visualize · ${q ? title(q) : ""}`;
    root.classList.add("is-max");
    if (!root.dataset.watchErr) {
      root.dataset.watchErr = "1";
      const err = root.querySelector(".viz-error");
      if (err) new MutationObserver(() => {
        if (err.textContent && !root.classList.contains("show-input")) root.querySelector(".viz-maxedit").click();
      }).observe(err, { childList: true, characterData: true, subtree: true });
    }
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", root.querySelector(".viz-maxtitle").textContent);
    root.scrollTop = 0;
    document.body.classList.add("viz-max-on");
    maxViz = root;
    push();
    root.querySelector(".viz-maxclose").focus({ preventScroll: true });
  }
  function closeViz() {
    const root = maxViz;
    if (!root) return;
    maxViz = null;
    root.classList.remove("is-max");
    root.removeAttribute("role");
    root.removeAttribute("aria-modal");
    root.removeAttribute("aria-label");
    document.body.classList.remove("viz-max-on");
    // Back on the card, show the code (this also pauses the animation); Visualize reopens it where it was.
    const tabs = root.closest(".code-tabs");
    const codeBtn = tabs && [...tabs.querySelectorAll(":scope > .viz-modes .viz-mode")].find((b) => b.textContent === "Code");
    if (codeBtn) {
      codeBtn.click();
      codeBtn.focus({ preventScroll: true });
    }
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest && e.target.closest(".viz-mode");
    if (!b || b.textContent !== "Visualize" || maxViz) return;
    const root = b.closest(".code-tabs").querySelector(":scope > .viz");
    if (root && !root.hidden) openViz(root);
  });
  document.addEventListener(
    "keydown",
    (e) => {
      if (!maxViz) return;
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        depth > 0 ? history.back() : closeViz();
      } else if (["/", "r", "R"].includes(e.key) && !(e.target.matches && e.target.matches("input, textarea"))) {
        e.stopPropagation(); // search / Surprise me wait until it is closed; ← → still step through
      }
    },
    true
  );

  // A problem opened some other way (Surprise me, a search result, a "Same pattern" link): read it.
  groups.forEach((g) =>
    g.cards.forEach((q) =>
      q.addEventListener("toggle", () => {
        if (q.open && q !== reading) {
          if (level !== "read") push();
          read(q);
        } else if (!q.open && q === reading) {
          backButton();
        }
      })
    )
  );

  // Typing in search shows the normal list of matches; tapping one reads it.
  const search = document.getElementById("search");
  function closeSearch() {
    if (search && !search.hidden) document.getElementById("search-toggle").click();
  }
  if (search) {
    search.addEventListener("input", () => {
      if (level === "read") return;
      if (search.value.trim()) {
        deck.hidden = true;
        lock(false);
      } else if (deck.hidden) {
        show(level, gi, level === "patterns" ? gi : pi);
      }
    });
  }

  window.addEventListener("resize", () => {
    if (!deck.hidden) markCut();
    if (!deck.hidden) track.scrollLeft = (level === "patterns" ? gi : pi) * track.clientWidth;
    if (reading) goSection(secIndex, false);
  });

  // ---------- start ----------
  const open = groups.flatMap((g) => g.cards).find((q) => q.open); // opened from a link (#q-...)
  if (open) read(open);
  else show("patterns", 0, 0);
})();
