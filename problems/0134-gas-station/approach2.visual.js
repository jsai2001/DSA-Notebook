// One pass: if the tank goes negative at i, no start from start..i works, so restart at i + 1.
DSAViz.register("0134-gas-station/approach2", {
  inputs: [
    { name: "gas", type: "int[]", value: "[1, 2, 3, 4, 5]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 20 },
    { name: "cost", type: "int[]", value: "[3, 4, 5, 1, 2]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 20 },
  ],
  trace({ gas, cost }) {
    if (gas.length !== cost.length) throw new DSAViz.InputError(`gas and cost need the same length (${gas.length} vs ${cost.length}): one pair per station.`);
    const n = gas.length;
    const gain = gas.map((g, i) => g - cost[i]);
    const steps = [];
    let total = 0;
    let tank = 0;
    let start = 0;
    const view = (o = {}) => {
      const marks = {};
      for (let i = start; i < (o.i ?? -1); i++) marks[i] = "window";
      if (o.i !== undefined) marks[o.i] = o.reset ? "cut" : "active";
      if (o.answer !== undefined && o.answer >= 0) marks[o.answer] = "match";
      return [
      { type: "array", label: "gas", values: gas, compact: true },
      { type: "array", label: "cost (to drive on to the next station)", values: cost, compact: true },
        { type: "array", label: "gas[i] - cost[i] (outlined = since the current start, red = tank went negative)", values: gain, compact: true, marks, pointers: { ...(o.i !== undefined ? { i: o.i } : {}), ...(start < n ? { start } : {}) } },
        { type: "vars", items: [{ name: "start", value: start < n ? start : `${start} (past the last station)`, mark: o.reset ? "new" : "" }, { name: "tank", value: tank, mark: o.reset ? "new" : "" }, { name: "total", value: total, mark: o.final ? (total >= 0 ? "match" : "cut") : "" }] },
      ];
    };
    steps.push({ line: "init", note: "Keep two sums: tank since the current start, and total over every station.", view: view() });
    for (let i = 0; i < n; i++) {
      total += gain[i];
      tank += gain[i];
      if (tank < 0) {
        const t = tank;
        const from = start;
        start = i + 1;
        tank = 0;
        steps.push({
          line: ["loop", "reset"],
          note:
            `Station ${i}: ${gain[i] >= 0 ? "+" : ""}${gain[i]}, tank = ${t} < 0, so from start ${from} we can't reach ${i + 1}. ` +
            (from < i ? `Starting anywhere from ${from} to ${i} is no better: we'd arrive at ${i} with less gas. ` : "") +
            `Restart at ${i + 1} with an empty tank.`,
          view: view({ i, reset: true }),
        });
      } else {
        steps.push({ line: "loop", note: `Station ${i}: ${gain[i] >= 0 ? "+" : ""}${gain[i]}, tank = ${tank}. Still fine.`, view: view({ i }) });
      }
    }
    const answer = total >= 0 ? start : -1;
    steps.push({
      line: "return",
      note: total >= 0
        ? `total = ${total} ≥ 0: there is enough gas overall, so the trip works from start ${start}. Return ${start}. One pass: O(n).`
        : `total = ${total} < 0: the whole circle needs more gas than there is, so no start works. Return -1.`,
      view: view({ answer, final: true }),
    });
    return steps;
  },
});
