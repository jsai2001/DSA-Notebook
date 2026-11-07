// In-order (left, node, right) lists a BST's values smallest first. Collect all of them, then take index k - 1.
(function () {
DSAViz.register("0230-kth-smallest-element-in-a-bst/approach1", {
  inputs: [
    { name: "root", type: "tree", value: "[5, 3, 6, 2, 4, null, null, 1]", maxLength: 15 },
    { name: "k", type: "int", value: "3", min: 1, max: 15 },
  ],
  trace({ root: values, k }) {
    const { root, nodes } = check(values, k);
    const vals = [];
    const done = {};
    const steps = [];
    const view = (o = {}) => [{ type: "tree", label: "tree (dark = just listed, green = listed)", values, marks: { ...done, ...(o.at !== undefined ? { [o.at]: "active" } : {}) } }, { type: "array", label: "vals (in-order)", values: vals.slice(), marks: o.pick ? { [k - 1]: "match" } : vals.length && o.at !== undefined ? { [vals.length - 1]: "new" } : {} }];
    steps.push({ line: "init", note: "Visit left subtree, node, right subtree, everywhere: the values come out sorted.", view: view() });
    const go = (id) => {
      if (id < 0) return;
      go(nodes[id].left);
      vals.push(nodes[id].val);
      steps.push({ line: ["visit", "add"], note: `Everything left of ${nodes[id].val} is listed: add ${nodes[id].val}.`, view: view({ at: id }) });
      done[id] = "match";
      go(nodes[id].right);
    };
    go(root);
    steps.push({ line: "return", note: `Return ${vals[k - 1]}. It's vals[k − 1] = vals[${k - 1}]. All n values were listed: O(n) time and space.`, view: view({ pick: true }) });
    return steps;
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
