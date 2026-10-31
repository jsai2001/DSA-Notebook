// Iterative DFS: a stack of (node, largest value above it) replaces the call stack.
DSAViz.register("1448-count-good-nodes-in-binary-tree/approach2", {
  inputs: [{ name: "root", type: "tree", value: "[3, 1, 4, 3, null, 1, 5]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const marks = {};
    const captions = {};
    const stack = [[root, nodes[root].val]];
    captions[root] = `max ${nodes[root].val}`;
    let count = 0;
    const view = (current, opts = {}) => {
      const m = { ...marks };
      stack.forEach(([id]) => {
        if (m[id] === undefined) m[id] = "new";
      });
      if (current !== undefined) m[current] = opts.mark || "active";
      return [
        { type: "tree", label: "tree (green = good, yellow = waiting on the stack)", values, marks: m, captions },
        {
          type: "array", label: "stack (bottom → top): node (max above it)",
          values: stack.map(([id, b]) => `${nodes[id].val} (${b})`),
          marks: stack.length ? { [stack.length - 1]: "active" } : {}, wide: true,
        },
        { type: "vars", items: [{ name: "count", value: count, mark: opts.counted ? "match" : "" }] },
      ];
    };

    steps.push({
      line: "init",
      note: `Push (root ${nodes[root].val}, max ${nodes[root].val}). Each stack entry remembers the largest value on its own path, which is what the recursion kept in its parameters.`,
      view: view(),
    });

    while (stack.length) {
      const [id, best] = stack.pop();
      const node = nodes[id];
      steps.push({
        line: ["loop", "pop"],
        note: `Pop ${node.val}. The largest value above it is ${best}.`,
        view: view(id),
      });
      const good = node.val >= best;
      if (good) count++;
      marks[id] = good ? "match" : "visited";
      const newBest = Math.max(best, node.val);
      const pushed = [];
      for (const side of ["right", "left"]) {
        const child = node[side];
        if (child >= 0) {
          stack.push([child, newBest]);
          captions[child] = `max ${newBest}`;
          pushed.push(nodes[child].val);
        }
      }
      steps.push({
        line: good ? ["check", "good", "update", "push"] : ["check", "update", "push"],
        note:
          (good ? `${node.val} ≥ ${best}: good. count = ${count}. ` : `${node.val} < ${best}: not good. `) +
          (pushed.length
            ? `Push ${pushed.join(" then ")} with max ${newBest} (right first, so left is popped next).`
            : `No children to push.`),
        view: view(id, { mark: good ? "match" : "compare", counted: good }),
      });
    }

    steps.push({
      line: "return",
      note: `The stack is empty. Return ${count}. Same visiting order as the recursion, but a deep tree can't overflow the call stack.`,
      view: view(),
    });
    return steps;
  },
});
