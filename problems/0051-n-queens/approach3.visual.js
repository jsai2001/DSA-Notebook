// Bitmasks: three n-bit numbers say which columns of the current row are attacked; the diagonal ones shift by one column per row.
DSAViz.register("0051-n-queens/approach3", {
  inputs: [{ name: "n", type: "int", value: "4", min: 1, max: 5 }],
  trace({ n }) {
    const steps = [];
    const cols = [];
    const result = [];
    const full = (1 << n) - 1;
    const idx = [...Array(n).keys()];
    const fmt = (a) => `[${a.join(", ")}]`;
    const bits = (m) => idx.map((c) => ((m >> c) & 1 ? 1 : 0)); // shown by column: bit c under column c
    const view = (masks, opts = {}) => {
      const r = cols.length;
      const cells = idx.map((rr) => idx.map((c) => (cols[rr] === c ? "Q" : "")));
      const marks = {};
      cols.forEach((c, rr) => (marks[`${rr},${c}`] = opts.done ? "match" : "compare"));
      if (masks && r < n) idx.forEach((c) => (marks[`${r},${c}`] = (opts.free >> c) & 1 ? "new" : "visited"));
      if (opts.pick !== undefined) marks[`${r},${opts.pick}`] = "active";
      const widgets = [{ type: "grid", label: r < n ? `board (row ${r}: yellow = safe, grey = attacked)` : "board", rows: idx, cols: idx, cells, marks }];
      if (masks) {
        const [cm, dm, am] = masks;
        widgets.push(
          { type: "array", label: "col_mask: columns already used (bit c under column c)", values: bits(cm), compact: true, marks: {} },
          { type: "array", label: "diag_mask: down-right attacks, shifted 1 column right per row", values: bits(dm), compact: true, marks: {} },
          { type: "array", label: "anti_mask: down-left attacks, shifted 1 column left per row", values: bits(am), compact: true, marks: {} },
          { type: "array", label: "free = not any of them", values: bits(opts.free), compact: true, marks: opts.pick !== undefined ? { [opts.pick]: "active" } : {} }
        );
      }
      widgets.push({ type: "array", label: `solutions (${result.length}): queen's column in each row`, values: result.map(fmt), wide: true, marks: opts.done ? { [result.length - 1]: "new" } : {} });
      return widgets;
    };

    steps.push({ line: "init", note: `Three ${n}-bit numbers replace the sets. Bit c set means column c of the current row is attacked: by a queen in that column, or along a diagonal.`, view: view(null) });
    function place(cm, dm, am) {
      if (cm === full) {
        result.push(cols.slice());
        steps.push({ line: ["call", "done"], note: `col_mask is all ones: every column, so every row, has a queen. ${fmt(cols)} is a solution.`, view: view(null, { done: true }) });
        return;
      }
      let free = full & ~(cm | dm | am);
      const r = cols.length;
      steps.push({
        line: ["call", "free"],
        note: free ? `Row ${r}: free = ~(col | diag | anti) leaves column${free & (free - 1) ? "s" : ""} ${idx.filter((c) => (free >> c) & 1).join(", ")} safe.` : `Row ${r}: free = 0, every column is attacked. Dead end: go back.`,
        view: view([cm, dm, am], { free }),
      });
      while (free) {
        const bit = free & -free;
        const c = Math.log2(bit);
        const shown = free;
        free -= bit;
        cols.push(c);
        steps.push({
          line: "pick",
          note: `free & −free picks the lowest safe column, ${c}. Place the queen, and for row ${r + 1} shift its diagonal attacks: down-right one column right (<< 1), down-left one column left (>> 1).`,
          view: (() => { cols.pop(); const v = view([cm, dm, am], { free: shown, pick: c }); cols.push(c); return v; })(),
        });
        place(cm | bit, ((dm | bit) << 1) & full, (am | bit) >> 1);
        cols.pop();
        steps.push({ line: "undo", note: `Back in row ${r}: drop column ${c} and try the next safe one${free ? "" : " (none left)"}.`, view: view([cm, dm, am], { free }) });
      }
    }
    place(0, 0, 0);
    steps.push({
      line: "return",
      note: `Return ${result.length} solution${result.length === 1 ? "" : "s"}. The same search as with sets, but each row's safe columns come from one OR and one NOT, with no per-square checks.`,
      view: view(null),
    });
    return steps;
  },
});
