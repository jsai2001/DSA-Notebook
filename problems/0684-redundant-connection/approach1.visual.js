// Remove each edge, last first, and check with a DFS that the rest still connects every node.
(function () {
DSAViz.register("0684-redundant-connection/approach1", {
  inputs: [{ name: "edges", type: "int[][]", value: "[[1, 2], [1, 3], [3, 4], [2, 5], [4, 5], [5, 6]]", maxRows: 8, maxCols: 2, minValue: 1, maxValue: 8 }],
  trace({ edges }) {
    checkEdges(edges);
    const n = edges.length;
    const steps = [];
    const view = (o = {}) => {
      const marks = {};
      if (o.skip !== undefined) marks[o.skip] = o.ok ? "match" : "cut";
      const out = [{ type: "array", label: "edges (red = left out, and that cut the graph; green = left out, and the rest is still connected)", values: edges.map(([a, b]) => `${a}–${b}`), marks }];
      if (o.adj) out.push({ type: "map", label: "adj without the left-out edge", columns: ["node", "neighbors"], entries: o.adj.slice(1).map((l, k) => [String(k + 1), l.join(", ") || "none"]), marks: Object.fromEntries((o.missed || []).map((v) => [String(v), "cut"])) });
      if (o.seen) out.push({ type: "set", label: "seen: reached from node 1", items: o.seen.map(String), marks: o.ok ? Object.fromEntries(o.seen.map((v) => [String(v), "match"])) : {} });
      out.push({ type: "vars", items: [{ name: "n", value: n }, { name: "skip", value: o.skip === undefined ? "-" : o.skip, mark: o.skip === undefined ? "" : "compare" }] });
      return out;
    };
    steps.push({ line: "init", note: `${n} nodes and ${n} edges: a tree on ${n} nodes has ${n - 1}, so exactly one edge is extra.`, view: view() });
    for (let skip = n - 1; skip >= 0; skip--) {
      const adj = Array.from({ length: n + 1 }, () => []);
      edges.forEach(([a, b], k) => { if (k !== skip) { adj[a].push(b); adj[b].push(a); } });
      const seen = [1];
      const stack = [1];
      while (stack.length) {
        const u = stack.pop();
        for (const v of adj[u]) if (!seen.includes(v)) { seen.push(v); stack.push(v); }
      }
      const [a, b] = edges[skip];
      const ok = seen.length === n;
      const missed = [];
      for (let v = 1; v <= n; v++) if (!seen.includes(v)) missed.push(v);
      if (!ok) {
        steps.push({ line: ["skip", "build", "walk", "found"], note: `Leave out edge ${skip} (${a}–${b}) and walk from node 1. Reached ${seen.length} of ${n}: node${missed.length > 1 ? "s" : ""} ${missed.join(", ")} cut off, so ${a}–${b} is needed. Try the edge before it.`, view: view({ skip, adj, seen, missed }) });
        continue;
      }
      steps.push({ line: ["skip", "build", "walk"], note: `Leave out edge ${skip} (${a}–${b}) and walk from node 1: all ${n} nodes are reached.`, view: view({ skip, adj, seen, ok }) });
      steps.push({ line: "found", note: `Return [${a}, ${b}]. Without it the graph is connected with ${n - 1} edges: a tree. Up to n rebuilds and walks: O(n²) time.`, view: view({ skip, adj, seen, ok }) });
      return steps;
    }
    return steps;
  },
});

// A tree plus one extra edge on nodes 1..n, as LeetCode promises.
function checkEdges(edges) {
  const n = edges.length;
  if (n < 3) throw new DSAViz.InputError("Give at least 3 edges, like [[1, 2], [1, 3], [2, 3]].");
  if (edges.some((e) => e.length !== 2)) throw new DSAViz.InputError("Each edge is [a, b], like [[1, 2], [1, 3]].");
  if (edges.some(([a, b]) => a < 1 || b < 1 || a > n || b > n)) throw new DSAViz.InputError(`With ${n} edges, the nodes are 1 to ${n}.`);
  if (edges.some(([a, b]) => a === b)) throw new DSAViz.InputError("An edge must join two different nodes.");
  if (new Set(edges.map(([a, b]) => `${Math.min(a, b)},${Math.max(a, b)}`)).size !== n) throw new DSAViz.InputError("The same edge appears twice.");
  const p = [...Array(n + 1).keys()];
  const f = (x) => { while (p[x] !== x) x = p[x]; return x; };
  let groups = n;
  edges.forEach(([a, b]) => { const ra = f(a), rb = f(b); if (ra !== rb) { p[ra] = rb; groups--; } });
  if (groups !== 1) throw new DSAViz.InputError("The edges must connect all the nodes: a tree plus one extra edge.");
}
})();
