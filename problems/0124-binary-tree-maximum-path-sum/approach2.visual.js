// One walk: each node checks the path that bends at it (both sides), and passes only its better side up.
DSAViz.register("0124-binary-tree-maximum-path-sum/approach2", {
  inputs: [{ name: "root", type: "tree", value: "[-10, 9, 20, null, null, 15, 7]", maxLength: 15, minValue: -99, maxValue: 99 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const marks = {};
    const captions = {};
    const gains = {};
    let best = nodes[root].val;
    let bestAt = root;
    const view = (cur, o = {}) => {
      const m = { ...marks };
      (o.path || []).forEach((id) => (m[id] = "match"));
      if (cur !== undefined) m[cur] = o.mark || "active";
      return [
        { type: "tree", label: "tree (under each node: the best path down one side from it; green at the end = the best path)", values, marks: m, captions: { ...captions } },
        { type: "vars", items: [...(o.calc ? [{ name: "bend here", value: o.calc }] : []), { name: "best", value: best, mark: o.better ? "match" : "" }] },
      ];
    };
    steps.push({ line: "init", note: `best starts at the root's value, ${best}: a path needs at least one node.`, view: view() });
    function gain(id) {
      const n = nodes[id];
      const gl = n.left >= 0 ? gain(n.left) : 0;
      const gr = n.right >= 0 ? gain(n.right) : 0;
      const l = Math.max(0, gl);
      const r = Math.max(0, gr);
      const here = n.val + l + r;
      const better = here > best;
      if (better) { best = here; bestAt = id; }
      const up = n.val + Math.max(l, r);
      gains[id] = up;
      captions[id] = `gain ${up}`;
      marks[id] = "visited";
      const side = (name, raw, kept, c) => (c < 0 ? `no ${name} child (0)` : raw < 0 ? `${name} gives ${raw}, dropped (0)` : `${name} gives ${kept}`);
      steps.push({
        line: ["call", "left", "right", "bend", "up"],
        note: `${n.val}: ${side("left", gl, l, n.left)}, ${side("right", gr, r, n.right)}. A path bending here: ${n.val} + ${l} + ${r} = ${here}.${better ? " New best." : ""} Pass up ${n.val} + max(${l}, ${r}) = ${up}.`,
        view: view(id, { calc: `${n.val} + ${l} + ${r} = ${here}`, better }),
      });
      return up;
    }
    gain(root);
    // Rebuild the best path: from the bend, go down each side while it adds something.
    const path = [bestAt];
    for (const side of ["left", "right"]) {
      let c = nodes[bestAt][side];
      while (c >= 0 && gains[c] > 0) {
        path.push(c);
        const a = nodes[c].left, b = nodes[c].right;
        const ga = a >= 0 ? gains[a] : -Infinity, gb = b >= 0 ? gains[b] : -Infinity;
        c = Math.max(ga, gb) > 0 ? (ga >= gb ? a : b) : -1;
      }
    }
    steps.push({ line: "return", note: `Return ${best}: the green path, which bends at ${nodes[bestAt].val}. Each node was visited once.`, view: view(undefined, { path }) });
    return steps;
  },
});
