// dp[i] = the longest increasing subsequence that ends at nums[i]: 1 + the best dp[j] over smaller nums[j] before i.
DSAViz.register("0300-longest-increasing-subsequence/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[10, 9, 2, 5, 3, 7, 101, 18]", minLength: 1, maxLength: 10, minValue: -10000, maxValue: 10000 }],
  trace({ nums }) {
    const n = nums.length;
    const dp = Array(n).fill(1);
    const steps = [{ line: "init", note: "dp[i] starts at 1: nums[i] on its own.", view: [{ type: "array", label: "nums", values: nums }, { type: "array", label: "dp[i]", values: dp.slice() }] }];
    for (let i = 0; i < n; i++) {
      let from = -1;
      for (let j = 0; j < i; j++) if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) { dp[i] = dp[j] + 1; from = j; }
      const smaller = nums.map((x, j) => (j < i && x < nums[i] ? j : -1)).filter((j) => j >= 0);
      steps.push({ line: ["end", "try"], note: smaller.length ? `End at nums[${i}] = ${nums[i]}: smaller values before it are ${smaller.map((j) => nums[j]).join(", ")}. The best is dp[${from}] + 1 = ${dp[i]}.` : `End at nums[${i}] = ${nums[i]}: nothing smaller comes before it, so dp[${i}] = 1.`, view: [{ type: "array", label: "nums (dark = i, yellow = smaller values before it, green = the best one to follow)", values: nums, marks: { ...Object.fromEntries(smaller.map((j) => [j, "compare"])), ...(from >= 0 ? { [from]: "match" } : {}), [i]: "active" } }, { type: "array", label: "dp[i]", values: dp.slice(), marks: { [i]: "new" } }] });
    }
    const ans = Math.max(...dp);
    steps.push({ line: "return", note: `Return ${ans}, the biggest dp value. Two nested loops: O(n²).`, view: [{ type: "array", label: "dp[i] (green = the biggest)", values: dp, marks: { [dp.indexOf(ans)]: "match" } }] });
    return steps;
  },
});
