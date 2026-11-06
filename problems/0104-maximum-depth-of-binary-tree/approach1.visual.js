// BFS: walk the tree one level per round and count the rounds.
DSAViz.register("0104-maximum-depth-of-binary-tree/approach1", {
  inputs: [{ name: "root", type: "tree", value: "[3, 9, 20, null, null, 15, 7]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const done = {};
    const captions = {};
    let queue = [root];
    let depth = 0;
    const view = (o = {}) => {
      const m = { ...done };
      queue.forEach((id) => (m[id] = o.level ? "active" : "new"));
      return [
        { type: "tree", label: "tree (dark = this level, green = counted; under each node: its level)", values, marks: m, captions: { ...captions } },
        { type: "array", label: "queue", values: queue.map((id) => nodes[id].val) },
        { type: "vars", items: [{ name: "depth", value: depth, mark: o.level ? "new" : "" }] },
      ];
    };
    steps.push({ line: "init", note: "Start with the root in the queue and depth 0.", view: view() });
    while (queue.length) {
      depth++;
      queue.forEach((id) => (captions[id] = `level ${depth}`));
      steps.push({ line: ["loop", "level"], note: `A new level: depth = ${depth}. It has ${queue.length} node${queue.length === 1 ? "" : "s"}: ${queue.map((id) => nodes[id].val).join(", ")}.`, view: view({ level: true }) });
      const next = [];
      for (const id of queue) {
        done[id] = "match";
        for (const c of [nodes[id].left, nodes[id].right]) if (c >= 0) next.push(c);
      }
      queue = next;
      steps.push({ line: ["pop", "push"], note: next.length ? `Pop them and add their children: ${next.map((c) => nodes[c].val).join(", ")}.` : "Pop them. None has children: the queue is empty.", view: view() });
    }
    steps.push({ line: "return", note: `${depth} level${depth === 1 ? "" : "s"}: return ${depth}.`, view: view() });
    return steps;
  },
});
