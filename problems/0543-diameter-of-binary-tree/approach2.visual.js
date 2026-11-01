// One pass: a post-order DFS returns each node's height; at every node, left + right is the longest path that bends there.
DSAViz.register("0543-diameter-of-binary-tree/approach2", {
  inputs: [{ name: "root", type: "tree", value: "[1, 2, 3, 4, 5]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const captions = {}; // id -> "h N" once the node's height is known
    const marks = {};
    const stack = [];
    const heights = {};
    let best = 0;
    let bend = -1; // node where the best path bends
    // the longest path down from id (following the taller child), for highlighting the answer
    const down = (id) => {
      const path = [];
      while (id >= 0) {
        path.push(id);
        const { left, right } = nodes[id];
        id = (heights[left] || 0) >= (heights[right] || 0) ? left : right;
      }
      return path;
    };
    const view = (current, opts = {}) => {
      const m = { ...marks };
      if (opts.path) opts.path.forEach((id) => (m[id] = "match"));
      if (current !== undefined) m[current] = opts.mark || "active";
      return [
        { type: "tree", label: "tree (caption = height: nodes on the longest path down)", values, marks: m, captions: { ...captions } },
        { type: "array", label: "call stack (bottom → top)", values: stack.slice(), wide: true, marks: stack.length ? { [stack.length - 1]: "active" } : {} },
        {
          type: "vars",
          items: [
            { name: "best", value: `${best} edge${best === 1 ? "" : "s"}`, mark: opts.improved ? "new" : "" },
            ...(opts.lr ? [{ name: "left + right", value: `${opts.lr[0]} + ${opts.lr[1]} = ${opts.lr[0] + opts.lr[1]}` }] : []),
          ],
        },
      ];
    };

    steps.push({
      line: ["init", "start"],
      note: "best = 0. height(node) counts the nodes on the longest path down from node, and on the way it tries the path that bends at node.",
      view: view(),
    });
    function height(id) {
      const node = nodes[id];
      stack.push(`height(${node.val})`);
      steps.push({ line: "call", note: `height(${node.val}): first get both children's heights.`, view: view(id) });
      const h = {};
      for (const side of ["left", "right"]) {
        const child = node[side];
        if (child < 0) {
          h[side] = 0;
          steps.push({ line: [side, "empty"], note: `${node.val} has no ${side} child: height(None) = 0.`, view: view(id) });
        } else {
          steps.push({ line: side, note: `Go ${side} to ${nodes[child].val}.`, view: view(id) });
          h[side] = height(child);
          steps.push({ line: side, note: `Back at ${node.val}: its ${side} height is ${h[side]}.`, view: view(id) });
        }
      }
      const through = h.left + h.right;
      const improved = through > best;
      if (improved) {
        best = through;
        bend = id;
      }
      steps.push({
        line: "best",
        note: `The longest path that bends at ${node.val} has ${h.left} + ${h.right} = ${through} edge${through === 1 ? "" : "s"}. ${improved ? `That's the longest so far: best = ${best}.` : `Not longer than best (${best}).`}`,
        view: view(id, { mark: improved ? "match" : "compare", improved, lr: [h.left, h.right] }),
      });
      heights[id] = 1 + Math.max(h.left, h.right);
      captions[id] = `h ${heights[id]}`;
      marks[id] = "visited";
      steps.push({ line: "return", note: `Return 1 + max(${h.left}, ${h.right}) = ${heights[id]} to ${stack.length > 1 ? "the parent" : "the start"}.`, view: view(id) });
      stack.pop();
      return heights[id];
    }
    height(root);
    const path = bend < 0 ? [root] : down(nodes[bend].left).reverse().concat([bend], down(nodes[bend].right));
    steps.push({
      line: "answer",
      note:
        best === 0
          ? "Return best = 0: a single node has no edges."
          : `Return best = ${best}. The path (green) bends at ${nodes[bend].val}: ${path.map((id) => nodes[id].val).join(" – ")}${bend === root ? "" : ". It doesn't pass through the root"}. Each node was visited once: O(n).`,
      view: view(undefined, { path }),
    });
    return steps;
  },
});
