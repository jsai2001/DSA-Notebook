// Test all 32 bit positions: (n >> i) & 1 is bit i.
(function () {
DSAViz.register("0191-number-of-1-bits/approach1", {
  inputs: [{ name: "n", type: "int", value: "44", min: 1, max: 2147483647 }],
  trace({ n }) {
    const steps = [];
    let count = 0;
    const view = (o = {}) => {
      const marks = {};
      for (let i = 0; i < (o.i === undefined ? 0 : o.i); i++) if (bit(n, i)) marks[i] = "match";
      if (o.i !== undefined) marks[o.i] = bit(n, o.i) ? "new" : "active";
      return [bits(n, "n (dark / yellow = bit i, yellow if it's 1; green = 1 bits counted)", marks), { type: "vars", items: [{ name: "i", value: o.i === undefined ? "-" : o.i }, { name: "count", value: count, mark: o.hit ? "new" : o.done ? "match" : "" }] }];
    };
    steps.push({ line: "init", note: `n = ${n}. Look at all 32 positions, one by one.`, view: view() });
    for (let i = 0; i < 32; i++) {
      const b = bit(n, i);
      count += b;
      steps.push({ line: ["loop", "test"], note: `Bit ${i} is ${b}.${b ? ` count = ${count}.` : ""}${i === 31 ? "" : ""}`, view: view({ i, hit: b === 1 }) });
    }
    steps.push({ line: "return", note: `Return ${count}. Always 32 rounds, however many 1 bits there are: O(1), but fixed at 32.`, view: view({ i: undefined, done: true }) });
    return steps;
  },
});

// The 32 bits as 4 rows of 8 (bit 31 at the top left). marks: { bitIndex: mark }.
function bits(x, label, marks = {}) {
  const rows = [3, 2, 1, 0];
  const cols = [7, 6, 5, 4, 3, 2, 1, 0];
  const m = {};
  rows.forEach((b, r) => cols.forEach((k, c) => { const i = b * 8 + k; if (marks[i]) m[`${r},${c}`] = marks[i]; }));
  return { type: "grid", label, rows: rows.map((b) => `${b * 8 + 7}–${b * 8}`), cols, corner: "bits", cells: rows.map((b) => cols.map((k) => String(Math.floor(x / 2 ** (b * 8 + k)) % 2))), marks: m };
}
const bit = (x, i) => Math.floor(x / 2 ** i) % 2;
})();
