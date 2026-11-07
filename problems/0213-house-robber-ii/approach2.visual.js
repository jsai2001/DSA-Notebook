// Two DP tables: one for houses 0..n-2, one for houses 1..n-1. dp[i] = max(dp[i-1], dp[i-2] + house).
(function () {
DSAViz.register("0213-house-robber-ii/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, 7, 9, 3, 1]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 1000 }],
  trace({ nums }) {
    const n = nums.length;
    const steps = [];
    if (n === 1) {
      steps.push({ line: ["init", "one"], note: `Return ${nums[0]}. One house has no neighbours: rob it.`, view: [street(nums, 0, 0)] });
      return steps;
    }
    const results = [];
    steps.push({ line: "init", note: "House 0 and the last house touch. Solve the street once without the last house, once without the first.", view: [street(nums, 0, n - 1)] });
    for (const [lo, hi] of [[0, n - 2], [1, n - 1]]) {
      const m = hi - lo + 1;
      const dp = Array(m + 1).fill(null);
      dp[0] = 0;
      dp[1] = nums[lo];
      const dpView = (mk) => ({ type: "array", label: "dp[i] = the most from the first i houses of this pass", values: dp.map((v) => (v === null ? "" : v)), marks: mk });
      steps.push({ line: "range", note: `${passName(lo, n)[0].toUpperCase()}${passName(lo, n).slice(1)}. dp[0] = 0, dp[1] = ${nums[lo]}.`, view: [street(nums, lo, hi), dpView({ 1: "new" })] });
      for (let i = 2; i <= m; i++) {
        const h = lo + i - 1;
        const skip = dp[i - 1], take = dp[i - 2] + nums[h];
        dp[i] = Math.max(skip, take);
        steps.push({ line: ["loop", "choose"], note: `House ${h} (${nums[h]}): leave it → ${skip}; rob it → dp[${i - 2}] + ${nums[h]} = ${take}. dp[${i}] = ${dp[i]}.`, view: [street(nums, lo, hi, { [h]: take > skip ? "match" : "active" }), dpView({ [i]: "new", [take > skip ? i - 2 : i - 1]: "compare" })] });
      }
      results.push(dp[m]);
      steps.push({ line: "range", note: `This pass gives dp[${m}] = ${dp[m]}.`, view: [street(nums, lo, hi), dpView({ [m]: "match" })] });
    }
    const ans = Math.max(...results);
    steps.push({ line: "answer", note: `Return ${ans} = max(${results[0]}, ${results[1]}). O(n) time, O(n) for each table.`, view: [street(nums, 0, n - 1), { type: "vars", items: [{ name: "pass 1", value: results[0], mark: results[0] === ans ? "match" : "" }, { name: "pass 2", value: results[1], mark: results[1] === ans ? "match" : "" }] }] });
    return steps;
  },
});

// nums with the left-out house dashed; extra marks on top.
const street = (nums, lo, hi, marks = {}, label) => ({ type: "array", label: label || "nums (the street is a circle: house 0 and the last house are neighbours; dashed = left out this pass)", values: nums, marks: { ...Object.fromEntries(nums.map((_, k) => [k, k < lo || k > hi ? "ghost" : ""]).filter(([, v]) => v)), ...marks } });
const passName = (lo, n) => (lo === 0 ? `pass 1: houses 0..${n - 2} (leave out the last)` : `pass 2: houses 1..${n - 1} (leave out the first)`);
})();
