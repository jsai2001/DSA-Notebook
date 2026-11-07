// The same three states, kept in three variables. Buying only from rest is what enforces the cooldown.
DSAViz.register("0309-best-time-to-buy-and-sell-stock-with-cooldown/approach3", {
  inputs: [{ name: "prices", type: "int[]", value: "[1, 2, 3, 0, 2]", minLength: 1, maxLength: 9, minValue: 0, maxValue: 1000 }],
  trace({ prices }) {
    let hold = -prices[0], sold = 0, rest = 0;
    const vars = (mark) => ({ type: "vars", items: [{ name: "hold", value: hold, mark }, { name: "sold", value: sold, mark }, { name: "rest", value: rest, mark }] });
    const steps = [{ line: "init", note: `After day 0: hold = −${prices[0]} (bought), sold = 0, rest = 0.`, view: [{ type: "array", label: "prices", values: prices, marks: { 0: "active" } }, vars("")] }];
    for (let i = 1; i < prices.length; i++) {
      const p = prices[i];
      const nh = Math.max(hold, rest - p), ns = hold + p, nr = Math.max(rest, sold);
      const why = `hold = max(${hold}, ${rest} − ${p}), sold = ${hold} + ${p}, rest = max(${rest}, ${sold})`;
      [hold, sold, rest] = [nh, ns, nr];
      steps.push({ line: "day", note: `Day ${i} (${p}): ${why}. All three read yesterday's values.`, view: [{ type: "array", label: "prices (dark = today)", values: prices, marks: { [i]: "active" } }, vars("new")] });
    }
    steps.push({ line: "return", note: `Return ${Math.max(sold, rest)}. O(n) time, O(1) space.`, view: [{ type: "array", label: "prices", values: prices }, vars("match")] });
    return steps;
  },
});
