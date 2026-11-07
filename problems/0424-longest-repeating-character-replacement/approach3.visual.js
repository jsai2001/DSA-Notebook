// One window; top = the biggest letter count seen. Grow; if more than k letters would change, slide instead (the window never shrinks).
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
DSAViz.register("0424-longest-repeating-character-replacement/approach3", {
  inputs: INPUTS,
  trace({ s, k }) {
    check(s);
    const count = {};
    let lo = 0, top = 0;
    const cv = () => ({ type: "map", label: "count in the window", columns: ["letter", "count"], entries: Object.keys(count).sort().filter((c) => count[c]).map((c) => [c, count[c]]) });
    const steps = [{ line: "init", note: "Empty window. top will be the biggest count any letter has reached.", view: [sv(s, 0, -1), cv()] }];
    for (let hi = 0; hi < s.length; hi++) {
      count[s[hi]] = (count[s[hi]] || 0) + 1;
      top = Math.max(top, count[s[hi]]);
      const len = hi - lo + 1;
      if (len - top > k) {
        const out = s[lo];
        count[out]--; lo++;
        steps.push({ line: ["grow", "slide"], note: `Add ${s[hi]}: length ${len} − top ${top} = ${len - top} > ${k}. Slide: drop s[${lo - 1}] = ${out}. The size stays ${len - 1}, the best seen so far.`, view: [sv(s, lo, hi, { [lo - 1]: "cut" }), cv(), { type: "vars", items: [{ name: "top", value: top }, { name: "size", value: hi - lo + 1 }] }] });
      } else steps.push({ line: "grow", note: `Add ${s[hi]}: length ${len} − top ${top} = ${len - top} ≤ ${k}. The window grows to ${len}.`, view: [sv(s, lo, hi, { [hi]: "new" }), cv(), { type: "vars", items: [{ name: "top", value: top }, { name: "size", value: len, mark: "new" }] }] });
    }
    steps.push({ line: "return", note: `Return ${s.length - lo}: the window's final size. It only grows when a bigger top allows it, so top never needs to go down. O(n).`, view: [sv(s, lo, s.length - 1), { type: "vars", items: [{ name: "size", value: s.length - lo, mark: "match" }] }] });
    return steps;
  },
});
})();
