// Bottom-up: dp[i] = can the first i letters be split? dp[i] is true if some word ends at i after a true dp.
(function () {
DSAViz.register("0139-word-break/approach3", {
  inputs: [
    { name: "s", type: "string", value: "catsandog", maxLength: 12 },
    { name: "wordDict", label: "wordDict (comma-separated)", type: "string", value: "cats, dog, sand, and, cat", maxLength: 60, raw: true },
  ],
  trace({ s, wordDict }) {
    const { w, dict } = parseInput(s, wordDict);
    const n = w.length;
    const steps = [];
    const words = new Set(dict);
    const lengths = [...new Set(dict.map((x) => x.length))].sort((a, b) => a - b);
    const dp = Array(n + 1).fill(false);
    dp[0] = true;
    const view = (o = {}) => {
      const smarks = {};
      if (o.word) for (let t = o.i - o.word.length; t < o.i; t++) smarks[t] = o.hit ? "match" : "cut";
      const dmarks = {};
      for (let k = 0; k <= n; k++) if (k <= (o.i ?? n) && dp[k]) dmarks[k] = "match";
      if (o.i !== undefined) dmarks[o.i] = o.hit ? "new" : "active";
      if (o.from !== undefined) dmarks[o.from] = "window";
      return [
        { type: "array", label: "s (green = the last word that fits, red = not a word)", values: [...w], marks: smarks },
        { type: "array", label: "dp[i] (first i letters splittable? outlined = the dp[i - L] it used)", values: dp.map((v, k) => (k > (o.i ?? n) ? "" : v ? "T" : "F")), marks: dmarks, pointers: o.i !== undefined ? { i: o.i } : {} },
        { type: "vars", items: [{ name: "word lengths to try", value: lengths.join(", ") }] },
      ];
    };
    steps.push({ line: "init", note: `dp[0] = true: the empty prefix is split into zero words. Only the word lengths in the dictionary (${lengths.join(", ")}) need trying for the last word.`, view: view({ i: 0 }) });
    for (let i = 1; i <= n; i++) {
      let used = null;
      let tried = [];
      for (const L of lengths) {
        if (L > i) break;
        const piece = w.slice(i - L, i);
        if (dp[i - L] && words.has(piece)) {
          dp[i] = true;
          used = { L, piece };
          break;
        }
        tried.push(`"${piece}"${dp[i - L] ? " isn't a word" : ` (dp[${i - L}] is false)`}`);
      }
      steps.push({
        line: used ? ["end", "try", "hit"] : ["end", "try"],
        note: used
          ? `dp[${i}]: dp[${i - used.L}] is true and "${used.piece}" is a word, so the first ${i} letters split. dp[${i}] = true.`
          : `dp[${i}]: ${tried.length ? `no luck: ${tried.join(", ")}` : "no word is that short"}. dp[${i}] = false.`,
        view: view({ i, hit: !!used, word: used ? used.piece : null, from: used ? i - used.L : undefined }),
      });
    }
    steps.push({ line: "return", note: `Return dp[${n}] = ${dp[n]}. n positions × at most ${lengths.length} length${lengths.length === 1 ? "" : "s"}: no recursion, no repeated work.`, view: view() });
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
