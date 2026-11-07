// Search for p and for q from the root, keeping both paths. The last node the two paths share is the answer.
(function () {
DSAViz.register("0235-lowest-common-ancestor-of-a-binary-search-tree/approach2", {
  inputs: [
    { name: "root", type: "tree", value: "[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]", maxLength: 15 },
    { name: "p", type: "int", value: "3", min: -99, max: 99 },
    { name: "q", type: "int", value: "0", min: -99, max: 99 },
  ],
  trace({ root: values, p, q }) {
    const { root, nodes, pid, qid } = check(values, p, q);
    const path = (t) => { const out = []; let id = root; while (id !== t) { out.push(id); id = nodes[t].val < nodes[id].val ? nodes[id].left : nodes[id].right; } out.push(id); return out; };
    const a = path(pid), b = path(qid);
    const all = Object.keys(nodes).map(Number);
    const caps = Object.fromEntries(all.map((id) => [id, id === pid ? "p" : id === qid ? "q" : ""]).filter(([, c]) => c));
    const steps = [];
    const show = (ids) => ids.map((id) => nodes[id].val);
    steps.push({ line: ["both", "path"], note: `Search for p = ${p}: smaller goes left, bigger goes right. Path: ${show(a).join(" → ")}.`, view: [{ type: "tree", label: "tree (yellow = the path to p)", values, marks: Object.fromEntries(a.map((id) => [id, "compare"])), captions: caps }, { type: "array", label: "path to p", values: show(a), compact: true }] });
    steps.push({ line: ["both", "path"], note: `Search for q = ${q}. Path: ${show(b).join(" → ")}.`, view: [{ type: "tree", label: "tree (yellow = the path to q)", values, marks: Object.fromEntries(b.map((id) => [id, "compare"])), captions: caps }, { type: "array", label: "path to p", values: show(a), compact: true }, { type: "array", label: "path to q", values: show(b), compact: true }] });
    let k = 0;
    while (k < a.length && k < b.length && a[k] === b[k]) k++;
    const lca = a[k - 1];
    const m = Object.fromEntries([...a, ...b].map((id) => [id, "visited"]));
    a.slice(0, k).forEach((id) => (m[id] = "compare"));
    m[lca] = "match";
    const shared = Object.fromEntries([...Array(k).keys()].map((i) => [i, i === k - 1 ? "match" : "compare"]));
    steps.push({ line: ["compare", "return"], note: `Return ${nodes[lca].val}. The paths share their first ${k} node${k > 1 ? "s" : ""}; the last shared one is the answer. O(h) time, O(h) space for the paths.`, view: [{ type: "tree", label: "tree (yellow = shared by both paths, green = the last shared node)", values, marks: m, captions: caps }, { type: "array", label: "path to p", values: show(a), compact: true, marks: shared }, { type: "array", label: "path to q", values: show(b), compact: true, marks: shared }] });
    return steps;
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
