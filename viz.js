// Step-by-step visualizer engine.
//
// Each approach can ship an approachN.visual.js that calls:
//
//   DSAViz.register("0001-two-sum/approach2", {
//     inputs: [
//       { name: "nums", type: "int[]", value: "[2, 7, 11, 15]", minLength: 2, maxLength: 10 },
//       { name: "target", type: "int", value: "9" },
//     ],
//     trace({ nums, target }) {
//       return [ { line: "store", note: "What happens in this step", view: [ ...widgets ] }, ... ];
//     },
//   });
//
// A step's `line` names a code line marked with `# @viz name` / `// @viz name`
// (a string, an array of names, or omitted). `view` is a list of widgets:
//
//   { type: "array", label, values, pointers: { i: 0, j: 2 }, marks: { 0: "active" }, cut: 2 }
//     (cut: optional partition line before that index; sub: [..] second caption per
//      cell; compact: true for smaller cells; wide: true for cells that grow to fit text)
//   { type: "grid",  label, rows: [...], cols: [...], cells: [[...]], marks: { "r,c": "active" }, corner }
//   { type: "list",  label, nodes: [{ value, mark, caption }], pointers: { l1: 0 } }  (index = nodes.length → null)
//   { type: "map",   label, columns: ["value", "index"], entries: [[k, v], ...], marks: { [k]: "new" } }
//   { type: "tree",  label, values: [3, 1, 4, null, 5], marks: { 0: "active" }, captions: { 0: "max 3" } }
//     (level-order like LeetCode; node id = index in values; DSAViz.buildTree(values)
//      gives { root, nodes: { id: { val, left, right, depth } } } for traces)
//   { type: "bars",  label, values: [1, 8, 6], pointers: { l: 0 }, marks: { 0: "active" }, water: [0, 2] }
//     (bar chart; water shades between bars l and r up to the shorter one)
//   { type: "set",   label, items: ["a", "b"], marks: { a: "new" } }
//   { type: "vars",  items: [{ name, value, mark }] }
//
// Marks: "active", "compare", "match", "visited", "new", "window", "ghost", "cut".
// int[] inputs accept minLength/maxLength and minValue/maxValue; string inputs accept
// maxLength and ascii: true; tree inputs (level-order with null) accept maxLength and
// minValue/maxValue.
// The page script (app.js) calls DSAViz.mount() for each code block with data-viz.

