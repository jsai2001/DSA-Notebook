// 26 counters: count s up, then count t down. Any counter below 0 means t has an extra letter.
DSAViz.register("0242-valid-anagram/approach3", {
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
    const count = Array(26).fill(0);
    const used = [...new Set([...s, ...t])].sort();
    const view = (o = {}) => [{ type: "array", label: "count, only the letters that appear (under each: letter [its slot of 26])", values: used.map((ch) => count[ch.charCodeAt(0) - 97]), sub: used.map((ch) => `${ch} [${ch.charCodeAt(0) - 97}]`), marks: o.m || {} }, { type: "array", label: "s", values: [...s], marks: o.sm || {} }, { type: "array", label: "t", values: [...t], marks: o.tm || {} }];
    const at = (ch) => used.indexOf(ch);
    for (const ch of s) count[ch.charCodeAt(0) - 97]++;
    steps.push({ line: ["len", "count"], note: `Same length. Count every letter of s: ${used.filter((c) => count[c.charCodeAt(0) - 97]).map((c) => `${c}×${count[c.charCodeAt(0) - 97]}`).join(", ")}.`, view: view({ sm: Object.fromEntries([...s].map((_, i) => [i, "new"])) }) });
    for (let i = 0; i < t.length; i++) {
      const k = t.charCodeAt(i) - 97;
      count[k]--;
      if (count[k] < 0) {
        steps.push({ line: ["use", "short"], note: `Return false. '${t[i]}' goes to −1: t has more '${t[i]}' than s.`, view: view({ m: { [at(t[i])]: "cut" }, tm: { [i]: "cut" } }) });
        return steps;
      }
      steps.push({ line: "use", note: `'${t[i]}' from t: count down to ${count[k]}.`, view: view({ m: { [at(t[i])]: "new" }, tm: { [i]: "active" } }) });
    }
    steps.push({ line: "return", note: "Return true. Same length and no count went below 0, so every count is back to 0. O(n) time, O(1) space.", view: view({ m: Object.fromEntries(used.map((_, i) => [i, "match"])) }) });
    return steps;
  },
});
