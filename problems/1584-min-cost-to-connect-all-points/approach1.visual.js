// Kruskal: sort all the edges, take the cheapest one that joins two separate groups, until n - 1 are taken.
(function () {
DSAViz.register("1584-min-cost-to-connect-all-points/approach1", {
  inputs: [{ name: "points", type: "int[][]", value: "[[0, 0], [2, 2], [3, 6], [5, 2], [6, 0]]", maxRows: 6, maxCols: 2, minValue: 0, maxValue: 6 }],
  trace({ points }) {
    checkPoints(points);
    const n = points.length;
    const steps = [];
    const edges = [];
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) edges.push([dist(points[i], points[j]), i, j]);
    edges.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
    const parent = [...Array(n).keys()];
    const find = (x) => { while (parent[x] !== x) x = parent[x]; return x; };
    const status = {};
    const tree = [];
    let total = 0;
    const view = (o = {}) => {
      const pm = {};
      if (o.e) { pm[o.e[1]] = o.ok ? "new" : "compare"; pm[o.e[2]] = o.ok ? "new" : "compare"; }
      return [
        board(points, pm, "points (yellow = the two ends of the edge being tried)"),
        { type: "array", label: "edges, cheapest first (distance: point–point; green = taken, red = would make a cycle)", values: edges.map(([d, i, j]) => `${d}: P${i}–P${j}`), wide: true, marks: { ...status, ...(o.k !== undefined ? { [o.k]: o.ok ? "match" : "cut" } : {}) } },
        { type: "array", label: "group of each point (same number = already connected)", values: [...Array(n).keys()].map((k) => `P${k}: ${find(k)}`), compact: true },
        { type: "vars", items: [{ name: "total", value: total, mark: o.ok ? "new" : "" }, { name: "edges taken", value: `${tree.length} of ${n - 1}` }] },
      ];
    };
    if (n === 1) { steps.push({ line: ["init", "return"], note: "One point: nothing to connect. Return 0.", view: view() }); return steps; }
    steps.push({ line: ["init", "edges", "sort"], note: `Every pair of points is an edge: ${edges.length} edges. Sort them by Manhattan distance |x1 − x2| + |y1 − y2|.`, view: view() });
    for (let k = 0; k < edges.length; k++) {
      const [d, i, j] = edges[k];
      const ri = find(i);
      const rj = find(j);
      if (ri === rj) {
        status[k] = "ghost";
        steps.push({ line: ["try", "skip"], note: `P${i}–P${j} (${d}): both already in the same group. Taking it would close a cycle: skip.`, view: view({ e: edges[k], k }) });
        continue;
      }
      parent[ri] = rj;
      total += d;
      tree.push(k);
      status[k] = "match";
      const done = tree.length === n - 1;
      steps.push({ line: done ? ["try", "take", "done"] : ["try", "take"], note: `P${i}–P${j} (${d}) joins two groups: take it. total = ${total}.${done ? ` That's ${n - 1} edges: every point is connected.` : ""}`, view: view({ e: edges[k], k, ok: true }) });
      if (done) break;
    }
    steps.push({ line: "return", note: `Return ${total}. Sorting all n(n − 1) / 2 edges costs O(n² log n) time and O(n²) memory.`, view: view() });
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
