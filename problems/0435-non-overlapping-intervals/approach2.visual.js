// Sort by start. On an overlap one interval must go: drop the one that ends later, since it blocks more.
(function () {
const INPUT = [{ name: "intervals", type: "int[][]", value: "[[1, 2], [2, 3], [3, 4], [1, 3]]", maxRows: 8, maxCols: 2, minValue: -100, maxValue: 100 }];
function check(iv) {
  if (!iv.length) throw new DSAViz.InputError("Give at least one interval.");
  if (iv.some((x) => x.length !== 2)) throw new DSAViz.InputError("Each interval is [start, end], like [[1, 2], [2, 3]].");
  if (iv.some(([s, e]) => s >= e)) throw new DSAViz.InputError("Each interval needs start < end.");
}
const ivv = (iv, label, marks = {}, sub) => ({ type: "array", label, values: iv.map(([s, e]) => `[${s}, ${e}]`), wide: true, marks, sub });
DSAViz.register("0435-non-overlapping-intervals/approach2", {
  inputs: INPUT,
  trace({ intervals }) {
    check(intervals);
    const iv = [...intervals].sort((a, b) => a[0] - b[0]);
    let removed = 0, end = iv[0][1], last = 0;
    const marks = { 0: "match" };
    const vars = (mark) => ({ type: "vars", items: [{ name: "end", value: end, mark }, { name: "removed", value: removed }] });
    const steps = [{ line: "init", note: `Sort by start. Keep [${iv[0]}] for now: end = ${end}.`, view: [ivv(iv, "sorted by start; green = kept, red = removed", { ...marks }), vars()] }];
    for (let i = 1; i < iv.length; i++) {
      const [s, e] = iv[i];
      if (s >= end) { const was = end; end = e; marks[i] = "match"; last = i; steps.push({ line: ["scan", "keep"], note: `[${s}, ${e}] starts at ${s} ≥ ${was}: no overlap. Keep it; end = ${e}.`, view: [ivv(iv, "sorted by start; green = kept, red = removed", { ...marks, [i]: "new" }), vars("new")] }); continue; }
      removed++;
      if (e < end) { marks[last] = "cut"; marks[i] = "match"; steps.push({ line: ["scan", "drop"], note: `[${s}, ${e}] overlaps [${iv[last]}]. Remove [${iv[last]}]: it ends later (${end} > ${e}). end = ${e}.`, view: [ivv(iv, "sorted by start; green = kept, red = removed", { ...marks, [i]: "new" }), vars("new")] }); end = e; last = i; }
      else { marks[i] = "cut"; steps.push({ line: ["scan", "drop"], note: `[${s}, ${e}] overlaps [${iv[last]}] and ends no sooner (${e} ≥ ${end}). Remove it.`, view: [ivv(iv, "sorted by start; green = kept, red = removed", { ...marks }), vars()] }); }
    }
    steps.push({ line: "return", note: `Return ${removed}. One pass after the sort: O(n log n).`, view: [ivv(iv, "sorted by start; green = kept, red = removed", { ...marks }), vars()] });
    return steps;
  },
});
})();
