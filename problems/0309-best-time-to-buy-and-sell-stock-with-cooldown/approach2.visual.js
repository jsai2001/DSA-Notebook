// Three money columns per day: hold (have a share), sold (sold today), rest (free to buy). Each comes from yesterday's.
DSAViz.register("0309-best-time-to-buy-and-sell-stock-with-cooldown/approach2", {
  inputs: [{ name: "prices", type: "int[]", value: "[1, 2, 3, 0, 2]", minLength: 1, maxLength: 9, minValue: 0, maxValue: 1000 }],
  trace({ prices }) {
    const n = prices.length;
    const hold = Array(n).fill(null), sold = Array(n).fill(null), rest = Array(n).fill(null);
    hold[0] = -prices[0]; sold[0] = 0; rest[0] = 0;
    const show = (a) => a.map((v) => (v === null ? "" : v));
    const view = (i) => [{ type: "array", label: "prices (dark = today)", values: prices, marks: { [i]: "active" } }, { type: "grid", label: "money at the end of each day (yellow = today)", rows: ["hold", "sold", "rest"], cols: prices.map((_, k) => k), corner: "", cells: [show(hold), show(sold), show(rest)], marks: { [`0,${i}`]: "new", [`1,${i}`]: "new", [`2,${i}`]: "new" } }];
    const steps = [{ line: "init", note: `Day 0: buy (hold = −${prices[0]}) or do nothing (rest = 0). Nothing to sell yet.`, view: view(0) }];
    for (let i = 1; i < n; i++) {
      hold[i] = Math.max(hold[i - 1], rest[i - 1] - prices[i]);
      sold[i] = hold[i - 1] + prices[i];
      rest[i] = Math.max(rest[i - 1], sold[i - 1]);
      steps.push({ line: "day", note: `Day ${i} (${prices[i]}): hold = max(keep ${hold[i - 1]}, buy from rest ${rest[i - 1]} − ${prices[i]}) = ${hold[i]}. sold = ${hold[i - 1]} + ${prices[i]} = ${sold[i]}. rest = max(${rest[i - 1]}, yesterday's sold ${sold[i - 1]}) = ${rest[i]}.`, view: view(i) });
    }
    const ans = Math.max(sold[n - 1], rest[n - 1]);
    steps.push({ line: "return", note: `Return ${ans} = max(sold, rest) on the last day: you should end without a share. O(n) time and space.`, view: view(n - 1) });
    return steps;
  },
});
