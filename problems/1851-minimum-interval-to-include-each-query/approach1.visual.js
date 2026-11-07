// For each query, check every interval and keep the smallest one that contains it.
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
DSAViz.register("1851-minimum-interval-to-include-each-query/approach1", {
  inputs: INPUTS,
  trace({ intervals, queries }) {
    check(intervals);
    const ans = [];
    const av = () => ({ type: "array", label: "answers", values: ans.length ? [...ans] : ["—"], marks: ans.length ? { [ans.length - 1]: "new" } : { 0: "ghost" } });
    const steps = [{ line: "init", note: "Size of [l, r] is r − l + 1. For each query, look at every interval.", view: [ivv(intervals, "intervals"), av()] }];
    queries.forEach((q, k) => {
      let best = -1, bi = -1;
      const marks = {};
      intervals.forEach(([l, r], i) => { if (l <= q && q <= r) { marks[i] = "compare"; if (best === -1 || r - l + 1 < best) { best = r - l + 1; bi = i; } } else marks[i] = "visited"; });
      if (bi >= 0) marks[bi] = "match";
      ans.push(best);
      steps.push({ line: ["query", "check", "answer"], note: best === -1 ? `Query ${q}: no interval contains it. Answer −1.` : `Query ${q}: ${Object.values(marks).filter((m) => m !== "visited").length} interval(s) contain it (yellow). The smallest is [${intervals[bi]}], size ${best}.`, view: [ivv(intervals, `query ${q} (index ${k}); grey = doesn't contain it`, marks), av()] });
    });
    steps.push({ line: "return", note: `Return ${show(ans)}. Every query checks every interval: O(n · q).`, view: [av()] });
    return steps;
  },
});
})();
