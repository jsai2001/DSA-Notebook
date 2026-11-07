// Dijkstra with a heap: always take the earliest (time, node) entry; the first time a node is popped is final.
(function () {
DSAViz.register("0743-network-delay-time/approach2", {
  inputs: [
    { name: "times", type: "int[][]", value: "[[2, 1, 1], [2, 3, 1], [3, 4, 1], [2, 4, 5]]", maxRows: 10, maxCols: 3, minValue: 0, maxValue: 100 },
    { name: "n", type: "int", value: "4", min: 1, max: 6 },
    { name: "k", type: "int", value: "2", min: 1, max: 6 },
  ],
  trace({ times, n, k }) {
    check(times, n, k);
    const graph = Array.from({ length: n + 1 }, () => []);
    times.forEach(([u, v, w]) => graph[u].push([v, w]));
    const dist = Array(n + 1).fill(Infinity);
    const fin = Array(n + 1).fill(false);
    let heap = [[0, k]];
    const steps = [];
    const view = (o = {}) => [{ type: "array", label: "heap (time: node), earliest first; dashed = an old entry for a finished node", values: heap.map(([d, v]) => `${d}: ${v}`), wide: true, marks: Object.fromEntries(heap.map(([, v], i) => [i, fin[v] ? "ghost" : ""]).filter(([, m]) => m)) }, distView(dist, n, { ...Object.fromEntries(fin.map((f, v) => [v, f ? "match" : ""]).filter(([v, m]) => v > 0 && m)), ...(o.u ? { [o.u]: o.stale ? "cut" : "new" } : {}) }, "final times (green = done, yellow = just finished)")];
    steps.push({ line: "init", note: `Push (0, ${k}): node ${k} has the signal at time 0.`, view: view() });
    while (heap.length) {
      const [d, u] = heap.shift();
      if (fin[u]) {
        steps.push({ line: ["pop", "stale"], note: `Pop (${d}, ${u}): node ${u} already finished earlier. Skip this old entry.`, view: view({ u, stale: true }) });
        continue;
      }
      fin[u] = true;
      dist[u] = d;
      const pushed = [];
      for (const [v, w] of graph[u]) if (!fin[v]) { heap.push([d + w, v]); pushed.push(`(${d + w}, ${v})`); }
      heap.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      steps.push({ line: ["pop", "stale", "done", "push"], note: `Pop (${d}, ${u}): the earliest entry, so node ${u} gets the signal at time ${d}, final.${pushed.length ? ` Push ${pushed.join(", ")}.` : ""}`, view: view({ u }) });
    }
    const reached = fin.filter(Boolean).length;
    const a = reached === n ? Math.max(...dist.slice(1)) : -1;
    steps.push({ line: "return", note: a < 0 ? `Return -1. Only ${reached} of ${n} nodes were reached.` : `Return ${a}. O(E log E) for the heap; best when edges are few.`, view: view() });
    return steps;
  },
});

function check(times, n, k) {
  if (times.some((e) => e.length !== 3)) throw new DSAViz.InputError("Each edge is [u, v, time], like [[2, 1, 1], [2, 3, 1]].");
  if (k < 1 || k > n) throw new DSAViz.InputError(`k must be a node, 1 to ${n}.`);
  if (times.some(([u, v]) => u < 1 || v < 1 || u > n || v > n)) throw new DSAViz.InputError(`Nodes are numbered 1 to ${n}.`);
  if (times.some(([u, v]) => u === v)) throw new DSAViz.InputError("An edge must go between two different nodes.");
  if (times.some(([, , w]) => w < 0 || w > 100)) throw new DSAViz.InputError("Times are 0 to 100.");
  if (new Set(times.map(([u, v]) => `${u},${v}`)).size !== times.length) throw new DSAViz.InputError("Each (u, v) pair appears once.");
}
const fmt = (d) => (d === Infinity ? "∞" : String(d));
const distView = (dist, n, marks = {}, label = "dist[v] (∞ = not reached yet)") => ({ type: "array", label: label + "; index = node, dashed 0 is unused", values: ["-", ...dist.slice(1).map(fmt)], marks: { 0: "ghost", ...marks } });
const edgeView = (times, marks = {}, label = "edges u→v (time)") => ({ type: "array", label, values: times.map(([u, v, w]) => `${u}→${v} (${w})`), wide: true, marks });
const answer = (dist) => { const b = Math.max(...dist.slice(1)); return b === Infinity ? -1 : b; };
})();
