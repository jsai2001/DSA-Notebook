// Plain recursion: from each start, try every word that fits and recurse on the rest.
(function () {
DSAViz.register("0139-word-break/approach1", {
  inputs: [
    { name: "s", type: "string", value: "catsandog", maxLength: 12 },
    { name: "wordDict", label: "wordDict (comma-separated)", type: "string", value: "cats, dog, sand, and, cat", maxLength: 60, raw: true },
  ],
  trace({ s, wordDict }) {
    const { w, dict } = parseInput(s, wordDict);
    const n = w.length;
    const steps = [];
    const LIMIT = 150;
    let calls = 0;
    const visits = {};

    const sArray = (o = {}) => {
      const marks = {};
      for (let t = 0; t < (o.start ?? 0); t++) marks[t] = "visited";
      if (o.word) for (let t = o.start; t < o.start + o.word.length; t++) marks[t] = o.fits === false ? "cut" : "match";
      return { type: "array", label: o.label || "s (dashed = already split off; green = the word tried here)", values: [...w], marks, pointers: o.start !== undefined && o.start < w.length ? { start: o.start } : {} };
    };

    const view = (o = {}) => [
      sArray(o),
      { type: "set", label: "wordDict", items: dict, marks: o.word ? { [o.word]: o.fits === false ? "cut" : "match" } : {} },
      { type: "vars", items: [{ name: "calls so far", value: calls, mark: o.counted ? "new" : "" }, ...(o.start !== undefined && o.start < n ? [{ name: `times can(${o.start}) was called`, value: visits[o.start], mark: visits[o.start] > 1 ? "cut" : "" }] : [])] },
    ];
    let wanted = 0;
    const push = (step) => {
      wanted++;
      if (steps.length < LIMIT) steps.push(step);
    };
    push({ line: "init", note: "can(start) asks: can s[start:] be split into words? Start with can(0).", view: view() });
    const can = (start) => {
      calls++;
      visits[start] = (visits[start] || 0) + 1;
      if (start === n) {
        push({ line: "done", note: `can(${n}): nothing left, so the split worked. Return true.`, view: view({ start, counted: true }) });
        return true;
      }
      const again = visits[start] > 1 ? ` (call number ${visits[start]} for this start: the same work again)` : "";
      for (const word of dict) {
        if (!w.startsWith(word, start)) continue;
        push({ line: "try", note: `can(${start})${again}: "${word}" fits at ${start}. Try splitting the rest, s[${start + word.length}:].`, view: view({ start, word, counted: true }) });
        if (can(start + word.length)) {
          push({ line: "found", note: `can(${start}): "${word}" + the rest worked. Return true.`, view: view({ start, word }) });
          return true;
        }
      }
      push({ line: ["try", "fail"], note: `can(${start})${again}: no word fits here and splits the rest. Return false.`, view: view({ start, counted: true }) });
      return false;
    };
    const ok = can(0);
    const repeats = Object.values(visits).reduce((a, b) => a + b, 0) - Object.keys(visits).length;
    steps.push({
      line: "init",
      note: `Return ${ok}. ${calls} call${calls === 1 ? "" : "s"} in all${repeats ? `, ${repeats} of them repeating a start already worked out` : ""}${wanted > LIMIT ? ` (only the first ${LIMIT} of ${wanted} steps are shown)` : ""}. On inputs like "aaaa…ab" this grows exponentially.`,
      view: view(),
    });
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
