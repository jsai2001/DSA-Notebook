// BFS with the same map: copy a node when it's first seen, link its edges when it's popped.
(function () {
DSAViz.register("0133-clone-graph/approach2", {
  inputs: [{ name: "adjList", type: "int[][]", value: "[[2, 4], [1, 3], [2, 4], [1, 3]]", jagged: true, maxRows: 6, maxCols: 5, minValue: 1, maxValue: 6 }],
  trace({ adjList }) {
    const adj = parseGraph(adjList);
    const steps = [];
    const copies = new Map();
    const queue = [];

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

    const view = (o = {}) => [...mapsView(o), { type: "array", label: "queue (front → back)", values: [...queue], marks: queue.length ? { 0: "active" } : {} }];
    if (!adj.length) {
      steps.push({ line: "init", note: "The graph is empty (node is null): return null.", view: view() });
      return steps;
    }
    copies.set(1, []);
    queue.push(1);
    steps.push({ line: "init", note: `Copy node 1 as ${prime(1)}, put the pair in the map, and queue node 1.`, view: view({ copy: 1, fresh: true }) });
    while (queue.length) {
      const v = queue.shift();
      steps.push({ line: "pop", note: `Take ${v}. Link ${prime(v)} to a copy of each of its neighbors ${list(adj[v - 1])}.`, view: view({ at: v, copy: v }) });
      for (const nb of adj[v - 1]) {
        const fresh = !copies.has(nb);
        if (fresh) {
          copies.set(nb, []);
          queue.push(nb);
        }
        copies.get(v).push(nb);
        steps.push({
          line: fresh ? ["look", "make", "wire"] : ["look", "wire"],
          note: fresh ? `${nb} is new: make ${prime(nb)}, queue ${nb}, and link ${prime(v)} → ${prime(nb)}.` : `${nb} already has a copy: link ${prime(v)} → ${prime(nb)}.`,
          view: view({ at: v, copy: fresh ? nb : v, fresh }),
        });
      }
    }
    steps.push({ line: "return", note: `The queue is empty. Return ${prime(1)}. Each node is queued once and each edge linked once: O(V + E), no recursion.`, view: view() });
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
