// Union-find: each edge joins two groups. The first edge whose ends are already in one group is the answer.
(function () {
DSAViz.register("0684-redundant-connection/approach3", {
  inputs: [{ name: "edges", type: "int[][]", value: "[[1, 2], [1, 3], [3, 4], [2, 5], [4, 5], [5, 6]]", maxRows: 8, maxCols: 2, minValue: 1, maxValue: 8 }],
  trace({ edges }) {
    checkEdges(edges);
    const n = edges.length;
    const steps = [];
    const parent = [...Array(n + 1).keys()];
    // Same find as the code, path halving included.
    const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
    const view = (o = {}) => {
      const em = {};
      for (let k = 0; k < (o.k === undefined ? 0 : o.k); k++) em[k] = "match";
      if (o.k !== undefined) em[o.k] = o.found ? "cut" : "compare";
      const pm = { 0: "ghost" };
      if (o.ra !== undefined) { pm[o.ra] = o.found ? "match" : "compare"; pm[o.rb] = o.found ? "match" : "compare"; }
      if (o.joined !== undefined) pm[o.joined] = "new";
      return [
        { type: "array", label: "edges (green = joined two groups, yellow = this edge, red = closes a cycle)", values: edges.map(([a, b]) => `${a}–${b}`), marks: em },
        { type: "array", label: "parent (index x holds parent[x]; x is a root when parent[x] = x. dashed 0 is unused; yellow = the two roots, or the root that just moved; green = same root)", values: parent.slice(), marks: pm, compact: true },
        { type: "vars", items: [{ name: "ra", value: o.ra === undefined ? "-" : o.ra }, { name: "rb", value: o.rb === undefined ? "-" : o.rb }] },
      ];
    };
    steps.push({ line: "init", note: "Every node starts alone: parent[x] = x.", view: view() });
    for (let k = 0; k < n; k++) {
      const [a, b] = edges[k];
      const ra = find(a);
      const rb = find(b);
      if (ra === rb) {
        steps.push({ line: ["edge", "found"], note: `Edge ${a}–${b}: find(${a}) = ${ra} and find(${b}) = ${rb}, the same root. ${a} and ${b} are already connected, so this edge closes the cycle.`, view: view({ k, ra, rb, found: true }) });
        steps.push({ line: "found", note: `Return [${a}, ${b}]. One pass over the edges; path halving keeps each find short: O(n log n) time at worst, O(n) space.`, view: view({ k, ra, rb, found: true }) });
        return steps;
      }
      steps.push({ line: ["edge"], note: `Edge ${a}–${b}: find(${a}) = ${ra}, find(${b}) = ${rb}. Different roots: different groups.`, view: view({ k, ra, rb }) });
      parent[ra] = rb;
      steps.push({ line: "union", note: `Join the groups: parent[${ra}] = ${rb}. The root ${ra} moves, not node ${a}${ra === a ? " (here they're the same node)" : ""}.`, view: view({ k, joined: ra }) });
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
