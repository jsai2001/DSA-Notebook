// One walk from the root: while p and q are both smaller (or both bigger), go that way. Where they split is the answer.
(function () {
DSAViz.register("0235-lowest-common-ancestor-of-a-binary-search-tree/approach3", {
  inputs: [
    { name: "root", type: "tree", value: "[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]", maxLength: 15 },
    { name: "p", type: "int", value: "3", min: -99, max: 99 },
    { name: "q", type: "int", value: "0", min: -99, max: 99 },
  ],
  trace({ root: values, p, q }) {
    const { root, nodes, pid, qid } = check(values, p, q);
    const all = Object.keys(nodes).map(Number);
    const caps = Object.fromEntries(all.map((id) => [id, id === pid ? "p" : id === qid ? "q" : ""]).filter(([, c]) => c));
    const steps = [];
    const seen = [];
    let id = root;
    const view = (m) => [{ type: "tree", label: "tree (dashed = passed, dark = this node, green = the answer)", values, marks: { ...Object.fromEntries(seen.map((x) => [x, "visited"])), ...m }, captions: caps }, { type: "vars", items: [{ name: "p", value: p }, { name: "q", value: q }, { name: "node", value: nodes[id].val }] }];
    steps.push({ line: "init", note: "Start at the root.", view: view({ [id]: "active" }) });
    while (true) {
      const v = nodes[id].val;
      if (p < v && q < v) {
        steps.push({ line: ["loop", "left"], note: `${p} and ${q} are both smaller than ${v}: both are in the left subtree. Go left.`, view: view({ [id]: "active" }) });
        seen.push(id); id = nodes[id].left;
      } else if (p > v && q > v) {
        steps.push({ line: ["loop", "left", "right"], note: `${p} and ${q} are both bigger than ${v}: both are on the right. Go right.`, view: view({ [id]: "active" }) });
        seen.push(id); id = nodes[id].right;
      } else {
        const why = v === p || v === q ? `${v} is ${v === p ? "p" : "q"} itself, and the other is below it` : `${Math.min(p, q)} < ${v} < ${Math.max(p, q)}: they're on different sides`;
        steps.push({ line: ["loop", "left", "right", "found"], note: `Return ${v}. ${why}. O(h) time, O(1) space.`, view: view({ [id]: "match" }) });
        return steps;
      }
    }
  },
});

function check(values, p, q) {
  const { root, nodes } = DSAViz.buildTree(values);
  const ids = Object.keys(nodes).map(Number);
  if (root < 0) throw new DSAViz.InputError("The tree needs at least two nodes.");
  if (new Set(ids.map((id) => nodes[id].val)).size !== ids.length) throw new DSAViz.InputError("BST values must all be different.");
  const ok = (id, lo, hi) => id < 0 || (nodes[id].val > lo && nodes[id].val < hi && ok(nodes[id].left, lo, nodes[id].val) && ok(nodes[id].right, nodes[id].val, hi));
  if (!ok(root, -Infinity, Infinity)) throw new DSAViz.InputError("That isn't a BST: every left subtree must be smaller and every right subtree bigger than its node.");
  const idOf = (v) => ids.find((id) => nodes[id].val === v);
  if (p === q) throw new DSAViz.InputError("p and q must be different nodes.");
  if (idOf(p) === undefined || idOf(q) === undefined) throw new DSAViz.InputError("p and q must be values in the tree.");
  return { root, nodes, pid: idOf(p), qid: idOf(q) };
}
})();
