// Sort the points by squared distance and take the first k.
(function () {
const INPUTS = [
  { name: "points", type: "int[][]", value: "[[3, 3], [5, -1], [-2, 4], [1, 1], [0, -3], [4, 4]]", maxRows: 8, maxCols: 2, minValue: -99, maxValue: 99 },
  { name: "k", type: "int", value: "3", min: 1, max: 8 },
];
const dist = ([x, y]) => x * x + y * y;
function check(pts, k) {
  if (!pts.length || pts.some((p) => p.length !== 2)) throw new DSAViz.InputError("Each point is [x, y], like [[1, 3], [-2, 2]].");
  if (k > pts.length) throw new DSAViz.InputError(`k must be at most ${pts.length}, the number of points.`);
  const d = pts.map(dist).sort((a, b) => a - b);
  if (k < d.length && d[k - 1] === d[k]) throw new DSAViz.InputError(`The answer must be unique: places ${k} and ${k + 1} by distance are tied at ${d[k]}. Change k or the points.`);
}
const pv = (pts, label, marks = {}, extra = {}) => ({ type: "array", label, values: pts.map(([x, y]) => `(${x}, ${y})`), sub: pts.map((p) => `d² ${dist(p)}`), wide: true, marks, ...extra });
const show = (pts) => `[${pts.map(([x, y]) => `[${x}, ${y}]`).join(", ")}]`;
DSAViz.register("0973-k-closest-points-to-origin/approach1", {
  inputs: INPUTS,
  trace({ points, k }) {
    check(points, k);
    const order = [...points].sort((a, b) => dist(a) - dist(b));
    const steps = [{ line: "sort", note: "Compare squared distances x² + y²: same order as real distances, no square roots.", view: [pv(points, "points")] }];
    steps.push({ line: "sort", note: `Sorted by d², closest first.`, view: [pv(order, "sorted by distance", {}, { cut: k < order.length ? k : undefined })] });
    steps.push({ line: "return", note: `Return ${show(order.slice(0, k))}: the first ${k}. The sort makes it O(n log n).`, view: [pv(order, "sorted by distance", Object.fromEntries(order.slice(0, k).map((_, i) => [i, "match"])), { cut: k < order.length ? k : undefined })] });
    return steps;
  },
});
})();
