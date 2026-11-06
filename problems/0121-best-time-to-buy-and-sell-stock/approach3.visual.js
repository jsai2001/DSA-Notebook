// One pass: sell today against the lowest price before today, then let today lower that price.
DSAViz.register("0121-best-time-to-buy-and-sell-stock/approach3", {
  inputs: [{ name: "prices", type: "int[]", value: "[7, 1, 5, 3, 6, 4]", minLength: 1, maxLength: 12, minValue: 0, maxValue: 20 }],
  trace({ prices }) {
    const steps = [];
    let lowest = Infinity;
    let lowAt = -1;
    let best = 0;
    let bestPair = null;
    const view = (i, o = {}) => {
      const marks = {};
      for (let k = 0; k < i; k++) marks[k] = "visited";
      if (lowAt >= 0) marks[lowAt] = "compare";
      if (o.pair) { marks[o.pair[0]] = "match"; marks[o.pair[1]] = "match"; }
      if (i < prices.length && !o.pair) marks[i] = "active";
      const pointers = {};
      if (i < prices.length) pointers.today = i;
      if (lowAt >= 0 && lowAt !== i) pointers.low = lowAt;
      return [
        { type: "bars", label: "prices (orange = lowest so far; green = the best trade)", values: prices, marks, pointers },
        { type: "vars", items: [{ name: "lowest", value: lowest === Infinity ? "∞" : lowest }, { name: "best", value: bestPair ? `${best} (day ${bestPair[0]} → day ${bestPair[1]})` : best, mark: o.better ? "match" : "" }] },
      ];
    };
    steps.push({ line: "init", note: "lowest = ∞ (no day seen yet), best = 0 (not trading).", view: view(-1) });
    prices.forEach((p, i) => {
      const profit = lowest === Infinity ? null : p - lowest;
      const better = profit !== null && profit > best;
      if (better) { best = profit; bestPair = [lowAt, i]; }
      steps.push({
        line: ["loop", "profit"],
        note: profit === null ? `Day 0, price ${p}: nothing to sell against yet.` : `Day ${i}, price ${p}: selling now makes ${p} − ${lowest} = ${profit}.${better ? " New best." : ` best stays ${best}.`}`,
        view: view(i, { better }),
      });
      if (p < lowest) {
        lowest = p;
        lowAt = i;
        steps.push({ line: "low", note: `${p} is the lowest so far: later days will sell against it.`, view: view(i) });
      }
    });
    steps.push({ line: "return", note: best ? `Return ${best}: buy on day ${bestPair[0]} at ${prices[bestPair[0]]}, sell on day ${bestPair[1]} at ${prices[bestPair[1]]}.` : "No sale beats 0: return 0.", view: view(prices.length, { pair: bestPair }) });
    return steps;
  },
});