(function () {
  "use strict";

  const registry = {};
  const PLAY_DELAY_MS = 1100;

  class InputError extends Error {}

  function register(id, def) {
    registry[id] = def;
  }

  // ---------- small DOM helper ----------
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function button(className, text, label) {
    const b = el("button", className, text);
    b.type = "button";
    if (label) b.setAttribute("aria-label", label);
    return b;
  }

  // ---------- input parsing ----------
  const INT = /^-?\d+$/;

  function parseInput(spec, raw) {
    const text = raw.trim();
    const name = spec.label || spec.name;

    if (spec.type === "int") {
      if (!INT.test(text)) throw new InputError(`${name} must be a whole number, like ${spec.value}.`);
      const value = Number(text);
      const min = spec.min ?? -1e6;
      const max = spec.max ?? 1e6;
      if (value < min || value > max) {
        throw new InputError(`${name} must be between ${min} and ${max}.`);
      }
      return value;
    }

    if (spec.type === "int[]") {
      const inner = text.replace(/^\[/, "").replace(/\]$/, "").trim();
      const parts = inner ? inner.split(/[\s,]+/).filter(Boolean) : [];
      if (!parts.every((p) => INT.test(p))) {
        throw new InputError(`${name} must be a list of whole numbers, like ${spec.value}.`);
      }
      const values = parts.map(Number);
      const minLength = spec.minLength ?? 0;
      const maxLength = spec.maxLength ?? 12;
      if (values.length < minLength || values.length > maxLength) {
        throw new InputError(
          `${name} needs between ${minLength} and ${maxLength} numbers (kept small so the steps stay readable).`
        );
      }
      const minValue = spec.minValue ?? -1e6;
      const maxValue = spec.maxValue ?? 1e6;
      if (values.some((v) => v < minValue || v > maxValue)) {
        throw new InputError(`Numbers in ${name} must be between ${minValue} and ${maxValue}.`);
      }
      return values;
    }

    // Binary tree in LeetCode's level-order form: [3, 1, 4, 3, null, 1, 5].
    // Returns the list with null for missing children.
    if (spec.type === "tree") {
      const inner = text.replace(/^\[/, "").replace(/\]$/, "").trim();
      const parts = inner ? inner.split(/[\s,]+/).filter(Boolean) : [];
      if (!parts.length || !parts.every((p) => INT.test(p) || p === "null")) {
        throw new InputError(`${name} must be a level-order list like ${spec.value} (use null for a missing child).`);
      }
      if (parts[0] === "null") throw new InputError(`The first value in ${name} is the root node, so it can't be null.`);
      const values = parts.map((p) => (p === "null" ? null : Number(p)));
      const maxLength = spec.maxLength ?? 15;
      if (values.length > maxLength) {
        throw new InputError(`${name} can have at most ${maxLength} entries here (kept small so the tree stays readable).`);
      }
      const minValue = spec.minValue ?? -99;
      const maxValue = spec.maxValue ?? 99;
      if (values.some((v) => v !== null && (v < minValue || v > maxValue))) {
        throw new InputError(`Values in ${name} must be between ${minValue} and ${maxValue}.`);
      }
      buildTree(values); // throws if some values have no parent
      return values;
    }

    if (spec.type === "string") {
      // Quotes are optional; use them to keep leading/trailing spaces.
      const unquoted = text.replace(/^(["'])(.*)\1$/, "$2");
      const maxLength = spec.maxLength ?? 16;
      if (unquoted.length > maxLength) {
        throw new InputError(`${name} can be at most ${maxLength} characters here.`);
      }
      if (spec.ascii && /[^\x20-\x7e]/.test(unquoted)) {
        throw new InputError(`${name} can only use letters, digits, symbols and spaces (ASCII).`);
      }
      return unquoted;
    }

    throw new InputError(`Unknown input type "${spec.type}".`);
  }

  // ---------- binary trees ----------
  // Link a level-order list into nodes, the way LeetCode reads it. Node ids are
  // indexes into `values`. Returns { root, nodes: { id: { val, left, right, depth } } }.
  function buildTree(values) {
    const nodes = {};
    if (!values.length || values[0] === null) return { root: -1, nodes };
    nodes[0] = { val: values[0], left: -1, right: -1, depth: 0 };
    const queue = [0];
    let i = 1;
    while (queue.length && i < values.length) {
      const parent = queue.shift();
      for (const side of ["left", "right"]) {
        if (i >= values.length) break;
        if (values[i] !== null) {
          nodes[i] = { val: values[i], left: -1, right: -1, depth: nodes[parent].depth + 1 };
          nodes[parent][side] = i;
          queue.push(i);
        }
        i++;
      }
    }
    if (i < values.length && values.slice(i).some((v) => v !== null)) {
      throw new InputError("Some values have no parent: every non-null value needs a node above it.");
    }
    return { root: 0, nodes };
  }

  // ---------- widgets ----------
  function markClass(mark) {
    return mark ? " is-" + mark : "";
  }

  // Pointer names under a cell, one per line. The slot is always rendered so
  // rows don't jump in height when pointers move.
  function pointerSlot(pointers, index) {
    const slot = el("span", "viz-pointer");
    pointers
      .filter(([, idx]) => idx === index)
      .forEach(([name]) => slot.append(el("span", "", "↑ " + name)));
    return slot;
  }

  const widgets = {
    array(w) {
      const block = el("div", "viz-block");
      if (w.label) block.append(el("div", "viz-label", w.label));
      const row = el("div", "viz-array");
      const pointers = Object.entries(w.pointers || {});
      // Optional partition line drawn just before cell `cut` (cut = length → after the last cell).
      const cutLine = () => el("span", "viz-cutline");
      if (w.compact) row.classList.add("is-compact");
      if (w.wide) row.classList.add("is-wide");
      w.values.forEach((value, i) => {
        if (w.cut === i) row.append(cutLine());
        const cell = el("div", "viz-cell" + markClass(w.marks && w.marks[i]));
        cell.append(el("span", "viz-value", String(value)));
        cell.append(el("span", "viz-index", String(i)));
        // Optional second caption per cell (e.g. Manacher's p[i]).
        if (w.sub) cell.append(el("span", "viz-sub", w.sub[i] === undefined ? "" : String(w.sub[i])));
        cell.append(pointerSlot(pointers, i));
        row.append(cell);
      });
      if (!w.values.length) row.append(el("span", "viz-empty", "empty"));
      if (w.cut === w.values.length) row.append(cutLine());
      block.append(row);
      return block;
    },

    // Linked list: nodes joined by arrows, ending in null.
    // nodes: [{ value, mark, caption }]; a pointer equal to nodes.length points at null.
    list(w) {
      const block = el("div", "viz-block");
      if (w.label) block.append(el("div", "viz-label", w.label));
      const row = el("div", "viz-list");
      const pointers = Object.entries(w.pointers || {});
      const nodes = w.nodes || [];
      nodes.forEach((node, i) => {
        const cell = el("div", "viz-cell viz-node" + markClass(node.mark));
        cell.append(el("span", "viz-value", String(node.value)));
        cell.append(el("span", "viz-index", node.caption || ""));
        cell.append(pointerSlot(pointers, i));
        row.append(cell, el("span", "viz-arrow", "→"));
      });
      const end = el("div", "viz-cell viz-node is-null");
      end.append(el("span", "viz-value", "null"), el("span", "viz-index", ""));
      end.append(pointerSlot(pointers, nodes.length));
      row.append(end);
      block.append(row);
      return block;
    },

    map(w) {
      const block = el("div", "viz-block");
      if (w.label) block.append(el("div", "viz-label", w.label));
      const table = el("table", "viz-map");
      const head = el("tr");
      (w.columns || ["key", "value"]).forEach((c) => {
        const th = el("th", "", c);
        th.scope = "col";
        head.append(th);
      });
      const thead = el("thead");
      thead.append(head);
      const tbody = el("tbody");
      (w.entries || []).forEach(([k, v]) => {
        const tr = el("tr", markClass(w.marks && w.marks[String(k)]).trim());
        tr.append(el("td", "", String(k)), el("td", "", String(v)));
        tbody.append(tr);
      });
      if (!(w.entries || []).length) {
        const tr = el("tr", "viz-empty-row");
        const td = el("td", "", "empty");
        td.colSpan = (w.columns || [1, 2]).length;
        tr.append(td);
        tbody.append(tr);
      }
      table.append(thead, tbody);
      block.append(table);
      return block;
    },

    // 2D table, e.g. a DP table. cells[r][c] is shown as-is ("" for empty);
    // marks are keyed "r,c".
    grid(w) {
      const block = el("div", "viz-block");
      if (w.label) block.append(el("div", "viz-label", w.label));
      const wrap = el("div", "viz-grid-wrap");
      const table = el("table", "viz-grid");
      const head = el("tr");
      head.append(el("th", "viz-grid-corner", w.corner || ""));
      (w.cols || []).forEach((c) => {
        const th = el("th", "", String(c));
        th.scope = "col";
        head.append(th);
      });
      const thead = el("thead");
      thead.append(head);
      const tbody = el("tbody");
      (w.cells || []).forEach((row, r) => {
        const tr = el("tr");
        const th = el("th", "", String((w.rows || [])[r] ?? r));
        th.scope = "row";
        tr.append(th);
        row.forEach((value, c) => {
          tr.append(el("td", markClass(w.marks && w.marks[`${r},${c}`]).trim(), String(value)));
        });
        tbody.append(tr);
      });
      table.append(thead, tbody);
      wrap.append(table);
      block.append(wrap);
      return block;
    },

    // Binary tree drawn as SVG. values: level-order list (null = no node);
    // marks and captions are keyed by node id (index in values). Each node
    // sits in its own column (in-order position), so nothing overlaps.
    tree(w) {
      const block = el("div", "viz-block");
      if (w.label) block.append(el("div", "viz-label", w.label));
      const { root, nodes } = buildTree(w.values || []);
      const wrap = el("div", "viz-tree-wrap");
      if (root < 0) {
        wrap.append(el("span", "viz-empty", "empty tree"));
        block.append(wrap);
        return block;
      }
      const order = [];
      (function inorder(id) {
        if (id < 0) return;
        inorder(nodes[id].left);
        order.push(id);
        inorder(nodes[id].right);
      })(root);
      const COL = 46, ROW = 62, R = 17, TOP = R + 4;
      const x = {};
      order.forEach((id, k) => (x[id] = k * COL + COL / 2));
      const y = (id) => TOP + nodes[id].depth * ROW;
      const depth = Math.max(...order.map((id) => nodes[id].depth));
      const width = order.length * COL;
      const height = TOP + depth * ROW + R + 18;
      const NS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(NS, "svg");
      svg.setAttribute("class", "viz-tree");
      svg.setAttribute("width", width);
      svg.setAttribute("height", height);
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label", "Tree: " + order.map((id) => nodes[id].val).join(", "));
      const make = (tag, attrs, text) => {
        const node = document.createElementNS(NS, tag);
        Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
        if (text !== undefined) node.textContent = text;
        return node;
      };
      order.forEach((id) => {
        ["left", "right"].forEach((side) => {
          const child = nodes[id][side];
          if (child >= 0) {
            svg.append(make("line", { class: "viz-tree-edge", x1: x[id], y1: y(id), x2: x[child], y2: y(child) }));
          }
        });
      });
      order.forEach((id) => {
        const g = make("g", { class: "viz-tree-node" + markClass(w.marks && w.marks[id]) });
        g.append(make("circle", { cx: x[id], cy: y(id), r: R }));
        g.append(make("text", { x: x[id], y: y(id), class: "viz-tree-value" }, String(nodes[id].val)));
        const caption = w.captions && w.captions[id];
        if (caption !== undefined && caption !== "") {
          g.append(make("text", { x: x[id], y: y(id) + R + 12, class: "viz-tree-caption" }, String(caption)));
        }
        svg.append(g);
      });
      wrap.append(svg);
      block.append(wrap);
      return block;
    },

    // Bar chart (SVG): one bar per value, value above, index and pointers below.
    // water: [l, r] shades the area between bars l and r up to the shorter one.
    bars(w) {
      const block = el("div", "viz-block");
      if (w.label) block.append(el("div", "viz-label", w.label));
      const vals = w.values || [];
      const NS = "http://www.w3.org/2000/svg";
      const make = (tag, attrs, text) => {
        const node = document.createElementNS(NS, tag);
        Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
        if (text !== undefined) node.textContent = text;
        return node;
      };
      const BW = 28, GAP = 8, H = 120, TOP = 18;
      const names = {};
      Object.entries(w.pointers || {}).forEach(([name, idx]) => (names[idx] = (names[idx] || []).concat(name)));
      const rowsBelow = Math.max(1, ...Object.values(names).map((a) => a.length));
      const base = TOP + H;
      const width = vals.length * (BW + GAP) + GAP;
      const height = base + 16 + rowsBelow * 14 + 4;
      const max = Math.max(1, ...vals);
      const x = (i) => GAP + i * (BW + GAP);
      const y = (v) => base - (v / max) * H;
      const svg = make("svg", {
        class: "viz-bars", width, height, viewBox: `0 0 ${width} ${height}`, role: "img",
        "aria-label": "Bars: " + vals.join(", "),
      });
      svg.append(make("line", { class: "viz-bars-axis", x1: 0, y1: base, x2: width, y2: base }));
      if (w.water) {
        const [l, r] = w.water;
        const level = Math.min(vals[l], vals[r]);
        if (level > 0 && r > l) {
          svg.append(make("rect", {
            class: "viz-water", x: x(l) + BW / 2, y: y(level), width: x(r) - x(l), height: base - y(level),
          }));
        }
      }
      vals.forEach((v, i) => {
        const g = make("g", { class: "viz-bar" + markClass(w.marks && w.marks[i]) });
        g.append(make("rect", { x: x(i), y: y(v), width: BW, height: Math.max(base - y(v), 1), rx: 3 }));
        g.append(make("text", { class: "viz-bar-value", x: x(i) + BW / 2, y: y(v) - 5 }, String(v)));
        g.append(make("text", { class: "viz-bar-index", x: x(i) + BW / 2, y: base + 12 }, String(i)));
        (names[i] || []).forEach((name, k) => {
          g.append(make("text", { class: "viz-bar-pointer", x: x(i) + BW / 2, y: base + 26 + k * 14 }, "↑ " + name));
        });
        svg.append(g);
      });
      const wrap = el("div", "viz-tree-wrap");
      wrap.append(svg);
      block.append(wrap);
      return block;
    },

    // Set of values shown as chips in braces; marks keyed by String(item).
    set(w) {
      const block = el("div", "viz-block");
      if (w.label) block.append(el("div", "viz-label", w.label));
      const row = el("div", "viz-set");
      row.append(el("span", "viz-brace", "{"));
      (w.items || []).forEach((item) => {
        row.append(el("span", "viz-var" + markClass(w.marks && w.marks[String(item)]), String(item)));
      });
      if (!(w.items || []).length) row.append(el("span", "viz-empty", "empty"));
      row.append(el("span", "viz-brace", "}"));
      block.append(row);
      return block;
    },

    vars(w) {
      const block = el("div", "viz-block viz-vars");
      (w.items || []).forEach((item) => {
        block.append(el("span", "viz-var" + markClass(item.mark), `${item.name} = ${item.value}`));
      });
      return block;
    },
  };

  function renderView(stage, view) {
    stage.replaceChildren();
    (view || []).forEach((w) => {
      const render = widgets[w.type];
      if (render) stage.append(render(w));
    });
  }

  // ---------- mounting ----------
  // container: the .code-tabs element (already populated by app.js)
  // sources: [{ lang, code, lines: { name: [lineNumbers] } }]
  function mount(container, id, sources) {
    const def = registry[id];
    if (!def) return;

    // Code | Visualize switch above the existing code view.
    const codeView = el("div", "viz-codeview");
    codeView.append(...container.childNodes);

    const modes = el("div", "viz-modes");
    modes.setAttribute("role", "group");
    modes.setAttribute("aria-label", "View");
    const codeBtn = button("viz-mode", "Code");
    const vizBtn = button("viz-mode", "Visualize");
    modes.append(codeBtn, vizBtn);

    const root = el("div", "viz");
    root.hidden = true;
    container.append(modes, codeView, root);

    let built = false;
    let ui = null;

    function setMode(visual) {
      codeBtn.setAttribute("aria-pressed", String(!visual));
      vizBtn.setAttribute("aria-pressed", String(visual));
      codeView.hidden = visual;
      root.hidden = !visual;
      if (visual && !built) {
        ui = build(root, def, sources, id);
        built = true;
      }
      if (!visual && ui) ui.pause();
    }

    codeBtn.addEventListener("click", () => setMode(false));
    vizBtn.addEventListener("click", () => setMode(true));
    setMode(false);
  }

  function build(root, def, sources, id) {
    const uid = id.replace(/[^\w-]/g, "-");

    // --- input form ---
    const form = el("form", "viz-form");
    form.noValidate = true;
    const fields = def.inputs.map((spec) => {
      const wrap = el("label", "viz-field");
      wrap.append(el("span", "viz-field-name", spec.label || spec.name));
      const input = el("input", "viz-input" + (spec.type === "int" ? " is-short" : ""));
      input.type = "text";
      input.value = spec.value;
      input.spellcheck = false;
      input.autocomplete = "off";
      wrap.append(input);
      form.append(wrap);
      return { spec, input };
    });
    const runBtn = el("button", "viz-btn", "Run");
    runBtn.type = "submit";
    const resetBtn = button("viz-btn viz-btn-quiet", "Reset", "Reset to the example input");
    form.append(runBtn, resetBtn);
    const error = el("p", "viz-error");
    error.setAttribute("role", "alert");

    // --- stage + code ---
    const main = el("div", "viz-main");
    const stage = el("div", "viz-stage");

    const codePane = el("div", "viz-code");
    const langBar = el("div", "viz-langs");
    langBar.setAttribute("role", "group");
    langBar.setAttribute("aria-label", "Code language");
    const pre = el("pre", "viz-pre");
    pre.tabIndex = 0;
    const code = el("code");
    pre.append(code);
    codePane.append(langBar, pre);
    if (window.DSACode) window.DSACode.observe(pre);
    main.append(stage, codePane);

    // --- explanation + controls ---
    const note = el("p", "viz-note");
    note.setAttribute("aria-live", "polite");

    const controls = el("div", "viz-controls");
    const prevBtn = button("viz-btn", "◀ Prev", "Previous step");
    const playBtn = button("viz-btn viz-btn-primary", "▶ Play");
    const nextBtn = button("viz-btn", "Next ▶", "Next step");
    const slider = el("input", "viz-slider");
    slider.type = "range";
    slider.min = "0";
    slider.id = `viz-slider-${uid}`;
    slider.setAttribute("aria-label", "Step");
    const counter = el("span", "viz-counter");
    controls.append(prevBtn, playBtn, nextBtn, slider, counter);

    root.append(form, error, main, note, controls);

    // --- state ---
    let steps = [];
    let index = 0;
    let timer = null;
    let lang = sources.some((s) => s.lang === "Python") ? "Python" : sources[0].lang;
    const langButtons = sources.map((s) => {
      const b = button("viz-lang", s.lang);
      b.addEventListener("click", () => {
        lang = s.lang;
        renderCode();
      });
      langBar.append(b);
      return { lang: s.lang, b };
    });

    function renderCode() {
      const src = sources.find((s) => s.lang === lang);
      langButtons.forEach(({ lang: l, b }) => b.setAttribute("aria-pressed", String(l === lang)));
      code.replaceChildren();
      src.code.split("\n").forEach((line, i) => {
        const row = el("span", "viz-line");
        row.dataset.line = String(i + 1);
        row.append(el("span", "viz-lineno", String(i + 1)));
        row.append(el("span", "viz-linetext", line || " "));
        code.append(row);
      });
      // New language = new line lengths; refit the font on phones (app.js).
      if (window.DSACode) window.DSACode.fit(pre);
      highlight();
    }

    function highlight() {
      const src = sources.find((s) => s.lang === lang);
      const step = steps[index];
      const names = step && step.line ? [].concat(step.line) : [];
      const active = new Set(names.flatMap((n) => (src.lines && src.lines[n]) || []));
      let first = null;
      code.querySelectorAll(".viz-line").forEach((row) => {
        const on = active.has(Number(row.dataset.line));
        row.classList.toggle("is-current", on);
        if (on && !first) first = row;
      });
      // Keep the current line visible inside the code pane without scrolling the page.
      if (first) {
        const top = first.offsetTop;
        const bottom = top + first.offsetHeight;
        if (top < pre.scrollTop || bottom > pre.scrollTop + pre.clientHeight) {
          pre.scrollTop = Math.max(0, top - pre.clientHeight / 3);
        }
      }
    }

    function show(i) {
      index = Math.max(0, Math.min(i, steps.length - 1));
      const step = steps[index];
      renderView(stage, step.view);
      note.textContent = step.note || "";
      slider.value = String(index);
      counter.textContent = `Step ${index + 1} of ${steps.length}`;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === steps.length - 1;
      highlight();
      if (index === steps.length - 1) pause();
    }

    function pause() {
      if (timer) clearInterval(timer);
      timer = null;
      playBtn.textContent = "▶ Play";
      playBtn.setAttribute("aria-label", "Play");
    }

    function play() {
      if (index >= steps.length - 1) show(0); // replay from the start
      playBtn.textContent = "❚❚ Pause";
      playBtn.setAttribute("aria-label", "Pause");
      timer = setInterval(() => {
        // Stop if the question was collapsed or the panel hidden.
        if (root.hidden || !root.closest("details").open) return pause();
        show(index + 1);
      }, PLAY_DELAY_MS);
    }

    function run() {
      pause();
      let args;
      try {
        args = {};
        fields.forEach(({ spec, input }) => {
          args[spec.name] = parseInput(spec, input.value);
        });
        const result = def.trace(args);
        if (!result || !result.length) throw new InputError("Nothing to show for this input.");
        steps = result;
      } catch (e) {
        if (!(e instanceof InputError)) throw e;
        error.textContent = e.message;
        return;
      }
      error.textContent = "";
      slider.max = String(steps.length - 1);
      show(0);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      run();
    });
    resetBtn.addEventListener("click", () => {
      fields.forEach(({ spec, input }) => (input.value = spec.value));
      run();
    });
    prevBtn.addEventListener("click", () => {
      pause();
      show(index - 1);
    });
    nextBtn.addEventListener("click", () => {
      pause();
      show(index + 1);
    });
    playBtn.addEventListener("click", () => (timer ? pause() : play()));
    slider.addEventListener("input", () => {
      pause();
      show(Number(slider.value));
    });

    // Left/right arrows step through, except while typing or on the slider.
    root.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (e.target.matches("input")) return;
      e.preventDefault();
      pause();
      show(index + (e.key === "ArrowRight" ? 1 : -1));
    });

    renderCode();
    run();
    return { pause };
  }

  window.DSAViz = { register, mount, InputError, buildTree };
})();
