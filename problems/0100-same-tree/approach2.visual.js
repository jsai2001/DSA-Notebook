// Recursion on both trees together: both missing = same; one missing or different values = not same; else recurse left and right.
DSAViz.register("0100-same-tree/approach2", {
  inputs: [
    { name: "p", type: "tree", value: "[1, 2, 3, 4]", maxLength: 11 },
    { name: "q", type: "tree", value: "[1, 2, 3, null, 4]", maxLength: 11 },
  ],
  trace({ p: pv, q: qv }) {
    const P = DSAViz.buildTree(pv);
    const Q = DSAViz.buildTree(qv);
    const steps = [];
    const pm = {};
    const qm = {};
    const name = (T, id) => (id < 0 ? "nothing there" : String(T.nodes[id].val));
    const view = (a, b, mark) => {
      const x = { ...pm };
      const y = { ...qm };
      if (a >= 0) x[a] = mark;
      if (b >= 0) y[b] = mark;
      return [
        { type: "tree", label: "p (green = matched)", values: pv, marks: x },
        { type: "tree", label: "q", values: qv, marks: y },
      ];
    };
    steps.push({ line: "both", note: "Compare the two roots, then the two left children, then the two right children.", view: view(-1, -1) });
    function same(a, b, where) {
      if (a < 0 && b < 0) return true;
      if (a < 0 || b < 0) {
        steps.push({ line: ["both", "one"], note: `${where}: p has ${name(P, a)}, q has ${name(Q, b)}. Only one is missing: the shapes differ. Return false.`, view: view(a, b, "cut") });
        return false;
      }
      const va = P.nodes[a].val;
      const vb = Q.nodes[b].val;
      if (va !== vb) {
        steps.push({ line: ["both", "one", "val"], note: `${where}: ${va} in p, ${vb} in q. Different values: return false.`, view: view(a, b, "cut") });
        return false;
      }
      pm[a] = qm[b] = "match";
      steps.push({ line: ["both", "one", "val", "recurse"], note: `${where}: both ${va}. Now compare their left children, then their right children.`, view: view(a, b, "match") });
      return same(P.nodes[a].left, Q.nodes[b].left, `Left of ${va}`) && same(P.nodes[a].right, Q.nodes[b].right, `Right of ${va}`);
    }
    const r = same(P.root, Q.root, "Roots");
    steps.push({ line: r ? "recurse" : "one", note: r ? "Every spot matched (missing children on both sides count as a match): return true." : "Return false, without looking at the rest.", view: view(-1, -1) });
    return steps;
  },
});
