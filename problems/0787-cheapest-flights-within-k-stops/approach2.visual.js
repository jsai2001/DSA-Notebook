// Dijkstra on (price, city, flights used). Skip a pop if a cheaper route already reached that city with no more flights.
(function () {
DSAViz.register("0787-cheapest-flights-within-k-stops/approach2", {
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
    const fewest = Array(n).fill(Infinity);
    let heap = [[0, src, 0]];
    const steps = [];
    const view = (o = {}) => [{ type: "array", label: "heap: price, city, flights used (cheapest first)", values: heap.map(([c, u, f]) => `${c}, city ${u}, ${f}✈`), wide: true }, { type: "array", label: "fewest[city]: fewest flights of any route popped so far", values: fewest.map(fmt), marks: o.u !== undefined ? { [o.u]: o.m } : {} }];
    steps.push({ line: "init", note: `Push (0, city ${src}, 0 flights).`, view: view() });
    while (heap.length) {
      heap.sort((a, b) => a[0] - b[0] || a[2] - b[2] || a[1] - b[1]);
      const [cost, u, used] = heap.shift();
      if (u === dst) { steps.push({ line: ["pop", "done"], note: `Return ${cost}. Pop (${cost}, city ${dst}, ${used} flights): the cheapest route to ${dst} that stays within ${k + 1} flights.`, view: view({ u, m: "match" }) }); return steps; }
      if (used >= fewest[u] || used > k) { steps.push({ line: ["pop", "skip"], note: `Pop (${cost}, city ${u}, ${used}). ${used > k ? `No flights left (${used} > k = ${k}).` : `A cheaper route already reached ${u} with ${fewest[u]} flight${fewest[u] === 1 ? "" : "s"}: this one can't do better.`} Skip.`, view: view({ u, m: "cut" }) }); continue; }
      fewest[u] = used;
      const pushed = out[u].map(([v, p]) => { heap.push([cost + p, v, used + 1]); return `(${cost + p}, ${v}, ${used + 1})`; });
      steps.push({ line: ["pop", "skip", "push"], note: `Pop (${cost}, city ${u}, ${used} flights).${pushed.length ? ` Push ${pushed.join(", ")}.` : " No flights out."}`, view: view({ u, m: "new" }) });
    }
    steps.push({ line: "none", note: `Return -1. The heap ran out before reaching city ${dst}.`, view: view() });
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
