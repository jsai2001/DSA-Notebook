// Present mode: show a card's steps as full-screen slides, for talks and screen
// recordings. Any card with <section class="scene"> steps gets a "Present" button.
//
// Slides: 1) title + the sections before the first step (the problem), 2) one
// slide per step, 3) any later sections, 4) the key idea as a recap.
// In a step slide, the visual (svg.map, .split, or anything marked
// data-slide="visual") goes on the right and the rest on the left. Elements
// marked data-slide="hide" are hidden while presenting.
//
// The card's own elements are moved into the slides (not copied), so its
// scripts keep working, and moved back when the presentation closes.
//
// Keys: ← → (or Space / Page Up / Page Down) move, Home / End, 1–9 jump,
// F fullscreen, H hide the controls, Esc exit. P starts presenting the open card.
// Touch: swipe left / right. Link: #present/<card id>/<slide number>.
(function () {
  "use strict";

  const VISUAL = 'svg.map, .split, [data-slide="visual"]';
  const stacked = window.matchMedia("(max-width: 820px), (orientation: portrait) and (max-width: 1100px)");
  const typing = (el) => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  const canFullscreen = !!(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen);
  const fullscreenElement = () => document.fullscreenElement || document.webkitFullscreenElement;

  const ICONS = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',
    expand:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',
    shrink:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>',
  };

  let deck = null; // the open presentation, or null

  const presentable = (q) => !!q.querySelector(":scope > .q-body > section.scene");

  // ---------- "Present" button on each card that has steps ----------
  document.querySelectorAll(".question").forEach((q) => {
    if (!presentable(q)) return;
    const body = q.querySelector(".q-body");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "present-launch";
    btn.title = "Present the steps as full-screen slides (P)";
    btn.innerHTML = `${ICONS.play}<span>Present</span>`;
    btn.addEventListener("click", () => open(q, 0));
    const jump = body.querySelector(":scope > .q-jump");
    if (jump) jump.after(btn);
    else body.prepend(btn);
    q.presentButton = btn;
  });

  // ---------- Open: build the slides from the card ----------
  function open(q, start) {
    if (deck) return;
    const body = q.querySelector(".q-body");
    const title = (q.querySelector(".q-title") || {}).textContent || "Presentation";
    const undo = []; // run in reverse on close

    // Move a node somewhere else and remember where it came from.
    const move = (node, parent) => {
      const mark = document.createComment("present");
      node.before(mark);
      parent.append(node);
      undo.push(() => mark.replaceWith(node));
    };

    const root = document.createElement("div");
    root.className = "present";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", `Presenting: ${title.trim()}`);
    root.innerHTML = `
      <div class="present-top">
        <span class="present-name"></span>
        <span class="present-count" aria-hidden="true"></span>
        <button type="button" class="present-btn present-theme"></button>
        <button type="button" class="present-btn present-full" title="Fullscreen (F)" aria-label="Enter fullscreen">${ICONS.expand}</button>
        <button type="button" class="present-btn present-exit" title="Exit (Esc)" aria-label="Exit presentation">${ICONS.close}</button>
      </div>
      <div class="present-progress" aria-hidden="true"><span></span></div>
      <div class="present-stage"></div>
      <div class="present-bottom">
        <button type="button" class="present-step present-prev" aria-label="Previous slide">← Prev</button>
        <div class="present-dots" role="group" aria-label="Slides"></div>
        <button type="button" class="present-step present-next" aria-label="Next slide">Next →</button>
      </div>
      <p class="visually-hidden present-live" aria-live="polite"></p>`;
    root.querySelector(".present-name").textContent = title.trim();
    const stage = root.querySelector(".present-stage");
    // Card styles are scoped to the card body's class (e.g. .uber-design), so the stage carries it too.
    body.classList.forEach((c) => c !== "q-body" && stage.classList.add(c));

    const slides = [];
    const addSlide = (label, kind) => {
      const el = document.createElement("div");
      el.className = `slide slide-${kind}`;
      el.tabIndex = -1;
      el.setAttribute("role", "group");
      el.setAttribute("aria-roledescription", "slide");
      stage.append(el);
      slides.push({ el, label });
      if (kind === "scene") return el;
      const inner = document.createElement("div");
      inner.className = "slide-inner";
      el.append(inner);
      return inner;
    };
    const headingOf = (sec) => {
      const h2 = sec.querySelector("h2");
      if (!h2) return "";
      return [...h2.childNodes].filter((c) => c.nodeType === Node.TEXT_NODE).map((c) => c.textContent).join(" ").trim();
    };

    // 1. Title slide
    const intro = addSlide("Intro", "title");
    const h1 = document.createElement("h1");
    h1.className = "slide-heading";
    h1.textContent = title.trim();
    intro.append(h1);
    const meta = q.querySelector(".q-meta");
    if (meta) {
      const tags = meta.cloneNode(true);
      tags.className = "slide-tags";
      intro.append(tags);
    }

    // 2. Sections: before the first step -> title slide; steps -> their own
    //    two-column slide; anything after -> a plain slide each.
    let seenScene = false;
    body.querySelectorAll(":scope > section").forEach((sec) => {
      if (sec.classList.contains("scene")) {
        seenScene = true;
        const slide = addSlide(sec.dataset.jump || headingOf(sec), "scene");
        const kids = [...sec.children];
        const text = document.createElement("div");
        text.className = "slide-text";
        const visual = document.createElement("div");
        visual.className = "slide-visual";
        kids.forEach((k) => (k.matches(VISUAL) ? visual : text).append(k));
        sec.append(text);
        if (visual.children.length) sec.append(visual);
        else slide.classList.add("no-visual");
        move(sec, slide);
        undo.push(() => {
          sec.append(...kids);
          text.remove();
          visual.remove();
        });
      } else if (!seenScene) {
        move(sec, intro);
      } else {
        move(sec, addSlide(headingOf(sec) || "Notes", "plain"));
      }
    });

    const hint = document.createElement("p");
    hint.className = "slide-hint";
    hint.textContent = "→ or swipe to start · F fullscreen · H hide controls · Esc exit";
    intro.append(hint);

    // 3. Recap: the key idea
    const keyIdea = body.querySelector(":scope > .key-idea");
    if (keyIdea) {
      const recap = addSlide("Recap", "recap");
      const h2 = document.createElement("h2");
      h2.className = "slide-heading";
      h2.textContent = "Recap";
      recap.append(h2);
      move(keyIdea, recap);
    }

    // Dots
    const dots = root.querySelector(".present-dots");
    slides.forEach((s, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "present-dot";
      dot.title = `${i + 1}. ${s.label}`;
      dot.setAttribute("aria-label", `Slide ${i + 1}: ${s.label}`);
      dot.addEventListener("click", () => show(i));
      dots.append(dot);
      s.dot = dot;
    });

    // Everything behind the presentation is out of reach while it's open.
    const savedScroll = window.scrollY;
    [...document.body.children].forEach((el) => {
      if (!el.inert) {
        el.inert = true;
        undo.push(() => (el.inert = false));
      }
    });
    document.body.append(root);
    document.documentElement.classList.add("is-presenting");

    deck = { q, root, stage, slides, index: -1, undo, savedScroll };

    root.querySelector(".present-prev").addEventListener("click", () => go(-1));
    root.querySelector(".present-next").addEventListener("click", () => go(1));
    root.querySelector(".present-exit").addEventListener("click", close);
    setupTheme(root.querySelector(".present-theme"));
    setupFullscreen(root.querySelector(".present-full"));
    setupSwipe(root, stage);

    show(Math.max(0, Math.min(start, slides.length - 1)));
    slides[deck.index].el.focus({ preventScroll: true });
  }

  // ---------- Close: put everything back ----------
  function close() {
    if (!deck) return;
    const { q, root, undo, savedScroll } = deck;
    deck = null;
    if (fullscreenElement()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    document.documentElement.classList.remove("is-presenting");
    undo.reverse().forEach((fn) => fn());
    root.remove();
    window.removeEventListener("resize", fit);
    window.scrollTo(0, savedScroll);
    history.replaceState(null, "", location.pathname + location.search + "#" + q.id);
    if (q.presentButton) q.presentButton.focus({ preventScroll: true });
  }

  // ---------- Moving between slides ----------
  function go(step) {
    if (deck) show(deck.index + step);
  }

  function show(i) {
    if (!deck) return;
    const { slides, root, stage } = deck;
    i = Math.max(0, Math.min(i, slides.length - 1));
    if (i === deck.index) return;
    const old = slides[deck.index];
    const hadFocus = !old || old.el.contains(document.activeElement) || document.activeElement === document.body;
    stage.dataset.dir = i > deck.index ? "next" : "prev";
    deck.index = i;

    slides.forEach((s, k) => {
      const on = k === i;
      s.el.classList.toggle("is-current", on);
      s.el.setAttribute("aria-label", `${k + 1} of ${slides.length}: ${s.label}`);
      if (on) s.dot.setAttribute("aria-current", "step");
      else s.dot.removeAttribute("aria-current");
    });
    const s = slides[i];
    root.querySelector(".present-count").textContent = `${i + 1} / ${slides.length} · ${s.label}`;
    root.querySelector(".present-progress span").style.width = `${((i + 1) / slides.length) * 100}%`;
    root.querySelector(".present-prev").disabled = i === 0;
    root.querySelector(".present-next").disabled = i === slides.length - 1;
    root.querySelector(".present-live").textContent = `Slide ${i + 1} of ${slides.length}: ${s.label}`;
    history.replaceState(null, "", `${location.pathname}${location.search}#present/${deck.q.id}/${i + 1}`);

    if (hadFocus) s.el.focus({ preventScroll: true });
    s.el.scrollTop = 0;
    fit();
  }

  // Size each step's map to the space it has: as wide as the column allows,
  // but never taller than what's left after the other visual items.
  function fit() {
    if (!deck) return;
    const slide = deck.slides[deck.index].el;
    const col = slide.querySelector(".slide-visual");
    if (!col) return;
    const maps = [...col.children].filter((c) => c.matches("svg.map"));
    maps.forEach((m) => (m.style.width = ""));
    if (stacked.matches || !maps.length) return;
    const gap = parseFloat(getComputedStyle(col).rowGap) || 0;
    let used = gap * (col.children.length - 1);
    [...col.children].forEach((c) => {
      if (!maps.includes(c)) used += c.getBoundingClientRect().height;
    });
    const free = (col.clientHeight - used) / maps.length;
    maps.forEach((m) => {
      const vb = m.viewBox.baseVal;
      const ratio = vb && vb.height ? vb.width / vb.height : 16 / 9;
      m.style.width = `${Math.max(200, Math.min(col.clientWidth, free * ratio))}px`;
    });
  }
  window.addEventListener("resize", () => deck && fit());
  stacked.addEventListener("change", () => deck && fit());

  // ---------- Controls ----------
  function setupTheme(btn) {
    const sync = () => {
      const dark = document.documentElement.dataset.theme === "dark";
      btn.textContent = dark ? "☀" : "☾";
      const label = dark ? "Switch to light mode" : "Switch to dark mode";
      btn.setAttribute("aria-label", label);
      btn.title = label;
    };
    // The page's own toggle saves the choice and keeps its icon in step.
    btn.addEventListener("click", () => {
      const pageToggle = document.getElementById("theme-toggle");
      if (pageToggle) pageToggle.click();
      sync();
    });
    sync();
  }

  function setupFullscreen(btn) {
    if (!canFullscreen) {
      btn.hidden = true;
      return;
    }
    btn.addEventListener("click", toggleFullscreen);
    const sync = () => {
      const on = !!fullscreenElement();
      btn.innerHTML = on ? ICONS.shrink : ICONS.expand;
      btn.setAttribute("aria-label", on ? "Exit fullscreen" : "Enter fullscreen");
      // Leaving fullscreen changes the size; refit after the browser settles.
      requestAnimationFrame(fit);
    };
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
  }

  function toggleFullscreen() {
    if (!canFullscreen) return;
    if (fullscreenElement()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    else {
      const el = document.documentElement;
      const req = el.requestFullscreen || el.webkitRequestFullscreen;
      const p = req.call(el);
      if (p && p.catch) p.catch(() => {});
    }
  }

  function toggleChrome() {
    if (!deck) return;
    deck.root.classList.toggle("is-clean");
    requestAnimationFrame(fit);
  }

  // Touch swipes and sideways trackpad scrolls.
  function setupSwipe(root, stage) {
    let start = null;
    let swipedAt = -Infinity;
    stage.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" || e.target.closest("input, select, textarea")) return;
      start = { x: e.clientX, y: e.clientY, id: e.pointerId };
    });
    stage.addEventListener("pointerup", (e) => {
      if (!start || e.pointerId !== start.id) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      start = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > 1.5 * Math.abs(dy)) {
        swipedAt = performance.now();
        go(dx < 0 ? 1 : -1);
      }
    });
    stage.addEventListener("pointercancel", () => (start = null));
    // A swipe that ends on a map shouldn't also count as a tap on it.
    stage.addEventListener(
      "click",
      (e) => {
        if (performance.now() - swipedAt < 500) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      true
    );

    let sum = 0;
    let lockedUntil = 0;
    root.addEventListener(
      "wheel",
      (e) => {
        if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
        const wide = e.target.closest(".table-wrap");
        if (wide && wide.scrollWidth > wide.clientWidth) return; // let wide tables scroll
        e.preventDefault();
        if (performance.now() < lockedUntil) return;
        sum += e.deltaX;
        if (Math.abs(sum) > 60) {
          go(sum > 0 ? 1 : -1);
          sum = 0;
          lockedUntil = performance.now() + 700;
        }
      },
      { passive: false }
    );
  }

  // ---------- Keyboard (runs before the page's own shortcuts) ----------
  window.addEventListener(
    "keydown",
    (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!deck) {
        if ((e.key === "p" || e.key === "P") && !typing(e.target)) {
          const q = [...document.querySelectorAll(".question[open]")].find((x) => x.presentButton);
          if (q) {
            e.preventDefault();
            open(q, 0);
          }
        }
        return;
      }
      // Fields keep their own keys, and the page's shortcuts (/, R) stay off.
      if (typing(e.target) && e.key !== "Escape") {
        e.stopImmediatePropagation();
        return;
      }
      const k = e.key;
      const onControl = e.target.closest && e.target.closest("button, a, label, summary");
      let handled = true;
      if (k === "Escape") close();
      else if (k === "ArrowRight" || k === "PageDown" || (k === " " && !onControl && !e.shiftKey)) go(1);
      else if (k === "ArrowLeft" || k === "PageUp" || (k === " " && !onControl && e.shiftKey)) go(-1);
      else if (k === "Home") show(0);
      else if (k === "End") show(deck.slides.length - 1);
      else if (k === "f" || k === "F") toggleFullscreen();
      else if (k === "h" || k === "H") toggleChrome();
      else if (/^[1-9]$/.test(k)) show(Number(k) - 1);
      else handled = k === "/" || k === "r" || k === "R";
      if (handled) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    },
    true
  );

  // ---------- Links: #present/<card id>/<slide> ----------
  function openFromHash() {
    const m = location.hash.match(/^#present\/([^/]+)\/(\d+)$/);
    if (!m || deck) return;
    const q = document.getElementById(decodeURIComponent(m[1]));
    if (!q || !q.presentButton) return;
    const start = Number(m[2]) - 1;
    if (q.open) open(q, start);
    else {
      // Wait for the page's own "card opened" handling, which also sets the address.
      q.addEventListener("toggle", () => open(q, start), { once: true });
      q.open = true;
    }
  }
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
