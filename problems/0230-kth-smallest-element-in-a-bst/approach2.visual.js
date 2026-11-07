// The same in-order walk, counting down from k; it stops as soon as the k-th value is reached.
(function () {
DSAViz.register("0230-kth-smallest-element-in-a-bst/approach2", {
  inputs: [
    { name: "root", type: "tree", value: "[5, 3, 6, 2, 4, null, null, 1]", maxLength: 15 },
    { name: "k", type: "int", value: "3", min: 1, max: 15 },
  ],
  trace({ root: values, k }) {
    const { root, nodes } = check(values, k);
    const done = {};
    const steps = [];
    let left = k;
    let ans = null;
    const view = (o = {}) => [{ type: "tree", label: "tree (dark = counted now, green = counted, never visited = plain)", values, marks: { ...done, ...(o.at !== undefined ? { [o.at]: o.hit ? "match" : "active" } : {}) } }, { type: "vars", items: [{ name: "left", value: left, mark: o.at !== undefined ? "new" : "" }, { name: "ans", value: ans === null ? "None" : ans, mark: o.hit ? "match" : "" }] }];
    steps.push({ line: "init", note: `left = ${k}: count down one per value, in sorted order.`, view: view() });
    const go = (id) => {
      if (id < 0 || ans !== null) return;
      go(nodes[id].left);
      if (ans !== null) return;
      left--;
      if (left === 0) {
        ans = nodes[id].val;
        steps.push({ line: ["visit", "count", "found"], note: `${nodes[id].val} is the next smallest: left = 0. Found it; every call returns right away.`, view: view({ at: id, hit: true }) });
        return;
      }
      steps.push({ line: ["visit", "count"], note: `${nodes[id].val} is the next smallest: left = ${left}.`, view: view({ at: id }) });
      done[id] = "match";
      go(nodes[id].right);
    };
    go(root);
    steps.push({ line: "return", note: `Return ${ans}. Only the first k values were counted, but the calls first go all the way down the left side: O(h + k).`, view: view() });
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
