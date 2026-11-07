// Bellman-Ford limited to k + 1 rounds. Each round reads only last round's prices, so it adds at most one flight.
(function () {
DSAViz.register("0787-cheapest-flights-within-k-stops/approach3", {
  inputs: [
    { name: "n", type: "int", value: "4", min: 2, max: 6 },
    { name: "flights", type: "int[][]", value: "[[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]]", maxRows: 10, maxCols: 3, minValue: 0, maxValue: 10000 },
    { name: "src", type: "int", value: "0", min: 0, max: 5 },
    { name: "dst", type: "int", value: "3", min: 0, max: 5 },
    { name: "k", type: "int", value: "1", min: 0, max: 5 },
  ],
  trace({ n, flights, src, dst, k }) {
    check(n, flights, src, dst, k);
    let price = Array(n).fill(Infinity);
    price[src] = 0;
    const steps = [{ line: "init", note: `price[${src}] = 0, every other city ∞. Round r finds the cheapest routes with at most r flights.`, view: [flightView(flights), priceView(price, { [src]: "match" }, "price after 0 flights")] }];
    for (let r = 0; r <= k; r++) {
      const next = price.slice();
      const em = {}, pm = {}, better = [];
      flights.forEach(([u, v, p], i) => { if (price[u] + p < next[v]) { next[v] = price[u] + p; em[i] = "new"; pm[v] = "new"; better.push(`city ${v}: ${fmt(price[v])} → ${next[v]} via city ${u}`); } });
      if (!better.length) { steps.push({ line: ["round", "relax", "stop"], note: `Round ${r + 1}: no price changes, so more rounds can't help. Stop early.`, view: [flightView(flights), priceView(price, {}, `price (final)`)] }); break; }
      steps.push({ line: ["round", "relax"], note: `Round ${r + 1}: try every flight using last round's prices. ${better.join("; ")}.`, view: [flightView(flights, em, "flights (yellow = gave a cheaper price)"), { type: "array", label: "last round's prices (what this round reads)", values: price.map(fmt) }, priceView(next, pm, `price after ≤ ${r + 1} flight${r ? "s" : ""}`)] });
      price = next;
    }
    const ans = price[dst] === Infinity ? -1 : price[dst];
    steps.push({ line: "return", note: ans < 0 ? `Return -1. City ${dst} isn't reachable within ${k + 1} flight${k ? "s" : ""}.` : `Return ${ans}. At most k + 1 rounds over all flights: O(k·E).`, view: [priceView(price, { [dst]: ans < 0 ? "cut" : "match" }, "price")] });
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
