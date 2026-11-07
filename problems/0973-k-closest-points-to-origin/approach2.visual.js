// Max-heap of the k closest so far: push each point, and drop the farthest whenever there are more than k.
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
DSAViz.register("0973-k-closest-points-to-origin/approach2", {
  inputs: INPUTS,
  trace({ points, k }) {
    check(points, k);
    const heap = [];
    const more = (a, b) => dist(a) > dist(b);
    const up = () => { let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (!more(heap[i], heap[p])) break; [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } };
    const down = () => { let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < heap.length && more(heap[l], heap[m])) m = l; if (r < heap.length && more(heap[r], heap[m])) m = r; if (m === i) break; [heap[i], heap[m]] = [heap[m], heap[i]]; i = m; } };
    const hv = (marks = {}) => ({ type: "tree", label: "max-heap by d² (farthest on top); caption = point", values: heap.map(dist), captions: Object.fromEntries(heap.map(([x, y], i) => [i, `(${x},${y})`])), marks });
    const steps = [{ line: "init", note: `Keep the ${k} closest so far in a max-heap: the farthest of them is on top.`, view: [pv(points, "points"), hv()] }];
    points.forEach((p, i) => {
      heap.push(p); up();
      steps.push({ line: "push", note: `Push (${p}), d² = ${dist(p)}.`, view: [pv(points, "points", { [i]: "active" }), hv()] });
      if (heap.length > k) {
        const top = heap[0];
        steps.push({ line: "pop", note: `${heap.length} > k = ${k}: drop the top, (${top}), the farthest (d² = ${dist(top)}).`, view: [pv(points, "points"), hv({ 0: "cut" })] });
        heap[0] = heap[heap.length - 1]; heap.pop(); down();
      }
    });
    steps.push({ line: "return", note: `Return ${show(heap)}: what's left. The heap never holds more than k + 1: O(n log k).`, view: [hv(Object.fromEntries(heap.map((_, i) => [i, "match"])))] });
    return steps;
  },
});
})();
