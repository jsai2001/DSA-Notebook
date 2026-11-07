// BFS: take each node from the queue, swap its two children, and queue them.
(function () {
DSAViz.register("0226-invert-binary-tree/approach2", {
  inputs: [{ name: "root", type: "tree", value: "[4, 2, 7, 1, 3, 6, 9]", maxLength: 15 }],
  trace({ root: values }) {
    const root = nodesFrom(values);
    const steps = [];
    const queue = root ? [root] : [];
    const done = {};
    const view = (o = {}) => [treeView(root, "tree (dark = just swapped, green = done)", { ...done, ...(o.at !== undefined ? { [o.at]: "active" } : {}) }), { type: "array", label: "queue (front on the left)", values: queue.map((n) => n.val), compact: true }];
    steps.push({ line: "init", note: root ? "Put the root in the queue." : "The tree is empty: nothing to queue.", view: view() });
    while (queue.length) {
      const n = queue.shift();
      [n.left, n.right] = [n.right, n.left];
      const kids = [n.left, n.right].filter(Boolean);
      queue.push(...kids);
      steps.push({ line: ["pop", "swap", "push"], note: `Pop ${n.val} and swap its children: left is now ${n.left ? n.left.val : "None"}, right is ${n.right ? n.right.val : "None"}.${kids.length ? ` Queue ${kids.map((k) => k.val).join(", ")}.` : ""}`, view: view({ at: n.id }) });
      done[n.id] = "match";
    }
    steps.push({ line: "return", note: `Return ${show(listOf(root))}. Every node is swapped once: O(n) time, O(width) for the queue.`, view: view() });
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
