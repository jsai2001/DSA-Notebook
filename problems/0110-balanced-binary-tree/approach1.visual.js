// Top-down: at each node, work out both sides' heights from scratch and compare; then check the children the same way.
DSAViz.register("0110-balanced-binary-tree/approach1", {
  inputs: [{ name: "root", type: "tree", value: "[1, 2, 2, 3, null, null, 3, 4, null, null, 4]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const marks = {};
    let visits = 0; // node visits made by height(): the repeated work
    const height = (id) => (id < 0 ? 0 : (visits++, 1 + Math.max(height(nodes[id].left), height(nodes[id].right))));
    const sub = (id) => (id < 0 ? [] : [id, ...sub(nodes[id].left), ...sub(nodes[id].right)]);
    const view = (cur, o = {}) => {
      const m = { ...marks };
      (o.left || []).forEach((k) => (m[k] = "compare"));
      (o.right || []).forEach((k) => (m[k] = "new"));
      if (cur !== undefined) m[cur] = o.mark || "active";
      return [
        { type: "tree", label: "tree (orange = left side, yellow = right side, both measured now; green = passed)", values, marks: m },
        { type: "vars", items: [{ name: "nodes visited by height() so far", value: visits }] },
      ];
    };
    steps.push({ line: "empty", note: "At every node: measure both sides from scratch and compare. Then check its children the same way.", view: view() });
    function check(id) {
      const n = nodes[id];
      const l = height(n.left);
      const r = height(n.right);
      if (Math.abs(l - r) > 1) {
        marks[id] = "cut";
        steps.push({ line: ["empty", "height", "check", "bad"], note: `${n.val}: left height ${l}, right height ${r}. They differ by ${Math.abs(l - r)}: not balanced. Return false.`, view: view(id, { left: sub(n.left), right: sub(n.right), mark: "cut" }) });
        return false;
      }
      marks[id] = "match";
      steps.push({ line: ["empty", "height", "check", "recurse"], note: `${n.val}: left height ${l}, right height ${r}. Fine here, but every node below must pass too.`, view: view(id, { left: sub(n.left), right: sub(n.right), mark: "match" }) });
      return (n.left < 0 || check(n.left)) && (n.right < 0 || check(n.right));
    }
    const r = check(root);
    const n = Object.keys(nodes).length;
    steps.push({ line: r ? "recurse" : "bad", note: `${r ? "Every node passed: return true." : "Return false."} height() visited ${visits} nodes for a tree of ${n}${visits > n ? ": some subtrees were measured more than once. On a big balanced tree that adds up to O(n · h)" : ""}.`, view: view() });
    return steps;
  },
});
