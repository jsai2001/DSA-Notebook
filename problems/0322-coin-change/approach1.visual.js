// fewest(a) = 1 + the best fewest(a - c) over every coin c that fits, remembered.
DSAViz.register("0322-coin-change/approach1", {
  inputs: [
    { name: "coins", type: "int[]", value: "[1, 2, 5]", minLength: 1, maxLength: 5, minValue: 1, maxValue: 20 },
    { name: "amount", type: "int", value: "11", min: 0, max: 20 },
  ],
  trace({ coins, amount }) {
    if (new Set(coins).size !== coins.length) throw new DSAViz.InputError("Each coin value appears once.");
    const memo = Array(amount + 1).fill(null);
    memo[0] = 0;
    const steps = [];
    const fmt = (v) => (v === null ? "?" : v === Infinity ? "∞" : v);
    const view = (a, o = {}) => [{ type: "array", label: "memo[a] = fewest coins for a (? = not known yet, ∞ = impossible)", values: memo.map(fmt), marks: a !== undefined ? { [a]: o.hit ? "match" : "new" } : {} }];
    steps.push({ line: "init", note: `Ask fewest(${amount}). fewest(0) = 0.`, view: view() });
    const MAX = 80; let hidden = 0;
    const fewest = (a) => {
      if (a === 0) return 0;
      if (memo[a] !== null) { if (steps.length < MAX) steps.push({ line: ["call", "memo"], note: `fewest(${a}) is known: ${fmt(memo[a])}.`, view: view(a, { hit: true }) }); else hidden++; return memo[a]; }
      let best = Infinity, from = null;
      for (const c of coins) if (c <= a) { const r = 1 + fewest(a - c); if (r < best) { best = r; from = c; } }
      memo[a] = best;
      if (steps.length < MAX) steps.push({ line: ["call", "base", "memo", "try"], note: best === Infinity ? `fewest(${a}): no coin leads to a solvable amount: ∞.` : `fewest(${a}): best last coin is ${from}, so 1 + fewest(${a - from}) = ${best}.`, view: view(a) }); else hidden++;
      return best;
    };
    const ans = fewest(amount);
    steps.push({ line: "return", note: `Return ${ans === Infinity ? -1 : ans}.${hidden ? ` (${hidden} steps not shown.)` : ""} Each amount is worked out once, trying every coin: O(amount · coins).`, view: view(amount, { hit: true }) });
    return steps;
  },
});
