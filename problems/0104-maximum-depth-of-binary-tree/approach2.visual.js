// Recursion: a node's depth is 1 + the deeper of its two subtrees; an empty subtree is 0.
DSAViz.register("0104-maximum-depth-of-binary-tree/approach2", {
  inputs: [{ name: "root", type: "tree", value: "[3, 9, 20, null, null, 15, 7]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const marks = {};
    const captions = {};
    const view = (cur, mark) => {
      const m = { ...marks };
      if (cur !== undefined) m[cur] = mark || "active";
      return [{ type: "tree", label: "tree (under each node: the depth of its subtree, once known)", values, marks: m, captions: { ...captions } }];
    };
    steps.push({ line: "empty", note: "Each node asks its two subtrees for their depth, then adds 1 for itself. An empty subtree answers 0.", view: view() });
    function depth(id) {
      const n = nodes[id];
      steps.push({ line: ["empty", "left"], note: `At ${n.val}: first the depth of its left subtree${n.left < 0 ? " (empty: 0)" : ""}.`, view: view(id) });
      const l = n.left >= 0 ? depth(n.left) : 0;
      steps.push({ line: "right", note: `Back at ${n.val}: left gave ${l}. Now the right subtree${n.right < 0 ? " (empty: 0)" : ""}.`, view: view(id) });
      const r = n.right >= 0 ? depth(n.right) : 0;
      const d = 1 + Math.max(l, r);
      captions[id] = `depth ${d}`;
      marks[id] = "match";
      steps.push({ line: "return", note: `${n.val}: 1 + max(${l}, ${r}) = ${d}.`, view: view(id, "match") });
      return d;
    }
    const d = depth(root);
    steps.push({ line: "return", note: `The root's answer is the whole tree's depth: return ${d}. Each node was visited once.`, view: view() });
    return steps;
  },
});
