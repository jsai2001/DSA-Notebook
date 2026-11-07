// The + numbers add to P = (sum + target) / 2. Count subsets with sum P using a 1-D knapsack DP.
(function () {
const sumOf = (a) => a.reduce((s, x) => s + x, 0);
const nv = (nums, marks = {}, label = "nums") => ({ type: "array", label, values: nums, marks });
DSAViz.register("0494-target-sum/approach3", {
  inputs: [
    { name: "nums", type: "int[]", value: "[1, 1, 1, 1, 1]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 40 },
    { name: "target", type: "int", value: "3", min: -1000, max: 1000 },
  ],
  trace({ nums, target }) {
    const total = sumOf(nums);
    if (total > 40) throw new DSAViz.InputError(`The numbers add up to ${total}; keep it at most 40 here so the table fits.`);
    const steps = [];
    if (Math.abs(target) > total || (total + target) % 2) {
      steps.push({ line: "init", note: Math.abs(target) > total ? `|${target}| > the sum ${total}: even all + or all − can't reach it. Return 0.` : `sum + target = ${total + target} is odd, but it must be 2·P. Return 0.`, view: [nv(nums)] });
      return steps;
    }
    const p = (total + target) / 2;
    const dp = Array(p + 1).fill(0);
    dp[0] = 1;
    const dv = (marks = {}) => ({ type: "array", label: "dp[s]: ways to pick numbers adding up to s", values: [...dp], marks, compact: true });
    steps.push({ line: "init", note: `The + numbers add to P and the − ones to N: P − N = ${target}, P + N = ${total}. So P = (${total} + ${target}) / 2 = ${p}. Count subsets that add up to ${p}.`, view: [nv(nums), dv({ 0: "match" })] });
    nums.forEach((x, i) => {
      const marks = {};
      for (let s = p; s >= x; s--) if (dp[s - x]) { dp[s] += dp[s - x]; marks[s] = "new"; }
      steps.push({ line: ["num", "fill"], note: `x = ${x}: for s from ${p} down to ${x}, dp[s] += dp[s − ${x}].${x === 0 ? " A 0 doubles every count: +0 and −0 are two different choices." : ""}`, view: [nv(nums, { [i]: "active" }), dv(marks)] });
    });
    steps.push({ line: "return", note: `Return ${dp[p]}: dp[${p}]. O(n · sum) time, O(sum) space.`, view: [dv({ [p]: "match" })] });
    return steps;
  },
});
})();
