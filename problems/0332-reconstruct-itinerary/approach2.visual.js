// Hierholzer, recursive: use up every ticket out of an airport (smallest first), then add the airport.
(function () {
DSAViz.register("0332-reconstruct-itinerary/approach2", {
  inputs: [{ name: "tickets", type: "string", value: "JFK KUL, JFK NRT, NRT JFK", maxLength: 64, ascii: true }],
  trace({ tickets }) {
    const t = parse(tickets);
    const out = {};
    [...t].sort().reverse().forEach(([a, b]) => (out[a] = out[a] || []).push(b));
    const route = [];
    const calls = [];
    const steps = [];
    const view = (am, cm = {}, rm = {}) => [
      { type: "map", label: "tickets left out of each airport", columns: ["from", "to (smallest first)"], entries: Object.keys(out).sort().map((a) => [a, [...out[a]].reverse().join(", ") || "—"]), marks: am ? { [am]: "active" } : {} },
      { type: "array", label: "open visit() calls, oldest first", values: calls.length ? [...calls] : ["—"], wide: true, marks: calls.length ? cm : { 0: "ghost" } },
      { type: "array", label: "route, built backwards", values: route.length ? [...route] : ["—"], wide: true, marks: route.length ? rm : { 0: "ghost" } },
    ];
    steps.push({ line: "init", note: `Group the ${t.length} tickets by where they start. Each list is kept so the smallest destination comes off first.`, view: view() });
    function visit(a) {
      calls.push(a);
      steps.push({ line: "visit", note: `visit(${a}).`, view: view(a, { [calls.length - 1]: "new" }) });
      while (out[a] && out[a].length) {
        const b = out[a].pop();
        steps.push({ line: "visit", note: `${a} still has a ticket: fly the smallest, ${a} → ${b}.`, view: view(a, { [calls.length - 1]: "active" }) });
        visit(b);
      }
      route.push(a);
      calls.pop();
      steps.push({ line: "stuck", note: `${a} has no tickets left, so add it to the route. Everything after it in the real route is already in.`, view: view(a, { [calls.length - 1]: "active" }, { [route.length - 1]: "new" }) });
    }
    visit("JFK");
    const r = [...route].reverse();
    steps.push({ line: "return", note: `Return ${r.join(", ")}. That's the route reversed. Each ticket is flown once: O(E log E) for the sort.`, view: [{ type: "array", label: "route", values: r, wide: true, marks: Object.fromEntries(r.map((_, i) => [i, "match"])) }] });
    return steps;
  },
});
// "JFK SFO, SFO ATL" -> [["JFK","SFO"],["SFO","ATL"]]; checks that a route using every ticket exists.
function parse(s) {
  const parts = s.split(",").map((p) => p.trim()).filter(Boolean);
  if (!parts.length) throw new DSAViz.InputError('Write tickets like "JFK SFO, SFO ATL" (from to, comma between tickets).');
  const t = parts.map((p) => p.toUpperCase().split(/\s+/));
  if (t.some((x) => x.length !== 2 || !x.every((c) => /^[A-Z]{3}$/.test(c)))) throw new DSAViz.InputError('Each ticket is two 3-letter airports, like "JFK SFO".');
  if (t.length > 8) throw new DSAViz.InputError("At most 8 tickets here (kept small so the steps stay readable).");
  if (t.some(([a, b]) => a === b)) throw new DSAViz.InputError("A ticket must go between two different airports.");
  if (!valid(t)) throw new DSAViz.InputError("No route from JFK uses every ticket exactly once. LeetCode promises one exists.");
  return t;
}
function valid(t) {
  const out = {};
  [...t].sort().reverse().forEach(([a, b]) => (out[a] = out[a] || []).push(b));
  const stack = ["JFK"], route = [];
  while (stack.length) { const a = stack[stack.length - 1]; if (out[a] && out[a].length) stack.push(out[a].pop()); else route.push(stack.pop()); }
  route.reverse();
  if (route.length !== t.length + 1) return false;
  const left = {};
  t.forEach(([a, b]) => (left[a + b] = (left[a + b] || 0) + 1));
  for (let i = 1; i < route.length; i++) { const k = route[i - 1] + route[i]; if (!left[k]) return false; left[k]--; }
  return true;
}
})();
