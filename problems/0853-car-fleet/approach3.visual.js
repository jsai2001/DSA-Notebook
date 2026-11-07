// Sort closest to the target first; only the slowest time so far matters. A later time means a new fleet.
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
DSAViz.register("0853-car-fleet/approach3", {
  inputs: INPUTS,
  trace({ target, position, speed }) {
    check(target, position, speed);
    const cars = position.map((p, i) => [p, speed[i]]).sort((a, b) => b[0] - a[0]);
    let fleets = 0, slowest = 0;
    const view = (marks = {}, mark) => [{ type: "array", label: "cars, closest to the target first; caption = time alone", values: cars.map(([p]) => p), sub: cars.map(([p, s]) => fmt((target - p) / s)), marks }, { type: "vars", items: [{ name: "fleets", value: fleets, mark }, { name: "slowest", value: fmt(slowest), mark }] }];
    const steps = [{ line: "init", note: "Sort the cars, closest to the target first. slowest = arrival time of the fleet just ahead.", view: view() }];
    cars.forEach(([p, s], k) => {
      const t = (target - p) / s;
      if (t > slowest) {
        fleets++; slowest = t;
        steps.push({ line: ["car", "lead"], note: `Car at ${p}: time ${fmt(t)} is later than every fleet ahead. A new fleet; slowest = ${fmt(t)}.`, view: view({ [k]: "match" }, "new") });
      } else steps.push({ line: "car", note: `Car at ${p}: time ${fmt(t)} ≤ ${fmt(slowest)}. It catches the fleet ahead and moves at its speed.`, view: view({ [k]: "visited" }) });
    });
    steps.push({ line: "return", note: `Return ${fleets}. One number instead of a stack. O(n log n) for the sort.`, view: view() });
    return steps;
  },
});
})();
