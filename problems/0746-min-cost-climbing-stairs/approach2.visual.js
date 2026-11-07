// dp[i] = the cheapest way to stand on step i. dp[0] = dp[1] = 0; build up to dp[n], the top.
DSAViz.register("0746-min-cost-climbing-stairs/approach2", {
  inputs: [{ name: "cost", type: "int[]", value: "[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]", minLength: 2, maxLength: 10, minValue: 0, maxValue: 999 }],
  trace({ cost }) {
    const n = cost.length;
    const dp = Array(n + 1).fill(null);
    dp[0] = dp[1] = 0;
    const steps = [];
    const view = (o = {}) => [{ type: "array", label: "cost (green = the stair you step off)", values: cost, marks: o.from !== undefined ? { [o.from]: "match" } : {} }, { type: "array", label: `dp[i] (index ${n} = the top; yellow = new)`, values: dp.map((v) => (v === null ? "" : v)), marks: o.i !== undefined ? { [o.i]: o.done ? "match" : "new" } : {} }];
    steps.push({ line: "init", note: "dp[0] = dp[1] = 0: you can start on either of the first two steps for free.", view: view() });
    for (let i = 2; i <= n; i++) {
      const a = dp[i - 1] + cost[i - 1], b = dp[i - 2] + cost[i - 2];
      dp[i] = Math.min(a, b);
      steps.push({ line: ["loop", "choose"], note: `dp[${i}] = min(dp[${i - 1}] + cost[${i - 1}] = ${a}, dp[${i - 2}] + cost[${i - 2}] = ${b}) = ${dp[i]}.`, view: view({ i, from: a <= b ? i - 1 : i - 2 }) });
    }
    steps.push({ line: "return", note: `Return ${dp[n]}. dp[${n}] is the top, one past the last stair. O(n) time and space.`, view: view({ i: n, done: true }) });
    return steps;
  },
});
