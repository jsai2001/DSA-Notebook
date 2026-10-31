// BFS: a queue of (node, largest value above it), visited level by level.
DSAViz.register("1448-count-good-nodes-in-binary-tree/approach3", {
  inputs: [{ name: "root", type: "tree", value: "[3, 1, 4, 3, null, 1, 5]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const marks = {};
    const captions = {};
    const queue = [[root, nodes[root].val]];
    captions[root] = `max ${nodes[root].val}`;
    let count = 0;
    const view = (current, opts = {}) => {
      const m = { ...marks };
      queue.forEach(([id]) => {
        if (m[id] === undefined) m[id] = "new";
      });
      if (current !== undefined) m[current] = opts.mark || "active";
      return [
        { type: "tree", label: "tree (green = good, yellow = waiting in the queue)", values, marks: m, captions },
        {
          type: "array", label: "queue (front → back): node (max above it)",
          values: queue.map(([id, b]) => `${nodes[id].val} (${b})`),
          marks: queue.length ? { 0: "active" } : {}, wide: true,
        },
        { type: "vars", items: [{ name: "count", value: count, mark: opts.counted ? "match" : "" }] },
      ];
    };

    steps.push({
      line: "init",
      note: `Put (root ${nodes[root].val}, max ${nodes[root].val}) in the queue. Each entry carries the largest value on its own path, so levels can be mixed freely.`,
      view: view(),
    });

    while (queue.length) {
      const [id, best] = queue.shift();
      const node = nodes[id];
      steps.push({
        line: ["loop", "pop"],
        note: `Take ${node.val} from the front. The largest value above it is ${best}.`,
        view: view(id),
      });
      const good = node.val >= best;
      if (good) count++;
      marks[id] = good ? "match" : "visited";
      const newBest = Math.max(best, node.val);
      const kids = ["left", "right"].map((s) => node[s]).filter((c) => c >= 0);
      kids.forEach((c) => {
        queue.push([c, newBest]);
        captions[c] = `max ${newBest}`;
      });
      steps.push({
        line: good ? ["check", "good", "update", "push"] : ["check", "update", "push"],
        note:
          (good ? `${node.val} ≥ ${best}: good. count = ${count}. ` : `${node.val} < ${best}: not good. `) +
          (kids.length
            ? `Add ${kids.map((c) => nodes[c].val).join(" and ")} to the back with max ${newBest}.`
            : `It has no children.`),
        view: view(id, { mark: good ? "match" : "compare", counted: good }),
      });
    }

    steps.push({
      line: "return",
      note: `The queue is empty. Return ${count}. The queue held at most one level at a time: O(width) memory, and no recursion.`,
      view: view(),
    });
    return steps;
  },
});
