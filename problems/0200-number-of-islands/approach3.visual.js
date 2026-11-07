// Scan the grid; each unsunk "1" starts a BFS. Sink cells as they're queued, so each cell is queued once.
(function () {
DSAViz.register("0200-number-of-islands/approach3", {
  inputs: [{ name: "grid", type: "string", value: "11000 11000 00100 00011", maxLength: 41 }],
  trace({ grid: text }) {
    const input = parse(text);
    const grid = input.map((r) => r.slice());
    const R = grid.length;
    const C = grid[0].length;
    const steps = [];
    let count = 0;
    const queue = [];
    const done = [];
    const view = (o = {}) => {
      const marks = {};
      for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) if (input[i][j] === "1" && grid[i][j] === "0") marks[`${i},${j}`] = "visited";
      done.forEach(([i, j]) => (marks[`${i},${j}`] = "match"));
      (o.pushed || []).forEach(([i, j]) => (marks[`${i},${j}`] = "new"));
      if (o.at) marks[`${o.at[0]},${o.at[1]}`] = "active";
      return [
        gridView(grid, marks, "grid (dark = popped now, yellow = just queued, green = done in this island, grey = sunk)"),
        { type: "array", label: "queue (front on the left)", values: queue.map(([i, j]) => `(${i},${j})`), compact: true },
        { type: "vars", items: [{ name: "count", value: count, mark: o.counted ? "new" : "" }] },
      ];
    };
    steps.push({ line: "init", note: "Scan every cell. A \"1\" that's still land starts a new island.", view: view() });
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
      if (grid[r][c] !== "1") continue;
      count++;
      grid[r][c] = "0";
      queue.push([r, c]);
      done.length = 0;
      steps.push({ line: ["cell", "start"], note: `(${r}, ${c}) is land: island number ${count}. Sink it and queue it.`, view: view({ pushed: [[r, c]], counted: true }) });
      while (queue.length) {
        const [i, j] = queue.shift();
        const pushed = [];
        for (const [x, y] of [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]]) {
          if (x >= 0 && x < R && y >= 0 && y < C && grid[x][y] === "1") { grid[x][y] = "0"; queue.push([x, y]); pushed.push([x, y]); }
        }
        done.push([i, j]);
        steps.push({ line: ["pop", "push"], note: `Pop (${i}, ${j}). ${pushed.length ? `Land next to it: ${pushed.map(([x, y]) => `(${x}, ${y})`).join(", ")}. Sink and queue ${pushed.length > 1 ? "them" : "it"}.` : "No land left next to it."}${queue.length ? "" : " The queue is empty: this island is done."}`, view: view({ at: [i, j], pushed }) });
      }
      done.length = 0;
    }
    steps.push({ line: "return", note: `Return ${count}. Each cell is queued at most once: O(m·n) time, no recursion.`, view: view() });
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
