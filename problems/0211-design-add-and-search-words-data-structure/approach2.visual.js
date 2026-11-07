// Words grouped by length: a search without "." is one hash lookup; with "." it scans only same-length words.
(function () {
DSAViz.register("0211-design-add-and-search-words-data-structure/approach2", {
  inputs: [{ name: "ops", label: "operations (comma-separated)", type: "string", value: "addWord bad, addWord dad, addWord mad, search pad, search bad, search .ad, search b..", maxLength: 120, raw: true }],
  trace({ ops: text }) {
    const ops = parseOps(text);
    const by = new Map();
    const results = [];
    const steps = [];
    const view = (o = {}) => [
      { type: "map", label: "by_len: length → words (yellow = the group searched)", columns: ["length", "words"], entries: [...by.keys()].sort((a, b) => a - b).map((k) => [String(k), [...by.get(k)].join(", ")]), marks: o.len !== undefined && by.has(o.len) ? { [String(o.len)]: o.lm || "new" } : {} },
      { type: "array", label: "results (null for addWord)", values: results.slice(), wide: true, marks: o.res ? { [results.length - 1]: o.res } : {} },
    ];
    steps.push({ line: "init", note: "Start with no groups.", view: view() });
    for (const [op, w] of ops) {
      if (op === "addWord") {
        if (!by.has(w.length)) by.set(w.length, new Set());
        by.get(w.length).add(w);
        results.push("null");
        steps.push({ line: "add", note: `addWord("${w}"): put it in the group for length ${w.length}.`, view: view({ len: w.length }) });
        continue;
      }
      const group = [...(by.get(w.length) || [])];
      let ans;
      let note;
      let line;
      if (!w.includes(".")) { ans = group.includes(w); line = ["group", "exact"]; note = `no ".", so one hash lookup in the length-${w.length} group: ${ans ? "found" : "not there"}.`; }
      else { const hit = group.find((x) => fits(w, x)); ans = hit !== undefined; line = ["group", "scan"]; note = group.length ? `has ".", so compare it with the ${group.length} word${group.length > 1 ? "s" : ""} of length ${w.length}: ${ans ? `"${hit}" fits` : "none fits"}.` : `no words of length ${w.length}.`; }
      results.push(String(ans));
      steps.push({ line, note: `search("${w}"): ${note} Return ${ans}.`, view: view({ len: w.length, lm: ans ? "match" : "cut", res: ans ? "match" : "cut" }) });
    }
    steps.push({ line: lastLine(ops, { addWord: "add", search: ops[ops.length - 1][1].includes(".") ? "scan" : "exact" }), note: `Return [${results.join(", ")}]. Exact words cost O(L); patterns still scan their whole length group.`, view: view() });
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
