// Level order: write each level left to right, "null" for missing children. Rebuild by giving each parent the next two tokens.
(function () {
DSAViz.register("0297-serialize-and-deserialize-binary-tree/approach1", {
  inputs: [{ name: "root", type: "tree", value: "[1, 2, 3, null, null, 4, 5]", maxLength: 15, minValue: -1000, maxValue: 1000 }],
  trace({ root: values }) {
    const root = objTree(values);
    const steps = [];
    const toks = [];
    const q = [root];
    while (q.length) { const n = q.shift(); if (n) { toks.push(String(n.val)); q.push(n.left, n.right); } else toks.push("null"); }
    const full = toks.slice();
    while (toks.length && toks[toks.length - 1] === "null") toks.pop();
    steps.push({ line: "ser", note: `serialize: read the tree level by level, writing "null" for each missing child: ${full.length} tokens.`, view: [{ type: "tree", label: "the tree", values }, tokView(full, Object.fromEntries(full.map((t, i) => [i, t === "null" ? "ghost" : ""]).filter(([, m]) => m)))] });
    steps.push({ line: "trim", note: `Drop the ${full.length - toks.length} trailing "null"s: they say nothing. The string is "${toks.join(",")}".`, view: [tokView(toks)] });
    if (!toks.length) { steps.push({ line: ["empty", "return"], note: 'Return []. The string is empty, so deserialize returns None.', view: [tokView(toks)] }); return steps; }
    const built = { val: Number(toks[0]), left: null, right: null };
    const parents = [built];
    let i = 1;
    steps.push({ line: "root", note: `deserialize: the first token, ${toks[0]}, is the root. It waits for its two children.`, view: [{ type: "tree", label: "rebuilt so far", values: levelList(built) }, tokView(toks, { 0: "match" })] });
    while (parents.length && i < toks.length) {
      const p = parents.shift(); const got = [];
      for (const side of ["left", "right"]) { if (i < toks.length && toks[i] !== "null") { p[side] = { val: Number(toks[i]), left: null, right: null }; parents.push(p[side]); got.push(`${side} = ${toks[i]}`); } else if (i < toks.length) got.push(`${side} = None`); i++; }
      steps.push({ line: "link", note: `The next two tokens are ${p.val}'s children: ${got.join(", ")}.`, view: [{ type: "tree", label: "rebuilt so far", values: levelList(built) }, tokView(toks, Object.fromEntries(toks.map((_, k) => [k, k < i - 2 ? "match" : k < i ? "new" : ""]).filter(([, m]) => m)))] });
    }
    steps.push({ line: "return", note: `Return ${show(levelList(built))}. The same tree as the input. O(n) both ways.`, view: [{ type: "tree", label: "rebuilt tree", values: levelList(built) }] });
    return steps;
  },
});

// Level-order list (with nulls) of a tree built from {val,left,right} objects.
function levelList(root) {
  const out = []; const q = [root];
  while (q.length) { const n = q.shift(); if (!n) { out.push(null); continue; } out.push(n.val); q.push(n.left, n.right); }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}
function objTree(values) {
  const { root, nodes } = DSAViz.buildTree(values);
  const o = {};
  Object.keys(nodes).forEach((id) => (o[id] = { val: nodes[id].val, left: null, right: null, id: Number(id) }));
  Object.keys(nodes).forEach((id) => { if (nodes[id].left >= 0) o[id].left = o[nodes[id].left]; if (nodes[id].right >= 0) o[id].right = o[nodes[id].right]; });
  return root < 0 ? null : o[root];
}
const show = (v) => `[${v.map((x) => (x === null ? "null" : x)).join(", ")}]`;
const tokView = (toks, marks = {}, label = "the string, as tokens") => ({ type: "array", label, values: toks, wide: true, marks });
})();
