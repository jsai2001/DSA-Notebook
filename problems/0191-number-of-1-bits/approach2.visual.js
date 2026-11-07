// Add up the lowest bit and shift right, until n is 0. Stops after the highest 1 bit.
(function () {
DSAViz.register("0191-number-of-1-bits/approach2", {
  inputs: [{ name: "n", type: "int", value: "44", min: 1, max: 2147483647 }],
  trace({ n }) {
    const steps = [];
    let x = n;
    let count = 0;
    let rounds = 0;
    const view = (o = {}) => [o.was === undefined ? bits(x, "n") : bits(o.was, "n before the shift (dark = the lowest bit, yellow if it's 1)", { 0: bit(o.was, 0) ? "new" : "active" }), { type: "vars", items: [{ name: "n", value: x }, { name: "count", value: count, mark: o.hit ? "new" : o.done ? "match" : "" }] }];
    steps.push({ line: "init", note: `n = ${n}. While n isn't 0, add its lowest bit and shift it right.`, view: view() });
    while (x) {
      const b = x % 2;
      count += b;
      rounds++;
      const was = x;
      x = Math.floor(x / 2);
      steps.push({ line: ["loop", "test", "shift"], note: `n = ${was}: the lowest bit is ${b}.${b ? ` count = ${count}.` : ""} Shift right: n = ${x}.${x === 0 ? " No 1 bits are left: stop." : ""}`, view: view({ hit: b === 1, was }) });
    }
    steps.push({ line: "return", note: `Return ${count}. ${rounds} rounds: one per bit up to the highest 1, at most 31 here.`, view: view({ done: true }) });
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
