// Post-order with a stack: on a node's second visit both children's gains are known.
DSAViz.register("0124-binary-tree-maximum-path-sum/approach3", {
  inputs: [{ name: "root", type: "tree", value: "[-10, 9, 20, null, null, 15, 7]", maxLength: 15, minValue: -99, maxValue: 99 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const marks = {};
    const captions = {};
    const gain = {};
    let best = nodes[root].val;
    const stack = [[root, false]];
    const view = (cur, o = {}) => {
      const m = { ...marks };
      stack.forEach(([id, d]) => (m[id] = m[id] || (d ? "compare" : "new")));
      if (cur !== undefined) m[cur] = o.mark || "active";
      return [
        { type: "tree", label: "tree (yellow = to visit, orange = waiting for its children; under each node: its gain)", values, marks: m, captions: { ...captions } },
        { type: "array", label: "stack (bottom → top); ✓ = children done", values: stack.map(([id, d]) => `${nodes[id].val}${d ? " ✓" : ""}`), wide: true, marks: stack.length ? { [stack.length - 1]: "active" } : {} },
        { type: "vars", items: [{ name: "best", value: best, mark: o.better ? "match" : "" }] },
      ];
    };
    steps.push({ line: "init", note: `best = ${best}, the root's value. Push the root.`, view: view() });
    while (stack.length) {
      const [id, d] = stack.pop();
      const n = nodes[id];
      if (!d) {
        stack.push([id, true]);
        const kids = [];
        for (const c of [n.right, n.left]) if (c >= 0) { stack.push([c, false]); kids.push(nodes[c].val); }
        steps.push({ line: ["loop", "push"], note: `First visit to ${n.val}: put it back marked ✓, then ${kids.length ? `push ${kids.join(" then ")}` : "nothing to push (no children)"}.`, view: view(id) });
        continue;
      }
      const l = Math.max(0, n.left >= 0 ? gain[n.left] : 0);
      const r = Math.max(0, n.right >= 0 ? gain[n.right] : 0);
      const here = n.val + l + r;
      const better = here > best;
      if (better) best = here;
      gain[id] = n.val + Math.max(l, r);
      captions[id] = `gain ${gain[id]}`;
      marks[id] = "visited";
      steps.push({ line: ["loop", "visit", "bend", "up"], note: `Second visit to ${n.val}: sides ${l} and ${r}. Bend here: ${here}.${better ? " New best." : ""} Its gain: ${gain[id]}.`, view: view(id, { better, mark: "match" }) });
    }
    steps.push({ line: "return", note: `The stack is empty: return ${best}.`, view: view() });
    return steps;
  },
});
