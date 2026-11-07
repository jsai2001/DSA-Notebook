// dp[i] = the most from the first i houses = max(dp[i - 1], dp[i - 2] + nums[i - 1]).
DSAViz.register("0198-house-robber/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, 7, 9, 3, 1]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 400 }],
  trace({ nums }) {
    const n = nums.length;
    const steps = [];
    const dp = Array(n + 1).fill(null);
    dp[0] = 0;
    dp[1] = nums[0];
    const view = (o = {}) => {
      const dm = {};
      if (o.i !== undefined) { dm[o.i - 1] = o.rob ? "" : "compare"; dm[o.i - 2] = o.rob ? "compare" : ""; dm[o.i] = "new"; }
      if (o.done) dm[n] = "match";
      return [
        { type: "array", label: "nums (dark = house i − 1, the one being decided)", values: nums, marks: o.i !== undefined ? { [o.i - 1]: o.rob ? "match" : "active" } : {} },
        { type: "array", label: "dp[i] = the most from the first i houses (yellow = new, and the value it came from)", values: dp.map((v) => (v === null ? "" : v)), marks: Object.fromEntries(Object.entries(dm).filter(([, v]) => v)) },
      ];
    };
    steps.push({ line: "init", note: `dp[0] = 0 (no houses) and dp[1] = ${nums[0]} (just house 0: rob it).`, view: view() });
    for (let i = 2; i <= n; i++) {
      const skip = dp[i - 1];
      const take = dp[i - 2] + nums[i - 1];
      dp[i] = Math.max(skip, take);
      steps.push({ line: ["loop", "choose"], note: `House ${i - 1} (${nums[i - 1]}): leave it → dp[${i - 1}] = ${skip}; rob it → dp[${i - 2}] + ${nums[i - 1]} = ${take}. dp[${i}] = ${dp[i]}.`, view: view({ i, rob: take > skip }) });
    }
    steps.push({ line: "return", note: `Return ${dp[n]}. One pass: O(n) time, O(n) for the table.`, view: view({ done: true }) });
    return steps;
  },
});
