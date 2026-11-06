// Plain recursion: count(i, j) skips s[i], and also uses it when it matches t[j]; the same (i, j) gets asked many times.
DSAViz.register("0115-distinct-subsequences/approach1", {
  inputs: [
    { name: "s", type: "string", value: "aabb", maxLength: 7 },
    { name: "t", type: "string", value: "ab", maxLength: 3 },
  ],
  trace({ s, t }) {
    for (const [name, x] of [["s", s], ["t", t]]) if (!/^[A-Za-z]+$/.test(x)) throw new DSAViz.InputError(`${name} must be 1 or more letters.`);
    const m = s.length;
    const n = t.length;
    const MAX = 300;
    const steps = [];
    const used = []; // positions of s picked on the current path
    const asked = {};
    let found = 0;
    const push = (st) => {
      steps.push(st);
      if (steps.length > MAX) throw new DSAViz.InputError(`This input takes more than ${MAX} steps to show. Try shorter strings.`);
    };
    const view = (i, j, o = {}) => {
      const sm = {};
      for (let k = 0; k < Math.min(i, m); k++) sm[k] = "visited";
      used.forEach((k) => (sm[k] = o.done ? "match" : "compare"));
      if (i < m && !o.done) sm[i] = "active";
      const tm = {};
      for (let k = 0; k < j; k++) tm[k] = "match";
      if (j < n && !o.done) tm[j] = "active";
      const repeats = Object.values(asked).reduce((a, c) => a + Math.max(0, c - 1), 0);
      return [
        { type: "array", label: "s (orange = picked for t, faded = passed)", values: [...s], marks: sm, pointers: i < m && !o.done ? { i } : {} },
        { type: "array", label: "t (green = spelled so far)", values: [...t], marks: tm, pointers: j < n && !o.done ? { j } : {} },
        { type: "vars", items: [{ name: "ways found", value: found, mark: o.done ? "new" : "" }, { name: "repeated questions", value: repeats }] },
      ];
    };
    push({ line: "answer", note: `count(i, j): ways to spell t[j:] from s[i:]. Start with count(0, 0).`, view: view(0, 0) });
    function count(i, j) {
      const key = `${i},${j}`;
      asked[key] = (asked[key] || 0) + 1;
      if (j === n) {
        found++;
        push({ line: ["call", "done"], note: `All of t is spelled, using s positions ${used.join(", ")}: one way.`, view: view(i, j, { done: true }) });
        return 1;
      }
      if (m - i < n - j) {
        push({ line: ["call", "short"], note: `count(${i}, ${j}): only ${m - i} letter${m - i === 1 ? "" : "s"} left in s for ${n - j} of t. Return 0.`, view: view(i, j) });
        return 0;
      }
      push({ line: ["call", "skip"], note: `count(${i}, ${j})${asked[key] > 1 ? " (asked before!)" : ""}: first skip s[${i}] = "${s[i]}".`, view: view(i, j) });
      let ways = count(i + 1, j);
      if (s[i] === t[j]) {
        used.push(i);
        push({ line: "use", note: `Back in count(${i}, ${j}): s[${i}] = "${s[i]}" equals t[${j}]. Now use it.`, view: view(i, j) });
        ways += count(i + 1, j + 1);
        used.pop();
      }
      push({ line: "sum", note: `count(${i}, ${j}) = ${ways}.`, view: view(i, j) });
      return ways;
    }
    const r = count(0, 0);
    const repeats = Object.values(asked).reduce((a, c) => a + Math.max(0, c - 1), 0);
    push({ line: "answer", note: `Return ${r}.${repeats ? ` ${repeats} question${repeats === 1 ? " was" : "s were"} asked again: that's the work a table saves.` : ""}`, view: view(m, n, { done: false }) });
    return steps;
  },
});
