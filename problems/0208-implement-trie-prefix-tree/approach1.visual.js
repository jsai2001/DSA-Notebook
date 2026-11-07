// A set of the words: search is one lookup, but startsWith has to check every word.
(function () {
DSAViz.register("0208-implement-trie-prefix-tree/approach1", {
  inputs: [{ name: "ops", label: "operations (comma-separated)", type: "string", value: "insert apple, search apple, search app, startsWith app, insert app, search app", maxLength: 120, raw: true }],
  trace({ ops: text }) {
    const ops = parseOps(text);
    const words = [];
    const results = [];
    const steps = [];
    const view = (o = {}) => [
      { type: "set", label: "words", items: words.slice(), marks: o.wm || {} },
      { type: "array", label: "results (null for insert)", values: results.slice(), wide: true, marks: o.res ? { [results.length - 1]: o.res } : {} },
      { type: "vars", items: [{ name: "words checked", value: o.checked === undefined ? "-" : o.checked }] },
    ];
    steps.push({ line: "init", note: "Start with an empty set.", view: view() });
    for (const [op, w] of ops) {
      if (op === "insert") {
        if (!words.includes(w)) words.push(w);
        results.push("null");
        steps.push({ line: "insert", note: `insert("${w}"): add it to the set.`, view: view({ wm: { [w]: "new" } }) });
      } else if (op === "search") {
        const ans = words.includes(w);
        results.push(String(ans));
        steps.push({ line: "search", note: `search("${w}"): one hash lookup. Return ${ans}.`, view: view({ wm: ans ? { [w]: "match" } : {}, res: ans ? "match" : "cut", checked: 1 }) });
      } else {
        let k = 0;
        let hit = null;
        for (const x of words) { k++; if (x.startsWith(w)) { hit = x; break; } }
        results.push(String(hit !== null));
        steps.push({ line: "prefix", note: `startsWith("${w}"): check the words one by one. ${hit !== null ? `"${hit}" starts with it after ${k} check${k > 1 ? "s" : ""}. Return true.` : `None of the ${k} words starts with it. Return false.`}`, view: view({ wm: hit !== null ? { [hit]: "match" } : Object.fromEntries(words.map((x) => [x, "cut"])), res: hit !== null ? "match" : "cut", checked: k }) });
      }
    }
    const lastLine = { insert: "insert", search: "search", startsWith: "prefix" }[ops[ops.length - 1][0]];
    steps.push({ line: lastLine, note: `Return [${results.join(", ")}]. search is O(L), but startsWith is O(total letters stored).`, view: view() });
    return steps;
  },
});

// "insert apple, search app" -> [["insert", "apple"], ["search", "app"]]
function parseOps(text) {
  const parts = text.split(",").map((s) => s.trim()).filter(Boolean);
  if (!parts.length) throw new DSAViz.InputError("Give operations like: insert apple, search app, startsWith app");
  if (parts.length > 10) throw new DSAViz.InputError("At most 10 operations here, so the steps stay readable.");
  return parts.map((p) => {
    const m = p.match(/^(insert|search|startsWith)\s+([a-z]+)$/);
    if (!m) throw new DSAViz.InputError(`"${p}": use insert, search or startsWith, then a lowercase word, like "insert apple".`);
    if (m[2].length > 8) throw new DSAViz.InputError(`"${m[2]}": at most 8 letters here.`);
    return [m[1], m[2]];
  });
}
// The trie as a table: one row per node, keyed by the letters spelled to reach it.
function trieTable(nodes, label, marks, slots) {
  const keys = [...nodes.keys()].sort((a, b) => a.length - b.length || (a < b ? -1 : 1));
  return {
    type: "map", label, columns: ["node (letters to reach it)", slots ? "used slots [k] → child" : "children"],
    entries: keys.map((k) => {
      const kids = [...nodes.get(k).kids].sort();
      const c = kids.length ? kids.map((ch) => (slots ? `[${ch.charCodeAt(0) - 97}] ${ch}` : ch)).join(", ") : "none";
      return [k === "" ? "(root)" : `"${k}"`, `${c}${nodes.get(k).end ? "  ✓ end" : ""}`];
    }),
    marks,
  };
}
// Runs the trie operations and records one step per operation (shared by approach 2 and 3).
function trieTrace(text, slots) {
  const ops = parseOps(text);
  const nodes = new Map([["", { kids: new Set(), end: false }]]);
  const results = [];
  const steps = [];
  const view = (o = {}) => [
    trieTable(nodes, slots ? "nodes (26 child slots each; only the used ones are listed. grey = walked, yellow = new, green = found, red = stopped)" : "nodes (each is a dict: letter → child; ✓ end = a word ends here. grey = walked, yellow = new, green = found, red = stopped)", o.marks || {}, slots),
    { type: "array", label: "results (null for insert)", values: results.slice(), wide: true, marks: o.res ? { [results.length - 1]: o.res } : {} },
  ];
  const key = (k) => (k === "" ? "(root)" : `"${k}"`);
  steps.push({ line: "init", note: "Start with just the root node.", view: view() });
  for (const [op, w] of ops) {
    if (op === "insert") {
      const marks = { [key("")]: "visited" };
      let made = 0;
      for (let i = 1; i <= w.length; i++) {
        const p = w.slice(0, i);
        if (!nodes.has(p)) { nodes.set(p, { kids: new Set(), end: false }); nodes.get(w.slice(0, i - 1)).kids.add(w[i - 1]); made++; marks[key(p)] = "new"; } else marks[key(p)] = "visited";
      }
      nodes.get(w).end = true;
      results.push("null");
      steps.push({ line: ["insert", "end"], note: `insert("${w}"): follow its letters from the root, making ${made} new node${made === 1 ? "" : "s"} (yellow). Mark the last node as a word end.`, view: view({ marks }) });
      continue;
    }
    const marks = { [key("")]: "visited" };
    let reached = true;
    let i = 0;
    for (; i < w.length; i++) {
      const p = w.slice(0, i + 1);
      if (!nodes.has(p)) { reached = false; break; }
      marks[key(p)] = "visited";
    }
    let ans;
    let why;
    if (!reached) { ans = false; why = `"${w.slice(0, i)}" has no child '${w[i]}': stop.`; marks[key(w.slice(0, i))] = "cut"; }
    else if (op === "startsWith") { ans = true; why = `every letter of "${w}" has a node.`; marks[key(w)] = "match"; }
    else { ans = nodes.get(w).end; why = ans ? `the node "${w}" is marked as a word end.` : `all letters are there, but no word ends at "${w}": it's only a prefix.`; marks[key(w)] = ans ? "match" : "cut"; }
    results.push(String(ans));
    steps.push({ line: op === "search" ? ["search", "walk"] : ["prefix", "walk"], note: `${op}("${w}"): ${why} Return ${ans}.`, view: view({ marks, res: ans ? "match" : "cut" }) });
  }
  steps.push({ line: ops[ops.length - 1][0] === "insert" ? "end" : ops[ops.length - 1][0] === "search" ? "search" : "prefix", note: `Return [${results.join(", ")}]. Every operation walks one node per letter: O(L) each.`, view: view() });
  return steps;
}
})();
