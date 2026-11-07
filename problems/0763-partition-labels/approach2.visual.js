// Each letter covers [first, last]. Merge overlapping spans, like Merge Intervals; each merged span is a part.
(function () {
const cuts = (n, parts) => { const m = {}; let a = 0; parts.forEach((len, k) => { for (let i = a; i < a + len; i++) m[i] = k % 2 ? "compare" : "match"; a += len; }); return m; };
DSAViz.register("0763-partition-labels/approach2", {
  inputs: [{ name: "s", type: "string", value: "ababcbacadefegde", maxLength: 16 }],
  trace({ s }) {
    if (!/^[a-z]+$/.test(s)) throw new DSAViz.InputError("s must be 1 to 16 lowercase letters.");
    const span = new Map();
    [...s].forEach((ch, i) => (span.has(ch) ? (span.get(ch)[1] = i) : span.set(ch, [i, i])));
    const sp = [...span].sort((a, b) => a[1][0] - b[1][0]);
    const steps = [];
    const res = [];
    const show = sp.map(([ch, [a, b]]) => `${ch}: ${a}–${b}`);
    steps.push({ line: "spans", note: `Each letter must stay inside one part, so it covers its first to last index. ${sp.length} spans, sorted by start.`, view: [{ type: "array", label: "s", values: [...s] }, { type: "array", label: "spans (letter: first–last)", values: show, wide: true }] });
    let cur = null, members = [];
    sp.forEach(([ch, [a, b]], k) => {
      if (cur && a <= cur[1]) {
        cur[1] = Math.max(cur[1], b); members.push(k);
        steps.push({ line: "merge", note: `'${ch}' starts at ${a}, inside the current part (ends ${cur[1] === b ? "now at " : "at "}${cur[1]}): merge.`, view: [{ type: "array", label: "s", values: [...s], marks: { ...cuts(s.length, res), ...Object.fromEntries(Array.from({ length: cur[1] - cur[0] + 1 }, (_, j) => [cur[0] + j, "window"])) } }, { type: "array", label: "spans (yellow = in the current part)", values: show, wide: true, marks: Object.fromEntries(members.map((j) => [j, "compare"])) }, { type: "array", label: "res", values: res.slice() }] });
      } else {
        if (cur) res.push(cur[1] - cur[0] + 1);
        cur = [a, b]; members = [k];
        steps.push({ line: ["merge", "cut"], note: `${res.length ? `'${ch}' starts at ${a}, after the last part ended: that part is done. ` : ""}Start a new part with '${ch}' (${a}–${b}).`, view: [{ type: "array", label: "s", values: [...s], marks: { ...cuts(s.length, res), ...Object.fromEntries(Array.from({ length: b - a + 1 }, (_, j) => [a + j, "window"])) } }, { type: "array", label: "spans (yellow = in the current part)", values: show, wide: true, marks: { [k]: "compare" } }, { type: "array", label: "res", values: res.slice(), marks: res.length ? { [res.length - 1]: "new" } : {} }] });
      }
    });
    res.push(cur[1] - cur[0] + 1);
    steps.push({ line: "return", note: `Return [${res.join(", ")}]. One pass for the spans, then at most 26 to sort and merge: O(n).`, view: [{ type: "array", label: "s", values: [...s], marks: cuts(s.length, res) }, { type: "array", label: "res", values: res }] });
    return steps;
  },
});
})();
