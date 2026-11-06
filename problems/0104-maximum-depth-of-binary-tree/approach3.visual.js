// DFS with a stack of (node, depth) pairs; keep the biggest depth seen.
DSAViz.register("0104-maximum-depth-of-binary-tree/approach3", {
  inputs: [{ name: "root", type: "tree", value: "[3, 9, 20, null, null, 15, 7]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const done = {};
    const captions = {};
    const stack = [[root, 1]];
    let best = 0;
    const view = (cur, o = {}) => {
      const m = { ...done };
      stack.forEach(([id]) => (m[id] = "new"));
      if (cur !== undefined) m[cur] = "active";
      return [
        { type: "tree", label: "tree (yellow = on the stack, green = visited; under each node: its depth)", values, marks: m, captions: { ...captions } },
        { type: "array", label: "stack (bottom → top): node (depth)", values: stack.map(([id, d]) => `${nodes[id].val} (${d})`), wide: true, marks: stack.length ? { [stack.length - 1]: "active" } : {} },
        { type: "vars", items: [{ name: "best", value: best, mark: o.better ? "match" : "" }] },
      ];
    };
    captions[root] = "depth 1";
    steps.push({ line: "init", note: "Push (root, depth 1).", view: view() });
    while (stack.length) {
      const [id, d] = stack.pop();
      const better = d > best;
      best = Math.max(best, d);
      done[id] = "match";
      const kids = [];
      for (const c of [nodes[id].right, nodes[id].left]) {
        if (c >= 0) {
          stack.push([c, d + 1]);
          captions[c] = `depth ${d + 1}`;
          kids.push(nodes[c].val);
        }
      }
      steps.push({
        line: ["loop", "pop", "best", "push"],
        note: `Pop ${nodes[id].val} at depth ${d}.${better ? ` New deepest: best = ${best}.` : ""} ${kids.length ? `Push ${kids.join(" then ")} at depth ${d + 1} (right first, so left comes out next).` : "It's a leaf."}`,
        view: view(id, { better }),
      });
    }
    steps.push({ line: "return", note: `The stack is empty: return best = ${best}.`, view: view() });
    return steps;
  },
});
