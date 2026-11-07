// A trie: a letter follows one child, a "." tries every child (DFS). A match must end on a word-end node.
(function () {
DSAViz.register("0211-design-add-and-search-words-data-structure/approach3", {
  inputs: [{ name: "ops", label: "operations (comma-separated)", type: "string", value: "addWord bad, addWord dad, addWord mad, search pad, search bad, search .ad, search b..", maxLength: 120, raw: true }],
  trace({ ops: text }) {
    const ops = parseOps(text);
    const nodes = new Map([["", { kids: new Set(), end: false }]]);
    const results = [];
    const steps = [];
    const key = (k) => (k === "" ? "(root)" : `"${k}"`);
    const view = (o = {}) => {
      const keys = [...nodes.keys()].sort((a, b) => a.length - b.length || (a < b ? -1 : 1));
      return [
        { type: "map", label: "trie nodes (✓ end = a word ends here; dark = this call, grey = tried, yellow = new, green = match, red = dead end)", columns: ["node (letters to reach it)", "children"], entries: keys.map((k) => [key(k), `${[...nodes.get(k).kids].sort().join(", ") || "none"}${nodes.get(k).end ? "  ✓ end" : ""}`]), marks: o.marks || {} },
        { type: "array", label: "results (null for addWord)", values: results.slice(), wide: true, marks: o.res ? { [results.length - 1]: o.res } : {} },
      ];
    };
    steps.push({ line: "init", note: "Start with just the root node.", view: view() });
    for (const [op, w] of ops) {
      if (op === "addWord") {
        const marks = {};
        for (let i = 1; i <= w.length; i++) {
          const p = w.slice(0, i);
          if (!nodes.has(p)) { nodes.set(p, { kids: new Set(), end: false }); nodes.get(w.slice(0, i - 1)).kids.add(w[i - 1]); marks[key(p)] = "new"; }
        }
        nodes.get(w).end = true;
        results.push("null");
        steps.push({ line: "add", note: `addWord("${w}"): follow its letters, adding missing nodes (yellow), and mark "${w}" as a word end.`, view: view({ marks }) });
        continue;
      }
      const marks = {};
      let calls = 0;
      const dfs = (p, i) => {
        calls++;
        marks[key(p)] = "active";
        if (i === w.length) {
          const ok = nodes.get(p).end;
          marks[key(p)] = ok ? "match" : "cut";
          steps.push({ line: ["dfs", "done"], note: `All of "${w}" is matched at ${key(p)}. ${ok ? "A word ends here: found." : "No word ends here: dead end."}`, view: view({ marks: { ...marks } }) });
          return ok;
        }
        const ch = w[i];
        if (ch === ".") {
          const kids = [...nodes.get(p).kids].sort();
          steps.push({ line: ["dfs", "dot"], note: `At ${key(p)}, "${w}"[${i}] is ".": try ${kids.length ? `each child: ${kids.join(", ")}` : "each child, but there are none"}.`, view: view({ marks: { ...marks } }) });
          marks[key(p)] = "visited";
          for (const k of kids) if (dfs(p + k, i + 1)) return true;
          if (!kids.length) marks[key(p)] = "cut";
          return false;
        }
        const has = nodes.get(p).kids.has(ch);
        if (!has) marks[key(p)] = "cut";
        steps.push({ line: ["dfs", "letter"], note: `At ${key(p)}, "${w}"[${i}] is '${ch}': ${has ? `follow it to ${key(p + ch)}.` : "no such child: dead end."}`, view: view({ marks: { ...marks } }) });
        if (!has) return false;
        marks[key(p)] = "visited";
        return dfs(p + ch, i + 1);
      };
      steps.push({ line: "search", note: `search("${w}"): start the DFS at the root.`, view: view() });
      const ans = dfs("", 0);
      results.push(String(ans));
      steps.push({ line: "search", note: `search("${w}") returns ${ans} after ${calls} DFS call${calls > 1 ? "s" : ""}.`, view: view({ marks, res: ans ? "match" : "cut" }) });
    }
    steps.push({ line: lastLine(ops, { addWord: "add", search: "search" }), note: `Return [${results.join(", ")}]. Letters follow one path: O(L). Each "." can branch into up to 26 children.`, view: view() });
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
