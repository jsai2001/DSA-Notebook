// Smallest interval first: it answers every query point inside it that's still unanswered. A skip pointer jumps over answered points.
(function () {
const INPUTS = [
  { name: "intervals", type: "int[][]", value: "[[1, 4], [2, 4], [3, 6], [4, 4]]", maxRows: 6, maxCols: 2, minValue: 1, maxValue: 99 },
  { name: "queries", type: "int[]", value: "[2, 3, 4, 5]", minLength: 1, maxLength: 6, minValue: 1, maxValue: 99 },
];
function check(iv) {
  if (!iv.length) throw new DSAViz.InputError("Give at least one interval.");
  if (iv.some((x) => x.length !== 2)) throw new DSAViz.InputError("Each interval is [left, right], like [[1, 4], [2, 4]].");
  if (iv.some(([l, r]) => l > r)) throw new DSAViz.InputError("Each interval needs left ≤ right.");
}
const ivv = (iv, label, marks = {}) => ({ type: "array", label, values: iv.map(([l, r]) => `[${l}, ${r}]`), wide: true, marks, sub: iv.map(([l, r]) => `size ${r - l + 1}`) });
const show = (a) => `[${a.join(", ")}]`;
DSAViz.register("1851-minimum-interval-to-include-each-query/approach2", {
  inputs: INPUTS,
  trace({ intervals, queries }) {
    check(intervals);
    const qs = [...new Set(queries)].sort((a, b) => a - b);
    const size = qs.map(() => -1);
    const iv = [...intervals].sort((a, b) => a[1] - a[0] - (b[1] - b[0]));
    const qv = (marks = {}) => ({ type: "array", label: "query points, sorted; caption = answer so far", values: qs, sub: size.map((v) => (v === -1 ? "?" : String(v))), marks });
    const steps = [{ line: "init", note: `Sort the ${qs.length} different query points. Sort the intervals by size, smallest first.`, view: [ivv(iv, "intervals, smallest first"), qv()] }];
    iv.forEach(([l, r], k) => {
      const got = [];
      qs.forEach((q, i) => { if (size[i] === -1 && l <= q && q <= r) { size[i] = r - l + 1; got.push(i); } });
      const marks = Object.fromEntries(qs.map((q, i) => [i, got.includes(i) ? "new" : size[i] !== -1 ? "visited" : ""]).filter(([, m]) => m));
      steps.push({ line: got.length ? ["interval", "fill"] : "interval", note: got.length ? `[${l}, ${r}], size ${r - l + 1}: no smaller interval is left, so it answers unanswered points ${got.map((i) => qs[i]).join(", ")}.` : `[${l}, ${r}], size ${r - l + 1}: every point inside it is already answered (or there are none). Skip.`, view: [ivv(iv, "intervals, smallest first", { [k]: "active" }), qv(marks)] });
    });
    const at = Object.fromEntries(qs.map((q, i) => [q, size[i]]));
    const ans = queries.map((q) => at[q]);
    steps.push({ line: "return", note: `Return ${show(ans)}, in the queries' order. Each point is answered once; the skip pointers (union-find) jump over answered ones: O(n log n + q log q).`, view: [qv()] });
    return steps;
  },
});
})();
