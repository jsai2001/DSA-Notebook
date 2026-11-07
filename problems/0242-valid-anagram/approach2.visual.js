// One hash map: +1 for each letter of s, -1 for each letter of t. Anagrams end with every count at 0.
DSAViz.register("0242-valid-anagram/approach2", {
  inputs: [
    { name: "s", type: "string", value: "anagram", maxLength: 10 },
    { name: "t", type: "string", value: "nagaram", maxLength: 10 },
  ],
  trace({ s, t }) {
    if (!/^[a-z]+$/.test(s) || !/^[a-z]+$/.test(t)) throw new DSAViz.InputError("s and t must be 1 to 10 lowercase letters.");
    const steps = [];
    if (s.length !== t.length) {
      steps.push({ line: "len", note: `Return false. The lengths differ (${s.length} vs ${t.length}).`, view: [{ type: "vars", items: [{ name: "len(s)", value: s.length }, { name: "len(t)", value: t.length, mark: "cut" }] }] });
      return steps;
    }
    const count = new Map();
    const view = (i, o = {}) => [{ type: "array", label: "s", values: [...s], marks: i !== undefined ? { [i]: "new" } : {} }, { type: "array", label: "t", values: [...t], marks: i !== undefined ? { [i]: "compare" } : {} }, { type: "map", label: "count: (times in s) − (times in t)", columns: ["letter", "count"], entries: [...count].map(([k, v]) => [k, String(v)]), marks: o.marks || {} }];
    steps.push({ line: ["len", "count"], note: `Same length (${s.length}). Walk both strings together.`, view: view() });
    for (let i = 0; i < s.length; i++) {
      count.set(s[i], (count.get(s[i]) || 0) + 1);
      count.set(t[i], (count.get(t[i]) || 0) - 1);
      steps.push({ line: "count", note: `'${s[i]}' from s: +1. '${t[i]}' from t: −1.`, view: view(i, { marks: { [s[i]]: "new", [t[i]]: "compare" } }) });
    }
    const off = [...count].filter(([, v]) => v !== 0).map(([k]) => k);
    steps.push({ line: "check", note: off.length ? `Return false. ${off.map((k) => `'${k}' is at ${count.get(k)}`).join(", ")}: the letters don't even out.` : "Return true. Every count is 0. O(n) time, O(k) space for k different letters.", view: view(undefined, { marks: Object.fromEntries([...count].map(([k, v]) => [k, v ? "cut" : "match"])) }) });
    return steps;
  },
});
