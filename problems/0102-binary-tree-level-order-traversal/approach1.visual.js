// DFS with the depth: pre-order (node, left, right), each value goes into result[depth].
DSAViz.register("0102-binary-tree-level-order-traversal/approach1", {
  inputs: [{ name: "root", type: "tree", value: "[3, 9, 20, null, null, 15, 7]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const done = {};
    const captions = {};
    const result = [];
    const fmt = (a) => `[${a.join(", ")}]`;
    const view = (cur, depth) => {
      const m = { ...done };
      if (cur !== undefined) m[cur] = "active";
      return [
        { type: "tree", label: "tree (under each node: its depth; green = placed)", values, marks: m, captions: { ...captions } },
        { type: "array", label: "result[depth]", values: result.map(fmt), wide: true, marks: depth !== undefined ? { [depth]: "new" } : {} },
      ];
    };
    steps.push({ line: "init", note: "Visit the nodes depth first, left before right, and drop each value into the list for its depth.", view: view() });
    function dfs(id, depth) {
      const node = nodes[id];
      captions[id] = `depth ${depth}`;
      const fresh = depth === result.length;
      if (fresh) result.push([]);
      result[depth].push(node.val);
      done[id] = "match";
      steps.push({
        line: fresh ? ["call", "new", "add"] : ["call", "add"],
        note: `${node.val} is at depth ${depth}.${fresh ? ` It's the first node seen at that depth: start result[${depth}].` : ""} result[${depth}] = ${fmt(result[depth])}.`,
        view: view(id, depth),
      });
      if (node.left >= 0) dfs(node.left, depth + 1);
      if (node.right >= 0) dfs(node.right, depth + 1);
    }
    dfs(root, 0);
    steps.push({ line: "return", note: "Return result. Left was always visited before right, so each level is in left-to-right order.", view: view() });
    return steps;
  },
});
