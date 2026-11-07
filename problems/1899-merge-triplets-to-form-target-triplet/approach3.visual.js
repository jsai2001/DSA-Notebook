// Among safe triplets, note which target positions some triplet hits exactly. All three hit: true.
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
DSAViz.register("1899-merge-triplets-to-form-target-triplet/approach3", {
  inputs: INPUTS,
  trace({ triplets, target }) {
    check(triplets);
    const hit = [false, false, false];
    const marks = {};
    const hv = () => ({ type: "array", label: "target; green = some safe triplet hits it", values: target, marks: Object.fromEntries(hit.map((h, k) => [k, h ? "match" : ""]).filter(([, m]) => m)) });
    const steps = [{ line: "init", note: "No position of the target hit yet.", view: [tv(triplets, "triplets"), hv()] }];
    for (let i = 0; i < triplets.length; i++) {
      const t = triplets[i];
      if (!safe(t, target)) { marks[i] = "cut"; steps.push({ line: "scan", note: `[${t.join(", ")}] goes over the target somewhere. Skip.`, view: [tv(triplets, "triplets", marks), hv()] }); continue; }
      const now = [0, 1, 2].filter((k) => t[k] === target[k] && !hit[k]);
      now.forEach((k) => (hit[k] = true));
      marks[i] = "match";
      if (hit.every(Boolean)) {
        steps.push({ line: ["scan", "hit", "return"], note: `[${t.join(", ")}] is safe${now.length ? ` and hits position${now.length > 1 ? "s" : ""} ${now.join(", ")}` : ""}. All three are hit: merging those triplets gives the target. Return true.`, view: [tv(triplets, "triplets", { ...marks, [i]: "new" }), hv()] });
        steps.push({ line: "return", note: "Return true. Stopped early; at most one pass: O(n).", view: [hv()] });
        return steps;
      }
      steps.push({ line: ["scan", "hit"], note: `[${t.join(", ")}] is safe. ${now.length ? `It hits position${now.length > 1 ? "s" : ""} ${now.join(", ")}.` : "It hits nothing new."}`, view: [tv(triplets, "triplets", { ...marks, [i]: "new" }), hv()] });
    }
    steps.push({ line: "return", note: `Return false. Position${hit.filter((h) => !h).length > 1 ? "s" : ""} ${[0, 1, 2].filter((k) => !hit[k]).join(", ")} never hit. O(n).`, view: [hv()] });
    return steps;
  },
});
})();
