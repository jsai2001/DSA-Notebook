// Bellman-Ford: up to n - 1 rounds; each round tries every edge and keeps any faster time.
(function () {
DSAViz.register("0743-network-delay-time/approach1", {
  inputs: [
    { name: "times", type: "int[][]", value: "[[2, 1, 1], [2, 3, 1], [3, 4, 1], [2, 4, 5]]", maxRows: 10, maxCols: 3, minValue: 0, maxValue: 100 },
    { name: "n", type: "int", value: "4", min: 1, max: 6 },
    { name: "k", type: "int", value: "2", min: 1, max: 6 },
  ],
  trace({ times, n, k }) {
    check(times, n, k);
    const dist = Array(n + 1).fill(Infinity);
    dist[k] = 0;
    const steps = [];
    steps.push({ line: "init", note: `Only node ${k} has the signal at time 0.`, view: [edgeView(times), distView(dist, n, { [k]: "match" })] });
    let rounds = 0;
    for (let r = 0; r < n - 1; r++) {
      rounds++;
      const em = {};
      const dm = {};
      const better = [];
      times.forEach(([u, v, w], i) => { if (dist[u] + w < dist[v]) { better.push(`${v}: ${fmt(dist[v])} → ${dist[u] + w} via ${u}`); dist[v] = dist[u] + w; em[i] = "new"; dm[v] = "new"; } });
      if (!better.length) {
        steps.push({ line: ["round", "relax", "stop"], note: `Round ${r + 1}: try every edge again. Nothing gets faster, so every time is final. Stop early.`, view: [edgeView(times), distView(dist, n)] });
        break;
      }
      steps.push({ line: ["round", "relax"], note: `Round ${r + 1}: try all ${times.length} edges. Faster: ${better.join("; ")}.`, view: [edgeView(times, em, "edges u→v (time); yellow = gave a faster time"), distView(dist, n, dm)] });
    }
    const a = answer(dist);
    steps.push({ line: "return", note: a < 0 ? "Return -1. Some node is still at ∞: the signal never reaches it." : `Return ${a}. The last node gets the signal at time ${a}. ${rounds} round${rounds > 1 ? "s" : ""} over ${times.length} edge${times.length > 1 ? "s" : ""}: O(n·E) at worst.`, view: [edgeView(times), distView(dist, n, Object.fromEntries(dist.map((d, v) => [v, d === a ? "match" : d === Infinity ? "cut" : ""]).filter(([v, m]) => v > 0 && m)))] });
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
