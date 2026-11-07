// Keep a set of every number seen. Reaching 1 means happy; seeing a number again means a loop without 1.
(function () {
DSAViz.register("0202-happy-number/approach1", {
  inputs: [{ name: "n", type: "int", value: "19", min: 1, max: 2147483647 }],
  trace({ n }) {
    const steps = [];
    const seen = [];
    const chain = [n];
    const view = (o = {}) => [
      { type: "array", label: "the numbers, in order", values: chain.slice(), wide: true, marks: { [chain.length - 1]: o.mark || "active", ...(o.first !== undefined ? { [o.first]: "cut" } : {}) } },
      { type: "set", label: "seen", items: seen.map(String), marks: o.hit !== undefined ? { [String(o.hit)]: "cut" } : o.added !== undefined ? { [String(o.added)]: "new" } : {} },
    ];
    steps.push({ line: "init", note: `Start at ${n} with an empty set.`, view: view() });
    let x = n;
    while (x !== 1) {
      if (seen.includes(x)) {
        steps.push({ line: ["loop", "repeat"], note: `${x} is already in seen. From here the numbers repeat forever and never reach 1.`, view: view({ hit: x, mark: "cut", first: chain.indexOf(x) }) });
        steps.push({ line: "repeat", note: `Return false. ${seen.length} numbers stored before the loop showed up.`, view: view({ hit: x, mark: "cut", first: chain.indexOf(x) }) });
        return steps;
      }
      seen.push(x);
      const was = x;
      x = next(x);
      chain.push(x);
      steps.push({ line: ["loop", "step"], note: `${was} is new: add it to seen. Next: ${sumText(was)}.`, view: view({ added: was }) });
    }
    steps.push({ line: "happy", note: `Return true. Reached 1 after ${chain.length - 1} step${chain.length === 2 ? "" : "s"}.`, view: view({ mark: "match" }) });
    return steps;
  },
});

const next = (x) => String(x).split("").reduce((s, d) => s + d * d, 0);
const sumText = (x) => `${String(x).split("").map((d) => `${d}²`).join(" + ")} = ${next(x)}`;
})();
