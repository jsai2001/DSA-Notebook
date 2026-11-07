// BFS one flight at a time, for k + 1 levels; a route only continues if it reaches a city cheaper than any route before.
(function () {
DSAViz.register("0787-cheapest-flights-within-k-stops/approach1", {
  inputs: [
    { name: "n", type: "int", value: "4", min: 2, max: 6 },
    { name: "flights", type: "int[][]", value: "[[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]]", maxRows: 10, maxCols: 3, minValue: 0, maxValue: 10000 },
    { name: "src", type: "int", value: "0", min: 0, max: 5 },
    { name: "dst", type: "int", value: "3", min: 0, max: 5 },
    { name: "k", type: "int", value: "1", min: 0, max: 5 },
  ],
  trace({ n, flights, src, dst, k }) {
    check(n, flights, src, dst, k);
    const out = Array.from({ length: n }, () => []);
    flights.forEach(([u, v, p]) => out[u].push([v, p]));
    const best = Array(n).fill(Infinity);
    best[src] = 0;
    let queue = [[src, 0]];
    const steps = [{ line: "init", note: `Start at city ${src} with price 0. At most k + 1 = ${k + 1} flight${k ? "s" : ""}.`, view: [flightView(flights), priceView(best, { [src]: "match" }, "best[city] (cheapest found so far)"), { type: "array", label: "queue (city: price)", values: queue.map(([c, p]) => `${c}: ${p}`), wide: true }] }];
    for (let lvl = 0; lvl <= k && queue.length; lvl++) {
      const next = [];
      const better = [];
      const bm = {};
      for (const [u, cost] of queue) for (const [v, p] of out[u]) if (cost + p < best[v]) { best[v] = cost + p; next.push([v, cost + p]); better.push(`${v} at ${cost + p}`); bm[v] = "new"; }
      queue = next;
      steps.push({ line: ["level", "fly"], note: `Flight ${lvl + 1}: from every city in the queue, take each flight.${better.length ? ` Cheaper: ${better.join(", ")}.` : " Nothing gets cheaper."}`, view: [flightView(flights), priceView(best, { ...bm, ...(best[dst] < Infinity ? { [dst]: bm[dst] || "match" } : {}) }, "best[city] (yellow = just got cheaper)"), { type: "array", label: "queue for the next flight", values: queue.map(([c, p]) => `${c}: ${p}`), wide: true }] });
    }
    const ans = best[dst] === Infinity ? -1 : best[dst];
    steps.push({ line: "return", note: ans < 0 ? `Return -1. City ${dst} can't be reached in ${k + 1} flight${k ? "s" : ""}.` : `Return ${ans}. The cheapest price to ${dst} using at most ${k + 1} flight${k ? "s" : ""}.`, view: [priceView(best, { [dst]: ans < 0 ? "cut" : "match" }, "best[city]")] });
    return steps;
  },
});

function check(n, flights, src, dst, k) {
  if (flights.some((f) => f.length !== 3)) throw new DSAViz.InputError("Each flight is [from, to, price], like [[0, 1, 100]].");
  if (flights.some(([u, v]) => u < 0 || v < 0 || u >= n || v >= n)) throw new DSAViz.InputError(`Cities are 0 to ${n - 1}.`);
  if (flights.some(([u, v]) => u === v)) throw new DSAViz.InputError("A flight goes between two different cities.");
  if (flights.some(([, , p]) => p < 1)) throw new DSAViz.InputError("Prices are at least 1.");
  if (new Set(flights.map(([u, v]) => `${u},${v}`)).size !== flights.length) throw new DSAViz.InputError("Each (from, to) pair appears once.");
  if (src < 0 || dst < 0 || src >= n || dst >= n || src === dst) throw new DSAViz.InputError(`src and dst must be different cities, 0 to ${n - 1}.`);
  if (k >= n) throw new DSAViz.InputError(`k must be less than n = ${n}.`);
}
const fmt = (d) => (d === Infinity ? "∞" : String(d));
const flightView = (flights, marks = {}, label = "flights from→to (price)") => ({ type: "array", label, values: flights.map(([u, v, p]) => `${u}→${v} (${p})`), wide: true, marks });
const priceView = (p, marks = {}, label) => ({ type: "array", label, values: p.map(fmt), marks });
})();
