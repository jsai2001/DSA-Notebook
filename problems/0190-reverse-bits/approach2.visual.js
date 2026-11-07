// 32 times: take n's lowest bit, push it onto the right end of res, and shift n right.
(function () {
DSAViz.register("0190-reverse-bits/approach2", {
  inputs: [{ name: "n", type: "int", value: "43261596", min: 0, max: 2147483646 }],
  trace({ n }) {
    check(n);
    const steps = [];
    let x = n;
    let res = 0;
    const view = (o = {}) => [
      bits(x, "n (dark = its lowest bit, the one taken next)", o.done ? {} : { 0: "active" }),
      bits(res, "res (yellow = the bit just added)", o.added ? { 0: "new" } : {}),
      { type: "vars", items: [{ name: "i", value: o.i === undefined ? "-" : o.i }, { name: "n", value: x }, { name: "res", value: res, mark: o.done ? "match" : "" }] },
    ];
    steps.push({ line: "init", note: "res = 0. Each round moves one bit from the right end of n to the right end of res.", view: view() });
    for (let i = 0; i < 32; i++) {
      const b = x % 2;
      res = res * 2 + b;
      x = Math.floor(x / 2);
      steps.push({ line: ["loop", "move"], note: `Round ${i + 1}: n's lowest bit is ${b}. Shift res left and add ${b}; shift n right.${x === 0 && i < 31 ? " n is 0 now, but keep going: the remaining shifts put the bits in their right places." : ""}`, view: view({ i, added: true }) });
    }
    steps.push({ line: "return", note: `Return ${res}. Always exactly 32 rounds: O(1) time, O(1) space.`, view: view({ done: true }) });
    return steps;
  },
});

function check(n) {
  if (n % 2 !== 0) throw new DSAViz.InputError("LeetCode gives an even n (0 to 2147483646), so the result fits in an int.");
}
// The 32 bits as 4 rows of 8 (bit 31 at the top left). marks: { bitIndex: mark }.
function bits(x, label, marks = {}) {
  const rows = [3, 2, 1, 0];
  const cols = [7, 6, 5, 4, 3, 2, 1, 0];
  const m = {};
  rows.forEach((b, r) => cols.forEach((k, c) => { const i = b * 8 + k; if (marks[i]) m[`${r},${c}`] = marks[i]; }));
  return { type: "grid", label, rows: rows.map((b) => `${b * 8 + 7}–${b * 8}`), cols, corner: "bits", cells: rows.map((b) => cols.map((k) => String(Math.floor(x / 2 ** (b * 8 + k)) % 2))), marks: m };
}
})();
