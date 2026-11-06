// Two passes with arrays: find every node first, copy them all, then link the copies.
(function () {
DSAViz.register("0133-clone-graph/approach3", {
  inputs: [{ name: "adjList", type: "int[][]", value: "[[2, 4], [1, 3], [2, 4], [1, 3]]", jagged: true, maxRows: 6, maxCols: 5, minValue: 1, maxValue: 6 }],
  trace({ adjList }) {
    const adj = parseGraph(adjList);
    const n = adj.length;
    const steps = [];
    const copies = new Map();

    const prime = (v) => `${v}′`;
    const list = (a) => `[${a.join(", ")}]`;
    const mapsView = (o = {}) => [
      {
        type: "map",
        label: "original graph (node → neighbors)",
        columns: ["node", "neighbors"],
        entries: adj.map((nbs, i) => [String(i + 1), list(nbs)]),
        marks: o.at ? { [String(o.at)]: "active" } : {},
      },
      {
        type: "map",
        label: "copies (′ = the new node; its neighbors so far)",
        columns: ["copy", "neighbors"],
        entries: [...copies.keys()].map((v) => [prime(v), list(copies.get(v).map(prime))]),
        marks: o.copy ? { [prime(o.copy)]: o.fresh ? "new" : "match" } : {},
      },
    ];

    const found = [];
    const view = (o = {}) => [
      ...mapsView(o),
      { type: "array", label: "old[v] filled (values are unique, so they index an array)", values: found.map(String), marks: o.foundNew ? { [found.length - 1]: "new" } : {} },
    ];
    if (!n) {
      steps.push({ line: "init", note: "The graph is empty (node is null): return null.", view: view() });
      return steps;
    }
    const seen = new Set([1]);
    const stack = [1];
    found.push(1);
    steps.push({ line: ["init", "find"], note: "Pass 1: find every node with a stack, storing each one at old[its value].", view: view({ foundNew: true }) });
    while (stack.length) {
      const v = stack.pop();
      const added = [];
      for (const nb of adj[v - 1]) if (!seen.has(nb)) { seen.add(nb); stack.push(nb); found.push(nb); added.push(nb); }
      steps.push({ line: "find", note: added.length ? `From ${v}: found ${added.join(", ")}.` : `From ${v}: no new nodes.`, view: view({ at: v, foundNew: added.length > 0 }) });
    }
    for (let v = 1; v <= n; v++) copies.set(v, []);
    steps.push({ line: "make", note: `Make one copy per node found: ${[...copies.keys()].map(prime).join(", ")}. None is linked yet.`, view: view() });
    for (let v = 1; v <= n; v++) {
      copies.set(v, [...adj[v - 1]]);
      steps.push({ line: "wire", note: `Pass 2: ${prime(v)} gets the copies of ${v}'s neighbors, looked up by value: ${list(adj[v - 1].map(prime))}.`, view: view({ at: v, copy: v }) });
    }
    steps.push({ line: "return", note: `Return ${prime(1)}. Two passes, O(V + E), and arrays instead of a hash map. This only works because the values are unique and small (1 to 100).`, view: view() });
    return steps;
  },
});

// Check the adjacency list the way LeetCode builds it: node v (1-based) lists its neighbors.
function parseGraph(adj) {
  const n = adj.length;
  adj.forEach((nbs, i) => {
    const v = i + 1;
    if (nbs.some((x) => x < 1 || x > n)) throw new DSAViz.InputError(`Node ${v}: neighbors must be between 1 and ${n} (there ${n === 1 ? "is 1 node" : `are ${n} nodes`}).`);
    if (nbs.includes(v)) throw new DSAViz.InputError(`Node ${v} lists itself; the graph has no self-loops.`);
    if (new Set(nbs).size !== nbs.length) throw new DSAViz.InputError(`Node ${v} lists a neighbor twice.`);
    nbs.forEach((x) => {
      if (!adj[x - 1].includes(v)) throw new DSAViz.InputError(`${v} lists ${x}, but ${x} doesn't list ${v}: every edge goes both ways.`);
    });
  });
  if (n) {
    const seen = new Set([1]);
    const st = [1];
    while (st.length) for (const x of adj[st.pop() - 1]) if (!seen.has(x)) { seen.add(x); st.push(x); }
    if (seen.size !== n) throw new DSAViz.InputError("The graph must be connected: every node reachable from node 1.");
  }
  return adj;
}
})();
