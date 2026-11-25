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
  // Progress of one course: { shuffle, pile: [card ids left, top first], read: {id: 1}, got: {id: 1}, tricky: {id: 1}, hist: [...] }
  // `read` = cards you have turned over at least once (the number the progress bar shows); `got` = cards you marked Got it.
  function stateOf(course) {
    let st = saved[course.id];
    const known = new Set(course.cards.map((c) => c.id));
    if (!st || !Array.isArray(st.pile)) {
      st = saved[course.id] = { shuffle: false, pile: [], read: {}, got: {}, tricky: {}, flag: {}, hist: [], started: false };
      st.pile = orderIds(course, course.cards.map((c) => c.id), false);
      persist();
    }
    // Progress saved before `read` existed: a card you marked, either way, counts as read.
    if (!st.read) {
      st.read = { ...st.got };
      Object.keys(st.tricky).forEach((id) => (st.read[id] = 1));
    }
    if (!st.flag) st.flag = {}; // cards flagged during a marathon
    // The notes may have changed since the progress was saved: drop cards that are gone, add new ones.
    st.pile = st.pile.filter((id) => known.has(id));
    Object.keys(st.flag).forEach((id) => !known.has(id) && delete st.flag[id]);
    Object.keys(st.read).forEach((id) => !known.has(id) && delete st.read[id]);
    Object.keys(st.got).forEach((id) => !known.has(id) && delete st.got[id]);
    Object.keys(st.tricky).forEach((id) => !known.has(id) && delete st.tricky[id]);
    // A card is "new" only if it is nowhere: not waiting in the pile, not marked, not read. (A marathon reads
    // cards without marking them Got it, so "read" has to count here too.)
    const seen = new Set([...st.pile, ...Object.keys(st.got), ...Object.keys(st.read)]);
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
    const entry = { id, kind, wasGot: !!st.got[id], wasTricky: !!st.tricky[id], wasRead: !!st.read[id], at: -1 };
    st.read[id] = 1; // turning a card over, either way, counts as reading it
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
    if (!entry.wasRead) delete st.read[entry.id];
    st.pile.unshift(entry.id);
    persist();
  }
  // mode: "all" starts over; "tricky" goes through only the cards that needed an "Again".
  function restart(course, mode) {
    const st = stateOf(course);
    const ids = mode === "flag" ? Object.keys(st.flag) : mode === "tricky" ? Object.keys(st.tricky) : course.cards.map((c) => c.id);
    st.got = {};
    st.read = {};
    st.tricky = {};
    st.flag = {};
    st.hist = [];
    st.started = false;
    if (mode === "tricky" || mode === "flag") {
      // Cards outside this pass count as read, so the progress bar still makes sense.
      course.cards.forEach((c) => {
        if (!ids.includes(c.id)) st.got[c.id] = st.read[c.id] = 1;
      });
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
  const readCount = (course) => Object.keys(stateOf(course).read).length;
  // Cards you have read but that are still in the pile, because you pressed Again.
  const repeatCount = (course) => {
    const st = stateOf(course);
    return st.pile.filter((id) => st.read[id]).length;
  };
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

  // On a phone the page itself doesn't scroll in Study mode: the deck stays put, and only the
  // content inside a card (or a course's title list) scrolls.
  // With a deck open, at any screen size, the deck is sized to the screen ("study-fit") and the page
  // does not scroll at all; the card (or the course's title list) is the only thing that scrolls.
  let marathon = null; // the running marathon, or null (see the marathon section below)
  const syncScrollLock = () => {
    const html = document.documentElement.classList;
    const body = document.body.classList;
    const study = body.contains("study-on");
    html.toggle("study-lock", phone.matches && study);
    html.toggle("study-fit", study && body.contains("study-deck-open"));
  };
  function setMode(mode) {
    const study = mode === "study";
    document.body.classList.toggle("study-on", study);
    syncScrollLock();
    if (!study && marathon) pauseMarathon(); // a card must not run out while the deck is hidden
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

  // ---------- flip cards ----------
  // Questions on the front, answers on the back. The data lives in flip/<course>.js (loaded on first use);
  // flip/index.js says how many questions each course has. A flip deck is a "course" of its own, so it shares
  // the progress, shuffle, Again and Undo code with the reading deck, saved under "<course>~flip".
  let flipCounts = {};
  const loadedScripts = {};
  function loadScript(src, done) {
    if (loadedScripts[src]) return done(loadedScripts[src] === "ok");
    const tag = document.createElement("script");
    tag.src = src;
    tag.onload = () => ((loadedScripts[src] = "ok"), done(true));
    tag.onerror = () => ((loadedScripts[src] = "fail"), done(false));
    document.head.append(tag);
  }
  const flipCache = {};
  function flipCourse(course) {
    const data = (window.REV_FLIP || {})[course.id];
    if (!data) return null;
    if (!flipCache[course.id]) {
      const cards = data.map((d) => ({ id: d.id, sec: d.sec, item: d, title: d.q }));
      flipCache[course.id] = {
        id: course.id + "~flip",
        name: course.name,
        title: course.name + " · Flip",
        hint: course.hint,
        flip: true,
        cards,
        byId: new Map(cards.map((c) => [c.id, c])),
      };
    }
    return flipCache[course.id];
  }
  function openFlip(course) {
    loadScript(`flip/${course.id}.js`, () => {
      const fc = flipCourse(course);
      if (fc) openCourse(fc);
    });
  }
  const flipRead = (course) => {
    const fs = saved[course.id + "~flip"];
    return fs && fs.read ? Object.keys(fs.read).length : 0;
  };

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
      const read = readCount(course);
      const tile = el("div", "study-tile");
      const open = el("button", "study-tile-open");
      open.type = "button";
      const title = el("span", "study-tile-name", course.name);
      const hint = el("span", "study-tile-hint", course.hint);
      const bar = el("span", "study-bar");
      const fill = el("span", "study-bar-fill");
      fill.style.width = `${(read / total(course)) * 100}%`;
      bar.append(fill);
      let caption = `${total(course)} cards`;
      if (read > 0 && !isFinished(course)) caption = `${read} / ${total(course)} read`;
      if (isFinished(course) && read > 0) caption = `Pass complete · ${total(course)} cards`;
      const cap = el("span", "study-tile-cap", caption);
      open.append(title, hint, bar, cap);
      open.addEventListener("click", () => openCourse(course));
      tile.append(open);
      if (flipCounts[course.id]) {
        const fr = flipRead(course);
        const f = el("button", "study-tile-flip", `⇄ Flip · ${fr ? fr + " / " : ""}${flipCounts[course.id]}`);
        f.type = "button";
        f.title = "Flip cards: the question on the front, the answer on the back";
        f.addEventListener("click", () => openFlip(course));
        tile.append(f);
      }
      if (read > 0 || st.started) {
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
    const read = readCount(course);
    const card = el("article", "study-course");
    card.append(el("h3", "study-course-name", course.name), el("p", "study-course-hint", course.hint));
    const chips = el("div", "study-chips");
    chips.append(chip(`${total(course)} cards`));
    if (read > 0 && st.pile.length) {
      if (read < total(course)) chips.append(chip(`${read} read`, "ok"), chip(`${total(course) - read} to go`, "warn"));
      else chips.append(chip("All read", "ok"), chip(`${st.pile.length} to repeat`, "warn"));
    } else if (read > 0) {
      chips.append(chip("Pass complete", "ok"));
    }
    const bar = el("span", "study-bar");
    const fill = el("span", "study-bar-fill");
    fill.style.width = `${(read / total(course)) * 100}%`;
    bar.append(fill);
    const titles = el("ul", "study-titles");
    course.cards.forEach((c) => {
      const li = el("li");
      const b = el("button", `study-title${st.read[c.id] ? " is-done" : ""}`);
      b.type = "button";
      b.append(el("span", "study-tick", st.read[c.id] ? "✓" : ""), el("span", "", c.title));
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
    let flipRow = null;
    if (flipCounts[course.id]) {
      const fr = flipRead(course);
      flipRow = el("button", "study-btn study-flip-row", `⇄ Flip cards · ${fr ? fr + " / " : ""}${flipCounts[course.id]}`);
      flipRow.type = "button";
      flipRow.addEventListener("click", () => openFlip(course));
    }
    const actions = el("div", "study-course-actions");
    const started = read > 0 || st.started;
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
    card.append(chips, bar, titles, sw);
    if (flipRow) card.append(flipRow);
    card.append(actions);
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
    syncScrollLock();
    picker.hidden = true;
    deckView.hidden = false;
    renderDeck();
    window.scrollTo({ top: 0 });
  }
  function closeCourse() {
    current = null;
    syncPhoneClass();
    document.body.classList.remove("study-deck-open");
    syncScrollLock();
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
    const back = el("button", "study-back");
    back.type = "button";
    back.setAttribute("aria-label", "Back to courses");
    back.innerHTML = '← <span class="study-back-text">Courses</span>';
    back.addEventListener("click", closeCourse);
    const name = el("h2", "study-name", course.title || course.name);
    const sw = el("button", "study-shuffle");
    sw.type = "button";
    sw.setAttribute("role", "switch");
    sw.setAttribute("aria-checked", String(st.shuffle));
    sw.title = "Shuffle the order of the sections. Cards inside a section stay in order.";
    sw.innerHTML = '<span class="study-switch" aria-hidden="true"></span><span>Shuffle<span class="study-sections"> sections</span></span>';
    sw.addEventListener("click", () => {
      setShuffle(course, !st.shuffle);
      renderDeck();
    });
    if (!course.flip && st.pile.length) {
      const mar = el("button", "study-marathon");
      mar.type = "button";
      mar.title = "Marathon: one timer per card. No going back, no skipping ahead.";
      mar.setAttribute("aria-label", "Start a marathon");
      mar.innerHTML = '<span aria-hidden="true">▶</span><span class="study-marathon-text"> Marathon</span>';
      mar.addEventListener("click", () => marathonStart(course));
      head.append(back, name, mar, sw);
    } else {
      head.append(back, name, sw);
    }

    // progress
    const read = readCount(course);
    const prog = el("div", "study-progress");
    const bar = el("span", "study-bar");
    const fill = el("span", "study-bar-fill");
    fill.style.width = `${(read / total(course)) * 100}%`;
    bar.append(fill);
    const repeat = repeatCount(course);
    const stat = el("span", "study-stat", `${read} / ${total(course)} ${course.flip ? "reviewed" : "read"}${repeat ? ` · ${repeat} to repeat` : ""}`);
    prog.append(bar, stat);
    deckView.append(head, prog);

    if (!st.pile.length) {
      deckView.append(endScreen(course, st));
      return;
    }

    // the stack: the top card, with two more peeking out underneath
    const stack = el("div", "study-stack");
    if (course.flip) stack.classList.add("is-flip");
    if (st.pile.length > 2) stack.append(el("div", "study-ghost g2"));
    if (st.pile.length > 1) stack.append(el("div", "study-ghost g1"));
    const card = course.byId.get(st.pile[0]);
    const top = el("article", "study-card is-entering");
    const cardHead = el("div", "study-card-head");
    const headTitle = el("span", "study-card-title", course.flip ? "Question" : card.title);
    cardHead.append(headTitle);
    const mark = el("span", "study-mark");
    let body;
    if (course.flip) {
      top.classList.add("is-flip");
      body = el("div", "study-card-body flip-front");
      body.append(flipFront(card.item));
    } else {
      body = cardContent(card);
    }
    top.append(cardHead, body, mark);
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
    if (course.flip) {
      // Show the question first. Tap the card (or press Space) to turn it over; then Again / Got it appear.
      const show = el("button", "study-btn is-show", "Show answer");
      show.type = "button";
      bar2.append(undoBtn, show);
      const turn = () => {
        if (top.classList.contains("is-back") || top.classList.contains("is-turning")) return;
        top.classList.add("is-turning");
        setTimeout(() => {
          headTitle.textContent = "Answer";
          body.className = "study-card-body flip-back";
          body.replaceChildren(flipBack(card.item));
          top.scrollTop = 0;
          top.classList.remove("is-turning");
          top.classList.add("is-back");
          bar2.replaceChildren(again, undoBtn, got);
          if (window.DSACode) top.querySelectorAll(".code-tabs pre").forEach((pre) => window.DSACode.observe(pre));
        }, 140);
      };
      top._turn = turn;
      show.addEventListener("click", turn);
      top.addEventListener("click", (e) => {
        if (top._dragged) return void (top._dragged = false);
        if (e.target.closest("a, button, pre, .table-wrap")) return;
        turn();
      });
    } else {
      bar2.append(again, undoBtn, got);
    }
    const keys = el(
      "p",
      "study-keys",
      course.flip
        ? "Space Show answer   ·   ← Again   ·   → Got it   ·   Backspace Undo   ·   S Shuffle   ·   Esc Courses"
        : "← Again   ·   → Got it   ·   Backspace Undo   ·   S Shuffle   ·   Esc Courses"
    );
    deckView.append(bar2, keys);
  }

  // The two faces of a flip card.
  function flipFront(item) {
    const wrap = el("div", "flip-face");
    const q = el("p", "flip-q");
    q.innerHTML = item.q;
    wrap.append(q);
    return wrap;
  }
  function flipBack(item) {
    const wrap = el("div", "flip-face");
    const q = el("p", "flip-q is-small");
    q.innerHTML = item.q;
    const a = el("div", "flip-a");
    a.innerHTML = item.a;
    wrap.append(q, a);
    return wrap;
  }

  function endScreen(course, st) {
    const box = el("div", "study-end");
    box.append(el("h3", "", "Pass complete"));
    const unit = course.flip ? "questions" : "cards";
    const tricky = Object.keys(st.tricky).length;
    box.append(
      el(
        "p",
        "",
        tricky
          ? `${total(course)} ${unit}. ${tricky} of them needed an “Again” at least once.`
          : `${total(course)} ${unit}. None needed an “Again”.`
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
      const only = el("button", "study-btn", `Only the ${tricky} tricky ${course.flip ? "question" : "card"}${tricky === 1 ? "" : "s"}`);
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

  // ---------- marathon (reading decks only) ----------
  // One timer per card, and its length depends on how much the card has to read. When it runs out, the
  // next card appears. There is no way back and no way ahead; Pause, Flag and Stop are the only controls.
  // Every card that is shown counts as read. Cards you flag can be studied again afterwards.
  const PACE_KEY = "revision-marathon-pace";
  const PACES = [
    { id: "relaxed", label: "Relaxed", factor: 1.5 },
    { id: "normal", label: "Normal", factor: 1 },
    { id: "fast", label: "Fast", factor: 0.75 },
  ];
  const paceOf = (id) => PACES.find((p) => p.id === id) || PACES[1];
  function savedPace() {
    try {
      const v = localStorage.getItem(PACE_KEY);
      if (PACES.some((p) => p.id === v)) return v;
    } catch (e) {
      /* storage unavailable */
    }
    return "normal";
  }
  const secondsCache = new Map();
  // Normal pace: 5 s plus about 1 s for every 4.5 words (a code line counts as 3.5 words), kept between 15 and 90 s.
  function cardSeconds(card) {
    if (secondsCache.has(card.id)) return secondsCache.get(card.id);
    let secs = 15;
    const src = card.el.querySelector(".rev-sec");
    if (src) {
      const copy = src.cloneNode(true);
      copy.querySelectorAll(".rev-crumb, .rev-nav").forEach((n) => n.remove());
      let lines = 0;
      copy.querySelectorAll(".code-tabs").forEach((tabs) => {
        const pre = tabs.querySelector("pre");
        if (pre) lines += pre.textContent.split("\n").length;
        tabs.remove();
      });
      const words = (copy.textContent.match(/\S+/g) || []).length;
      secs = Math.min(90, Math.max(15, 5 + (words + 3.5 * lines) / 4.5));
    }
    secondsCache.set(card.id, secs);
    return secs;
  }
  const pileSeconds = (course) => stateOf(course).pile.reduce((sum, id) => sum + cardSeconds(course.byId.get(id)), 0);
  const fmtMinutes = (min) => {
    const m = Math.max(1, Math.round(min));
    return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${m % 60} min`;
  };
  const clockText = (ms) => {
    const s = Math.max(0, Math.ceil(ms / 1000));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  // The screen before the run: how long it will take at each pace.
  function marathonStart(course) {
    const st = stateOf(course);
    deckView.replaceChildren();
    const box = el("div", "study-end mar-start");
    box.append(el("h3", "", "Marathon"));
    box.append(
      el(
        "p",
        "",
        `${course.name}: ${st.pile.length} cards to go${st.shuffle ? " (sections shuffled)" : ""}. Every card gets its own time, based on how much there is to read. When the time is up the next card appears. You cannot go back and you cannot skip ahead.`
      )
    );
    let pace = savedPace();
    const base = pileSeconds(course);
    const paces = el("div", "mar-paces");
    paces.setAttribute("role", "radiogroup");
    paces.setAttribute("aria-label", "Pace");
    const estimate = el("p", "mar-estimate");
    const buttons = PACES.map((p) => {
      const b = el("button", "mar-pace", p.label);
      b.type = "button";
      b.setAttribute("role", "radio");
      b.dataset.pace = p.id;
      b.addEventListener("click", () => {
        pace = p.id;
        draw();
      });
      paces.append(b);
      return b;
    });
    function draw() {
      const f = paceOf(pace).factor;
      buttons.forEach((b) => b.setAttribute("aria-checked", String(b.dataset.pace === pace)));
      estimate.textContent = `About ${fmtMinutes((base * f) / 60)} in total. A card gets between ${Math.round(15 * f)} and ${Math.round(90 * f)} seconds.`;
    }
    draw();
    const row = el("div", "study-end-actions");
    const go = el("button", "study-btn is-got", "Start");
    go.type = "button";
    go.addEventListener("click", () => startMarathon(course, pace));
    const cancel = el("button", "study-btn", "Cancel");
    cancel.type = "button";
    cancel.addEventListener("click", () => renderDeck());
    row.append(go, cancel);
    box.append(paces, estimate, row);
    deckView.append(box);
  }

  function startMarathon(course, paceId) {
    try {
      localStorage.setItem(PACE_KEY, paceId);
    } catch (e) {
      /* ignore */
    }
    if (!stateOf(course).pile.length) return renderDeck();
    marathon = {
      course,
      factor: paceOf(paceId).factor,
      running: false,
      remaining: 0,
      total: 0,
      last: 0,
      activeMs: 0,
      done: 0,
      wake: null,
      refs: {},
      timer: setInterval(tick, 200),
    };
    document.body.classList.add("study-marathon-on");
    nextMarathonCard();
    requestWake();
  }
  function nextMarathonCard() {
    const m = marathon;
    const st = stateOf(m.course);
    m.total = m.remaining = cardSeconds(m.course.byId.get(st.pile[0])) * 1000 * m.factor;
    m.last = performance.now();
    m.running = true;
    renderMarathon();
  }
  // The clock decides, not the number of ticks, so a busy or slowed-down page cannot stretch a card.
  function tick() {
    const m = marathon;
    if (!m || !m.running) return;
    const t = performance.now();
    const dt = t - m.last;
    m.last = t;
    m.remaining -= dt;
    m.activeMs += dt;
    if (m.remaining <= 0) return finishMarathonCard();
    paintMarathonTimer();
  }
  function finishMarathonCard() {
    const m = marathon;
    const st = stateOf(m.course);
    const id = st.pile.shift();
    st.read[id] = 1;
    st.started = true;
    persist();
    m.done += 1;
    if (!st.pile.length) return endMarathon(true);
    nextMarathonCard();
  }
  function pauseMarathon() {
    const m = marathon;
    if (!m || !m.running) return;
    tick(); // count the time up to now
    if (!marathon || !marathon.running) return;
    m.running = false;
    paintPause();
  }
  function resumeMarathon() {
    const m = marathon;
    if (!m || m.running) return;
    m.last = performance.now();
    m.running = true;
    requestWake();
    paintPause();
  }
  const pauseOrResume = () => {
    if (marathon) (marathon.running ? pauseMarathon : resumeMarathon)();
  };
  function toggleFlag() {
    const m = marathon;
    if (!m) return;
    const st = stateOf(m.course);
    const id = st.pile[0];
    if (st.flag[id]) delete st.flag[id];
    else st.flag[id] = 1;
    persist();
    paintFlag();
  }
  function paintMarathonTimer() {
    const m = marathon;
    const r = m && m.refs;
    if (!r || !r.fill) return;
    r.fill.style.width = `${Math.max(0, (m.remaining / m.total) * 100)}%`;
    r.secs.textContent = clockText(m.remaining);
    r.timer.classList.toggle("is-low", m.remaining <= 3000);
  }
  function paintPause() {
    const m = marathon;
    const r = m && m.refs;
    if (!r || !r.top) return;
    r.top.classList.toggle("is-paused", !m.running);
    r.pause.textContent = m.running ? "Pause" : "Resume";
    if (!m.running) r.top.scrollTop = 0;
  }
  function paintFlag() {
    const m = marathon;
    const r = m && m.refs;
    if (!r || !r.flag) return;
    const st = stateOf(m.course);
    const on = !!st.flag[st.pile[0]];
    r.flag.classList.toggle("is-on", on);
    r.flag.textContent = on ? "Flagged" : "Flag";
    r.flag.setAttribute("aria-pressed", String(on));
  }
  async function requestWake() {
    const m = marathon;
    try {
      if (m && !m.wake && "wakeLock" in navigator) {
        m.wake = await navigator.wakeLock.request("screen");
        m.wake.addEventListener("release", () => {
          m.wake = null;
        });
      }
    } catch (e) {
      /* not available here: the screen may dim */
    }
  }
  // A hidden tab pauses the run, so a card cannot run out unseen. You resume it yourself.
  document.addEventListener("visibilitychange", () => {
    if (marathon && document.hidden) pauseMarathon();
  });

  function renderMarathon() {
    const m = marathon;
    const course = m.course;
    const st = stateOf(course);
    deckView.replaceChildren();
    const head = el("div", "study-head mar-head");
    head.append(el("h2", "study-name", `${course.name} · Marathon`));
    const read = readCount(course);
    const prog = el("div", "study-progress");
    const bar = el("span", "study-bar");
    const fill = el("span", "study-bar-fill");
    fill.style.width = `${(read / total(course)) * 100}%`;
    bar.append(fill);
    prog.append(bar, el("span", "study-stat", `${read} / ${total(course)} read`));
    deckView.append(head, prog);

    const card = course.byId.get(st.pile[0]);
    const stack = el("div", "study-stack");
    if (st.pile.length > 2) stack.append(el("div", "study-ghost g2"));
    if (st.pile.length > 1) stack.append(el("div", "study-ghost g1"));
    const top = el("article", "study-card mar-card is-entering");
    const cardHead = el("div", "study-card-head");
    const row = el("div", "mar-headrow");
    const secs = el("span", "mar-secs", clockText(m.remaining));
    row.append(el("span", "study-card-title", card.title), secs);
    const timer = el("div", "mar-timer");
    const tfill = el("span", "mar-fill");
    timer.append(tfill);
    cardHead.append(row, timer);
    top.append(cardHead, cardContent(card), el("div", "mar-paused", "Paused"));
    stack.append(top);
    deckView.append(stack);
    if (window.DSACode) top.querySelectorAll(".code-tabs pre").forEach((pre) => window.DSACode.observe(pre));
    setTimeout(() => top.classList.remove("is-entering"), 400);

    const acts = el("div", "study-actions mar-actions");
    const pause = el("button", "study-btn is-pause", "Pause");
    const flag = el("button", "study-btn is-flag", "Flag");
    const stop = el("button", "study-btn is-stop", "Stop");
    [pause, flag, stop].forEach((b) => (b.type = "button"));
    pause.addEventListener("click", pauseOrResume);
    flag.addEventListener("click", toggleFlag);
    stop.addEventListener("click", () => endMarathon(false));
    acts.append(pause, flag, stop);
    deckView.append(acts, el("p", "study-keys", "P Pause   ·   F Flag"));
    m.refs = { top, fill: tfill, secs, timer, pause, flag };
    paintMarathonTimer();
    paintFlag();
    paintPause();
  }

  function endMarathon(finished) {
    const m = marathon;
    if (!m) return;
    clearInterval(m.timer);
    try {
      if (m.wake) m.wake.release();
    } catch (e) {
      /* ignore */
    }
    marathon = null;
    document.body.classList.remove("study-marathon-on");
    const course = m.course;
    const st = stateOf(course);
    const flagged = Object.keys(st.flag).length;
    deckView.replaceChildren();
    const box = el("div", "study-end mar-summary");
    box.append(el("h3", "", finished ? "Marathon complete" : "Marathon stopped"));
    const lines = [`${m.done} card${m.done === 1 ? "" : "s"} in ${fmtMinutes(m.activeMs / 60000)}.`];
    if (!finished) lines.push(`${st.pile.length} left. The course continues from the next card.`);
    lines.push(flagged ? `${flagged} flagged.` : "Nothing flagged.");
    box.append(el("p", "", lines.join(" ")));
    const row = el("div", "study-end-actions");
    if (flagged) {
      const only = el("button", "study-btn is-got", `Study the ${flagged} flagged card${flagged === 1 ? "" : "s"}`);
      only.type = "button";
      only.addEventListener("click", () => {
        restart(course, "flag");
        renderDeck();
      });
      row.append(only);
    }
    if (!finished) {
      const again = el("button", "study-btn", "Resume the marathon");
      again.type = "button";
      again.addEventListener("click", () => marathonStart(course));
      row.append(again);
    }
    const back = el("button", "study-btn", finished ? "Open the deck" : "Back to the deck");
    back.type = "button";
    back.addEventListener("click", () => renderDeck());
    row.append(back);
    box.append(row);
    deckView.append(box);
  }

  // ---------- moving the top card away ----------
  let busy = false;
  function commit(top, kind) {
    if (busy || !current) return;
    if (current.flip && !top.classList.contains("is-back")) return;
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
      if (top.classList.contains("is-flip") && !top.classList.contains("is-back")) return;
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
        top._dragged = true;
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
    const target = e.target && e.target.closest ? e.target : document.body;
    if (e.metaKey || e.ctrlKey || e.altKey || target.closest("input, textarea, select")) return;
    if (marathon) {
      if (e.key === "p" || e.key === "P") pauseOrResume();
      else if (e.key === "f" || e.key === "F") toggleFlag();
      return; // every key that moves between cards does nothing
    }
    const top = deckView.querySelector(".study-card");
    if ((e.key === " " || e.key === "Enter" || e.key === "ArrowUp") && top && top._turn) {
      if (target.closest("button") && e.key !== "ArrowUp") return; // the focused button handles it itself
      e.preventDefault();
      top._turn();
      return;
    }
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
  loadScript("flip/index.js", (ok) => {
    if (!ok) return;
    flipCounts = window.REV_FLIP_COUNTS || {};
    if (!current) renderPicker();
  });
  if (phone.matches && /^#q-/.test(location.hash)) {
    const id = decodeURIComponent(location.hash.slice(1));
    const course = courses.find((c) => c.byId.has(id));
    if (course) openAt(course, id);
  }
  // Turning the phone, or resizing the window, switches between the two layouts.
  phone.addEventListener("change", () => {
    syncScrollLock();
    syncPhoneClass();
    if (marathon) renderMarathon();
    else if (current) renderDeck();
    else renderPicker();
  });
})();
