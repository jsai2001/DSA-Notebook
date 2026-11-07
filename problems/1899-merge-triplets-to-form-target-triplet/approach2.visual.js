// Merge every triplet that's safe (no value above the target). That gets as close as possible; compare with the target.
(function () {
const INPUTS = [
  { name: "triplets", type: "int[][]", value: "[[2, 5, 3], [1, 8, 4], [1, 7, 5]]", maxRows: 6, maxCols: 3, minValue: 1, maxValue: 1000 },
  { name: "target", type: "int[]", value: "[2, 7, 5]", minLength: 3, maxLength: 3, minValue: 1, maxValue: 1000 },
];
function check(ts) {
  if (!ts.length) throw new DSAViz.InputError("Give at least one triplet.");
  if (ts.some((t) => t.length !== 3)) throw new DSAViz.InputError("Each triplet has 3 numbers, like [2, 5, 3].");
}
const tv = (ts, label, marks = {}) => ({ type: "array", label, values: ts.map((t) => `[${t.join(", ")}]`), wide: true, marks });
const safe = (t, g) => t[0] <= g[0] && t[1] <= g[1] && t[2] <= g[2];
DSAViz.register("1899-merge-triplets-to-form-target-triplet/approach2", {
  inputs: INPUTS,
  trace({ triplets, target }) {
    check(triplets);
    let merged = [0, 0, 0];
    const marks = {};
    const mv = (mark) => ({ type: "vars", items: [{ name: "merged", value: `[${merged.join(", ")}]`, mark }, { name: "target", value: `[${target.join(", ")}]` }] });
    const steps = [{ line: "init", note: "Merging takes the max of each position. Start from [0, 0, 0].", view: [tv(triplets, "triplets"), mv()] }];
    triplets.forEach((t, i) => {
      if (safe(t, target)) {
        merged = merged.map((v, k) => Math.max(v, t[k]));
        marks[i] = "match";
        steps.push({ line: ["scan", "merge"], note: `[${t.join(", ")}] is safe: every value ≤ the target's. Merge it in.`, view: [tv(triplets, "triplets; green = merged, red = skipped", { ...marks, [i]: "new" }), mv("new")] });
      } else {
        marks[i] = "cut";
        const k = [0, 1, 2].find((p) => t[p] > target[p]);
        steps.push({ line: "scan", note: `[${t.join(", ")}] has ${t[k]} > ${target[k]} at position ${k}. Merging it would overshoot for good. Skip.`, view: [tv(triplets, "triplets; green = merged, red = skipped", marks), mv()] });
      }
    });
    const ok = merged.every((v, k) => v === target[k]);
    steps.push({ line: "return", note: `Return ${ok}. [${merged.join(", ")}] ${ok ? "is" : "isn't"} the target. One pass: O(n).`, view: [mv(ok ? "match" : "cut")] });
    return steps;
  },
});
})();
