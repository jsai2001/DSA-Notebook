// dp[a] = the fewest coins for a, built from 0 upward: dp[a] = 1 + min(dp[a - c]) over the coins that fit.
DSAViz.register("0322-coin-change/approach3", {
  inputs: [
    { name: "coins", type: "int[]", value: "[1, 2, 5]", minLength: 1, maxLength: 5, minValue: 1, maxValue: 20 },
    { name: "amount", type: "int", value: "11", min: 0, max: 20 },
  ],
  trace({ coins, amount }) {
    if (new Set(coins).size !== coins.length) throw new DSAViz.InputError("Each coin value appears once.");
    const INF = amount + 1;
    const dp = [0, ...Array(amount).fill(INF)];
    const fmt = (v) => (v === INF ? "∞" : v);
    const steps = [{ line: "init", note: `dp[0] = 0; every other amount starts at "impossible" (${INF} coins, shown as ∞).`, view: [{ type: "array", label: "dp[a]", values: dp.map(fmt) }] }];
    for (let a = 1; a <= amount; a++) {
      let from = null;
      for (const c of coins) if (c <= a && dp[a - c] + 1 < dp[a]) { dp[a] = dp[a - c] + 1; from = c; }
      steps.push({ line: ["amount", "try"], note: from === null ? `dp[${a}]: no coin gives a solvable remainder: stays ∞.` : `dp[${a}] = dp[${a - from}] + 1 = ${dp[a]} (last coin ${from}).`, view: [{ type: "array", label: "dp[a] (yellow = new, green = the amount it came from)", values: dp.map(fmt), marks: from === null ? { [a]: "cut" } : { [a]: "new", [a - from]: "match" } }] });
    }
    const ans = dp[amount] <= amount ? dp[amount] : -1;
    steps.push({ line: "return", note: `Return ${ans}. amount × coins steps: O(amount · coins) time, O(amount) space.`, view: [{ type: "array", label: "dp[a]", values: dp.map(fmt), marks: { [amount]: ans < 0 ? "cut" : "match" } }] });
    return steps;
  },
});
