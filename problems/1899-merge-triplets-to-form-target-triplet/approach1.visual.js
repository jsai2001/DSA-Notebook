// Keep every triplet that merging some of them can make; check whether the target shows up.
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
DSAViz.register("1899-merge-triplets-to-form-target-triplet/approach1", {
  inputs: INPUTS,
  trace({ triplets, target }) {
    check(triplets);
    const key = (t) => t.join(", ");
    const seen = new Map();
    const want = key(target);
    const sv = (fresh = []) => ({ type: "set", label: `reachable triplets (${seen.size})`, items: [...seen.keys()].map((k) => `[${k}]`), marks: Object.fromEntries(fresh.map((k) => [`[${k}]`, k === want ? "match" : "new"])) });
    const steps = [{ line: "init", note: `Nothing merged yet. Target [${want}].`, view: [tv(triplets, "triplets"), sv()] }];
    for (let i = 0; i < triplets.length; i++) {
      const t = triplets[i];
      const fresh = [];
      const add = (x) => { const k = key(x); if (!seen.has(k)) { seen.set(k, x); fresh.push(k); } };
      const old = [...seen.values()];
      add(t);
      for (const s of old) add(s.map((v, k) => Math.max(v, t[k])));
      if (seen.has(want)) {
        steps.push({ line: ["add", "found"], note: `Add [${key(t)}] alone and merged into each one so far. [${want}] is reachable. Return true.`, view: [tv(triplets, "triplets", { [i]: "active" }), sv(fresh)] });
        steps.push({ line: "found", note: `Return true. The set can grow to n³ triplets: slow for big n.`, view: [sv([want])] });
        return steps;
      }
      steps.push({ line: "add", note: `Add [${key(t)}] alone and merged into each one so far: ${fresh.length} new.`, view: [tv(triplets, "triplets", { [i]: "active" }), sv(fresh)] });
    }
    steps.push({ line: "return", note: `Return false. [${want}] never appeared. The set can grow to n³ triplets: slow for big n.`, view: [sv()] });
    return steps;
  },
});
})();
