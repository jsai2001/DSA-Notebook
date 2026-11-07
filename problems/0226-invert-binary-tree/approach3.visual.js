// Recursion: invert both subtrees, then put each on the other side. Both are read before either is changed.
(function () {
DSAViz.register("0226-invert-binary-tree/approach3", {
  inputs: [{ name: "root", type: "tree", value: "[4, 2, 7, 1, 3, 6, 9]", maxLength: 15 }],
  trace({ root: values }) {
    const root = nodesFrom(values);
    const steps = [];
    const done = {};
    const open = [];
    const view = (o = {}) => [treeView(root, "tree (dark = this call, yellow = just finished, green = subtree inverted)", { ...done, ...(o.at !== undefined ? { [o.at]: o.m || "active" } : {}) }), { type: "array", label: "open calls invertTree(node), outermost first", values: open.map((n) => n.val), compact: true }];
    if (!root) {
      steps.push({ line: ["base", "return"], note: "Return []. root is None.", view: view() });
      return steps;
    }
    const inv = (n) => {
      if (!n) return null;
      open.push(n);
      steps.push({ line: "swap", note: `invertTree(${n.val}): first invert its right subtree (${n.right ? n.right.val : "None"}) and its left subtree (${n.left ? n.left.val : "None"}).`, view: view({ at: n.id }) });
      const r = inv(n.right);
      const l = inv(n.left);
      n.left = r;
      n.right = l;
      done[n.id] = "match";
      steps.push({ line: ["swap", "return"], note: `Back in invertTree(${n.val}): left = ${r ? r.val : "None"}, right = ${l ? l.val : "None"}. Its whole subtree is inverted.`, view: view({ at: n.id, m: "new" }) });
      open.pop();
      return n;
    };
    inv(root);
    steps.push({ line: "return", note: `Return ${show(listOf(root))}. O(n) time, O(height) for the calls.`, view: view() });
    return steps;
  },
});

// Node objects { val, left, right, id } built from the level-order input (id = its index there).
function nodesFrom(values) {
  const { root, nodes } = DSAViz.buildTree(values);
  const objs = {};
  Object.keys(nodes).forEach((id) => (objs[id] = { val: nodes[id].val, left: null, right: null, id: Number(id) }));
  Object.keys(nodes).forEach((id) => { if (nodes[id].left >= 0) objs[id].left = objs[nodes[id].left]; if (nodes[id].right >= 0) objs[id].right = objs[nodes[id].right]; });
  return root < 0 ? null : objs[root];
}
// A tree widget for the current links. marks: { id: mark } using the nodes' ids.
function treeView(root, label, marks = {}) {
  const values = [];
  const at = new Map();
  const q = [root];
  while (q.length) { const n = q.shift(); if (!n) { values.push(null); continue; } at.set(n, values.length); values.push(n.val); q.push(n.left, n.right); }
  while (values.length && values[values.length - 1] === null) values.pop();
  const m = {};
  for (const [n, k] of at) if (marks[n.id]) m[k] = marks[n.id];
  return { type: "tree", label, values, marks: m };
}
const listOf = (root) => treeView(root, "").values;
const show = (v) => `[${v.map((x) => (x === null ? "null" : x)).join(", ")}]`;
})();
