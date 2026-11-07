// The same pre-order string, built and read with a stack, so a 10^4-deep tree needs no recursion.
(function () {
DSAViz.register("0297-serialize-and-deserialize-binary-tree/approach3", {
  inputs: [{ name: "root", type: "tree", value: "[1, 2, 3, null, null, 4, 5]", maxLength: 15, minValue: -1000, maxValue: 1000 }],
  trace({ root: values }) {
    const root = objTree(values);
    const steps = [];
    const toks = [];
    const walk = (n) => { if (!n) { toks.push("#"); return; } toks.push(String(n.val)); walk(n.left); walk(n.right); };
    walk(root);
    steps.push({ line: "ser", note: `serialize (with a stack): write each node, then its left subtree, then its right; "#" marks an empty spot. ${toks.length} tokens.`, view: [{ type: "tree", label: "the tree", values }, tokView(toks, Object.fromEntries(toks.map((t, i) => [i, t === "#" ? "ghost" : ""]).filter(([, m]) => m)))] });
    steps.push({ line: "trim", note: `The string is "${toks.join(",")}". A "#" after every leaf is what lets deserialize tell where each subtree ends.`, view: [tokView(toks)] });
    if (toks[0] === "#") { steps.push({ line: ["root", "empty", "return"], note: "Return []. The first token is #, so the tree is empty.", view: [tokView(toks, { 0: "ghost" })] }); return steps; }
    const built = { val: Number(toks[0]), left: null, right: null };
    const stack = [[built, 0]];
    const sv = () => ({ type: "array", label: "stack: node (children given so far), top on the right", values: stack.map(([n, g]) => `${n.val} (${g})`), wide: true });
    steps.push({ line: "root", note: `deserialize: token 0, ${toks[0]}, is the root. Push it with 0 children given.`, view: [{ type: "tree", label: "rebuilt so far", values: levelList(built) }, tokView(toks, { 0: "match" }), sv()] });
    for (let k = 1; k < toks.length; k++) {
      const parent = stack[stack.length - 1];
      const child = toks[k] === "#" ? null : { val: Number(toks[k]), left: null, right: null };
      const side = parent[1] === 0 ? "left" : "right";
      parent[0][side] = child;
      parent[1]++;
      const done = [];
      while (stack.length && stack[stack.length - 1][1] === 2) done.push(stack.pop()[0].val);
      if (child) stack.push([child, 0]);
      steps.push({ line: "link", note: `Token ${k} (${toks[k]}) is ${parent[0].val}'s ${side} child${child ? "" : ": empty"}.${done.length ? ` ${done.join(", ")} now ${done.length > 1 ? "have" : "has"} both children: pop.` : ""}${child ? ` Push ${child.val}: its children come next.` : ""}`, view: [{ type: "tree", label: "rebuilt so far", values: levelList(built) }, tokView(toks, Object.fromEntries(toks.map((_, j) => [j, j < k ? "match" : j === k ? "new" : ""]).filter(([, m]) => m))), sv()] });
    }
    steps.push({ line: "return", note: `Return ${show(levelList(built))}. The same tree. O(n) both ways${3 === 2 ? ", and O(height) call stack" : ", and the stack holds at most one path"}.`, view: [{ type: "tree", label: "rebuilt tree", values: levelList(built) }] });
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
