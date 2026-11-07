// Only the last two dp values are needed: keep them as two and one.
DSAViz.register("0746-min-cost-climbing-stairs/approach3", {
  inputs: [{ name: "cost", type: "int[]", value: "[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]", minLength: 2, maxLength: 10, minValue: 0, maxValue: 999 }],
  trace({ cost }) {
    const n = cost.length;
    let two = 0, one = 0;
    const steps = [];
    const view = (o = {}) => [{ type: "array", label: "cost (green = the stair you step off)", values: cost, marks: o.from !== undefined ? { [o.from]: "match" } : {}, pointers: o.i !== undefined && o.i < n ? { i: o.i } : {} }, { type: "vars", items: [{ name: "two", value: two }, { name: "one", value: one, mark: o.i !== undefined ? "new" : o.done ? "match" : "" }] }];
    steps.push({ line: "init", note: "two = one = 0: steps 0 and 1 cost nothing to stand on.", view: view() });
    for (let i = 2; i <= n; i++) {
      const a = one + cost[i - 1], b = two + cost[i - 2];
      [two, one] = [one, Math.min(a, b)];
      steps.push({ line: ["loop", "choose"], note: `Step ${i}${i === n ? " (the top)" : ""}: min(one + cost[${i - 1}] = ${a}, two + cost[${i - 2}] = ${b}) = ${one}.`, view: view({ i, from: a <= b ? i - 1 : i - 2 }) });
    }
    steps.push({ line: "return", note: `Return ${one}. O(n) time, O(1) space.`, view: view({ done: true }) });
    return steps;
  },
});
