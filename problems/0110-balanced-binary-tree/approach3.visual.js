// Post-order with a stack: each node is visited twice; on the second visit both children's heights are known.
DSAViz.register("0110-balanced-binary-tree/approach3", {
  inputs: [{ name: "root", type: "tree", value: "[3, 9, 20, null, null, 15, 7]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const marks = {};
    const captions = {};
    const height = {};
    const stack = [[root, false]];
    const view = (cur, mark) => {
      const m = { ...marks };
      stack.forEach(([id, done]) => (m[id] = m[id] || (done ? "compare" : "new")));
      if (cur !== undefined) m[cur] = mark || "active";
      return [
        { type: "tree", label: "tree (yellow = to visit, orange = waiting for its children, green = height known)", values, marks: m, captions: { ...captions } },
        { type: "array", label: "stack (bottom → top); ✓ = children done", values: stack.map(([id, d]) => `${nodes[id].val}${d ? " ✓" : ""}`), wide: true, marks: stack.length ? { [stack.length - 1]: "active" } : {} },
      ];
    };
    steps.push({ line: "init", note: `Push the root, ${nodes[root].val}. A node is checked only once both its children have heights.`, view: view() });
    while (stack.length) {
      const [id, done] = stack.pop();
      const n = nodes[id];
      if (!done) {
        stack.push([id, true]);
        const kids = [];
        for (const c of [n.right, n.left]) if (c >= 0) { stack.push([c, false]); kids.push(nodes[c].val); }
        steps.push({ line: ["loop", "push"], note: `First visit to ${n.val}: put it back marked ✓, then ${kids.length ? `push its children (${kids.join(" then ")})` : "it has no children"}.`, view: view(id) });
        continue;
      }
      const l = n.left >= 0 ? height[n.left] : 0;
      const r = n.right >= 0 ? height[n.right] : 0;
      if (Math.abs(l - r) > 1) {
        marks[id] = "cut";
        steps.push({ line: ["loop", "visit", "bad"], note: `Second visit to ${n.val}: heights ${l} and ${r} differ by ${Math.abs(l - r)}. Return false.`, view: view(id, "cut") });
        return steps;
      }
      height[id] = 1 + Math.max(l, r);
      captions[id] = `h ${height[id]}`;
      marks[id] = "match";
      steps.push({ line: ["loop", "visit", "bad"], note: `Second visit to ${n.val}: heights ${l} and ${r}, fine. Store its height, ${height[id]}.`, view: view(id, "match") });
    }
    steps.push({ line: "return", note: "Every node passed: return true. No recursion was used.", view: view() });
    return steps;
  },
});
