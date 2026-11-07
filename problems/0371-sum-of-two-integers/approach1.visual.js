// A full adder per bit: sum bit = x ^ y ^ carry, carry out = at least two of them are 1. Always 32 rounds.
(function () {
const INPUTS = [
  { name: "a", type: "int", value: "-1", min: -1000, max: 1000 },
  { name: "b", type: "int", value: "1", min: -1000, max: 1000 },
];
// 32-bit pattern as 4 bytes, highest first
const bits = (x) => (x >>> 0).toString(2).padStart(32, "0").replace(/(.{8})(?!$)/g, "$1 ");
DSAViz.register("0371-sum-of-two-integers/approach1", {
  inputs: [{ ...INPUTS[0], value: "5" }, { ...INPUTS[1], value: "-3" }],
  trace({ a, b }) {
    let res = 0, carry = 0;
    const view = (i, extra = []) => [{ type: "vars", items: [{ name: "a", value: bits(a) }, { name: "b", value: bits(b) }, { name: "res", value: bits(res), mark: i === undefined ? "" : "new" }, ...extra] }];
    const steps = [{ line: "init", note: `Add ${a} and ${b} as 32-bit patterns, one bit at a time from the right.`, view: view() }];
    for (let i = 0; i < 32; i++) {
      const x = (a >>> i) & 1, y = (b >>> i) & 1, c = carry;
      const s = x ^ y ^ c;
      res = (res | (s << i)) | 0;
      carry = (x & y) | (c & (x ^ y));
      steps.push({ line: "bit", note: `Bit ${i}: ${x} + ${y} + carry ${c} → sum bit ${s}, carry ${carry}.`, view: view(i, [{ name: "bit", value: i, mark: "active" }, { name: "carry", value: carry }]) });
    }
    steps.push({ line: "return", note: `Return ${res}. Always 32 rounds, whatever the numbers. O(1), but the most work of the three.`, view: view() });
    return steps;
  },
});
})();
