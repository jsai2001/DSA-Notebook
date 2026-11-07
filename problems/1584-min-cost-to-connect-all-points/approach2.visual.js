// Prim with a heap: grow one tree from point 0, always attaching the cheapest new point; skip old heap entries.
(function () {
DSAViz.register("1584-min-cost-to-connect-all-points/approach2", {
  inputs: [{ name: "points", type: "int[][]", value: "[[0, 0], [2, 2], [3, 6], [5, 2], [6, 0]]", maxRows: 6, maxCols: 2, minValue: 0, maxValue: 6 }],
  trace({ points }) {
    checkPoints(points);
    const n = points.length;
    const steps = [];
    const inTree = Array(n).fill(false);
    let heap = [[0, 0, -1]];
    let total = 0;
    let added = 0;
    const tree = [];
    const view = (o = {}) => {
      const pm = {};
      inTree.forEach((t, k) => t && (pm[k] = "match"));
      if (o.u !== undefined) pm[o.u] = o.stale ? "cut" : "new";
      return [
        board(points, pm, "points (green = in the tree, yellow = just added, red = popped again, skipped)"),
        { type: "array", label: "heap (cost: point, via), cheapest first", values: heap.map(([d, v, f]) => `${d}: P${v}${f >= 0 ? ` via P${f}` : ""}`), wide: true, marks: Object.fromEntries(heap.map((h, k) => [k, inTree[h[1]] ? "ghost" : ""])) },
        { type: "array", label: "tree edges so far", values: tree, wide: true },
        { type: "vars", items: [{ name: "total", value: total }, { name: "heap size", value: heap.length }] },
      ];
    };
    steps.push({ line: "init", note: "Start the tree at P0: put (0, P0) on the heap.", view: view() });
    while (added < n) {
      const [d, u, from] = heap.shift();
      if (inTree[u]) {
        steps.push({ line: ["pop", "stale"], note: `Pop (${d}, P${u}): P${u} is already in the tree, by a cheaper edge. Skip this old entry.`, view: view({ u, stale: true }) });
        continue;
      }
      inTree[u] = true;
      total += d;
      added++;
      if (from >= 0) tree.push(`P${from}–P${u} (${d})`);
      const offered = [];
      for (let v = 0; v < n; v++) if (!inTree[v]) { heap.push([dist(points[u], points[v]), v, u]); offered.push(`P${v}`); }
      heap.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      steps.push({
        line: ["pop", "stale", "add", "push"],
        note: `Pop (${d}, P${u}): the cheapest way to grow the tree. Add P${u}${from >= 0 ? ` via P${from}` : ""}; total = ${total}.${offered.length ? ` Push an edge from P${u} to each point outside: ${offered.join(", ")}.` : ""}`,
        view: view({ u }),
      });
    }
    steps.push({ line: "return", note: `Return ${total}. Every pair can end up in the heap, so it's O(n² log n) time and up to O(n²) memory.`, view: view() });
    return steps;
  },
});

const dist = (p, q) => Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]);
function checkPoints(points) {
  if (points.some((p) => p.length !== 2)) throw new DSAViz.InputError("Each point is [x, y], like [[0, 0], [2, 2]].");
  if (new Set(points.map((p) => p.join(","))).size !== points.length) throw new DSAViz.InputError("All points must be different.");
}
// The points drawn on a small board: each cell shows the point's index.
function board(points, marks, label) {
  const W = Math.max(...points.map((p) => p[0]));
  const H = Math.max(...points.map((p) => p[1]));
  const at = {};
  points.forEach((p, k) => (at[p.join(",")] = k));
  const ys = [];
  for (let y = H; y >= 0; y--) ys.push(y);
  const xs = [...Array(W + 1).keys()];
  const m = {};
  ys.forEach((y, r) => xs.forEach((x) => { const k = at[`${x},${y}`]; if (k === undefined) m[`${r},${x}`] = "ghost"; else if (marks[k]) m[`${r},${x}`] = marks[k]; }));
  return { type: "grid", label, rows: ys, cols: xs, corner: "y \\ x", cells: ys.map((y) => xs.map((x) => (at[`${x},${y}`] === undefined ? "" : `P${at[`${x},${y}`]}`))), marks: m };
}
})();
