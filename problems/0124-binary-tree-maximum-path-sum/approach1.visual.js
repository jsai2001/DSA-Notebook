// Try every node as the bend: measure the best way down each side from scratch, every time.
DSAViz.register("0124-binary-tree-maximum-path-sum/approach1", {
  inputs: [{ name: "root", type: "tree", value: "[1, -2, 3, 4, 5]", maxLength: 15, minValue: -99, maxValue: 99 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const done = {};
    let best = nodes[root].val;
    let visits = 0;
    const down = (id) => (id < 0 ? 0 : (visits++, nodes[id].val + Math.max(0, down(nodes[id].left), down(nodes[id].right))));
    const sub = (id) => (id < 0 ? [] : [id, ...sub(nodes[id].left), ...sub(nodes[id].right)]);
    const view = (cur, o = {}) => {
      const m = { ...done };
      (o.l || []).forEach((k) => (m[k] = "compare"));
      (o.r || []).forEach((k) => (m[k] = "new"));
      if (cur !== undefined) m[cur] = "active";
      return [
        { type: "tree", label: "tree (dark = the bend; orange / yellow = the sides measured for it; green = done)", values, marks: m },
        { type: "vars", items: [{ name: "nodes visited by down()", value: visits }, { name: "best", value: best, mark: o.better ? "match" : "" }] },
      ];
    };
    steps.push({ line: "init", note: `best = ${best}, the root's value. Now make each node the bend of a path, one at a time.`, view: view() });
    const order = [];
    const pre = (id) => { if (id < 0) return; order.push(id); pre(nodes[id].left); pre(nodes[id].right); };
    pre(root);
    for (const id of order) {
      const n = nodes[id];
      const l = Math.max(0, down(n.left));
      const r = Math.max(0, down(n.right));
      const here = n.val + l + r;
      const better = here > best;
      if (better) best = here;
      done[id] = "match";
      steps.push({
        line: ["top", "down", "sum"],
        note: `Bend at ${n.val}: best way down the left ${l}, the right ${r} (negative sides count as 0). ${n.val} + ${l} + ${r} = ${here}.${better ? " New best." : ""}`,
        view: view(id, { l: sub(n.left), r: sub(n.right), better }),
      });
    }
    const n = order.length;
    steps.push({ line: "return", note: `Return ${best}. down() visited ${visits} nodes for a tree of ${n}${visits > n ? ": the same subtrees were measured for every bend above them" : ""}.`, view: view() });
    return steps;
  },
});
