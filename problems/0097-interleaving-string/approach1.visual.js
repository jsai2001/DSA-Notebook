// Plain recursion: the next letter of s3 comes from s1 or from s2; try s1 first, then s2.
DSAViz.register("0097-interleaving-string/approach1", {
  inputs: [
    { name: "s1", type: "string", value: "aab", maxLength: 4 },
    { name: "s2", type: "string", value: "axy", maxLength: 4 },
    { name: "s3", type: "string", value: "aaxaby", maxLength: 8 },
  ],
  trace({ s1, s2, s3 }) {
    for (const [name, x] of [["s1", s1], ["s2", s2], ["s3", s3]]) if (!/^[a-z]*$/.test(x)) throw new DSAViz.InputError(`${name} must be lowercase letters (a–z), or "" for empty.`);
    const m = s1.length;
    const n = s2.length;
    const steps = [];
    const MAX = 300;
    const runs = {}; // how many times can(i, j) ran
    const from = []; // for each letter of s3 so far: "1" or "2"
    const push = (s) => {
      steps.push(s);
      if (steps.length > MAX) throw new DSAViz.InputError(`This input takes more than ${MAX} steps to show. Try shorter strings.`);
    };
    const view = (i, j, o = {}) => {
      const s1m = {};
      const s2m = {};
      for (let k = 0; k < i; k++) s1m[k] = "visited";
      for (let k = 0; k < j; k++) s2m[k] = "visited";
      if (o.try1) s1m[i] = o.bad ? "cut" : "active";
      if (o.try2) s2m[j] = o.bad ? "cut" : "active";
      const s3m = {};
      from.forEach((f, k) => (s3m[k] = f === "1" ? "compare" : "new"));
      if (o.done) [...s3].forEach((_, k) => (s3m[k] = "match"));
      else if (i + j < s3.length && (o.try1 || o.try2)) s3m[i + j] = o.bad ? "cut" : "active";
      const repeat = Object.values(runs).reduce((a, c) => a + Math.max(0, c - 1), 0);
      return [
        { type: "array", label: "s1 (faded = used)", values: [...s1], marks: s1m, compact: true },
        { type: "array", label: "s2 (faded = used)", values: [...s2], marks: s2m, compact: true },
        { type: "array", label: "s3 (orange = taken from s1, yellow = from s2)", values: [...s3], marks: s3m },
        { type: "vars", items: [{ name: "now", value: i !== undefined ? `can(${i}, ${j})` : "–" }, { name: "repeated calls", value: repeat, mark: o.again ? "cut" : "" }] },
      ];
    };
    if (m + n !== s3.length) {
      push({ line: "len", note: `len(s1) + len(s2) = ${m + n}, but s3 has ${s3.length} letters: return false.`, view: view(0, 0) });
      return steps;
    }
    push({ line: "answer", note: "can(i, j): can the rest of s3 be made from s1[i:] and s2[j:]? Start with can(0, 0).", view: view(0, 0) });
    function can(i, j) {
      const key = `${i},${j}`;
      runs[key] = (runs[key] || 0) + 1;
      const again = runs[key] > 1;
      if (i === m && j === n) {
        push({ line: ["call", "base"], note: `can(${i}, ${j}): both strings are used up, and so is s3. Return true.`, view: view(i, j, { done: true }) });
        return true;
      }
      const k = i + j;
      const ch = s3[k];
      if (i < m) {
        const ok = s1[i] === ch;
        push({ line: ["call", "take1"], note: `can(${i}, ${j})${again ? " (asked before: the same work again)" : ""}: next is s3[${k}] = "${ch}". s1[${i}] = "${s1[i]}": ${ok ? "matches, take it." : "no match."}`, view: view(i, j, { try1: true, bad: !ok, again }) });
        if (ok) {
          from.push("1");
          if (can(i + 1, j)) return true;
          from.pop();
        }
      }
      if (j < n) {
        const ok = s2[j] === ch;
        push({ line: "take2", note: `Back in can(${i}, ${j}): try s2[${j}] = "${s2[j]}" for "${ch}": ${ok ? "matches, take it." : "no match."}`, view: view(i, j, { try2: true, bad: !ok }) });
        if (ok) {
          from.push("2");
          if (can(i, j + 1)) return true;
          from.pop();
        }
      }
      push({ line: "fail", note: `can(${i}, ${j}): neither choice works. Return false and back up.`, view: view(i, j, { bad: true }) });
      return false;
    }
    const r = can(0, 0);
    push({ line: "answer", note: r ? "Return true: the colours in s3 show which string each letter came from." : "Return false: no mix of s1 and s2 makes s3.", view: view(m, n, { done: r }) });
    return steps;
  },
});
