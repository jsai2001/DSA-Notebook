// Dijkstra on "the highest cell so far": always expand the cell you can reach soonest; the first time you pop the corner is the answer.
(function () {
DSAViz.register("0778-swim-in-rising-water/approach2", {
  inputs: [{ name: "grid", type: "int[][]", value: "[[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]", maxRows: 5, maxCols: 5, minValue: 0, maxValue: 24 }],
  trace({ grid }) {
    const n = check(grid);
    let heap = [[grid[0][0], 0, 0]];
    const seen = new Set(["0,0"]);
    const done = new Set();
    const steps = [];
    const view = (o = {}) => {
      const m = {};
      seen.forEach((k) => (m[k] = "compare"));
      done.forEach((k) => (m[k] = "visited"));
      if (o.at) m[o.at] = o.end ? "match" : "active";
      return [gv(grid, m, "grid (dark = popped now, grey = done, yellow = in the heap)"), { type: "array", label: "heap: time (r,c), soonest first", values: heap.map(([t, r, c]) => `${t} (${r},${c})`), wide: true }];
    };
    steps.push({ line: "init", note: `Start at (0, 0) at time ${grid[0][0]}.`, view: view() });
    while (true) {
      heap.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
      const [t, r, c] = heap.shift();
      if (r === n - 1 && c === n - 1) { steps.push({ line: ["pop", "done"], note: `Return ${t}. Pop the far corner at time ${t}: no route can get there sooner. O(n² log n).`, view: view({ at: `${r},${c}`, end: true }) }); return steps; }
      done.add(`${r},${c}`);
      const pushed = [];
      for (const [x, y] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) if (x >= 0 && y >= 0 && x < n && y < n && !seen.has(`${x},${y}`)) { seen.add(`${x},${y}`); heap.push([Math.max(t, grid[x][y]), x, y]); pushed.push(`(${x},${y}) at ${Math.max(t, grid[x][y])}`); }
      steps.push({ line: ["pop", "done", "push"], note: `Pop (${r},${c}) at time ${t}.${pushed.length ? ` Push ${pushed.join(", ")}: the time is the higher of ${t} and the cell's height.` : ""}`, view: view({ at: `${r},${c}` }) });
    }
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
