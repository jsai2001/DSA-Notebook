// 2D DP: dp[i][a] = ways to make a using only the first i coins.
DSAViz.register("0518-coin-change-ii/approach2", {
  inputs: [
    { name: "coins", type: "int[]", value: "[1, 2, 5]", minLength: 1, maxLength: 4, minValue: 1, maxValue: 20 },
    { name: "amount", type: "int", value: "5", min: 0, max: 12 },
  ],
  trace({ coins, amount }) {
    if (new Set(coins).size !== coins.length) {
      throw new DSAViz.InputError("coins must all be different (LeetCode guarantees this).");
    }
    const n = coins.length;
    const dp = Array.from({ length: n + 1 }, () => Array(amount + 1).fill(null)); // null = not filled
    for (let a = 0; a <= amount; a++) dp[0][a] = a === 0 ? 1 : 0;
    const steps = [];
    const rows = ["none", ...coins.map((c, k) => `+ ${c}`)];
    const cols = Array.from({ length: amount + 1 }, (_, a) => a);
    const view = (opts = {}) => {
      const marks = {};
      for (let r = 0; r <= n; r++) {
        for (let c = 0; c <= amount; c++) if (dp[r][c] === null) marks[`${r},${c}`] = "ghost";
      }
      if (opts.up) marks[`${opts.i - 1},${opts.a}`] = "compare";
      if (opts.left !== undefined) marks[`${opts.i},${opts.left}`] = "compare";
      if (opts.i !== undefined && opts.a !== undefined) marks[`${opts.i},${opts.a}`] = "active";
      if (opts.final) marks[`${n},${amount}`] = "match";
      return [
        {
          type: "grid",
          label: "dp[i][a]: rows = coins allowed (first i), columns = amount a",
          rows, cols, corner: "i \\ a",
          cells: dp.map((row) => row.map((v) => (v === null ? "" : v))),
          marks,
        },
        {
          type: "vars",
          items: [
            { name: "coin", value: opts.i ? coins[opts.i - 1] : "–", mark: opts.i ? "active" : "" },
            { name: "a", value: opts.a === undefined ? "–" : opts.a },
          ],
        },
      ];
    };

    steps.push({
      line: "init",
      note: `Row "none" uses no coins: there's 1 way to make 0 (take nothing) and 0 ways to make anything else. Each next row allows one more coin.`,
      view: view(),
    });

    for (let i = 1; i <= n; i++) {
      const coin = coins[i - 1];
      steps.push({
        line: "row",
        note: `Row ${i} also allows coin ${coin}. Each cell = ways that skip ${coin} (the cell above) + ways that use it at least once (the cell ${coin} to the left in this row).`,
        view: view({ i }),
      });
      for (let a = 0; a <= amount; a++) {
        const skip = dp[i - 1][a];
        const take = a >= coin ? dp[i][a - coin] : null;
        dp[i][a] = skip + (take || 0);
        const note =
          take === null
            ? `a = ${a} < ${coin}: coin ${coin} doesn't fit, so copy the cell above: ${skip}.`
            : `a = ${a}: skip ${coin} → ${skip} (above), use ${coin} → ${take} (dp[${i}][${a - coin}]). Total ${dp[i][a]}.`;
        steps.push({
          line: take === null ? ["cell", "skip"] : ["cell", "skip", "take"],
          note,
          view: view({ i, a, up: true, left: take === null ? undefined : a - coin }),
        });
      }
    }

    steps.push({
      line: "return",
      note: `Return dp[${n}][${amount}] = ${dp[n][amount]}: ways to make ${amount} with all coins allowed. Each row only reads itself and the row above, which is why Approach 3 can keep a single row.`,
      view: view({ final: true }),
    });
    return steps;
  },
});
