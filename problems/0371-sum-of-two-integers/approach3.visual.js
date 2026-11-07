// Carry loop: a ^ b adds without carries; (a & b) << 1 is the carries. Repeat until there are none.
(function () {
const INPUTS = [
  { name: "a", type: "int", value: "-1", min: -1000, max: 1000 },
  { name: "b", type: "int", value: "1", min: -1000, max: 1000 },
];
// 32-bit pattern as 4 bytes, highest first
const bits = (x) => (x >>> 0).toString(2).padStart(32, "0").replace(/(.{8})(?!$)/g, "$1 ");
DSAViz.register("0371-sum-of-two-integers/approach3", {
  inputs: INPUTS,
  trace({ a, b }) {
    let x = a | 0, y = b | 0, round = 0;
    const view = (mark) => [{ type: "vars", items: [{ name: "a", value: bits(x), mark }, { name: "b", value: bits(y), mark }, { name: "round", value: round }] }];
    const steps = [{ line: "init", note: `Add ${a} and ${b} as 32-bit patterns.`, view: view() }];
    while (y !== 0) {
      round++;
      const nx = x ^ y, ny = (x & y) << 1;
      steps.push({ line: ["loop", "step"], note: `Round ${round}: a ^ b = ${nx} (the sum without carries). (a & b) << 1 = ${ny} (${ny === 0 ? "no carries left" : "the carries, one place up"}).`, view: view() });
      x = nx; y = ny;
      steps[steps.length - 1].view = view("new");
    }
    steps.push({ line: "return", note: `Return ${x}. b is 0: no carry left after ${round} round${round === 1 ? "" : "s"}. A carry moves up at least one bit per round, so at most 32: O(1).`, view: view() });
    return steps;
  },
});
})();
