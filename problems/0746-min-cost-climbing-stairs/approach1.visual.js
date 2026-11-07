// reach(i) = the cheapest way to stand on step i = min(reach(i - 1) + cost[i - 1], reach(i - 2) + cost[i - 2]), remembered.
DSAViz.register("0746-min-cost-climbing-stairs/approach1", {
  inputs: [{ name: "cost", type: "int[]", value: "[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]", minLength: 2, maxLength: 10, minValue: 0, maxValue: 999 }],
  trace({ cost }) {
    const n = cost.length;
    const memo = Array(n + 1).fill(null);
    const open = [];
    const steps = [];
    const view = (o = {}) => [{ type: "array", label: "cost (the price to step off each stair; the top is past the end)", values: cost, marks: o.from || {} }, { type: "array", label: "memo[i] = reach(i) (? = not known yet; 0 and 1 are free starts)", values: memo.map((v, i) => (i <= 1 ? 0 : v === null ? "?" : v)), marks: o.i !== undefined ? { [o.i]: o.hit ? "match" : "new" } : {} }, { type: "array", label: "open calls reach(i)", values: open.map((i) => `reach(${i})`), wide: true }];
    steps.push({ line: "init", note: `The top is step ${n}. Start: reach(${n}).`, view: view() });
    const reach = (i) => {
      open.push(i);
      if (i <= 1) { open.pop(); return 0; }
      if (memo[i] !== null) { steps.push({ line: ["call", "memo"], note: `reach(${i}) is already known: ${memo[i]}.`, view: view({ i, hit: true }) }); open.pop(); return memo[i]; }
      const a = reach(i - 1) + cost[i - 1];
      const b = reach(i - 2) + cost[i - 2];
      memo[i] = Math.min(a, b);
      steps.push({ line: ["call", "base", "choose"], note: `reach(${i}) = min(from step ${i - 1}: ${a - cost[i - 1]} + ${cost[i - 1]} = ${a}, from step ${i - 2}: ${b - cost[i - 2]} + ${cost[i - 2]} = ${b}) = ${memo[i]}.`, view: view({ i, from: { [a <= b ? i - 1 : i - 2]: "match" } }) });
      open.pop();
      return memo[i];
    };
    const ans = reach(n);
    steps.push({ line: "return", note: `Return ${ans}. Each step is worked out once: O(n) time, O(n) memo and calls.`, view: view({ i: n, hit: true }) });
    return steps;
  },
});
