// One pass: end = the furthest last index of any letter seen in this part. When i reaches end, cut.
(function () {
const cuts = (n, parts) => { const m = {}; let a = 0; parts.forEach((len, k) => { for (let i = a; i < a + len; i++) m[i] = k % 2 ? "compare" : "match"; a += len; }); return m; };
DSAViz.register("0763-partition-labels/approach3", {
  inputs: [{ name: "s", type: "string", value: "ababcbacadefegde", maxLength: 16 }],
  trace({ s }) {
    if (!/^[a-z]+$/.test(s)) throw new DSAViz.InputError("s must be 1 to 16 lowercase letters.");
    const last = {};
    [...s].forEach((ch, i) => (last[ch] = i));
    const letters = Object.keys(last).sort((a, b) => last[a] - last[b]);
    const res = [];
    const steps = [];
    let start = 0, end = 0;
    const view = (i, o = {}) => [{ type: "array", label: "s (green / yellow = finished parts, outlined = this part up to end)", values: [...s], marks: { ...cuts(s.length, res), ...(i !== undefined && !o.cut ? Object.fromEntries(Array.from({ length: end - start + 1 }, (_, k) => [start + k, "window"])) : {}), ...(i !== undefined && !o.cut ? { [i]: "active" } : {}) }, pointers: i !== undefined ? (i === end ? { "i = end": i } : { i, end }) : {} }, { type: "map", label: "last[letter]", columns: ["letter", "last index"], entries: letters.map((ch) => [ch, String(last[ch])]), marks: i !== undefined ? { [s[i]]: o.grew ? "new" : "match" } : {} }, { type: "array", label: "res", values: res.slice(), marks: o.cut ? { [res.length - 1]: "new" } : {} }];
    steps.push({ line: "last", note: "First pass: record each letter's last index.", view: view() });
    for (let i = 0; i < s.length; i++) {
      const before = end;
      end = Math.max(end, last[s[i]]);
      const grew = end > before || i === start;
      if (i === end) {
        res.push(end - start + 1);
        steps.push({ line: ["scan", "cut"], note: `'${s[i]}' at ${i}: end = ${end}. i has reached end, so nothing in this part appears later: cut. Size ${end - start + 1}.`, view: view(i, { cut: true, grew }) });
        start = i + 1;
      } else steps.push({ line: "scan", note: `'${s[i]}' at ${i} last appears at ${last[s[i]]}. end = ${end}.`, view: view(i, { grew }) });
    }
    steps.push({ line: "return", note: `Return [${res.join(", ")}]. Two passes over s: O(n) time, O(1) space (26 letters).`, view: view() });
    return steps;
  },
});
})();
