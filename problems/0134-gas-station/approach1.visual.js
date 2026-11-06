// Try every start: drive around the circle and stop as soon as the tank goes negative.
DSAViz.register("0134-gas-station/approach1", {
  inputs: [
    { name: "gas", type: "int[]", value: "[1, 2, 3, 4, 5]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 20 },
    { name: "cost", type: "int[]", value: "[3, 4, 5, 1, 2]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 20 },
  ],
  trace({ gas, cost }) {
    if (gas.length !== cost.length) throw new DSAViz.InputError(`gas and cost need the same length (${gas.length} vs ${cost.length}): one pair per station.`);
    const n = gas.length;
    const gain = gas.map((g, i) => g - cost[i]);
    const steps = [];
    let legs = 0;
    const view = (o = {}) => {
      const marks = {};
      (o.reached || []).forEach((i) => (marks[i] = "window"));
      if (o.fail !== undefined) marks[o.fail] = "cut";
      if (o.ok) for (let i = 0; i < n; i++) marks[i] = "match";
      return [
      { type: "array", label: "gas", values: gas, compact: true },
      { type: "array", label: "cost (to drive on to the next station)", values: cost, compact: true },
        { type: "array", label: "gas[i] - cost[i] (outlined = driven from this start, red = ran dry here)", values: gain, compact: true, marks, pointers: o.start !== undefined ? { start: o.start } : {} },
        { type: "vars", items: [...(o.tank !== undefined ? [{ name: "tank", value: o.tank, mark: o.tank < 0 ? "cut" : "" }] : []), { name: "legs driven in all", value: legs, mark: o.counted ? "new" : "" }] },
      ];
    };
    steps.push({ line: "init", note: "At station i you fill up gas[i] and then spend cost[i] to reach the next one. Try each start in turn.", view: view() });
    for (let start = 0; start < n; start++) {
      let tank = 0;
      const reached = [];
      let fail;
      for (let k = 0; k < n; k++) {
        const i = (start + k) % n;
        tank += gain[i];
        legs++;
        reached.push(i);
        if (tank < 0) {
          fail = i;
          break;
        }
      }
      if (fail === undefined) {
        steps.push({ line: ["start", "drive", "found"], note: `Start at ${start}: the tank never goes below 0 on all ${n} legs (it ends with ${tank}). Return ${start}.`, view: view({ start, ok: true, tank, counted: true }) });
        return steps;
      }
      steps.push({
        line: ["start", "drive", "fail"],
        note: `Start at ${start}: after ${reached.length} leg${reached.length === 1 ? "" : "s"}, the tank is ${tank} leaving station ${fail}. Can't reach the next station; try the next start.`,
        view: view({ start, reached, fail, tank, counted: true }),
      });
    }
    steps.push({ line: "none", note: `No start works. Return -1. That took ${legs} legs for ${n} stations: up to n per start, so O(n²).`, view: view() });
    return steps;
  },
});
