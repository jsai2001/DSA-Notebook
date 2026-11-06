// The same recursion, but each start's answer is saved, so it's worked out at most once.
(function () {
DSAViz.register("0139-word-break/approach2", {
  inputs: [
    { name: "s", type: "string", value: "catsandog", maxLength: 12 },
    { name: "wordDict", label: "wordDict (comma-separated)", type: "string", value: "cats, dog, sand, and, cat", maxLength: 60, raw: true },
  ],
  trace({ s, wordDict }) {
    const { w, dict } = parseInput(s, wordDict);
    const n = w.length;
    const steps = [];
    const memo = new Map();
    let calls = 0;

    const sArray = (o = {}) => {
      const marks = {};
      for (let t = 0; t < (o.start ?? 0); t++) marks[t] = "visited";
      if (o.word) for (let t = o.start; t < o.start + o.word.length; t++) marks[t] = o.fits === false ? "cut" : "match";
      return { type: "array", label: o.label || "s (dashed = already split off; green = the word tried here)", values: [...w], marks, pointers: o.start !== undefined && o.start < w.length ? { start: o.start } : {} };
    };

    const view = (o = {}) => [
      sArray(o),
      { type: "set", label: "wordDict", items: dict, marks: o.word ? { [o.word]: "match" } : {} },
      { type: "map", label: "memo (start → can s[start:] be split?)", columns: ["start", "answer"], entries: [...memo].sort((a, b) => a[0] - b[0]).map(([k, v]) => [String(k), String(v)]), marks: o.key !== undefined ? { [String(o.key)]: o.hit ? "match" : "new" } : {} },
      { type: "vars", items: [{ name: "calls", value: calls }] },
    ];
    steps.push({ line: "init", note: "Same recursion as Approach 1, plus memo: once can(start) is worked out, save the answer.", view: view() });
    const can = (start) => {
      calls++;
      if (start === n) {
        steps.push({ line: "done", note: `can(${n}): nothing left. Return true.`, view: view({ start }) });
        return true;
      }
      if (memo.has(start)) {
        steps.push({ line: "memo", note: `can(${start}) is already in memo: ${memo.get(start)}. No work repeated.`, view: view({ start, key: start, hit: true }) });
        return memo.get(start);
      }
      let ok = false;
      for (const word of dict) {
        if (!w.startsWith(word, start)) continue;
        steps.push({ line: "try", note: `can(${start}): "${word}" fits at ${start}. Try the rest, s[${start + word.length}:].`, view: view({ start, word }) });
        if (can(start + word.length)) {
          ok = true;
          break;
        }
      }
      memo.set(start, ok);
      steps.push({ line: ok ? ["found", "save"] : "save", note: `Save memo[${start}] = ${ok}.`, view: view({ start, key: start }) });
      return ok;
    };
    const ok = can(0);
    steps.push({ line: "init", note: `Return ${ok}. ${calls} call${calls === 1 ? "" : "s"}: each start is worked out at most once, so at most n + 1 = ${n + 1} starts, each trying every word.`, view: view() });
    return steps;
  },
});

function parseInput(s, wordDict) {
  const w = s.trim();
  const dict = wordDict.split(",").map((x) => x.trim()).filter(Boolean);
  if (!/^[a-z]{1,12}$/.test(w)) throw new DSAViz.InputError("s: 1 to 12 lowercase letters, like leetcode.");
  if (!dict.length) throw new DSAViz.InputError("Type the words separated by commas, like leet, code.");
  if (dict.length > 6) throw new DSAViz.InputError("Up to 6 words here, so the steps stay readable.");
  if (dict.some((x) => !/^[a-z]{1,6}$/.test(x))) throw new DSAViz.InputError("Each word: 1 to 6 lowercase letters.");
  if (new Set(dict).size !== dict.length) throw new DSAViz.InputError("Each word can appear only once.");
  return { w, dict };
}
})();
