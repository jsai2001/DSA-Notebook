// 1D DP: dp[a] = ways to make a. Coins in the outer loop, so each combination counts once.
DSAViz.register("0518-coin-change-ii/approach3", {
  inputs: [
    { name: "coins", type: "int[]", value: "[1, 2, 5]", minLength: 1, maxLength: 5, minValue: 1, maxValue: 20 },
    { name: "amount", type: "int", value: "5", min: 0, max: 15 },
  ],
  trace({ coins, amount }) {
    if (new Set(coins).size !== coins.length) {
      throw new DSAViz.InputError("coins must all be different (LeetCode guarantees this).");
    }
    const dp = Array(amount + 1).fill(0);
    dp[0] = 1;
    const used = []; // coins allowed so far
    const steps = [];
    const view = (opts = {}) => {
      const marks = {};
      if (opts.from !== undefined) marks[opts.from] = "compare";
      if (opts.a !== undefined) marks[opts.a] = opts.changed ? "new" : "active";
      if (opts.final) marks[amount] = "match";
      const pointers = {};
      if (opts.a !== undefined) pointers.a = opts.a;
      if (opts.from !== undefined) pointers["a - coin"] = opts.from;
      return [
        { type: "array", label: "dp[a] = ways to make a (index = a)", values: dp.slice(), marks, pointers },
        { type: "set", label: "coins allowed so far", items: used.slice(), marks: opts.coin !== undefined ? { [opts.coin]: "new" } : {} },
        {
          type: "vars",
          items: [
            { name: "coin", value: opts.coin === undefined ? "–" : opts.coin, mark: opts.coin !== undefined ? "active" : "" },
            { name: "amount", value: amount },
          ],
        },
      ];
    };

    steps.push({
      line: "init",
      note: `dp[a] counts the ways to make a. Start with dp[0] = 1 (the empty combination) and everything else 0: with no coins, nothing else can be made.`,
      view: view(),
    });

    for (const coin of coins) {
      used.push(coin);
      if (coin > amount) {
        steps.push({
          line: "coin",
          note: `Coin ${coin} is bigger than ${amount}, so it can't be part of any combination. dp doesn't change.`,
          view: view({ coin }),
        });
        continue;
      }
      steps.push({
        line: "coin",
        note: `Allow coin ${coin}. Walk a upward from ${coin}: every combination for a that uses a ${coin} is "a combination for a - ${coin}, plus one ${coin}". Going upward lets dp[a - ${coin}] already include ${coin}s, so the coin can be used many times.`,
        view: view({ coin }),
      });
      for (let a = coin; a <= amount; a++) {
        const before = dp[a];
        const add = dp[a - coin];
        dp[a] += add;
        steps.push({
          line: ["cell", "add"],
          note: add
            ? `dp[${a}] += dp[${a - coin}]: ${before} + ${add} = ${dp[a]}. The ${add} way${add === 1 ? "" : "s"} to make ${a - coin}, each plus one ${coin}.`
            : `dp[${a - coin}] is 0 (${a - coin} can't be made yet), so dp[${a}] stays ${before}.`,
          view: view({ coin, a, from: a - coin, changed: add > 0 }),
        });
      }
    }

    steps.push({
      line: "return",
      note: `Return dp[${amount}] = ${dp[amount]}. Because coins were added one at a time, each combination is counted once, in coin order (1+2+2 and 2+1+2 are the same).`,
      view: view({ final: true }),
    });
    return steps;
  },
});
