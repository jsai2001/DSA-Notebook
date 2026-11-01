// Iterative post-order: an explicit stack of (node, children finished?) replaces recursion; heights go in a map.
DSAViz.register("0543-diameter-of-binary-tree/approach3", {
  inputs: [{ name: "root", type: "tree", value: "[1, 2, 3, 4, 5]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const heights = {};
    const captions = {};
    const marks = {};
    let best = 0;
    let bend = -1;
    const stack = [[root, false]];
    const label = ([id, done]) => (id < 0 ? "null" : done ? `${nodes[id].val} (back)` : String(nodes[id].val));
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
      if (current !== undefined && current >= 0) m[current] = opts.mark || "active";
      const smarks = {};
      if (opts.pushed) for (let i = stack.length - opts.pushed; i < stack.length; i++) smarks[i] = "new";
      return [
        { type: "tree", label: "tree (caption = height, once both children are done)", values, marks: m, captions: { ...captions } },
        { type: "array", label: "stack (bottom → top; \"back\" = children already done)", values: stack.map(label), wide: true, marks: smarks },
        {
          type: "vars",
          items: [
            { name: "best", value: `${best} edge${best === 1 ? "" : "s"}`, mark: opts.improved ? "new" : "" },
            ...(opts.popped ? [{ name: "popped", value: opts.popped }] : []),
          ],
        },
      ];
    };

    steps.push({
      line: "init",
      note: "No recursion: a stack of (node, children done?) pairs. A node is pushed twice: once to go down into its children, once to finish it after them.",
      view: view(),
    });
    while (stack.length) {
      const top = stack.pop();
      const [id, done] = top;
      if (id < 0) {
        steps.push({ line: ["loop", "skip"], note: "Pop null: an empty child, nothing to do (its height is 0).", view: view(undefined, { popped: "null" }) });
        continue;
      }
      const node = nodes[id];
      if (done) {
        const l = heights[node.left] || 0;
        const r = heights[node.right] || 0;
        const through = l + r;
        const improved = through > best;
        if (improved) {
          best = through;
          bend = id;
        }
        heights[id] = 1 + Math.max(l, r);
        captions[id] = `h ${heights[id]}`;
        marks[id] = "visited";
        steps.push({
          line: ["loop", "finish"],
          note: `Pop ${node.val} (back): both children are done, with heights ${l} and ${r}. The path bending here has ${through} edge${through === 1 ? "" : "s"}${improved ? `: best = ${best}` : ` (best stays ${best})`}. height[${node.val}] = ${heights[id]}.`,
          view: view(id, { popped: label(top), improved, mark: improved ? "match" : "compare" }),
        });
      } else {
        stack.push([id, true], [node.right, false], [node.left, false]);
        steps.push({
          line: ["loop", "push"],
          note: `Pop ${node.val} for the first time. Push it back marked "back", then its right and left children, so the left side is handled first and ${node.val} is finished last.`,
          view: view(id, { popped: label(top), pushed: 3 }),
        });
      }
    }
    const path = bend < 0 ? [root] : down(nodes[bend].left).reverse().concat([bend], down(nodes[bend].right));
    steps.push({
      line: "return",
      note:
        best === 0
          ? "The stack is empty: return 0 (a single node has no edges)."
          : `The stack is empty: return ${best}, the path (green) ${path.map((id) => nodes[id].val).join(" – ")}. Same O(n) work as the recursion, but the stack lives on the heap, so a 10⁴-deep tree can't overflow it.`,
      view: view(undefined, { path }),
    });
    return steps;
  },
});
