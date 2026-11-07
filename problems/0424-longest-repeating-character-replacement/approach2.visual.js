// Guess the letter c of the run; slide a window holding at most k letters that aren't c. Try each letter in s.
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
DSAViz.register("0424-longest-repeating-character-replacement/approach2", {
  inputs: INPUTS,
  trace({ s, k }) {
    check(s);
    let best = 0;
    const steps = [{ line: "init", note: `For each letter c in s, find the longest window with at most ${k} letters that aren't c.`, view: [sv(s, 0, -1)] }];
    for (const c of [...new Set(s)].sort()) {
      let lo = 0, other = 0;
      steps.push({ line: "letter", note: `Letter ${c}: grey letters would need changing.`, view: [sv(s, 0, -1, Object.fromEntries([...s].map((ch, i) => [i, ch === c ? "" : "visited"]).filter(([, m]) => m)))] });
      for (let hi = 0; hi < s.length; hi++) {
        other += s[hi] !== c;
        let shrunk = 0;
        while (other > k) { other -= s[lo] !== c; lo++; shrunk++; }
        const nb = Math.max(best, hi - lo + 1);
        steps.push({ line: shrunk ? ["grow", "shrink", "best"] : ["grow", "best"], note: `${c}: add s[${hi}] = ${s[hi]}.${shrunk ? ` Too many non-${c}: move lo right ${shrunk}.` : ""} Window ${s.slice(lo, hi + 1)} has ${other} to change. Length ${hi - lo + 1}${nb > best ? ", the best so far" : ""}.`, view: [sv(s, lo, hi, Object.fromEntries([...s].map((ch, i) => [i, ch !== c && i >= lo && i <= hi ? "compare" : ""]).filter(([, m]) => m))), { type: "vars", items: [{ name: "c", value: c }, { name: "other", value: other }, { name: "best", value: nb, mark: nb > best ? "new" : "" }] }] });
        best = nb;
      }
    }
    steps.push({ line: "return", note: `Return ${best}. One window pass per different letter: O(26 · n).`, view: [sv(s, 0, -1), { type: "vars", items: [{ name: "best", value: best, mark: "match" }] }] });
    return steps;
  },
});
})();
