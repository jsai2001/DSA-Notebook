// Sort closest to the target first; push each car's time; if it's no later than the fleet ahead, it joins (pop).
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
DSAViz.register("0853-car-fleet/approach2", {
  inputs: INPUTS,
  trace({ target, position, speed }) {
    check(target, position, speed);
    const cars = position.map((p, i) => [p, speed[i]]).sort((a, b) => b[0] - a[0]);
    const stack = [];
    const cview = (marks = {}) => ({ type: "array", label: "cars, closest to the target first; caption = time alone", values: cars.map(([p]) => p), sub: cars.map(([p, s]) => fmt((target - p) / s)), marks });
    const sview = (marks = {}) => ({ type: "array", label: "stack: time of each fleet's front car", values: stack.length ? stack.map(fmt) : ["—"], marks: stack.length ? marks : { 0: "ghost" } });
    const steps = [{ line: "init", note: "Sort the cars, closest to the target first. A car can only be slowed by cars ahead of it.", view: [cview(), sview()] }];
    cars.forEach(([p, s], k) => {
      const t = (target - p) / s;
      stack.push(t);
      if (stack.length >= 2 && stack[stack.length - 1] <= stack[stack.length - 2]) {
        steps.push({ line: ["push", "merge"], note: `Car at ${p}: time ${fmt(t)} ≤ ${fmt(stack[stack.length - 2])}, the fleet ahead. It catches up and joins that fleet: pop it.`, view: [cview({ [k]: "active" }), sview({ [stack.length - 1]: "cut", [stack.length - 2]: "compare" })] });
        stack.pop();
      } else steps.push({ line: "push", note: `Car at ${p}: time ${fmt(t)}${stack.length > 1 ? ` > ${fmt(stack[stack.length - 2])}, so it never catches the fleet ahead` : ", the first car"}. A new fleet.`, view: [cview({ [k]: "active" }), sview({ [stack.length - 1]: "new" })] });
    });
    steps.push({ line: "return", note: `Return ${stack.length}. One time per fleet is left on the stack. O(n log n) for the sort.`, view: [sview(Object.fromEntries(stack.map((_, i) => [i, "match"])))] });
    return steps;
  },
});
})();
