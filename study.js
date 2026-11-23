// Revision Cards tab: a stacked study deck.
// Pick a course, then work through its cards one at a time. Swipe right (or press →) for
// "Got it", swipe left (or press ←) for "Again": that card comes back a few cards later.
// "Shuffle sections" is optional. It shuffles the order of the sections (topics) of a
// course; the cards inside a section stay in their original order, so a topic that
// needs three cards still reads 1, 2, 3.
// Progress is kept per course in localStorage. The cards themselves are the same
// <details class="question"> elements the Browse view uses; the deck shows copies of them.
(function studyDeck() {
  if (document.body.dataset.page !== "cards") return;
  const list = document.getElementById("question-list");
  const groupEls = [...list.querySelectorAll(":scope > .pattern-group")];
  if (!groupEls.length) return;

  const STORE_KEY = "revision-study-v1";
  const AGAIN_MIN = 5; // an "Again" card comes back this many cards later, at the earliest
  const AGAIN_MAX = 12; // ... and at the latest
  const SWIPE_PX = 110;
  const phone = window.matchMedia("(max-width: 600px)");

  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  };
  const rand = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
  function shuffled(items) {
    const a = items.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = rand(0, i);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ---------- the courses and their cards ----------
  const courses = groupEls.map((g) => {
    const cards = [...g.querySelectorAll(".question")].map((q) => ({
      id: q.id,
      sec: q.dataset.sec || q.id,
      el: q,
      title: q.querySelector(".q-title").textContent.trim(),
    }));
    return {
      id: g.id.replace(/^g-/, ""),
      name: g.querySelector(".g-name").textContent.trim(),
      hint: g.querySelector(".g-hint").textContent.trim(),
      cards,
      byId: new Map(cards.map((c) => [c.id, c])),
    };
  });

  // ---------- saved progress ----------
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}") || {};
  } catch (e) {
    saved = {};
  }
  function persist() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(saved));
    } catch (e) {
      /* storage unavailable: progress lasts for this visit only */
    }
  }
  // Progress of one course: { shuffle, pile: [card ids left, top first], got: {id: 1}, tricky: {id: 1}, hist: [...] }
  function stateOf(course) {
    let st = saved[course.id];
    const known = new Set(course.cards.map((c) => c.id));
    if (!st || !Array.isArray(st.pile)) {
      st = saved[course.id] = { shuffle: false, pile: [], got: {}, tricky: {}, hist: [], started: false };
      st.pile = orderIds(course, course.cards.map((c) => c.id), false);
      persist();
    }
    // The notes may have changed since the progress was saved: drop cards that are gone, add new ones.
    st.pile = st.pile.filter((id) => known.has(id));
    Object.keys(st.got).forEach((id) => !known.has(id) && delete st.got[id]);
    Object.keys(st.tricky).forEach((id) => !known.has(id) && delete st.tricky[id]);
    const seen = new Set([...st.pile, ...Object.keys(st.got)]);
    const fresh = course.cards.map((c) => c.id).filter((id) => !seen.has(id));
    if (fresh.length) st.pile.push(...fresh);
    return st;
  }

  // ---------- ordering ----------
  // Cards in their original order; with shuffle on, whole sections are shuffled and each
  // section keeps its own order. `firstSec` (optional) is the section to keep on top.
  function orderIds(course, ids, shuffle, firstSec) {
    const want = new Set(ids);
    const sections = [];
    const index = new Map();
    course.cards.forEach((c) => {
      if (!want.has(c.id)) return;
      if (!index.has(c.sec)) {
        index.set(c.sec, sections.length);
        sections.push({ sec: c.sec, ids: [] });
      }
      sections[index.get(c.sec)].ids.push(c.id);
    });
    let order = sections;
    if (shuffle) {
      const top = sections.find((s) => s.sec === firstSec);
      const rest = shuffled(sections.filter((s) => s !== top));
      order = top ? [top, ...rest] : rest;
    }
    return order.flatMap((s) => s.ids);
  }

  // ---------- actions on the top card ----------
  function act(course, kind) {
    const st = stateOf(course);
    if (!st.pile.length) return;
    const id = st.pile[0];
    st.started = true;
    const entry = { id, kind, wasGot: !!st.got[id], wasTricky: !!st.tricky[id], at: -1 };
    st.pile.shift();
    if (kind === "got") {
      st.got[id] = 1;
    } else {
      st.tricky[id] = 1;
      const at = Math.min(st.pile.length, rand(AGAIN_MIN, AGAIN_MAX));
      st.pile.splice(at, 0, id);
      entry.at = at;
    }
    st.hist.push(entry);
    if (st.hist.length > 30) st.hist.shift();
    persist();
  }
  function undo(course) {
    const st = stateOf(course);
    const entry = st.hist.pop();
    if (!entry) return;
    if (entry.kind === "got") {
      if (!entry.wasGot) delete st.got[entry.id];
    } else {
      const at = st.pile.indexOf(entry.id);
      if (at >= 0) st.pile.splice(at, 1);
    }
    if (!entry.wasTricky) delete st.tricky[entry.id];
    st.pile.unshift(entry.id);
    persist();
  }
  // mode: "all" starts over; "tricky" goes through only the cards that needed an "Again".
  function restart(course, mode) {
    const st = stateOf(course);
    const ids = mode === "tricky" ? Object.keys(st.tricky) : course.cards.map((c) => c.id);
    st.got = {};
    st.tricky = {};
    st.hist = [];
    st.started = false;
    if (mode === "tricky") {
      // Cards outside this pass count as done, so the progress bar still makes sense.
      course.cards.forEach((c) => !ids.includes(c.id) && (st.got[c.id] = 1));
    }
    st.pile = orderIds(course, ids, st.shuffle);
    persist();
  }
  function setShuffle(course, on) {
    const st = stateOf(course);
    st.shuffle = on;
    const current = course.byId.get(st.pile[0]);
    st.pile = orderIds(course, st.pile, on, current && current.sec);
    if (current && st.pile[0] !== current.id) {
      st.pile.splice(st.pile.indexOf(current.id), 1);
      st.pile.unshift(current.id);
    }
    persist();
  }
  const total = (course) => course.cards.length;
  const doneCount = (course) => Object.keys(stateOf(course).got).length;
  const isFinished = (course) => stateOf(course).pile.length === 0;

  // ---------- page shell: Study | Browse switch ----------
  const root = el("section", "study");
  root.setAttribute("aria-label", "Study deck");
  list.before(root);

  const modeBar = el("div", "study-modes");
  modeBar.setAttribute("role", "group");
  modeBar.setAttribute("aria-label", "View");
  const studyBtn = el("button", "study-mode", "Study");
  const browseBtn = el("button", "study-mode", "Browse");
  [studyBtn, browseBtn].forEach((b) => (b.type = "button"));
  modeBar.append(studyBtn, browseBtn);
  const subtitle = document.querySelector(".page-header .subtitle");
  (subtitle || document.querySelector(".page-header")).after(modeBar);

  function setMode(mode) {
    const study = mode === "study";
    document.body.classList.toggle("study-on", study);
    studyBtn.setAttribute("aria-pressed", String(study));
    browseBtn.setAttribute("aria-pressed", String(!study));
    root.hidden = !study;
  }
  studyBtn.addEventListener("click", () => setMode("study"));
  browseBtn.addEventListener("click", () => setMode("browse"));
  // A link to one card (#q-...) is for reading it, so open Browse; otherwise start in the deck.
  setMode(/^#q-/.test(location.hash) && !phone.matches ? "browse" : "study");

  // ---------- the course picker ----------
  let current = null; // the course being studied, or null for the picker
  const picker = el("div", "study-picker");
  const deckView = el("div", "study-deck");
  root.append(picker, deckView);

  function renderPicker() {
    picker.classList.toggle("is-phone", phone.matches);
    if (phone.matches) return renderPhonePicker();
    picker.replaceChildren();
    const intro = el("p", "study-intro");
    intro.textContent = "Pick a course. Swipe a card right when you know it, left to see it again later.";
    picker.append(intro);
    const grid = el("div", "study-grid");
    courses.forEach((course) => {
      const st = stateOf(course);
      const done = doneCount(course);
      const tile = el("div", "study-tile");
      const open = el("button", "study-tile-open");
      open.type = "button";
      const title = el("span", "study-tile-name", course.name);
      const hint = el("span", "study-tile-hint", course.hint);
      const bar = el("span", "study-bar");
      const fill = el("span", "study-bar-fill");
      fill.style.width = `${(done / total(course)) * 100}%`;
      bar.append(fill);
      let caption = `${total(course)} cards`;
      if (isFinished(course) && st.started === false && done === 0) caption = `${total(course)} cards`;
      if (done > 0 && !isFinished(course)) caption = `${done} / ${total(course)} got it`;
      if (isFinished(course) && done > 0) caption = `Pass complete · ${total(course)} cards`;
      const cap = el("span", "study-tile-cap", caption);
      open.append(title, hint, bar, cap);
      open.addEventListener("click", () => openCourse(course));
      tile.append(open);
      if (done > 0 || st.started) {
        const again = el("button", "study-tile-restart", "↺");
        again.type = "button";
        again.title = "Start this course over";
        again.setAttribute("aria-label", `Start ${course.name} over`);
        again.addEventListener("click", () => {
          restart(course, "all");
          renderPicker();
        });
        tile.append(again);
      }
      grid.append(tile);
    });
    picker.append(grid);
  }

  // ---------- phone: one big card per course, swiped sideways ----------
  let phoneIndex = 0; // which course card was showing, so Back to Courses lands on it
  function chip(text, kind) {
    return el("span", `study-chip${kind ? " is-" + kind : ""}`, text);
  }
  function phoneCourseCard(course) {
    const st = stateOf(course);
    const done = doneCount(course);
    const card = el("article", "study-course");
    card.append(el("h3", "study-course-name", course.name), el("p", "study-course-hint", course.hint));
    const chips = el("div", "study-chips");
    chips.append(chip(`${total(course)} cards`));
    if (done > 0 && st.pile.length) {
      chips.append(chip(`${st.pile.length} left`, "warn"), chip(`${done} done`, "ok"));
    } else if (done > 0) {
      chips.append(chip("Pass complete", "ok"));
    }
    const bar = el("span", "study-bar");
    const fill = el("span", "study-bar-fill");
    fill.style.width = `${(done / total(course)) * 100}%`;
    bar.append(fill);
    const titles = el("ul", "study-titles");
    course.cards.forEach((c) => {
      const li = el("li");
      const b = el("button", `study-title${st.got[c.id] ? " is-done" : ""}`);
      b.type = "button";
      b.append(el("span", "study-tick", st.got[c.id] ? "✓" : ""), el("span", "", c.title));
      b.addEventListener("click", () => openAt(course, c.id));
      li.append(b);
      titles.append(li);
    });
    const sw = el("button", "study-shuffle is-inline");
    sw.type = "button";
    sw.setAttribute("role", "switch");
    sw.setAttribute("aria-checked", String(st.shuffle));
    sw.innerHTML = '<span class="study-switch" aria-hidden="true"></span><span>Shuffle sections</span>';
    sw.addEventListener("click", () => {
      setShuffle(course, !st.shuffle);
      renderPhonePicker();
    });
    const actions = el("div", "study-course-actions");
    const started = done > 0 || st.started;
    const finished = st.pile.length === 0;
    if (started) {
      const again = el("button", "study-btn is-narrow", "↺ Restart");
      again.type = "button";
      again.addEventListener("click", () => {
        restart(course, "all");
        renderPhonePicker();
      });
      actions.append(again);
    }
    const go = el("button", "study-btn is-primary", finished ? "Study again" : started ? "Resume" : `Study ${total(course)} cards`);
    go.type = "button";
    go.addEventListener("click", () => {
      if (finished) restart(course, "all");
      openCourse(course);
    });
    actions.append(go);
    card.append(chips, bar, titles, sw, actions);
    return card;
  }
  function renderPhonePicker() {
    picker.replaceChildren();
    const heading = el("h2", "study-phone-heading", "Courses");
    const track = el("div", "study-track");
    track.tabIndex = 0;
    courses.forEach((course) => track.append(phoneCourseCard(course)));

    const dock = el("div", "study-pdock");
    const searchBtn = el("button", "study-pdock-btn", "⌕");
    searchBtn.type = "button";
    searchBtn.setAttribute("aria-label", "Search all cards");
    const mid = el("div", "study-pdock-mid");
    const prev = el("button", "study-pdock-step", "‹");
    const next = el("button", "study-pdock-step", "›");
    const counter = el("span", "study-pdock-count");
    [prev, next].forEach((b) => (b.type = "button"));
    prev.setAttribute("aria-label", "Previous course");
    next.setAttribute("aria-label", "Next course");
    mid.append(prev, counter, next);
    const rnd = el("button", "study-pdock-btn", "⤮");
    rnd.type = "button";
    rnd.setAttribute("aria-label", "Pick a random course");
    dock.append(searchBtn, mid, rnd);
    picker.append(heading, track, dock);

    const step = () => (track.children.length > 1 ? track.children[1].offsetLeft - track.children[0].offsetLeft : track.clientWidth);
    const update = () => {
      phoneIndex = Math.max(0, Math.min(courses.length - 1, Math.round(track.scrollLeft / Math.max(1, step()))));
      counter.textContent = `${phoneIndex + 1} / ${courses.length}`;
      prev.disabled = phoneIndex === 0;
      next.disabled = phoneIndex === courses.length - 1;
    };
    const jump = (i, smooth) => track.scrollTo({ left: i * step(), behavior: smooth ? "smooth" : "auto" });
    let frame = 0;
    track.addEventListener(
      "scroll",
      () => {
        if (!frame) frame = requestAnimationFrame(() => ((frame = 0), update()));
      },
      { passive: true }
    );
    prev.addEventListener("click", () => jump(phoneIndex - 1, true));
    next.addEventListener("click", () => jump(phoneIndex + 1, true));
    rnd.addEventListener("click", () => jump(rand(0, courses.length - 1), true));
    searchBtn.addEventListener("click", openSearch);
    requestAnimationFrame(() => {
      jump(phoneIndex, false);
      update();
    });
  }

  // Search every card of every course; tapping a result opens the deck at that card.
  let searchIndex = null;
  function openSearch() {
    if (!searchIndex) {
      searchIndex = courses.flatMap((course) =>
        course.cards.map((card) => ({ course, card, text: `${card.title} ${course.name} ${card.el.textContent}`.toLowerCase() }))
      );
    }
    const sheet = el("div", "study-sheet");
    const bar = el("div", "study-sheet-bar");
    const input = el("input", "study-sheet-input");
    input.type = "search";
    input.placeholder = "Search all cards…";
    input.autocomplete = "off";
    const close = el("button", "study-sheet-close", "Close");
    close.type = "button";
    bar.append(input, close);
    const results = el("ul", "study-results");
    sheet.append(bar, results);
    document.body.append(sheet);
    document.body.classList.add("study-sheet-open");
    const shut = () => {
      sheet.remove();
      document.body.classList.remove("study-sheet-open");
    };
    close.addEventListener("click", shut);
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      results.replaceChildren();
      if (q.length < 2) return;
      const hits = searchIndex.filter((x) => x.text.includes(q)).slice(0, 60);
      if (!hits.length) results.append(el("li", "study-no-results", "No cards match."));
      hits.forEach(({ course, card }) => {
        const li = el("li");
        const b = el("button", "study-result");
        b.type = "button";
        b.append(el("span", "study-result-title", card.title), el("span", "study-result-course", course.name));
        b.addEventListener("click", () => {
          shut();
          openAt(course, card.id);
        });
        li.append(b);
        results.append(li);
      });
    });
    input.focus();
  }

  // Open a course with one chosen card on top. A card you ticked earlier is un-ticked, so it is back in the pile.
  function openAt(course, id) {
    const st = stateOf(course);
    delete st.got[id];
    st.pile = st.pile.filter((x) => x !== id);
    st.pile.unshift(id);
    persist();
    openCourse(course);
  }
  const syncPhoneClass = () => document.body.classList.toggle("study-phone-deck", phone.matches && !!current);

  // ---------- the deck ----------
  function openCourse(course) {
    current = course;
    syncPhoneClass();
    document.body.classList.add("study-deck-open");
    picker.hidden = true;
    deckView.hidden = false;
    renderDeck();
    window.scrollTo({ top: 0 });
  }
  function closeCourse() {
    current = null;
    syncPhoneClass();
    document.body.classList.remove("study-deck-open");
    deckView.hidden = true;
    picker.hidden = false;
    renderPicker();
  }

  function cardContent(card) {
    const wrap = el("div", "study-card-body");
    const src = card.el.querySelector(".rev-sec");
    if (!src) return wrap;
    const copy = src.cloneNode(true);
    copy.querySelector(".rev-nav")?.remove();
    copy.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"));
    copy.querySelectorAll("[aria-controls], [aria-labelledby]").forEach((n) => {
      n.removeAttribute("aria-controls");
      n.removeAttribute("aria-labelledby");
    });
    wrap.append(copy);
    return wrap;
  }

  function renderDeck() {
    const course = current;
    if (!course) return;
    const st = stateOf(course);
    deckView.replaceChildren();

    // header: back, name, shuffle switch
    const head = el("div", "study-head");
    const back = el("button", "study-back", "← Courses");
    back.type = "button";
    back.addEventListener("click", closeCourse);
    const name = el("h2", "study-name", course.name);
    const sw = el("button", "study-shuffle");
    sw.type = "button";
    sw.setAttribute("role", "switch");
    sw.setAttribute("aria-checked", String(st.shuffle));
    sw.title = "Shuffle the order of the sections. Cards inside a section stay in order.";
    sw.innerHTML = '<span class="study-switch" aria-hidden="true"></span><span>Shuffle sections</span>';
    sw.addEventListener("click", () => {
      setShuffle(course, !st.shuffle);
      renderDeck();
    });
    head.append(back, name, sw);

    // progress
    const done = doneCount(course);
    const prog = el("div", "study-progress");
    const bar = el("span", "study-bar");
    const fill = el("span", "study-bar-fill");
    fill.style.width = `${(done / total(course)) * 100}%`;
    bar.append(fill);
    const left = st.pile.length;
    const stat = el("span", "study-stat", `${done} got it · ${left} left`);
    prog.append(bar, stat);
    deckView.append(head, prog);

    if (!st.pile.length) {
      deckView.append(endScreen(course, st));
      return;
    }

    // the stack: the top card, with two more peeking out underneath
    const stack = el("div", "study-stack");
    if (st.pile.length > 2) stack.append(el("div", "study-ghost g2"));
    if (st.pile.length > 1) stack.append(el("div", "study-ghost g1"));
    const card = course.byId.get(st.pile[0]);
    const top = el("article", "study-card is-entering");
    const cardHead = el("div", "study-card-head");
    cardHead.append(el("span", "study-card-title", card.title));
    const mark = el("span", "study-mark");
    top.append(cardHead, cardContent(card), mark);
    stack.append(top);
    deckView.append(stack);
    if (window.DSACode) top.querySelectorAll(".code-tabs pre").forEach((pre) => window.DSACode.observe(pre));
    setTimeout(() => top.classList.remove("is-entering"), 400);
    attachSwipe(top, mark);

    // buttons
    const bar2 = el("div", "study-actions");
    const again = el("button", "study-btn is-again", "Again");
    const undoBtn = el("button", "study-btn is-undo", "Undo");
    const got = el("button", "study-btn is-got", "Got it");
    [again, undoBtn, got].forEach((b) => (b.type = "button"));
    undoBtn.disabled = !st.hist.length;
    again.addEventListener("click", () => commit(top, "again"));
    got.addEventListener("click", () => commit(top, "got"));
    undoBtn.addEventListener("click", () => {
      undo(course);
      renderDeck();
    });
    bar2.append(again, undoBtn, got);
    const keys = el("p", "study-keys", "← Again   ·   → Got it   ·   Backspace Undo   ·   S Shuffle   ·   Esc Courses");
    deckView.append(bar2, keys);
  }

  function endScreen(course, st) {
    const box = el("div", "study-end");
    box.append(el("h3", "", "Pass complete"));
    const tricky = Object.keys(st.tricky).length;
    box.append(
      el(
        "p",
        "",
        tricky
          ? `${total(course)} cards. ${tricky} of them needed an “Again” at least once.`
          : `${total(course)} cards. None needed an “Again”.`
      )
    );
    const row = el("div", "study-end-actions");
    const all = el("button", "study-btn is-got", st.shuffle ? "Restart with a new shuffle" : "Restart");
    all.type = "button";
    all.addEventListener("click", () => {
      restart(course, "all");
      renderDeck();
    });
    row.append(all);
    if (tricky) {
      const only = el("button", "study-btn", `Only the ${tricky} tricky card${tricky === 1 ? "" : "s"}`);
      only.type = "button";
      only.addEventListener("click", () => {
        restart(course, "tricky");
        renderDeck();
      });
      row.append(only);
    }
    box.append(row);
    return box;
  }

  // ---------- moving the top card away ----------
  let busy = false;
  function commit(top, kind) {
    if (busy || !current) return;
    busy = true;
    const dir = kind === "got" ? 1 : -1;
    top.classList.add("is-leaving");
    top.style.transform = `translateX(${dir * 140}%) rotate(${dir * 14}deg)`;
    top.style.opacity = "0";
    const course = current;
    setTimeout(() => {
      act(course, kind);
      busy = false;
      if (current === course) renderDeck();
    }, 220);
  }

  // Drag the card sideways. Only a mostly horizontal drag counts, and a drag that starts on a
  // code block or table is left alone, so those can still scroll sideways.
  function attachSwipe(top, mark) {
    let startX = 0;
    let startY = 0;
    let dx = 0;
    let dragging = false;
    let pointer = null;
    top.addEventListener("pointerdown", (e) => {
      if (busy || e.button > 0 || e.target.closest("pre, .table-wrap, a, button")) return;
      pointer = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      dx = 0;
      dragging = false;
    });
    top.addEventListener("pointermove", (e) => {
      if (pointer !== e.pointerId) return;
      const mx = e.clientX - startX;
      const my = e.clientY - startY;
      if (!dragging) {
        if (Math.abs(mx) < 12 || Math.abs(mx) < Math.abs(my) * 1.4) return;
        dragging = true;
        top.setPointerCapture(pointer);
        top.classList.add("is-dragging");
      }
      dx = mx;
      top.style.transform = `translateX(${dx}px) rotate(${dx / 24}deg)`;
      const strength = Math.min(1, Math.abs(dx) / SWIPE_PX);
      mark.textContent = dx > 0 ? "Got it" : "Again";
      mark.className = `study-mark ${dx > 0 ? "is-got" : "is-again"}`;
      mark.style.opacity = String(strength);
    });
    const end = (e) => {
      if (pointer !== e.pointerId) return;
      pointer = null;
      if (!dragging) return;
      dragging = false;
      top.classList.remove("is-dragging");
      if (Math.abs(dx) >= SWIPE_PX) {
        commit(top, dx > 0 ? "got" : "again");
      } else {
        top.style.transform = "";
        mark.style.opacity = "0";
      }
    };
    top.addEventListener("pointerup", end);
    top.addEventListener("pointercancel", end);
  }

  // ---------- keyboard ----------
  document.addEventListener("keydown", (e) => {
    if (!document.body.classList.contains("study-on") || !current || deckView.hidden) return;
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest("input, textarea, select")) return;
    const top = deckView.querySelector(".study-card");
    if (e.key === "ArrowRight" && top) commit(top, "got");
    else if (e.key === "ArrowLeft" && top) commit(top, "again");
    else if (e.key === "Backspace" || e.key === "u") {
      e.preventDefault();
      undo(current);
      renderDeck();
    } else if (e.key === "s" || e.key === "S") {
      setShuffle(current, !stateOf(current).shuffle);
      renderDeck();
    } else if (e.key === "Escape") closeCourse();
    else return;
    if (e.key.startsWith("Arrow")) e.preventDefault();
  });

  deckView.hidden = true;
  renderPicker();
  if (phone.matches && /^#q-/.test(location.hash)) {
    const id = decodeURIComponent(location.hash.slice(1));
    const course = courses.find((c) => c.byId.has(id));
    if (course) openAt(course, id);
  }
  // Turning the phone, or resizing the window, switches between the two layouts.
  phone.addEventListener("change", () => {
    syncPhoneClass();
    if (current) renderDeck();
    else renderPicker();
  });
})();
