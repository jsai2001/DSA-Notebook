// Two lists: the current level's values are one answer; its children, in order, are the next level.
DSAViz.register("0102-binary-tree-level-order-traversal/approach3", {
  inputs: [{ name: "root", type: "tree", value: "[3, 9, 20, null, null, 15, 7]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const done = {};
    const result = [];
    let level = [root];
    let next = [];
    const fmt = (a) => `[${a.join(", ")}]`;
    const view = (o = {}) => {
      const m = { ...done };
      level.forEach((id) => (m[id] = "active"));
      next.forEach((id) => (m[id] = "new"));
      return [
        { type: "tree", label: "tree (dark = this level, yellow = next level, green = done)", values, marks: m },
        { type: "array", label: "level", values: level.map((id) => nodes[id].val) },
        { type: "array", label: "next", values: next.map((id) => nodes[id].val) },
        { type: "array", label: "result", values: result.map(fmt), wide: true, marks: o.added ? { [result.length - 1]: "new" } : {} },
      ];
    };
    steps.push({ line: "init", note: `The first level is just the root, ${nodes[root].val}.`, view: view() });
    while (level.length) {
      result.push(level.map((id) => nodes[id].val));
      steps.push({ line: ["loop", "done"], note: `Save this level's values: ${fmt(result[result.length - 1])}.`, view: view({ added: true }) });
      next = [];
      for (const id of level) for (const c of [nodes[id].left, nodes[id].right]) if (c >= 0) next.push(c);
      steps.push({ line: "next", note: next.length ? `Their children, left to right: ${next.map((c) => nodes[c].val).join(", ")}. That's the next level.` : "No children: there is no next level.", view: view() });
      level.forEach((id) => (done[id] = "match"));
      level = next;
      next = [];
      steps.push({ line: "swap", note: level.length ? "Move on: next becomes level." : "The level is empty: stop.", view: view() });
    }
    steps.push({ line: "return", note: `Return ${result.length} level${result.length === 1 ? "" : "s"}.`, view: view() });
    return steps;
  },
});
