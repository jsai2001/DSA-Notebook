// Two pointers: the sell day moves right; the buy day jumps to any day cheaper than it.
DSAViz.register("0121-best-time-to-buy-and-sell-stock/approach2", {
  inputs: [{ name: "prices", type: "int[]", value: "[7, 1, 5, 3, 6, 4]", minLength: 1, maxLength: 12, minValue: 0, maxValue: 20 }],
  trace({ prices }) {
    const steps = [];
    let buy = 0;
    let best = 0;
    let bestPair = null;
    const view = (sell, o = {}) => {
      const marks = {};
      if (o.final) {
        if (bestPair) { marks[bestPair[0]] = "match"; marks[bestPair[1]] = "match"; }
      } else {
        marks[buy] = "compare";
        if (sell < prices.length) marks[sell] = o.moved ? "compare" : "active";
      }
      const pointers = o.final ? {} : sell < prices.length && sell !== buy ? { buy, sell } : { buy };
      return [
        { type: "bars", label: "prices (orange = the buy day, dark = the sell day; green = the best trade)", values: prices, marks, pointers },
        { type: "vars", items: [{ name: "best", value: bestPair ? `${best} (day ${bestPair[0]} → day ${bestPair[1]})` : best, mark: o.better ? "match" : "" }] },
      ];
    };
    steps.push({ line: "init", note: `Start by buying on day 0 (price ${prices[0]}), best = 0.`, view: view(0) });
    for (let sell = 1; sell < prices.length; sell++) {
      if (prices[sell] < prices[buy]) {
        const old = buy;
        buy = sell;
        steps.push({ line: ["sell", "move"], note: `Day ${sell}: ${prices[sell]} is cheaper than the buy day's ${prices[old]}. Buying here is better for every later sale: move buy to day ${sell}.`, view: view(sell, { moved: true }) });
      } else {
        const profit = prices[sell] - prices[buy];
        const better = profit > best;
        if (better) { best = profit; bestPair = [buy, sell]; }
        steps.push({ line: ["sell", "profit"], note: `Day ${sell}: sell at ${prices[sell]} after buying at ${prices[buy]}: ${profit}.${better ? " New best." : ` best stays ${best}.`}`, view: view(sell, { better }) });
      }
    }
    steps.push({ line: "return", note: best ? `Return ${best} (day ${bestPair[0]} → day ${bestPair[1]}).` : "No sale beat 0: return 0.", view: view(prices.length, { final: true }) });
    return steps;
  },
});
