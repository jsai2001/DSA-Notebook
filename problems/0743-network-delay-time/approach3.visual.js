// Dijkstra with an array: n rounds, each takes the unfinished node with the smallest time and updates the others.
(function () {
DSAViz.register("0743-network-delay-time/approach3", {
  inputs: [
    { name: "times", type: "int[][]", value: "[[2, 1, 1], [2, 3, 1], [3, 4, 1], [2, 4, 5]]", maxRows: 10, maxCols: 3, minValue: 0, maxValue: 100 },
    { name: "n", type: "int", value: "4", min: 1, max: 6 },
    { name: "k", type: "int", value: "2", min: 1, max: 6 },
  ],
  trace({ times, n, k }) {
    check(times, n, k);
    const w = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));
    times.forEach(([u, v, t]) => (w[u][v] = t));
    const dist = Array(n + 1).fill(Infinity);
    const done = Array(n + 1).fill(false);
    dist[k] = 0;
    const steps = [];
    const dm = (extra = {}) => ({ ...Object.fromEntries(done.map((f, v) => [v, f ? "match" : ""]).filter(([v, m]) => v > 0 && m)), ...extra });
    const tableView = (u) => ({ type: "grid", label: "w[u][v], the edge times as a table (∞ = no edge; yellow = the row being used)", rows: [...Array(n).keys()].map((i) => i + 1), cols: [...Array(n).keys()].map((i) => i + 1), corner: "u \\ v", cells: w.slice(1).map((r) => r.slice(1).map(fmt)), marks: u ? Object.fromEntries([...Array(n).keys()].map((j) => [`${u - 1},${j}`, "compare"])) : {} });
    steps.push({ line: "init", note: `Put the edge times in an n × n table. dist[${k}] = 0, everyone else ∞.`, view: [tableView(), distView(dist, n, { [k]: "new" })] });
    for (let r = 0; r < n; r++) {
      let u = -1;
      for (let v = 1; v <= n; v++) if (!done[v] && (u < 0 || dist[v] < dist[u])) u = v;
      if (dist[u] === Infinity) {
        steps.push({ line: ["pick", "stuck"], note: `Return -1. The closest unfinished node, ${u}, is at ∞: the rest can't be reached.`, view: [tableView(), distView(dist, n, dm({ [u]: "cut" }))] });
        return steps;
      }
      done[u] = true;
      const better = [];
      const nm = {};
      for (let v = 1; v <= n; v++) if (dist[u] + w[u][v] < dist[v]) { better.push(`${v}: ${fmt(dist[v])} → ${dist[u] + w[u][v]}`); dist[v] = dist[u] + w[u][v]; nm[v] = "new"; }
      steps.push({ line: ["pick", "relax"], note: `Node ${u} has the smallest time not yet final (${dist[u]}): it's final now. Scan its row.${better.length ? ` Faster: ${better.join("; ")}.` : " Nothing gets faster."}`, view: [tableView(u), distView(dist, n, dm({ [u]: "active", ...nm }), "dist[v] (green = final, dark = just finished, yellow = just improved)")] });
    }
    steps.push({ line: "return", note: `Return ${Math.max(...dist.slice(1))}. n rounds of n: O(n²), no heap. With n ≤ 100 that's at most 10⁴ steps.`, view: [tableView(), distView(dist, n, dm())] });
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
