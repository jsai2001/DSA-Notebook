// BFS over amounts: level k holds every amount reachable with k coins. The first level that reaches amount wins.
DSAViz.register("0322-coin-change/approach2", {
  inputs: [
    { name: "coins", type: "int[]", value: "[1, 2, 5]", minLength: 1, maxLength: 5, minValue: 1, maxValue: 20 },
    { name: "amount", type: "int", value: "11", min: 0, max: 20 },
  ],
  trace({ coins, amount }) {
    if (new Set(coins).size !== coins.length) throw new DSAViz.InputError("Each coin value appears once.");
    const steps = [];
    if (amount === 0) { steps.push({ line: "base", note: "Return 0. Nothing to pay.", view: [{ type: "vars", items: [{ name: "amount", value: 0 }] }] }); return steps; }
    const seen = Array(amount + 1).fill(false); seen[0] = true;
    let queue = [0];
    const view = (o = {}) => [{ type: "array", label: `amounts 0..${amount} (green = reached; yellow = reached at this level)`, values: seen.map((_, a) => a), marks: Object.fromEntries(seen.map((s, a) => [a, (o.fresh || []).includes(a) ? "new" : s ? "match" : ""]).filter(([, m]) => m)) }, { type: "array", label: "queue: amounts at this level", values: queue.slice(), compact: true }];
    steps.push({ line: "init", note: "Start from 0 with no coins.", view: view() });
    for (let lvl = 1; queue.length; lvl++) {
      const next = [];
      for (const a of queue) for (const c of coins) { const b = a + c; if (b === amount) { steps.push({ line: ["level", "add", "found"], note: `Return ${lvl}. With coin ${c}, ${a} + ${c} = ${amount}. BFS reaches each amount with the fewest coins first.`, view: view({ fresh: [amount] }) }); return steps; } if (b < amount && !seen[b]) { seen[b] = true; next.push(b); } }
      queue = next;
      steps.push({ line: ["level", "add"], note: `${lvl} coin${lvl > 1 ? "s" : ""}: new amounts ${next.length ? next.join(", ") : "none"}.`, view: view({ fresh: next }) });
    }
    steps.push({ line: "none", note: `Return -1. Every reachable amount below ${amount} was tried; ${amount} can't be made.`, view: view() });
    return steps;
  },
});
