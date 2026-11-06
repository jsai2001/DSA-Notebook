// Queue of pairs: take the next pair of nodes at the same spot in both trees, check it, add its two child pairs.
DSAViz.register("0100-same-tree/approach3", {
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
    const queue = [[P.root, Q.root]];
    const name = (T, id) => (id < 0 ? "–" : String(T.nodes[id].val));
    const view = (a, b, mark) => {
      const x = { ...pm };
      const y = { ...qm };
      queue.forEach(([i, j]) => {
        if (i >= 0 && !x[i]) x[i] = "new";
        if (j >= 0 && !y[j]) y[j] = "new";
      });
      if (a !== undefined && a >= 0) x[a] = mark;
      if (b !== undefined && b >= 0) y[b] = mark;
      return [
        { type: "tree", label: "p (green = matched, yellow = waiting in the queue)", values: pv, marks: x },
        { type: "tree", label: "q", values: qv, marks: y },
        { type: "array", label: "queue of pairs (front first; – = missing)", values: queue.map(([i, j]) => `(${name(P, i)}, ${name(Q, j)})`), wide: true, marks: queue.length ? { 0: "active" } : {} },
      ];
    };
    steps.push({ line: "init", note: "Start with the pair of roots.", view: view() });
    while (queue.length) {
      const [a, b] = queue.shift();
      if (a < 0 && b < 0) {
        steps.push({ line: ["loop", "both"], note: "Take a pair of two missing children: they match. Skip it.", view: view() });
        continue;
      }
      if (a < 0 || b < 0 || P.nodes[a].val !== Q.nodes[b].val) {
        steps.push({
          line: ["loop", "both", "diff"],
          note: a < 0 || b < 0 ? `Take (${name(P, a)}, ${name(Q, b)}): only one is missing. Return false.` : `Take (${P.nodes[a].val}, ${Q.nodes[b].val}): different values. Return false.`,
          view: view(a, b, "cut"),
        });
        return steps;
      }
      pm[a] = qm[b] = "match";
      queue.push([P.nodes[a].left, Q.nodes[b].left], [P.nodes[a].right, Q.nodes[b].right]);
      steps.push({ line: ["loop", "both", "diff", "push"], note: `Take (${P.nodes[a].val}, ${Q.nodes[b].val}): they match. Add the pair of left children and the pair of right children.`, view: view(a, b, "match") });
    }
    steps.push({ line: "return", note: "The queue is empty and every pair matched: return true.", view: view() });
    return steps;
  },
});
