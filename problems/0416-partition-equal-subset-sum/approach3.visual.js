// 1-D DP: dp[s] = some numbers so far add up to s. For each number, fill s from high to low so it's used once.
(function () {
function start(nums, steps, extra = []) {
  const total = nums.reduce((s, x) => s + x, 0);
  if (total > 40) throw new DSAViz.InputError(`The numbers add up to ${total}; keep it at most 40 here so the table fits.`);
  const nview = (marks = {}) => ({ type: "array", label: `nums (total ${total})`, values: nums, marks });
  if (total % 2) { steps.push({ line: "init", note: `The total ${total} is odd, so it can't split into two equal halves. Return false.`, view: [nview()] }); return null; }
  return { total, half: total / 2, nview };
}
DSAViz.register("0416-partition-equal-subset-sum/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 5, 11, 5]", minLength: 1, maxLength: 10, minValue: 1, maxValue: 40 }],
  trace({ nums }) {
    const steps = [];
    const s = start(nums, steps);
    if (!s) return steps;
    const { half, nview } = s;
    const dp = Array(half + 1).fill(false);
    dp[0] = true;
    const dv = (marks = {}) => ({ type: "array", label: "dp[s]: T = sum s is reachable", values: dp.map((v) => (v ? "T" : "·")), marks, compact: true });
    steps.push({ line: "init", note: `dp has slots 0 to ${half}. dp[0] = T: taking nothing sums to 0.`, view: [nview(), dv({ 0: "match" })] });
    for (let i = 0; i < nums.length; i++) {
      const x = nums[i];
      const marks = {};
      for (let v = half; v >= x; v--) if (dp[v - x] && !dp[v]) { dp[v] = true; marks[v] = "new"; }
      const fresh = Object.keys(marks).map(Number).sort((a, b) => a - b);
      if (dp[half]) marks[half] = "match";
      steps.push({ line: dp[half] ? ["num", "fill", "found"] : ["num", "fill"], note: `x = ${x}: for s from ${half} down to ${x}, dp[s] |= dp[s − ${x}]. ${fresh.length ? `New: ${fresh.join(", ")}.` : "Nothing new."} Going down means dp[s − ${x}] is still from before ${x}, so ${x} is used once.`, view: [nview({ [i]: "active" }), dv(marks)] });
      if (dp[half]) { steps.push({ line: "found", note: `Return true. dp[${half}] is T. O(n · sum) time, O(sum) space.`, view: [dv({ [half]: "match" })] }); return steps; }
    }
    steps.push({ line: "return", note: `Return false. dp[${half}] stayed empty. O(n · sum) time, O(sum) space.`, view: [dv({ [half]: "cut" })] });
    return steps;
  },
});
})();
