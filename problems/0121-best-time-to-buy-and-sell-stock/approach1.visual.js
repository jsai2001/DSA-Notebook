// Every pair: buy on day i, sell on each later day j, keep the biggest difference.
DSAViz.register("0121-best-time-to-buy-and-sell-stock/approach1", {
  inputs: [{ name: "prices", type: "int[]", value: "[7, 1, 5, 3, 6, 4]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 20 }],
  trace({ prices }) {
    const n = prices.length;
    const steps = [];
    let best = 0;
    let bestPair = null;
    let tried = 0;
    const view = (i, j, o = {}) => {
      const marks = {};
      if (o.final) {
        if (bestPair) { marks[bestPair[0]] = "match"; marks[bestPair[1]] = "match"; }
      } else {
        marks[i] = "compare";
        if (j !== undefined) marks[j] = "active";
      }
      return [
        { type: "bars", label: "prices (orange = buy day, dark = sell day; green = the best trade)", values: prices, marks, pointers: o.final ? {} : j !== undefined ? { buy: i, sell: j } : { buy: i } },
        { type: "vars", items: [{ name: "pairs tried", value: tried }, { name: "best", value: bestPair ? `${best} (day ${bestPair[0]} → day ${bestPair[1]})` : best, mark: o.better ? "match" : "" }] },
      ];
    };
    steps.push({ line: "init", note: `best = 0. Try all ${(n * (n - 1)) / 2} pairs of a buy day and a later sell day.`, view: view(0) });
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        tried++;
        const p = prices[j] - prices[i];
        const better = p > best;
        if (better) { best = p; bestPair = [i, j]; }
        steps.push({ line: [j === i + 1 ? "buy" : "sell", "sell", "profit"], note: `Buy day ${i} (${prices[i]}), sell day ${j} (${prices[j]}): ${p}.${better ? " New best." : ""}`, view: view(i, j, { better }) });
      }
    }
    steps.push({ line: "return", note: `Return ${best}. ${tried} pairs for ${n} days: O(n²).`, view: view(0, undefined, { final: true }) });
    return steps;
  },
});
