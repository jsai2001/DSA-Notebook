// Swap halves, then bytes, nibbles, pairs and single bits, each with one mask: 5 steps reverse all 32 bits.
(function () {
DSAViz.register("0190-reverse-bits/approach3", {
  inputs: [{ name: "n", type: "int", value: "43261596", min: 0, max: 2147483646 }],
  trace({ n }) {
    check(n);
    const steps = [];
    let x = n >>> 0;
    // Bits in blocks of size k: every other block yellow, so you can see the pairs that trade places.
    const blocks = (k) => Object.fromEntries([...Array(32).keys()].filter((i) => Math.floor(i / k) % 2 === 1).map((i) => [i, "new"]));
    const view = (k, label) => [bits(x, label, k ? blocks(k) : {}), { type: "vars", items: [{ name: "n", value: x >>> 0 }] }];
    const rounds = [
      [16, "s16", "Swap the two 16-bit halves: (n >> 16) | (n << 16)."],
      [8, "s8", "In each half, swap the two bytes. 0x00FF00FF picks the low byte of each half."],
      [4, "s4", "In each byte, swap the two 4-bit pieces (mask 0x0F0F0F0F)."],
      [2, "s2", "In each 4-bit piece, swap the two pairs (mask 0x33333333 = 0011 0011 …)."],
      [1, "s1", "Swap each pair of neighbouring bits (mask 0x55555555 = 0101 0101 …)."],
    ];
    steps.push({ line: "s16", note: "Reversing 32 bits = swap the halves, then reverse each half the same way. Yellow and white blocks are about to trade places.", view: view(16, "n before (yellow / white = the two halves)") });
    const masks = { 8: 0x00ff00ff, 4: 0x0f0f0f0f, 2: 0x33333333, 1: 0x55555555 };
    for (const [k, line, note] of rounds) {
      x = k === 16 ? ((x >>> 16) | (x << 16)) >>> 0 : (((x >>> k) & masks[k]) | ((x & masks[k]) << k)) >>> 0;
      const next = k / 2;
      steps.push({ line, note: `${note} n = ${x}.${next >= 1 ? ` Next: blocks of ${next}.` : ""}`, view: view(next >= 1 ? next : 0, next >= 1 ? `n after (yellow / white = the blocks of ${next} that swap next)` : "n after all 5 swaps") });
    }
    steps.push({ line: "return", note: `Return ${x}. Five shift-and-mask lines, no loop: O(log 32) = 5 steps, O(1) space.`, view: view(0, "result") });
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
