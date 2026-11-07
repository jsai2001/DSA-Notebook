// Works for any binary tree: record every node's parent, mark p's ancestors, then climb from q until you hit one.
(function () {
DSAViz.register("0235-lowest-common-ancestor-of-a-binary-search-tree/approach1", {
  inputs: [
    { name: "root", type: "tree", value: "[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]", maxLength: 15 },
    { name: "p", type: "int", value: "3", min: -99, max: 99 },
    { name: "q", type: "int", value: "0", min: -99, max: 99 },
  ],
  trace({ root: values, p, q }) {
    const { root, nodes, pid, qid } = check(values, p, q);
    const parent = { [root]: -1 };
    const stack = [root];
    while (stack.length) { const id = stack.pop(); for (const c of [nodes[id].left, nodes[id].right]) if (c >= 0) { parent[c] = id; stack.push(c); } }
    const steps = [];
    const all = Object.keys(nodes).map(Number);
    const tv = (marks, label) => ({ type: "tree", label, values, marks, captions: Object.fromEntries(all.map((id) => [id, id === pid ? "p" : id === qid ? "q" : ""]).filter(([, c]) => c)) });
    steps.push({ line: "walk", note: `Walk the whole tree once (${all.length} nodes) and record each node's parent. This ignores the BST order completely.`, view: [tv(Object.fromEntries(all.map((id) => [id, "visited"])), "tree (dashed = visited to record parents)"), { type: "map", label: "parent", columns: ["node", "parent"], entries: all.map((id) => [String(nodes[id].val), parent[id] < 0 ? "None" : String(nodes[parent[id]].val)]) }] });
    const anc = [];
    for (let x = pid; x >= 0; x = parent[x]) anc.push(x);
    steps.push({ line: "up", note: `From p = ${p}, follow parents up to the root: ${anc.map((id) => nodes[id].val).join(" → ")}. Put them in a set.`, view: [tv(Object.fromEntries(anc.map((id) => [id, "compare"])), "tree (yellow = p and its ancestors)"), { type: "set", label: "ancestors of p", items: anc.map((id) => String(nodes[id].val)) }] });
    let x = qid;
    const climbed = [];
    while (!anc.includes(x)) { climbed.push(x); x = parent[x]; }
    const marks = Object.fromEntries(anc.map((id) => [id, "compare"]));
    climbed.forEach((id) => (marks[id] = "visited"));
    marks[x] = "match";
    steps.push({ line: ["meet", "return"], note: `Return ${nodes[x].val}. Climbing from q = ${q}${climbed.length > 1 ? ` (past ${climbed.slice(1).map((id) => nodes[id].val).join(", ")})` : ""}, the first node that's also above p is ${nodes[x].val}. O(n) time and space.`, view: [tv(marks, "tree (yellow = above p, dashed = climbed from q, green = where they meet)"), { type: "set", label: "ancestors of p", items: anc.map((id) => String(nodes[id].val)), marks: { [String(nodes[x].val)]: "match" } }] });
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
