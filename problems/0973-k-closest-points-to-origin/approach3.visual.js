// Quickselect: partition around a random pivot until the pivot lands at place k − 1. Then the first k are the closest.
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
DSAViz.register("0973-k-closest-points-to-origin/approach3", {
  inputs: INPUTS,
  trace({ points, k }) {
    check(points, k);
    const d = points.map(dist);
    const idx = points.map((_, i) => i);
    let seed = 973;
    const rand = (lo, hi) => { seed = (seed * 1103515245 + 12345) % 2147483648; return lo + (seed % (hi - lo + 1)); };
    const iv = (marks = {}, extra = {}) => ({ type: "array", label: "points in the order being partitioned; caption = d²", values: idx.map((i) => `(${points[i]})`), sub: idx.map((i) => String(d[i])), wide: true, marks, ...extra });
    let lo = 0, hi = idx.length - 1;
    const steps = [{ line: "init", note: `Goal: the ${k} smallest d² in places 0 to ${k - 1}, in any order.`, view: [iv()] }];
    while (lo < hi) {
      const p = rand(lo, hi);
      [idx[p], idx[hi]] = [idx[hi], idx[p]];
      const pivot = d[idx[hi]];
      let store = lo;
      for (let i = lo; i < hi; i++) if (d[idx[i]] < pivot) { [idx[i], idx[store]] = [idx[store], idx[i]]; store++; }
      [idx[store], idx[hi]] = [idx[hi], idx[store]];
      const marks = {};
      for (let i = lo; i <= hi; i++) marks[i] = i < store ? "compare" : i === store ? "active" : "window";
      let note = `Places ${lo}–${hi}: random pivot (${points[idx[store]]}), d² ${pivot}. Closer ones (yellow) go left; the pivot lands at place ${store}.`;
      if (store === k - 1) { steps.push({ line: ["part", "keep"], note: `${note} That's place k − 1 = ${k - 1}: done.`, view: [iv(marks, { cut: k < idx.length ? k : undefined })] }); break; }
      if (store < k - 1) { note += ` ${store} < ${k - 1}: the rest of the answer is to the right.`; lo = store + 1; }
      else { note += ` ${store} > ${k - 1}: the answer is all to the left.`; hi = store - 1; }
      steps.push({ line: ["part", "keep"], note, view: [iv(marks)] });
    }
    const ans = idx.slice(0, k).map((i) => points[i]);
    steps.push({ line: "return", note: `Return ${show(ans)}: places 0 to ${k - 1}. Each round keeps one side, about half: O(n) on average.`, view: [iv(Object.fromEntries(ans.map((_, i) => [i, "match"])), { cut: k < idx.length ? k : undefined })] });
    return steps;
  },
});
})();
