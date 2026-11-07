// Prim with an array: dist[v] is the cheapest edge from the tree to v. Each round, add the closest point, then update dist.
(function () {
DSAViz.register("1584-min-cost-to-connect-all-points/approach3", {
  inputs: [{ name: "points", type: "int[][]", value: "[[0, 0], [2, 2], [3, 6], [5, 2], [6, 0]]", maxRows: 6, maxCols: 2, minValue: 0, maxValue: 6 }],
  trace({ points }) {
    checkPoints(points);
    const n = points.length;
    const steps = [];
    const D = Array(n).fill(Infinity);
    const via = Array(n).fill(-1);
    D[0] = 0;
    const inTree = Array(n).fill(false);
    let total = 0;
    const tree = [];
    const view = (o = {}) => {
      const pm = {};
      inTree.forEach((t, k) => t && (pm[k] = "match"));
      if (o.u !== undefined) pm[o.u] = "new";
      const dm = {};
      inTree.forEach((t, k) => t && (dm[k] = "ghost"));
      (o.changed || []).forEach((k) => (dm[k] = "new"));
      if (o.u !== undefined) dm[o.u] = "active";
      return [
        board(points, pm, "points (green = in the tree, yellow = just added)"),
        { type: "array", label: "dist: cheapest edge from the tree to each point (∞ = none yet; dashed = in the tree; yellow = just lowered)", values: D.map((d, k) => `P${k}: ${d === Infinity ? "∞" : d}`), wide: true, marks: dm },
        { type: "array", label: "tree edges so far", values: tree, wide: true },
        { type: "vars", items: [{ name: "total", value: total }] },
      ];
    };
    steps.push({ line: "init", note: "dist[P0] = 0, every other point ∞. No heap: each round just scans dist.", view: view() });
    for (let round = 0; round < n; round++) {
      let u = -1;
      for (let v = 0; v < n; v++) if (!inTree[v] && (u === -1 || D[v] < D[u])) u = v;
      inTree[u] = true;
      total += D[u];
      if (via[u] >= 0) tree.push(`P${via[u]}–P${u} (${D[u]})`);
      const changed = [];
      for (let v = 0; v < n; v++) {
        if (inTree[v]) continue;
        const d = dist(points[u], points[v]);
        if (d < D[v]) { D[v] = d; via[v] = u; changed.push(v); }
      }
      steps.push({
        line: ["pick", "add", "relax"],
        note: `Round ${round + 1}: P${u} has the smallest dist (${round ? D[u] : 0}). Add it${via[u] >= 0 ? ` via P${via[u]}` : ""}; total = ${total}.${changed.length ? ` P${u} is closer to ${changed.map((k) => `P${k} (now ${D[k]})`).join(", ")}.` : ""}`,
        view: view({ u, changed }),
      });
    }
    steps.push({ line: "return", note: `Return ${total}. n rounds × a scan of n points: O(n²) time and only O(n) memory, the best fit when every pair is an edge.`, view: view() });
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
