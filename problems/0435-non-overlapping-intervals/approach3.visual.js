// Sort by end. Keep every interval that starts after the last kept one ends: the earliest end leaves the most room.
(function () {
const INPUT = [{ name: "intervals", type: "int[][]", value: "[[1, 2], [2, 3], [3, 4], [1, 3]]", maxRows: 8, maxCols: 2, minValue: -100, maxValue: 100 }];
function check(iv) {
  if (!iv.length) throw new DSAViz.InputError("Give at least one interval.");
  if (iv.some((x) => x.length !== 2)) throw new DSAViz.InputError("Each interval is [start, end], like [[1, 2], [2, 3]].");
  if (iv.some(([s, e]) => s >= e)) throw new DSAViz.InputError("Each interval needs start < end.");
}
const ivv = (iv, label, marks = {}, sub) => ({ type: "array", label, values: iv.map(([s, e]) => `[${s}, ${e}]`), wide: true, marks, sub });
DSAViz.register("0435-non-overlapping-intervals/approach3", {
  inputs: INPUT,
  trace({ intervals }) {
    check(intervals);
    const iv = [...intervals].sort((a, b) => a[1] - b[1]);
    let kept = 0, end = -Infinity;
    const marks = {};
    const vars = (mark) => ({ type: "vars", items: [{ name: "end", value: end === -Infinity ? "−∞" : end, mark }, { name: "kept", value: kept, mark }] });
    const steps = [{ line: "init", note: "Sort by end. Nothing kept yet: end = −∞.", view: [ivv(iv, "sorted by end; green = kept, grey = removed"), vars()] }];
    iv.forEach(([s, e], i) => {
      if (s >= end) { kept++; marks[i] = "match"; const was = end; end = e; steps.push({ line: ["scan", "keep"], note: `[${s}, ${e}] starts at ${s} ≥ ${was === -Infinity ? "−∞" : was}: keep it. Of what's left, it ends first, so it leaves the most room. end = ${e}.`, view: [ivv(iv, "sorted by end; green = kept, grey = removed", { ...marks, [i]: "new" }), vars("new")] }); }
      else { marks[i] = "visited"; steps.push({ line: "scan", note: `[${s}, ${e}] starts before ${end}: it overlaps the last kept one. Skip it (removed).`, view: [ivv(iv, "sorted by end; green = kept, grey = removed", { ...marks, [i]: "cut" }), vars()] }); }
    });
    steps.push({ line: "return", note: `Return ${iv.length - kept}: ${iv.length} intervals, ${kept} kept. O(n log n) for the sort.`, view: [ivv(iv, "sorted by end; green = kept, grey = removed", marks), vars()] });
    return steps;
  },
});
})();
