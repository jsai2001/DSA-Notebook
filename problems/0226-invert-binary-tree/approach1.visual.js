// Build a new tree: the copy of a node gets the mirrored right subtree on its left, and the mirrored left on its right.
(function () {
DSAViz.register("0226-invert-binary-tree/approach1", {
  inputs: [{ name: "root", type: "tree", value: "[4, 2, 7, 1, 3, 6, 9]", maxLength: 15 }],
  trace({ root: values }) {
    const root = nodesFrom(values);
    const steps = [];
    let copyRoot = null;
    const done = {};
    const view = (o = {}) => [treeView(root, "original (never changed; dark = this call, green = copied)", { ...done, ...(o.at !== undefined ? { [o.at]: "active" } : {}) }), copyRoot ? treeView(copyRoot, "the copy so far (yellow = just added)", o.at !== undefined ? { [o.at]: "new" } : {}) : { type: "array", label: "the copy so far", values: [] }];
    if (!root) {
      steps.push({ line: ["return", "call", "base"], note: "Return []. An empty tree mirrors to an empty tree.", view: view() });
      return steps;
    }
    steps.push({ line: "return", note: "mirror(root) builds a brand-new tree.", view: view() });
    const mirror = (n, attach) => {
      if (!n) return null;
      const copy = { val: n.val, left: null, right: null, id: n.id };
      if (attach) attach(copy); else copyRoot = copy;
      steps.push({ line: ["call", "base", "copy"], note: `mirror(${n.val}): make a new node ${n.val}. Its left child will be the mirror of ${n.right ? n.right.val : "None"} (the old right), its right child the mirror of ${n.left ? n.left.val : "None"}.`, view: view({ at: n.id }) });
      mirror(n.right, (c) => (copy.left = c));
      mirror(n.left, (c) => (copy.right = c));
      done[n.id] = "match";
      return copy;
    };
    mirror(root, null);
    steps.push({ line: "return", note: `Return ${show(listOf(copyRoot))}. One new node per node: O(n) time, O(n) extra space.`, view: view() });
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
