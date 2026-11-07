// Scan the grid; each unsunk "1" is a new island. A recursive DFS sinks the whole island so it's never counted again.
(function () {
DSAViz.register("0200-number-of-islands/approach1", {
  inputs: [{ name: "grid", type: "string", value: "11000 11000 00100 00011", maxLength: 41 }],
  trace({ grid: text }) {
    const input = parse(text);
    const grid = input.map((r) => r.slice());
    const R = grid.length;
    const C = grid[0].length;
    const steps = [];
    let count = 0;
    let depth = 0;
    const island = [];
    const view = (o = {}) => {
      const marks = {};
      for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) if (input[i][j] === "1" && grid[i][j] === "0") marks[`${i},${j}`] = "visited";
      island.forEach(([i, j]) => (marks[`${i},${j}`] = "new"));
      if (o.at) marks[`${o.at[0]},${o.at[1]}`] = "active";
      return [gridView(grid, marks, "grid (dark = this cell, yellow = sunk in this island, grey = sunk earlier)"), { type: "vars", items: [{ name: "count", value: count, mark: o.counted ? "new" : "" }, { name: "calls deep", value: depth }] }];
    };
    steps.push({ line: "init", note: "Scan every cell. A \"1\" that's still land starts a new island.", view: view() });
    const sink = (r, c) => {
      if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] !== "1") return;
      depth++;
      grid[r][c] = "0";
      island.push([r, c]);
      steps.push({ line: ["visit", "sink"], note: `sink(${r}, ${c}): land. Set it to "0" and call sink on its 4 neighbours.`, view: view({ at: [r, c] }) });
      sink(r + 1, c); sink(r - 1, c); sink(r, c + 1); sink(r, c - 1);
      depth--;
    };
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
      if (grid[r][c] !== "1") continue;
      count++;
      island.length = 0;
      steps.push({ line: ["cell", "count"], note: `(${r}, ${c}) is land: island number ${count}. Sink all of it.`, view: view({ at: [r, c], counted: true }) });
      sink(r, c);
      island.length = 0;
    }
    steps.push({ line: "return", note: `Return ${count}. Each cell is sunk at most once: O(m·n) time, but the calls can go m·n deep.`, view: view() });
    return steps;
  },
});

// "11000 11000 00100" -> [["1","1","0","0","0"], ...]
function parse(text) {
  const rows = text.trim().split(/[\s,]+/).filter(Boolean);
  if (!rows.length || rows.some((r) => !/^[01]+$/.test(r))) throw new DSAViz.InputError('grid: rows of 1s and 0s separated by spaces, like "11000 11000 00100".');
  if (rows.some((r) => r.length !== rows[0].length)) throw new DSAViz.InputError("grid: every row needs the same number of cells.");
  if (rows.length > 6 || rows[0].length > 6) throw new DSAViz.InputError("grid: at most 6 rows of 6 cells here, so the steps stay readable.");
  return rows.map((r) => [...r]);
}
function gridView(grid, marks, label) {
  return { type: "grid", label, rows: grid.map((_, k) => k), cols: grid[0].map((_, k) => k), corner: "r \\ c", cells: grid.map((row) => row.slice()), marks };
}
})();
