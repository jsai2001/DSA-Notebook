// DP: keep[i] = most intervals you can keep ending with interval i (sorted by start). Remove the rest.
(function () {
const INPUT = [{ name: "intervals", type: "int[][]", value: "[[1, 2], [2, 3], [3, 4], [1, 3]]", maxRows: 8, maxCols: 2, minValue: -100, maxValue: 100 }];
function check(iv) {
  if (!iv.length) throw new DSAViz.InputError("Give at least one interval.");
  if (iv.some((x) => x.length !== 2)) throw new DSAViz.InputError("Each interval is [start, end], like [[1, 2], [2, 3]].");
  if (iv.some(([s, e]) => s >= e)) throw new DSAViz.InputError("Each interval needs start < end.");
}
const ivv = (iv, label, marks = {}, sub) => ({ type: "array", label, values: iv.map(([s, e]) => `[${s}, ${e}]`), wide: true, marks, sub });
DSAViz.register("0435-non-overlapping-intervals/approach1", {
  inputs: INPUT,
  trace({ intervals }) {
    check(intervals);
    const iv = [...intervals].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const n = iv.length, keep = Array(n).fill(1);
    const steps = [{ line: "init", note: "Sort by start. keep[i] will be the most intervals that fit together, ending with interval i.", view: [ivv(iv, "sorted by start; caption = keep[i]", {}, keep.map(() => "·"))] }];
    for (let i = 0; i < n; i++) {
      const fits = [];
      for (let j = 0; j < i; j++) if (iv[j][1] <= iv[i][0]) { fits.push(j); keep[i] = Math.max(keep[i], keep[j] + 1); }
      steps.push({ line: "dp", note: fits.length ? `[${iv[i]}]: intervals ${fits.map((j) => `[${iv[j]}]`).join(", ")} end by ${iv[i][0]}. keep[${i}] = 1 + the best of them = ${keep[i]}.` : `[${iv[i]}]: nothing before it ends by ${iv[i][0]}. keep[${i}] = 1.`, view: [ivv(iv, "sorted by start; caption = keep[i]", { [i]: "active", ...Object.fromEntries(fits.map((j) => [j, "compare"])) }, keep.map((v, k) => (k <= i ? String(v) : "·")))] });
    }
    const best = Math.max(...keep);
    steps.push({ line: "return", note: `Return ${n - best}. At most ${best} fit together, so remove ${n} − ${best}. Every pair is compared: O(n²).`, view: [ivv(iv, "sorted by start; caption = keep[i]", {}, keep.map(String))] });
    return steps;
  },
});
})();
