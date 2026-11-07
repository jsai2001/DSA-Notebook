// For each car, look at every car ahead: if one arrives no sooner, this car catches it and isn't a fleet's front.
(function () {
const INPUTS = [
  { name: "target", type: "int", value: "12", min: 1, max: 1000 },
  { name: "position", type: "int[]", value: "[10, 8, 0, 5, 3]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 999 },
  { name: "speed", type: "int[]", value: "[2, 4, 1, 1, 3]", minLength: 1, maxLength: 10, minValue: 1, maxValue: 100 },
];
function check(target, position, speed) {
  if (position.length !== speed.length) throw new DSAViz.InputError("position and speed need the same length: one speed per car.");
  if (position.some((p) => p >= target)) throw new DSAViz.InputError(`Every car starts before the target: position < ${target}.`);
  if (new Set(position).size !== position.length) throw new DSAViz.InputError("Positions are unique: two cars can't start at the same place.");
}
const fmt = (t) => (Number.isInteger(t) ? String(t) : t.toFixed(2).replace(/0$/, ""));
DSAViz.register("0853-car-fleet/approach1", {
  inputs: INPUTS,
  trace({ target, position, speed }) {
    check(target, position, speed);
    const n = position.length;
    const time = position.map((p, i) => (target - p) / speed[i]);
    const view = (marks = {}) => [{ type: "array", label: "position; caption = time to the target alone", values: position, sub: time.map(fmt), marks }];
    const steps = [{ line: "init", note: `Time for each car to reach ${target} alone: (target − position) / speed.`, view: view() }];
    let fleets = 0;
    for (let i = 0; i < n; i++) {
      let by = -1;
      for (let j = 0; j < n; j++) if (position[j] > position[i] && time[j] >= time[i]) { by = j; break; }
      if (by >= 0) steps.push({ line: ["car", "check"], note: `Car at ${position[i]} (time ${fmt(time[i])}): the car at ${position[by]} is ahead and takes ${fmt(time[by])} ≥ ${fmt(time[i])}. It catches up, so it's not a fleet's front.`, view: view({ [i]: "active", [by]: "compare" }) });
      else {
        fleets++;
        steps.push({ line: ["car", "check", "lead"], note: `Car at ${position[i]} (time ${fmt(time[i])}): every car ahead arrives sooner, so nothing slows it. Fleet ${fleets}.`, view: view({ [i]: "match" }) });
      }
    }
    steps.push({ line: "return", note: `Return ${fleets}. Each car checks every other car: O(n²).`, view: view() });
    return steps;
  },
});
})();
