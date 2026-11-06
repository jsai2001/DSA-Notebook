// BFS: at the start of each round the queue holds exactly one level; pop that many, add their children to the back.
DSAViz.register("0102-binary-tree-level-order-traversal/approach2", {
  inputs: [{ name: "root", type: "tree", value: "[3, 9, 20, null, null, 15, 7]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const done = {};
    const result = [];
    let queue = [root];
    let level = [];
    const fmt = (a) => `[${a.join(", ")}]`;
    const view = (cur, o = {}) => {
      const m = { ...done };
      queue.forEach((id) => (m[id] = "new"));
      (o.lvl || []).forEach((id) => (m[id] = "active"));
      if (cur !== undefined) m[cur] = "active";
      return [
        { type: "tree", label: "tree (yellow = in the queue, green = done)", values, marks: m },
        { type: "array", label: "queue (front first)", values: queue.map((id) => nodes[id].val), marks: o.size ? Object.fromEntries(queue.slice(0, o.size).map((_, k) => [k, "compare"])) : {} },
        { type: "array", label: "this level so far", values: level.slice() },
        { type: "array", label: "result", values: result.map(fmt), wide: true, marks: o.added ? { [result.length - 1]: "new" } : {} },
      ];
    };
    steps.push({ line: "init", note: `Put the root, ${nodes[root].val}, in the queue.`, view: view() });
    while (queue.length) {
      const n = queue.length;
      level = [];
      steps.push({ line: ["loop", "size"], note: `The queue holds ${n} node${n === 1 ? "" : "s"}: all of level ${result.length}, and nothing else. Pop exactly ${n}.`, view: view(undefined, { size: n }) });
      for (let k = 0; k < n; k++) {
        const id = queue.shift();
        level.push(nodes[id].val);
        const kids = [nodes[id].left, nodes[id].right].filter((c) => c >= 0);
        queue.push(...kids);
        done[id] = "match";
        steps.push({
          line: ["pop", "push"],
          note: `Pop ${nodes[id].val}. ${kids.length ? `Add its child${kids.length > 1 ? "ren" : ""} ${kids.map((c) => nodes[c].val).join(" and ")} to the back (next level).` : "No children."}`,
          view: view(id),
        });
      }
      result.push(level.slice());
      steps.push({ line: "done", note: `Level ${result.length - 1} is ${fmt(level)}.${queue.length ? " The queue now holds only the next level." : " The queue is empty."}`, view: view(undefined, { added: true }) });
    }
    level = [];
    steps.push({ line: "return", note: `Return ${result.length} level${result.length === 1 ? "" : "s"}. Each node went in and out of the queue once: O(n).`, view: view() });
    return steps;
  },
});
