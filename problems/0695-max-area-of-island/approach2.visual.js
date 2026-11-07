// Recursive DFS: area(r, c) sinks the cell and adds up its four neighbours. Each land cell is sunk once.
(function () {
DSAViz.register("0695-max-area-of-island/approach2", {
  inputs: [{ name: "grid", type: "int[][]", value: "[[1, 1, 0, 0, 0], [1, 1, 0, 0, 1], [0, 0, 0, 1, 1], [0, 0, 0, 1, 1], [1, 0, 0, 0, 0]]", maxRows: 6, maxCols: 6, minValue: 0, maxValue: 1 }],
  trace({ grid: input }) {
    checkGrid(input);
    const grid = input.map((row) => row.slice());
    const R = grid.length;
    const C = grid[0].length;
    const steps = [];
    let best = 0;
    const path = []; // the open calls, outermost first
    const island = [];
    const view = (o = {}) => {
      const marks = {};
      for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) if (input[i][j] === 1 && grid[i][j] === 0) marks[`${i},${j}`] = "visited";
      island.forEach(([i, j]) => (marks[`${i},${j}`] = "new"));
      if (o.at) marks[`${o.at[0]},${o.at[1]}`] = "active";
      return [
        gridView(grid, marks, "grid (dark = this call's cell, yellow = sunk in this island, dashed = sunk earlier)"),
        { type: "array", label: "open calls: area(r, c), outermost first", values: path.map(([i, j]) => `(${i},${j})`), compact: true },
        { type: "vars", items: [{ name: "this island", value: island.length }, { name: "best", value: best, mark: o.better ? "new" : "" }] },
      ];
    };
    steps.push({ line: "init", note: "Scan the grid. Each land cell found starts a new island.", view: view() });
    const area = (r, c) => {
      if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] === 0) return 0;
      grid[r][c] = 0;
      island.push([r, c]);
      path.push([r, c]);
      steps.push({ line: ["visit", "sink"], note: `area(${r}, ${c}): land. Sink it (set it to 0) and ask its 4 neighbours. ${path.length} call${path.length > 1 ? "s" : ""} deep.`, view: view({ at: [r, c] }) });
      const total = 1 + area(r + 1, c) + area(r - 1, c) + area(r, c + 1) + area(r, c - 1);
      path.pop();
      return total;
    };
    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        if (grid[r][c] !== 1) continue;
        island.length = 0;
        steps.push({ line: "cell", note: `(${r}, ${c}) is land and not sunk yet: a new island. Call area(${r}, ${c}).`, view: view({ at: [r, c] }) });
        const a = area(r, c);
        const better = a > best;
        best = Math.max(best, a);
        steps.push({ line: "best", note: `area(${r}, ${c}) returns ${a}: off-grid, water and sunk neighbours all give 0. best = ${best}.`, view: view({ better }) });
        island.length = 0;
      }
    }
    steps.push({ line: "return", note: `Return ${best}. Every cell is sunk at most once: O(m·n) time. The calls can go m·n deep, so Python needs a higher recursion limit.`, view: view() });
    return steps;
  },
});

function checkGrid(grid) {
  if (!grid.length || !grid[0].length) throw new DSAViz.InputError("Give at least one row, like [[1, 0], [1, 1]].");
  if (grid.some((row) => row.length !== grid[0].length)) throw new DSAViz.InputError("Every row needs the same number of cells.");
  if (grid.some((row) => row.some((x) => x !== 0 && x !== 1))) throw new DSAViz.InputError("Cells are 0 (water) or 1 (land).");
}
function gridView(grid, marks, label) {
  return { type: "grid", label, rows: grid.map((_, k) => k), cols: grid[0].map((_, k) => k), corner: "r \\ c", cells: grid.map((row) => row.map(String)), marks };
}
})();
