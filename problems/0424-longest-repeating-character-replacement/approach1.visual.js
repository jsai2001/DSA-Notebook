// Every start i; grow the end j while at most k letters differ from the most common one.
(function () {
const INPUTS = [
  { name: "s", type: "string", value: "AABABBA", maxLength: 12 },
  { name: "k", type: "int", value: "1", min: 0, max: 12 },
];
function check(s) {
  if (!s.length) throw new DSAViz.InputError("s needs at least one letter.");
  if (!/^[A-Z]+$/.test(s)) throw new DSAViz.InputError("s is uppercase English letters only, like AABABBA.");
}
const sv = (s, lo, hi, marks = {}, label = "s") => ({ type: "array", label, values: [...s], marks: { ...Object.fromEntries([...s].map((_, i) => [i, i >= lo && i <= hi ? "window" : ""]).filter(([, m]) => m)), ...marks }, pointers: hi >= lo ? (lo === hi ? { "lo,hi": lo } : { lo, hi }) : {} });
DSAViz.register("0424-longest-repeating-character-replacement/approach1", {
  inputs: INPUTS,
  trace({ s, k }) {
    check(s);
    let best = 0;
    const steps = [{ line: "init", note: `A window works when its length minus its most common letter's count is at most k = ${k}: that's how many letters you'd change.`, view: [sv(s, 0, -1), { type: "vars", items: [{ name: "best", value: 0 }] }] }];
    for (let i = 0; i < s.length; i++) {
      const count = {}; let top = 0;
      for (let j = i; j < s.length; j++) {
        count[s[j]] = (count[s[j]] || 0) + 1; top = Math.max(top, count[s[j]]);
        const change = j - i + 1 - top;
        if (change > k) { steps.push({ line: ["start", "grow", "stop"], note: `s[${i}..${j}]: ${change} letters to change, more than ${k}. Longer windows from ${i} only need more. Next start.`, view: [sv(s, i, j, { [j]: "cut" }), { type: "vars", items: [{ name: "best", value: best }] }] }); break; }
        const nb = Math.max(best, j - i + 1);
        steps.push({ line: ["start", "grow", "best"], note: `s[${i}..${j}] = ${s.slice(i, j + 1)}: most common appears ${top} times, change ${change} ≤ ${k}. Length ${j - i + 1}.`, view: [sv(s, i, j), { type: "vars", items: [{ name: "best", value: nb, mark: nb > best ? "new" : "" }] }] });
        best = nb;
      }
    }
    steps.push({ line: "return", note: `Return ${best}. Every start, grown until it breaks: O(n²).`, view: [sv(s, 0, -1), { type: "vars", items: [{ name: "best", value: best, mark: "match" }] }] });
    return steps;
  },
});
})();
