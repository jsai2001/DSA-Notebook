// Floyd's cycle check: slow takes one step, fast takes two. Fast reaches 1, or catches slow inside a loop.
(function () {
DSAViz.register("0202-happy-number/approach3", {
  inputs: [{ name: "n", type: "int", value: "19", min: 1, max: 2147483647 }],
  trace({ n }) {
    const steps = [];
    const chain = [n];
    const at = (k) => { while (chain.length <= k) chain.push(next(chain[chain.length - 1])); return chain[k]; };
    let s = 0;
    let f = 1;
    at(1);
    const view = (o = {}) => {
      const marks = { [s]: "compare", [f]: o.meet ? "cut" : o.happy ? "match" : "new" };
      if (o.meet) marks[s] = "cut";
      return [
        { type: "array", label: "the numbers, in order (yellow = where slow and fast are; green = fast reached 1; red = they meet)", values: chain.slice(0, f + 1), wide: true, marks, pointers: s === f ? { "slow = fast": s } : { slow: s, fast: f } },
        { type: "vars", items: [{ name: "slow", value: chain[s] }, { name: "fast", value: chain[f], mark: o.happy ? "match" : o.meet ? "cut" : "" }] },
      ];
    };
    steps.push({ line: "init", note: `slow = ${n}, fast = the next number, ${chain[1]}. Only these two numbers are kept; the list is just for the picture.`, view: view() });
    while (chain[f] !== 1 && chain[s] !== chain[f]) {
      s += 1;
      at(f + 2);
      f += 2;
      steps.push({ line: ["loop", "move"], note: `slow moves 1 step to ${chain[s]}; fast moves 2 steps to ${chain[f]}.`, view: view() });
    }
    const happy = chain[f] === 1;
    steps.push({ line: "return", note: happy ? `Return true. fast reached 1 (1 → 1 forever, so it stays there).` : `Return false. slow and fast meet at ${chain[f]}: they're going round a loop that doesn't contain 1.`, view: view({ happy, meet: !happy }) });
    return steps;
  },
});

const next = (x) => String(x).split("").reduce((s, d) => s + d * d, 0);
const sumText = (x) => `${String(x).split("").map((d) => `${d}²`).join(" + ")} = ${next(x)}`;
})();
