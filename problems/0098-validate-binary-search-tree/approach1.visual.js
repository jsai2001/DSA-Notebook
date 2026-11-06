// The definition, checked directly: every value on a node's left must be smaller, every value on its right bigger.
DSAViz.register("0098-validate-binary-search-tree/approach1", {
  inputs: [{ name: "root", type: "tree", value: "[5, 4, 6, null, null, 3, 7]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const done = {};
    let looked = 0; // values collected in total
    const sub = (id) => (id < 0 ? [] : [id, ...sub(nodes[id].left), ...sub(nodes[id].right)]);
    const view = (cur, o = {}) => {
      const m = { ...done };
      (o.side || []).forEach((k) => (m[k] = o.badAt === k ? "cut" : "compare"));
      if (cur !== undefined) m[cur] = o.mark || "active";
      return [
        { type: "tree", label: "tree (orange = the subtree being compared with the node; green = checked)", values, marks: m },
        { type: "vars", items: [{ name: "values collected so far", value: looked }] },
      ];
    };
    steps.push({ line: "return", note: "For every node, collect all values on its left and all on its right, and compare them with the node.", view: view() });
    function check(id) {
      const node = nodes[id];
      for (const [side, line] of [["left", "left"], ["right", "right"]]) {
        const ids = sub(node[side]);
        looked += ids.length;
        if (!ids.length) continue;
        const bad = ids.find((k) => (side === "left" ? nodes[k].val >= node.val : nodes[k].val <= node.val));
        const vals = ids.map((k) => nodes[k].val).join(", ");
        if (bad !== undefined) {
          steps.push({
            line: [side === "left" ? "call" : "left", "collect", line],
            note: `${node.val}'s ${side} subtree has ${vals}. ${nodes[bad].val} is ${side === "left" ? "not smaller" : "not bigger"} than ${node.val}. Not a BST: return false.`,
            view: view(id, { side: ids, badAt: bad, mark: "cut" }),
          });
          return false;
        }
        steps.push({ line: [side === "left" ? "call" : "left", "collect", line], note: `${node.val}'s ${side} subtree: ${vals}. All ${side === "left" ? "smaller" : "bigger"} than ${node.val}.`, view: view(id, { side: ids }) });
      }
      done[id] = "match";
      steps.push({ line: ["right", "recurse"], note: `${node.val} is fine. Now check its children the same way.`, view: view(id, { mark: "match" }) });
      if (node.left >= 0 && !check(node.left)) return false;
      if (node.right >= 0 && !check(node.right)) return false;
      return true;
    }
    const r = check(root);
    const n = Object.keys(nodes).length;
    steps.push({ line: "return", note: `${r ? "Every node passed: return true." : "Return false."} ${looked} values collected for ${n} nodes: each value is collected again for every ancestor above it.`, view: view() });
    return steps;
  },
});
