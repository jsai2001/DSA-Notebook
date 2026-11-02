// Brute force: put one queen per row in any unused column (every column order), and only check diagonals once the board is full.
DSAViz.register("0051-n-queens/approach1", {
  inputs: [{ name: "n", type: "int", value: "4", min: 1, max: 4 }],
  trace({ n }) {
    const steps = [];
    const cols = [];
    const used = Array(n).fill(false);
    const result = [];
    let checked = 0;
    const idx = [...Array(n).keys()];
    const fmt = (a) => `[${a.join(", ")}]`;
    const view = (opts = {}) => {
      const cells = idx.map((r) => idx.map((c) => (cols[r] === c ? "Q" : "")));
      const marks = {};
      cols.forEach((c, r) => (marks[`${r},${c}`] = opts.keep ? "match" : "compare"));
      if (opts.try) marks[opts.try] = "active";
      (opts.clash || []).forEach((k) => (marks[k] = "cut"));
      return [
        { type: "grid", label: "board (one queen per row; diagonals not checked yet)", rows: idx, cols: idx, cells, marks },
        {
          type: "vars",
          items: [
            { name: "cols", value: fmt(cols) },
            { name: "full boards checked", value: checked },
          ],
        },
        { type: "array", label: `solutions (${result.length}): queen's column in each row`, values: result.map(fmt), wide: true, marks: opts.keep ? { [result.length - 1]: "new" } : {} },
      ];
    };

    steps.push({ line: "init", note: "Place a queen in each row, in any column not used yet. That gives every column order (n! of them); diagonals are only checked when the board is full.", view: view() });
    function place(r) {
      if (r === n) {
        checked++;
        let clash = null;
        for (let i = 0; i < n && !clash; i++) for (let j = i + 1; j < n && !clash; j++) if (Math.abs(cols[i] - cols[j]) === j - i) clash = [i, j];
        if (clash) {
          const [i, j] = clash;
          steps.push({
            line: ["full", "check"],
            note: `Board ${fmt(cols)} is full. Check diagonals: the queens in rows ${i} and ${j} are ${j - i} row${j - i === 1 ? "" : "s"} and ${Math.abs(cols[i] - cols[j])} column${Math.abs(cols[i] - cols[j]) === 1 ? "" : "s"} apart, so they share a diagonal. Throw it away.`,
            view: view({ clash: [`${i},${cols[i]}`, `${j},${cols[j]}`] }),
          });
        } else {
          result.push(cols.slice());
          steps.push({ line: ["check", "keep"], note: `Board ${fmt(cols)} is full and no two queens share a diagonal: a solution.`, view: view({ keep: true }) });
        }
        return;
      }
      steps.push({ line: "call", note: `Row ${r}: try every column that has no queen yet.`, view: view() });
      for (let c = 0; c < n; c++) {
        if (used[c]) continue;
        used[c] = true;
        cols.push(c);
        steps.push({ line: "try", note: `Put row ${r}'s queen in column ${c}. No diagonal check yet, even if it's attacked.`, view: view({ try: `${r},${c}` }) });
        place(r + 1);
        cols.pop();
        used[c] = false;
        steps.push({ line: "undo", note: `Back in row ${r}: take the queen out of column ${c}.`, view: view() });
      }
    }
    place(0);
    steps.push({
      line: "return",
      note: `Return ${result.length} solution${result.length === 1 ? "" : "s"}. It filled and checked ${checked} full boards (n!) to find them: most were broken from the second row on, but it didn't notice until the end.`,
      view: view(),
    });
    return steps;
  },
});
