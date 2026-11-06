// DFS with a map from each original node to its copy; the map is what stops the cycles.
(function () {
DSAViz.register("0133-clone-graph/approach1", {
  inputs: [{ name: "adjList", type: "int[][]", value: "[[2, 4], [1, 3], [2, 4], [1, 3]]", jagged: true, maxRows: 6, maxCols: 5, minValue: 1, maxValue: 6 }],
  trace({ adjList }) {
    const adj = parseGraph(adjList);
    const steps = [];
    const copies = new Map();
    const stack = [];

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

    const view = (o = {}) => [...mapsView(o), { type: "array", label: "call stack (clone(v) calls still running)", values: stack.map((v) => `clone(${v})`), wide: true, marks: stack.length ? { [stack.length - 1]: "active" } : {} }];
    if (!adj.length) {
      steps.push({ line: "return", note: "The graph is empty (node is null): return null.", view: view() });
      return steps;
    }
    steps.push({ line: "init", note: "Keep a map from each original node to its copy. Start with clone(1).", view: view() });
    const clone = (v, from) => {
      stack.push(v);
      copies.set(v, []);
      steps.push({
        line: "make",
        note: `${from ? `From ${from}: ` : ""}${v} has no copy yet. Make ${prime(v)} and put it in the map right away, before its neighbors, so a cycle back to ${v} finds it.`,
        view: view({ at: v, copy: v, fresh: true }),
      });
      for (const nb of adj[v - 1]) {
        if (copies.has(nb)) {
          copies.get(v).push(nb);
          steps.push({ line: ["wire", "seen", "wire"], note: `Neighbor ${nb} is already in the map: link ${prime(v)} to ${prime(nb)}, no new call.`, view: view({ at: v, copy: v }) });
        } else {
          clone(nb, v);
          copies.get(v).push(nb);
          steps.push({ line: ["wire", "done"], note: `clone(${nb}) returned ${prime(nb)}: link ${prime(v)} to it.`, view: view({ at: v, copy: v }) });
        }
      }
      stack.pop();
    };
    clone(1);
    steps.push({ line: "return", note: `Return ${prime(1)}. Every node was copied once and every edge linked once: O(V + E).`, view: view() });
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
