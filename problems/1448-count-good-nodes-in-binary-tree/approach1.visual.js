// Recursive DFS: carry the largest value on the path down; a node is good if it's >= that value.
DSAViz.register("1448-count-good-nodes-in-binary-tree/approach1", {
  inputs: [{ name: "root", type: "tree", value: "[3, 1, 4, 3, null, 1, 5]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const marks = {}; // id -> "match" (good) / "visited" (not good)
    const captions = {}; // id -> "max X" passed into that call
    const stack = [];
    let total = 0;
    const view = (current, opts = {}) => {
      const m = { ...marks };
      if (current !== undefined) m[current] = opts.mark || "active";
      return [
        { type: "tree", label: "tree (green = good; caption = largest value above the node)", values, marks: m, captions },
        { type: "array", label: "call stack (bottom → top)", values: stack.slice(), marks: stack.length ? { [stack.length - 1]: "active" } : {}, wide: true },
        { type: "vars", items: [{ name: "good so far", value: total, mark: opts.counted ? "match" : "" }] },
      ];
    };

    steps.push({
      line: "start",
      note: `Start at the root with best = root.val = ${nodes[root].val}. The root has nothing above it, so it's always good.`,
      view: view(),
    });

    function dfs(id, best) {
      const node = nodes[id];
      stack.push(`dfs(${node.val}, max ${best})`);
      captions[id] = `max ${best}`;
      steps.push({
        line: "call",
        note: `Visit ${node.val}. The largest value on the path above it is ${best}.`,
        view: view(id),
      });
      const good = node.val >= best;
      let count = good ? 1 : 0;
      if (good) total++;
      marks[id] = good ? "match" : "visited";
      const newBest = Math.max(best, node.val);
      steps.push({
        line: ["check", "update"],
        note: good
          ? `${node.val} ≥ ${best}: nothing above it is bigger, so ${node.val} is good. Children now compare against max(${best}, ${node.val}) = ${newBest}.`
          : `${node.val} < ${best}: a bigger value is above it, so it's not good. Children still compare against ${newBest}.`,
        view: view(id, { mark: good ? "match" : "compare", counted: good }),
      });
      for (const side of ["left", "right"]) {
        const child = node[side];
        if (child < 0) {
          steps.push({
            line: [side, "empty"],
            note: `${node.val} has no ${side} child: dfs(None) returns 0.`,
            view: view(id),
          });
        } else {
          steps.push({ line: side, note: `Go ${side} to ${nodes[child].val}, passing max ${newBest}.`, view: view(id) });
          count += dfs(child, newBest);
        }
      }
      steps.push({
        line: "done",
        note: `The subtree under ${node.val} has ${count} good node${count === 1 ? "" : "s"}. Return ${count} to the caller.`,
        view: view(id),
      });
      stack.pop();
      return count;
    }

    const answer = dfs(root, nodes[root].val);
    steps.push({
      line: "start",
      note: `Return ${answer}. Every node was visited once (O(n)), and the call stack was at most as deep as the tree.`,
      view: view(),
    });
    return steps;
  },
});
