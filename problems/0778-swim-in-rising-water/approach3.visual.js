// Raise the water one unit at a time. At time t the cell of height t opens and joins its open neighbours (union-find).
(function () {
DSAViz.register("0778-swim-in-rising-water/approach3", {
  inputs: [{ name: "grid", type: "int[][]", value: "[[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]", maxRows: 5, maxCols: 5, minValue: 0, maxValue: 24 }],
  trace({ grid }) {
    const n = check(grid);
    const parent = [...Array(n * n).keys()];
    const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
    const where = Array(n * n);
    grid.forEach((row, r) => row.forEach((v, c) => (where[v] = r * n + c)));
    const steps = [];
    const view = (t, at) => {
      const root0 = find(0), m = {};
      grid.forEach((row, r) => row.forEach((v, c) => { if (v <= t) m[`${r},${c}`] = find(r * n + c) === root0 ? "match" : "compare"; }));
      if (at !== undefined) m[at] = "active";
      return [gv(grid, m, `grid at time ${t} (yellow = open, green = joined to (0, 0), dark = just opened)`), { type: "vars", items: [{ name: "t", value: t }] }];
    };
    for (let t = 0; t < n * n; t++) {
      const cell = where[t], r = Math.floor(cell / n), c = cell % n;
      const joined = [];
      for (const [x, y] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) if (x >= 0 && y >= 0 && x < n && y < n && grid[x][y] <= t) { parent[find(x * n + y)] = find(cell); joined.push(`(${x},${y})`); }
      if (find(0) === find(n * n - 1)) {
        steps.push({ line: ["open", "join", "done"], note: `Return ${t}. At time ${t}, (${r},${c}) opens${joined.length ? ` and joins ${joined.join(", ")}` : ""}: now (0, 0) and the far corner are in one group. O(n² · α).`, view: view(t, `${r},${c}`) });
        return steps;
      }
      steps.push({ line: ["open", "join"], note: `Time ${t}: (${r},${c}) opens.${joined.length ? ` Join it with the open neighbours ${joined.join(", ")}.` : " No open neighbour yet."}`, view: view(t, `${r},${c}`) });
    }
    return steps;
  },
});

function check(grid) {
  const n = grid.length;
  if (grid.some((r) => r.length !== n)) throw new DSAViz.InputError("The grid must be square (n × n).");
  const flat = grid.flat();
  if (new Set(flat).size !== n * n || flat.some((v) => v < 0 || v >= n * n)) throw new DSAViz.InputError(`The heights must be 0 to ${n * n - 1}, each exactly once.`);
  return n;
}
const gv = (grid, marks, label) => ({ type: "grid", label, rows: grid.map((_, k) => k), cols: grid[0].map((_, k) => k), corner: "r \\ c", cells: grid.map((r) => r.map(String)), marks });
const flood = (grid, t) => {
  const n = grid.length, seen = new Set();
  if (grid[0][0] > t) return seen;
  const st = [[0, 0]]; seen.add("0,0");
  while (st.length) { const [r, c] = st.pop(); for (const [x, y] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) if (x >= 0 && y >= 0 && x < n && y < n && !seen.has(`${x},${y}`) && grid[x][y] <= t) { seen.add(`${x},${y}`); st.push([x, y]); } }
  return seen;
};
})();
