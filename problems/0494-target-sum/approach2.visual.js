// Map each reachable running total to how many sign choices reach it. Each number splits every total into total ± x.
(function () {
const sumOf = (a) => a.reduce((s, x) => s + x, 0);
const nv = (nums, marks = {}, label = "nums") => ({ type: "array", label, values: nums, marks });
DSAViz.register("0494-target-sum/approach2", {
  inputs: [
    { name: "nums", type: "int[]", value: "[1, 1, 1, 1, 1]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 100 },
    { name: "target", type: "int", value: "3", min: -1000, max: 1000 },
  ],
  trace({ nums, target }) {
    let count = new Map([[0, 1]]);
    const cv = (marks = {}) => ({ type: "map", label: "total → ways to reach it", columns: ["total", "ways"], entries: [...count.keys()].sort((a, b) => a - b).map((k) => [k, count.get(k)]), marks });
    const steps = [{ line: "init", note: "Before any number: total 0, reached 1 way.", view: [nv(nums), cv()] }];
    nums.forEach((x, i) => {
      const nxt = new Map();
      for (const [t, c] of count) { nxt.set(t + x, (nxt.get(t + x) || 0) + c); nxt.set(t - x, (nxt.get(t - x) || 0) + c); }
      count = nxt;
      steps.push({ line: "step", note: `x = ${x}: every total t becomes t + ${x} and t − ${x}, carrying its count. ${count.size} different total${count.size > 1 ? "s" : ""} now.`, view: [nv(nums, { [i]: "active" }), cv(count.has(target) ? { [target]: "compare" } : {})] });
    });
    const r = count.get(target) || 0;
    steps.push({ line: "return", note: `Return ${r}: the count for total ${target}. At most 2·sum + 1 totals per step: O(n · sum).`, view: [cv(count.has(target) ? { [target]: "match" } : {})] });
    return steps;
  },
});
})();
