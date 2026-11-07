// Add the edges in order; before adding a–b, search from a. If b is already reachable, a–b closes the cycle.
(function () {
DSAViz.register("0684-redundant-connection/approach2", {
  inputs: [{ name: "edges", type: "int[][]", value: "[[1, 2], [1, 3], [3, 4], [2, 5], [4, 5], [5, 6]]", maxRows: 8, maxCols: 2, minValue: 1, maxValue: 8 }],
  trace({ edges }) {
    checkEdges(edges);
    const n = edges.length;
    const steps = [];
    const adj = Array.from({ length: n + 1 }, () => []);
    const view = (o = {}) => {
      const marks = {};
      for (let k = 0; k < (o.k === undefined ? 0 : o.k); k++) marks[k] = "match";
      if (o.k !== undefined) marks[o.k] = o.found ? "cut" : "compare";
      const out = [
        { type: "array", label: "edges (green = added, yellow = this edge, red = closes a cycle)", values: edges.map(([a, b]) => `${a}–${b}`), marks },
        { type: "map", label: "adj: the graph so far", columns: ["node", "neighbors"], entries: adj.slice(1).map((l, k) => [String(k + 1), l.join(", ") || "none"]), marks: o.new ? Object.fromEntries(o.new.map((v) => [String(v), "new"])) : {} },
      ];
      if (o.seen) out.push({ type: "set", label: `seen: reachable from ${edges[o.k][0]} before adding the edge`, items: o.seen.map(String), marks: o.found ? { [String(edges[o.k][1])]: "match" } : {} });
      return out;
    };
    steps.push({ line: "init", note: "Start with no edges. Add them one by one, in the given order.", view: view() });
    for (let k = 0; k < n; k++) {
      const [a, b] = edges[k];
      const seen = [a];
      const stack = [a];
      while (stack.length) {
        const u = stack.pop();
        for (const v of adj[u]) if (!seen.includes(v)) { seen.push(v); stack.push(v); }
      }
      if (seen.includes(b)) {
        steps.push({ line: ["edge", "search", "found"], note: `Edge ${a}–${b}: search from ${a} first. ${b} is already reachable (green), so this edge closes a cycle. No later edge is on that cycle: return [${a}, ${b}].`, view: view({ k, seen, found: true }) });
        steps.push({ line: "found", note: `Return [${a}, ${b}]. Each search can walk the whole graph so far: O(n²) time.`, view: view({ k, seen, found: true }) });
        return steps;
      }
      steps.push({ line: ["edge", "search", "add"], note: `Edge ${a}–${b}: search from ${a} reaches {${seen.join(", ")}}, not ${b}. So ${a} and ${b} are in separate pieces: add the edge.`, view: view({ k, seen }) });
      adj[a].push(b);
      adj[b].push(a);
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
