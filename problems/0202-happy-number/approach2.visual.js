// Every unhappy number ends up in the loop 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4. So stop at 1 or at 4.
(function () {
DSAViz.register("0202-happy-number/approach2", {
  inputs: [{ name: "n", type: "int", value: "19", min: 1, max: 2147483647 }],
  trace({ n }) {
    const steps = [];
    const chain = [n];
    const LOOP = [4, 16, 37, 58, 89, 145, 42, 20];
    const view = (o = {}) => [
      { type: "array", label: "the numbers, in order", values: chain.slice(), wide: true, marks: { [chain.length - 1]: o.mark || "active" } },
      { type: "array", label: "the only loop there is (every unhappy number falls into it)", values: LOOP, compact: true, marks: o.mark === "cut" ? { 0: "cut" } : {} },
    ];
    let x = n;
    steps.push({ line: "loop", note: `Start at ${n}. Stop when the number is 1 (happy) or 4 (in the loop).`, view: view() });
    while (x !== 1 && x !== 4) {
      const was = x;
      x = next(x);
      chain.push(x);
      steps.push({ line: ["loop", "step"], note: `${sumText(was)}.`, view: view() });
    }
    steps.push({ line: "return", note: x === 1 ? `Return true. Reached 1 after ${chain.length - 1} step${chain.length === 2 ? "" : "s"}.` : `Return false. Reached 4, which is in the loop, so 1 never comes.`, view: view({ mark: x === 1 ? "match" : "cut" }) });
    return steps;
  },
});

const next = (x) => String(x).split("").reduce((s, d) => s + d * d, 0);
const sumText = (x) => `${String(x).split("").map((d) => `${d}²`).join(" + ")} = ${next(x)}`;
})();
