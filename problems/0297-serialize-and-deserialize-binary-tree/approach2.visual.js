// Pre-order with "#" for empty: node, left subtree, right subtree. Rebuild recursively in the same order.
(function () {
DSAViz.register("0297-serialize-and-deserialize-binary-tree/approach2", {
  inputs: [{ name: "root", type: "tree", value: "[1, 2, 3, null, null, 4, 5]", maxLength: 15, minValue: -1000, maxValue: 1000 }],
  trace({ root: values }) {
    const root = objTree(values);
    const steps = [];
    const toks = [];
    const walk = (n) => { if (!n) { toks.push("#"); return; } toks.push(String(n.val)); walk(n.left); walk(n.right); };
    walk(root);
    steps.push({ line: "ser", note: `serialize (with recursion): write each node, then its left subtree, then its right; "#" marks an empty spot. ${toks.length} tokens.`, view: [{ type: "tree", label: "the tree", values }, tokView(toks, Object.fromEntries(toks.map((t, i) => [i, t === "#" ? "ghost" : ""]).filter(([, m]) => m)))] });
    steps.push({ line: "trim", note: `The string is "${toks.join(",")}". A "#" after every leaf is what lets deserialize tell where each subtree ends.`, view: [tokView(toks)] });
    if (toks[0] === "#") { steps.push({ line: ["root", "empty", "return"], note: "Return []. The first token is #, so the tree is empty.", view: [tokView(toks, { 0: "ghost" })] }); return steps; }
    let pos = 0;
    let built = null;
    const build = (attach) => {
      const t = toks[pos++];
      if (t === "#") return null;
      const node = { val: Number(t), left: null, right: null };
      if (attach) attach(node); else built = node;
      steps.push({ line: "link", note: `Token ${pos - 1} is ${t}: a new node. Its left subtree's tokens come next, then its right's.`, view: [{ type: "tree", label: "rebuilt so far", values: levelList(built) }, tokView(toks, Object.fromEntries(toks.map((_, k) => [k, k < pos - 1 ? "match" : k === pos - 1 ? "new" : ""]).filter(([, m]) => m)))] });
      build((c) => (node.left = c));
      build((c) => (node.right = c));
      return node;
    };
    steps.push({ line: "root", note: "deserialize: read the tokens in the same order.", view: [tokView(toks)] });
    build(null);
    steps.push({ line: "return", note: `Return ${show(levelList(built))}. The same tree. O(n) both ways${2 === 2 ? ", and O(height) call stack" : ", and the stack holds at most one path"}.`, view: [{ type: "tree", label: "rebuilt tree", values: levelList(built) }] });
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
