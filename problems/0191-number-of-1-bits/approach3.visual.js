// n & (n - 1) clears the lowest 1 bit, so the loop runs once per 1 bit.
(function () {
DSAViz.register("0191-number-of-1-bits/approach3", {
  inputs: [{ name: "n", type: "int", value: "44", min: 1, max: 2147483647 }],
  trace({ n }) {
    const steps = [];
    let x = n;
    let count = 0;
    const top = Math.floor(Math.log2(n));
    // n, n - 1 and their AND, from n's highest bit down to bit 0.
    const table = (v, i) => {
      const cols = [];
      for (let k = top; k >= 0; k--) cols.push(k);
      const rowsV = [v, v - 1, (v & (v - 1)) >>> 0];
      const marks = {};
      cols.forEach((k, c) => {
        if (k === i) { marks[`0,${c}`] = "cut"; marks[`2,${c}`] = "cut"; }
        if (k <= i) marks[`1,${c}`] = "new";
      });
      return { type: "grid", label: "bits (red = the lowest 1, cleared; yellow = the bits n − 1 flipped)", rows: ["n", "n−1", "n&(n−1)"], cols, corner: "bit", cells: rowsV.map((x) => cols.map((k) => String(bit(x, k)))), marks };
    };
    const low = (v) => { let i = 0; while (!bit(v, i)) i++; return i; };
    steps.push({ line: "init", note: `n = ${n}. Each round clears one 1 bit, so the rounds count the 1 bits.`, view: [bits(x, "n"), { type: "vars", items: [{ name: "count", value: 0 }] }] });
    while (x) {
      const i = low(x);
      const flipped = {};
      for (let k = 0; k <= i; k++) flipped[k] = "new";
      const m1 = {};
      m1[i] = "cut";
      const before = x;
      x = (x & (x - 1)) >>> 0;
      count++;
      steps.push({
        line: ["loop", "clear"],
        note: `The lowest 1 is bit ${i}. n − 1 = ${before - 1} flips ${i === 0 ? "just bit 0" : `bit ${i} and the ${i} zero${i === 1 ? "" : "s"} below it`} (yellow). n & (n − 1) keeps only the bits both share: bit ${i} is cleared, n = ${x}. count = ${count}.`,
        view: [table(before, i), { type: "vars", items: [{ name: "n", value: `${before} → ${x}` }, { name: "count", value: count, mark: "new" }] }],
      });
    }
    steps.push({ line: "return", note: `Return ${count}. ${count} round${count === 1 ? "" : "s"}, one per 1 bit: O(number of 1 bits).`, view: [bits(x, "n is 0"), { type: "vars", items: [{ name: "count", value: count, mark: "match" }] }] });
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
