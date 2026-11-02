// Try every node of root as the top of a match: same() walks both trees together and stops at the first difference.
DSAViz.register("0572-subtree-of-another-tree/approach1", {
  inputs: [
    { name: "root", type: "tree", value: "[3, 4, 5, 1, 2, null, null, null, null, 0]", maxLength: 15 },
    { name: "subRoot", type: "tree", value: "[4, 1, 2]", maxLength: 7 },
  ],
  trace({ root: rootValues, subRoot: subValues }) {
    const A = DSAViz.buildTree(rootValues);
    const B = DSAViz.buildTree(subValues);
    const steps = [];
    const tried = {}; // root node id -> "match" or "cut" once tried
    let pairs = 0;
    const view = (current, o = {}) => {
      const am = {};
      Object.keys(tried).forEach((id) => (am[id] = "visited"));
      const bm = {};
      (o.equal || []).forEach(([a, b]) => {
        am[a] = "match";
        bm[b] = "match";
      });
      if (o.bad) {
        if (o.bad[0] >= 0) am[o.bad[0]] = "cut";
        if (o.bad[1] >= 0) bm[o.bad[1]] = "cut";
      }
      if (current !== undefined && !o.equal) am[current] = "active";
      return [
        { type: "tree", label: "root (dark = trying this node as the top)", values: rootValues, marks: am },
        { type: "tree", label: "subRoot", values: subValues, marks: bm },
        { type: "vars", items: [{ name: "node pairs compared", value: pairs }] },
      ];
    };
    // same(a, b): returns { ok, equal: [[a, b], ...] compared and equal, bad: [a, b] where they differ }
    const same = (a, b, equal) => {
      if (a < 0 || b < 0) {
        if (a === b) return { ok: true };
        return { ok: false, bad: [a, b] };
      }
      pairs++;
      if (A.nodes[a].val !== B.nodes[b].val) return { ok: false, bad: [a, b] };
      equal.push([a, b]);
      const l = same(A.nodes[a].left, B.nodes[b].left, equal);
      if (!l.ok) return l;
      return same(A.nodes[a].right, B.nodes[b].right, equal);
    };
    const describe = (bad) => {
      const [a, b] = bad;
      if (a >= 0 && b >= 0) return `${A.nodes[a].val} ≠ ${B.nodes[b].val}`;
      if (a >= 0) return `root has ${A.nodes[a].val} where subRoot has no node`;
      return `subRoot has ${B.nodes[b].val} where root has no node`;
    };
    steps.push({ line: "try", note: `Check every node of root, top to bottom: could the subtree that starts there be an exact copy of subRoot?`, view: view(undefined) });
    let found = -1;
    const visit = (id) => {
      if (id < 0 || found >= 0) return false;
      const node = A.nodes[id];
      const equal = [];
      const r = same(id, B.root, equal);
      tried[id] = r.ok ? "match" : "cut";
      if (r.ok) {
        found = id;
        steps.push({ line: ["try", "same", "found"], note: `Start at ${node.val}: every node matches, and both trees end in the same places. This subtree is a copy of subRoot. Return true.`, view: view(id, { equal }) });
        return true;
      }
      steps.push({
        line: ["try", "same"],
        note: `Start at ${node.val}: ${equal.length ? `${equal.length} node${equal.length === 1 ? " matches" : "s match"}, then ` : ""}${describe(r.bad)}. Not a copy.`,
        view: view(id, { equal, bad: r.bad }),
      });
      const kids = [node.left, node.right].filter((k) => k >= 0);
      steps.push({
        line: kids.length ? "down" : ["down", "empty"],
        note: kids.length ? `Try ${node.val}'s children: ${kids.map((k) => A.nodes[k].val).join(" and ")}.` : `${node.val} has no children: both recursive calls hit None and return false.`,
        view: view(id),
      });
      return visit(node.left) || visit(node.right);
    };
    visit(A.root);
    if (found < 0) {
      steps.push({
        line: ["empty", "down"],
        note: `No node of root starts a copy of subRoot. Return false. ${pairs} node pair${pairs === 1 ? "" : "s"} compared: up to m·n in the worst case.`,
        view: view(undefined),
      });
    }
    return steps;
  },
});
