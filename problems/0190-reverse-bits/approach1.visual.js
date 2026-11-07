// Write n as exactly 32 binary digits, reverse the text, and read it back as a number.
(function () {
DSAViz.register("0190-reverse-bits/approach1", {
  inputs: [{ name: "n", type: "int", value: "43261596", min: 0, max: 2147483646 }],
  trace({ n }) {
    check(n);
    const text = n.toString(2).padStart(32, "0");
    const back = [...text].reverse().join("");
    const res = parseInt(back, 2);
    const ones = (s) => Object.fromEntries([...s].map((ch, k) => [31 - k, ch === "1" ? "new" : ""]).filter(([, v]) => v));
    return [
      { line: "text", note: `format(n, "032b") = "${text}". The 032 keeps the leading zeros: without them the reversed text would be too short.`, view: [bits(n, "n (yellow = 1 bits)", ones(text)), { type: "vars", items: [{ name: "n", value: n }] }] },
      { line: "back", note: `Reverse the text: "${back}". Read it in base 2: ${res}.`, view: [bits(n, "n", ones(text)), bits(res, "reversed text, read in base 2", ones(back)), { type: "vars", items: [{ name: "result", value: res, mark: "new" }] }] },
      { line: "back", note: `Return ${res}. 32 characters each way: O(1) time, but it builds two strings.`, view: [bits(res, "result", ones(back)), { type: "vars", items: [{ name: "result", value: res, mark: "match" }] }] },
    ];
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
