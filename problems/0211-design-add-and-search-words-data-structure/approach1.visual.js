// A list of words: search compares the pattern with every word, letter by letter ("." matches anything).
(function () {
DSAViz.register("0211-design-add-and-search-words-data-structure/approach1", {
  inputs: [{ name: "ops", label: "operations (comma-separated)", type: "string", value: "addWord bad, addWord dad, addWord mad, search pad, search bad, search .ad, search b..", maxLength: 120, raw: true }],
  trace({ ops: text }) {
    const ops = parseOps(text);
    const words = [];
    const results = [];
    const steps = [];
    const view = (o = {}) => [
      { type: "array", label: "words (green = matches, red = checked and doesn't)", values: words.slice(), wide: true, marks: o.wm || {} },
      { type: "array", label: "results (null for addWord)", values: results.slice(), wide: true, marks: o.res ? { [results.length - 1]: o.res } : {} },
    ];
    steps.push({ line: "init", note: "Start with an empty list.", view: view() });
    for (const [op, w] of ops) {
      if (op === "addWord") {
        words.push(w);
        results.push("null");
        steps.push({ line: "add", note: `addWord("${w}"): append it.`, view: view({ wm: { [words.length - 1]: "new" } }) });
        continue;
      }
      const wm = {};
      let hit = -1;
      for (let k = 0; k < words.length; k++) { if (fits(w, words[k])) { hit = k; wm[k] = "match"; break; } wm[k] = "cut"; }
      results.push(String(hit >= 0));
      steps.push({ line: hit >= 0 ? ["scan", "found"] : ["scan", "none"], note: `search("${w}"): ${hit >= 0 ? `"${words[hit]}" matches after ${hit + 1} check${hit ? "s" : ""}. Return true.` : `checked all ${words.length} words, none fits. Return false.`}`, view: view({ wm, res: hit >= 0 ? "match" : "cut" }) });
    }
    steps.push({ line: lastLine(ops, { addWord: "add", search: results[results.length - 1] === "true" ? "found" : "none" }), note: `Return [${results.join(", ")}]. Each search can check every word: O(N·L).`, view: view() });
    return steps;
  },
});

// "addWord bad, search .ad" -> [["addWord", "bad"], ["search", ".ad"]]
function parseOps(text) {
  const parts = text.split(",").map((s) => s.trim()).filter(Boolean);
  if (!parts.length) throw new DSAViz.InputError("Give operations like: addWord bad, search .ad");
  if (parts.length > 8) throw new DSAViz.InputError("At most 8 operations here, so the steps stay readable.");
  return parts.map((p) => {
    const m = p.match(/^(addWord|search)\s+(\S+)$/);
    if (!m) throw new DSAViz.InputError(`"${p}": use addWord or search, then a word, like "addWord bad".`);
    if (m[1] === "addWord" && !/^[a-z]+$/.test(m[2])) throw new DSAViz.InputError(`"${m[2]}": addWord takes lowercase letters only.`);
    if (m[1] === "search" && !/^[a-z.]+$/.test(m[2])) throw new DSAViz.InputError(`"${m[2]}": search takes lowercase letters and "." only.`);
    if (m[2].length > 5) throw new DSAViz.InputError(`"${m[2]}": at most 5 letters here.`);
    return [m[1], m[2]];
  });
}
const fits = (pat, w) => pat.length === w.length && [...pat].every((p, i) => p === "." || p === w[i]);
const lastLine = (ops, lines) => lines[ops[ops.length - 1][0]];
})();
