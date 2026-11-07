// Start a part at its first letter; every letter inside pushes the end to that letter's last copy, found by scanning from the back.
(function () {
const cuts = (n, parts) => { const m = {}; let a = 0; parts.forEach((len, k) => { for (let i = a; i < a + len; i++) m[i] = k % 2 ? "compare" : "match"; a += len; }); return m; };
DSAViz.register("0763-partition-labels/approach1", {
  inputs: [{ name: "s", type: "string", value: "ababcbacadefegde", maxLength: 16 }],
  trace({ s }) {
    if (!/^[a-z]+$/.test(s)) throw new DSAViz.InputError("s must be 1 to 16 lowercase letters.");
    const res = [];
    const steps = [];
    let start = 0, scans = 0;
    const view = (m, o = {}) => [{ type: "array", label: "s (green / yellow = finished parts; outlined = the part being built)", values: [...s], marks: m, pointers: o.p || {} }, { type: "array", label: "res", values: res.slice(), marks: o.rec ? { [res.length - 1]: "new" } : {} }, { type: "vars", items: [{ name: "rindex scans", value: scans }] }];
    while (start < s.length) {
      let end = s.lastIndexOf(s[start]); scans++;
      steps.push({ line: "part", note: `New part at ${start}. Its first letter '${s[start]}' last appears at ${end}, so the part reaches at least ${end}.`, view: view({ ...cuts(s.length, res), ...Object.fromEntries(Array.from({ length: end - start + 1 }, (_, k) => [start + k, "window"])) }, { p: { start, end } }) });
      for (let j = start; j <= end; j++) { const e = s.lastIndexOf(s[j]); scans++; if (e > end) { steps.push({ line: "grow", note: `'${s[j]}' at ${j} last appears at ${e}: the part grows to ${e}.`, view: view({ ...cuts(s.length, res), ...Object.fromEntries(Array.from({ length: e - start + 1 }, (_, k) => [start + k, "window"])), [j]: "active" }, { p: { start, end: e } }) }); end = e; } }
      res.push(end - start + 1);
      steps.push({ line: "cut", note: `No letter inside reaches past ${end}: cut. Part size ${end - start + 1}.`, view: view(cuts(s.length, res), { rec: true }) });
      start = end + 1;
    }
    steps.push({ line: "return", note: `Return [${res.join(", ")}]. ${scans} back-to-front scans of up to n letters each: O(n²) at worst.`, view: view(cuts(s.length, res)) });
    return steps;
  },
});
})();
