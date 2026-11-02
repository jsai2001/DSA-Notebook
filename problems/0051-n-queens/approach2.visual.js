// Backtracking with sets: a square is attacked if its column, r - c (down-right diagonal) or r + c (down-left) is taken.
DSAViz.register("0051-n-queens/approach2", {
  inputs: [{ name: "n", type: "int", value: "4", min: 1, max: 5 }],
  trace({ n }) {
    const steps = [];
    const cols = [];
    const usedCol = new Set();
    const usedDiag = new Set();
    const usedAnti = new Set();
    const result = [];
    let tried = 0;
    const idx = [...Array(n).keys()];
    const fmt = (a) => `[${a.join(", ")}]`;
    const set = (s) => `{${[...s].sort((a, b) => a - b).join(", ")}}`;
    const view = (opts = {}) => {
      const cells = idx.map((r) => idx.map((c) => (cols[r] === c ? "Q" : "")));
      const marks = {};
      // shade every square attacked by the queens placed so far
      idx.forEach((r) => idx.forEach((c) => {
        if (cols[r] === undefined && (usedCol.has(c) || usedDiag.has(r - c) || usedAnti.has(r + c))) marks[`${r},${c}`] = "visited";
      }));
      cols.forEach((c, r) => (marks[`${r},${c}`] = opts.done ? "match" : "compare"));
      (opts.attackers || []).forEach((k) => (marks[k] = "active"));
      if (opts.at) marks[opts.at] = opts.mark;
      return [
        { type: "grid", label: "board (grey = attacked by a queen already placed)", rows: idx, cols: idx, cells, marks },
        {
          type: "vars",
          items: [
            { name: "columns", value: set(usedCol) },
            { name: "r − c", value: set(usedDiag) },
            { name: "r + c", value: set(usedAnti) },
            { name: "squares tried", value: tried },
          ],
        },
        { type: "array", label: `solutions (${result.length}): queen's column in each row`, values: result.map(fmt), wide: true, marks: opts.done ? { [result.length - 1]: "new" } : {} },
      ];
    };

    steps.push({ line: "init", note: "Fill the rows top to bottom. Three sets record what the placed queens attack: their columns, their r − c values (down-right diagonals) and their r + c values (down-left).", view: view() });
    function place(r) {
      if (r === n) {
        result.push(cols.slice());
        steps.push({ line: ["call", "done"], note: `Every row has a queen and none attack each other: ${fmt(cols)} is a solution.`, view: view({ done: true }) });
        return;
      }
      steps.push({ line: "call", note: `Row ${r}: look for a square nobody attacks.`, view: view() });
      for (let c = 0; c < n; c++) {
        tried++;
        const why = [];
        const attackers = [];
        cols.forEach((qc, qr) => {
          if (qc === c) { why.push(`column ${c}`); attackers.push(`${qr},${qc}`); }
          else if (qr - qc === r - c) { why.push(`r − c = ${r - c}`); attackers.push(`${qr},${qc}`); }
          else if (qr + qc === r + c) { why.push(`r + c = ${r + c}`); attackers.push(`${qr},${qc}`); }
        });
        if (why.length) {
          steps.push({ line: "attacked", note: `(${r}, ${c}) is attacked (${[...new Set(why)].join(", ")} already taken): skip.`, view: view({ at: `${r},${c}`, mark: "cut", attackers }) });
          continue;
        }
        usedCol.add(c);
        usedDiag.add(r - c);
        usedAnti.add(r + c);
        cols.push(c);
        steps.push({ line: "place", note: `(${r}, ${c}) is safe: place a queen and add ${c}, ${r - c} and ${r + c} to the sets. Go to row ${r + 1}.`, view: view({ at: `${r},${c}`, mark: "new" }) });
        place(r + 1);
        cols.pop();
        usedCol.delete(c);
        usedDiag.delete(r - c);
        usedAnti.delete(r + c);
        steps.push({ line: "undo", note: `Back in row ${r}: remove the queen at (${r}, ${c}) and its three entries, then try the next column.`, view: view() });
      }
    }
    place(0);
    steps.push({
      line: "return",
      note: `Return ${result.length} solution${result.length === 1 ? "" : "s"}. Each check is O(1), and a row is abandoned as soon as it has no safe square, so it tried only ${tried} squares.`,
      view: view(),
    });
    return steps;
  },
});
