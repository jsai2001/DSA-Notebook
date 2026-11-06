// Running sum from station 0: start right after its lowest point.
DSAViz.register("0134-gas-station/approach3", {
  inputs: [
    { name: "gas", type: "int[]", value: "[1, 2, 3, 4, 5]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 20 },
    { name: "cost", type: "int[]", value: "[3, 4, 5, 1, 2]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 20 },
  ],
  trace({ gas, cost }) {
    if (gas.length !== cost.length) throw new DSAViz.InputError(`gas and cost need the same length (${gas.length} vs ${cost.length}): one pair per station.`);
    const n = gas.length;
    const gain = gas.map((g, i) => g - cost[i]);
    const steps = [];
    const runs = [];
    let run = 0;
    let low = 0;
    let lowAt = -1;
    const view = (o = {}) => {
      const marks = {};
      if (lowAt >= 0) marks[lowAt] = "cut";
      if (o.i !== undefined && o.i !== lowAt) marks[o.i] = "active";
      if (o.answer !== undefined && o.answer >= 0) marks[o.answer] = "match";
      return [
      { type: "array", label: "gas", values: gas, compact: true },
      { type: "array", label: "cost (to drive on to the next station)", values: cost, compact: true },
        { type: "array", label: "gas[i] - cost[i] (green = the answer)", values: gain, compact: true, marks: o.answer !== undefined && o.answer >= 0 ? { [o.answer]: "match" } : o.i !== undefined ? { [o.i]: "active" } : {} },
        { type: "array", label: "run after station i (red = lowest point so far)", values: [...runs], compact: true, marks },
        { type: "vars", items: [{ name: "run", value: run }, { name: "low", value: low, mark: o.newLow ? "new" : "" }, { name: "low_at", value: lowAt }] },
      ];
    };
    steps.push({ line: "init", note: "Pretend we start at 0 with an unlimited tank, and track how much gas is left after each station. Before any station it's 0.", view: view() });
    for (let i = 0; i < n; i++) {
      run += gain[i];
      runs.push(run);
      const newLow = run < low;
      if (newLow) {
        low = run;
        lowAt = i;
      }
      steps.push({
        line: newLow ? ["loop", "low"] : "loop",
        note: `After station ${i}: run = ${run}.${newLow ? ` A new lowest point, at ${i}.` : ""}`,
        view: view({ i, newLow }),
      });
    }
    const answer = run >= 0 ? lowAt + 1 : -1;
    steps.push({
      line: "return",
      note: run >= 0
        ? `The final run is ${run} ≥ 0, so a start exists. Start right after the lowest point${lowAt >= 0 ? `, ${lowAt}` : " (it was 0, before station 0)"}: from there, every later point is at least as high, so the tank never drops below 0. Return ${answer}.`
        : `The final run is ${run} < 0: the circle needs more gas than there is. Return -1.`,
      view: view({ answer }),
    });
    return steps;
  },
});
