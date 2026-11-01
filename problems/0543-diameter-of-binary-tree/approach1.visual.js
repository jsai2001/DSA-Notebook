// Brute force: at every node, compute both subtree heights from scratch; the best left + right is the answer.
DSAViz.register("0543-diameter-of-binary-tree/approach1", {
  inputs: [{ name: "root", type: "tree", value: "[1, 2, 3, 4, 5]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const H = {}; // true heights, used for the notes and the final path
    const height = (id) => (id < 0 ? 0 : (H[id] = 1 + Math.max(height(nodes[id].left), height(nodes[id].right))));
    height(root);
    const size = (id) => (id < 0 ? 0 : 1 + size(nodes[id].left) + size(nodes[id].right));
    const down = (id) => {
      const path = [];
      while (id >= 0) {
        path.push(id);
        const { left, right } = nodes[id];
        id = (H[left] || 0) >= (H[right] || 0) ? left : right;
      }
      return path;
    };
    const captions = {}; // id -> left + right at that node
    const marks = {};
    let best = 0;
    let bend = -1;
    let work = 0; // nodes visited by height() so far
    const view = (current, opts = {}) => {
      const m = { ...marks };
      if (opts.sub) opts.sub.forEach((id) => (m[id] = "window"));
      if (opts.path) opts.path.forEach((id) => (m[id] = "match"));
      if (current !== undefined) m[current] = opts.mark || "active";
      return [
        { type: "tree", label: "tree (caption = edges on the longest path bending there)", values, marks: m, captions: { ...captions } },
        {
          type: "vars",
          items: [
            { name: "best", value: `${best} edge${best === 1 ? "" : "s"}`, mark: opts.improved ? "new" : "" },
            { name: "height() visits so far", value: String(work), mark: opts.counted ? "new" : "" },
          ],
        },
      ];
    };
    const subtree = (id) => (id < 0 ? [] : [id, ...subtree(nodes[id].left), ...subtree(nodes[id].right)]);

    steps.push({
      line: "start",
      note: "The longest path bends at some node: it goes down that node's left side and down its right side. Try every node as the bend.",
      view: view(),
    });
    function diameter(id) {
      const node = nodes[id];
      steps.push({ line: "call", note: `diameter(${node.val}): try ${node.val} as the bend.`, view: view(id) });
      const l = H[node.left] || 0;
      const r = H[node.right] || 0;
      const cost = size(node.left) + size(node.right);
      work += cost;
      const through = l + r;
      const improved = through > best;
      if (improved) {
        best = through;
        bend = id;
      }
      captions[id] = String(through);
      marks[id] = "visited";
      steps.push({
        line: "through",
        note: `height(left) = ${l}, height(right) = ${r}, so the path bending here has ${through} edge${through === 1 ? "" : "s"}. Working out those heights walked all ${cost} node${cost === 1 ? "" : "s"} below ${node.val} (shaded) again.`,
        view: view(id, { sub: subtree(node.left).concat(subtree(node.right)), counted: cost > 0, improved, mark: improved ? "match" : "compare" }),
      });
      for (const side of ["left", "right"]) {
        const child = node[side];
        if (child < 0) steps.push({ line: ["best", "empty"], note: `${node.val} has no ${side} child: diameter(None) = 0.`, view: view(id) });
        else {
          steps.push({ line: "best", note: `Is the longest path inside ${node.val}'s ${side} subtree? Ask diameter(${nodes[child].val}).`, view: view(id) });
          diameter(child);
        }
      }
      steps.push({ line: "best", note: `Back at ${node.val}: the best below and through it is ${best}.`, view: view(id) });
    }
    diameter(root);
    const path = bend < 0 ? [root] : down(nodes[bend].left).reverse().concat([bend], down(nodes[bend].right));
    const n = Object.keys(nodes).length;
    steps.push({
      line: "start",
      note:
        best === 0
          ? `Return 0: a single node has no edges.`
          : `Return ${best}, the path (green) bending at ${nodes[bend].val}: ${path.map((id) => nodes[id].val).join(" – ")}. height() made ${work} visits for ${n} nodes: on a long chain that grows like n², O(n²).`,
      view: view(undefined, { path }),
    });
    return steps;
  },
});
