// best(i, holding): on day i, buy or wait (not holding); sell (then skip a day) or keep (holding). Remembered.
DSAViz.register("0309-best-time-to-buy-and-sell-stock-with-cooldown/approach1", {
  inputs: [{ name: "prices", type: "int[]", value: "[1, 2, 3, 0, 2]", minLength: 1, maxLength: 9, minValue: 0, maxValue: 1000 }],
  trace({ prices }) {
    const n = prices.length;
    const memo = [Array(n).fill(null), Array(n).fill(null)];
    const steps = [];
    const MAX = 100; let hidden = 0;
    const push = (s) => (steps.length < MAX ? steps.push(s) : hidden++);
    const view = (i, h, o = {}) => [{ type: "array", label: "prices (dark = day i)", values: prices, marks: i !== undefined && i < n ? { [i]: "active" } : {} }, { type: "grid", label: "memo: best profit from day i on (blank = not known yet)", rows: ["not holding", "holding"], cols: prices.map((_, k) => k), corner: "", cells: memo.map((r) => r.map((v) => (v === null ? "" : v))), marks: i !== undefined && i < n ? { [`${h},${i}`]: o.hit ? "match" : "new" } : {} }];
    push({ line: "init", note: "best(0, not holding): start with no share.", view: view() });
    const best = (i, h) => {
      if (i >= n) return 0;
      if (memo[h][i] !== null) { push({ line: ["call", "memo"], note: `best(${i}, ${h ? "holding" : "not holding"}) is known: ${memo[h][i]}.`, view: view(i, h, { hit: true }) }); return memo[h][i]; }
      let v, note;
      if (h) { const a = prices[i] + best(i + 2, 0), b = best(i + 1, 1); v = Math.max(a, b); note = `Day ${i}, holding: sell for ${prices[i]} and skip day ${i + 1} → ${a}, or keep → ${b}. Best ${v}.`; }
      else { const a = -prices[i] + best(i + 1, 1), b = best(i + 1, 0); v = Math.max(a, b); note = `Day ${i}, not holding: buy for ${prices[i]} → ${a}, or wait → ${b}. Best ${v}.`; }
      memo[h][i] = v;
      push({ line: ["call", "memo", h ? "sell" : "buy"], note, view: view(i, h) });
      return v;
    };
    const ans = best(0, 0);
    steps.push({ line: "return", note: `Return ${ans}${hidden ? ` (${hidden} steps not shown)` : ""}. 2n states, each worked out once: O(n).`, view: view(0, 0, { hit: true }) });
    return steps;
  },
});
