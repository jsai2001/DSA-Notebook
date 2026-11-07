// Union-find: start with one island per land cell, and join every pair of touching land cells. Each real join removes one island.
(function () {
DSAViz.register("0200-number-of-islands/approach2", {
  inputs: [{ name: "grid", type: "string", value: "11000 11000 00100 00011", maxLength: 41 }],
  trace({ grid: text }) {
    const grid = parse(text);
    const R = grid.length;
    const C = grid[0].length;
    const steps = [];
    const parent = [...Array(R * C).keys()];
    const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
    let count = grid.flat().filter((ch) => ch === "1").length;
    const view = (o = {}) => {
      const marks = {};
      (o.pair || []).forEach(([i, j]) => (marks[`${i},${j}`] = o.joined ? "match" : "compare"));
      const cells = grid.map((row, i) => row.map((ch, j) => (ch === "1" ? `g${find(i * C + j)}` : "·")));
      return [
        { type: "grid", label: "group of each land cell (gK = its root is cell K = r·C + c; yellow = same group already, green = just joined)", rows: grid.map((_, k) => k), cols: grid[0].map((_, k) => k), corner: "r \\ c", cells, marks },
        { type: "vars", items: [{ name: "count", value: count, mark: o.joined ? "new" : o.done ? "match" : "" }] },
      ];
    };
    steps.push({ line: "init", note: `Every land cell starts as its own island: count = ${count}. Cell (r, c) is number r·${C} + c.`, view: view() });
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
      if (grid[r][c] !== "1") continue;
      for (const [x, y] of [[r + 1, c], [r, c + 1]]) {
        if (x >= R || y >= C || grid[x][y] !== "1") continue;
        const a = find(r * C + c);
        const b = find(x * C + y);
        if (a === b) {
          steps.push({ line: ["cell", "pair"], note: `(${r}, ${c}) and (${x}, ${y}) touch, but both already have root ${a}: same island. Nothing to do.`, view: view({ pair: [[r, c], [x, y]] }) });
          continue;
        }
        parent[a] = b;
        count--;
        steps.push({ line: ["cell", "pair", "join"], note: `(${r}, ${c}) and (${x}, ${y}) touch and have roots ${a} and ${b}: two islands become one. parent[${a}] = ${b}, count = ${count}.`, view: view({ pair: [[r, c], [x, y]], joined: true }) });
      }
    }
    steps.push({ line: "return", note: `Return ${count}. Each cell checks only down and right, so every touching pair is seen once: O(m·n) finds, O(m·n) space for parent.`, view: view({ done: true }) });
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
