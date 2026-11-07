// Iterative in-order with a stack: push the whole left side, pop the next smallest, then go right. Stop at the k-th pop.
(function () {
DSAViz.register("0230-kth-smallest-element-in-a-bst/approach3", {
  inputs: [
    { name: "root", type: "tree", value: "[5, 3, 6, 2, 4, null, null, 1]", maxLength: 15 },
    { name: "k", type: "int", value: "3", min: 1, max: 15 },
  ],
  trace({ root: values, k: k0 }) {
    const { root, nodes } = check(values, k0);
    let k = k0;
    const stack = [];
    const done = {};
    const steps = [];
    const view = (o = {}) => {
      const m = { ...done };
      stack.forEach((id) => (m[id] = "compare"));
      if (o.at !== undefined) m[o.at] = o.hit ? "match" : "active";
      return [{ type: "tree", label: "tree (yellow = on the stack, dark = popped now, green = popped)", values, marks: m }, { type: "array", label: "stack (top on the right)", values: stack.map((id) => nodes[id].val), compact: true }, { type: "vars", items: [{ name: "k", value: k, mark: o.at !== undefined ? "new" : "" }] }];
    };
    let node = root;
    steps.push({ line: "init", note: "Start at the root with an empty stack.", view: view() });
    while (true) {
      const pushed = [];
      while (node >= 0) { stack.push(node); pushed.push(nodes[node].val); node = nodes[node].left; }
      if (pushed.length) steps.push({ line: ["loop", "down"], note: `Go left as far as possible, pushing ${pushed.join(", ")}.`, view: view() });
      const id = stack.pop();
      k--;
      if (k === 0) {
        steps.push({ line: ["pop", "found"], note: `Pop ${nodes[id].val}: the next smallest. k = 0, so it's the answer.`, view: view({ at: id, hit: true }) });
        steps.push({ line: "found", note: `Return ${nodes[id].val}. O(h + k): the stack never holds more than the tree's height.`, view: view({ at: id, hit: true }) });
        return steps;
      }
      steps.push({ line: ["pop", "found", "right"], note: `Pop ${nodes[id].val}: the next smallest. k = ${k}. Now visit its right subtree${nodes[id].right < 0 ? " (empty)" : ""}.`, view: view({ at: id }) });
      done[id] = "match";
      node = nodes[id].right;
    }
  },
});

function check(values, k) {
  const { root, nodes } = DSAViz.buildTree(values);
  const ids = Object.keys(nodes).map(Number);
  if (root < 0) throw new DSAViz.InputError("The tree needs at least one node.");
  if (new Set(ids.map((id) => nodes[id].val)).size !== ids.length) throw new DSAViz.InputError("BST values must all be different here.");
  const ok = (id, lo, hi) => id < 0 || (nodes[id].val > lo && nodes[id].val < hi && ok(nodes[id].left, lo, nodes[id].val) && ok(nodes[id].right, nodes[id].val, hi));
  if (!ok(root, -Infinity, Infinity)) throw new DSAViz.InputError("That isn't a BST: every left subtree must be smaller and every right subtree bigger than its node.");
  if (k < 1 || k > ids.length) throw new DSAViz.InputError(`k must be between 1 and ${ids.length} (the number of nodes).`);
  return { root, nodes };
}
})();
