// Backtracking: fly the smallest unused ticket first; at a dead end, undo it and try the next.
(function () {
DSAViz.register("0332-reconstruct-itinerary/approach1", {
  inputs: [{ name: "tickets", type: "string", value: "JFK SFO, JFK ATL, SFO ATL, ATL JFK, ATL SFO", maxLength: 64, ascii: true }],
  trace({ tickets }) {
    const t = parse(tickets).sort((x, y) => (x[0] + x[1] < y[0] + y[1] ? -1 : x[0] + x[1] > y[0] + y[1] ? 1 : 0));
    const out = {};
    const idx = {};
    t.forEach(([a, b], i) => { (out[a] = out[a] || []).push(b); (idx[a] = idx[a] || []).push(i); });
    const used = Object.fromEntries(Object.entries(out).map(([a, v]) => [a, v.map(() => false)]));
    const route = ["JFK"];
    const steps = [];
    const view = (tm = {}, rm = {}, am) => [
      { type: "array", label: "tickets, sorted; grey = used", values: t.map(([a, b]) => `${a}→${b}`), wide: true, marks: { ...Object.fromEntries(Object.entries(used).flatMap(([a, u]) => u.map((x, i) => [idx[a][i], x ? "visited" : ""]).filter(([, m]) => m))), ...tm } },
      { type: "map", label: "unused tickets out of each airport", columns: ["from", "to (smallest first)"], entries: Object.keys(out).sort().map((a) => [a, out[a].filter((_, i) => !used[a][i]).join(", ") || "—"]), marks: am ? { [am]: "active" } : {} },
      { type: "array", label: `route (${route.length} of ${t.length + 1})`, values: [...route], wide: true, marks: rm },
    ];
    steps.push({ line: "init", note: `Sort the ${t.length} tickets and group them by where they start. Start the route at JFK.`, view: view() });
    function go() {
      if (route.length === t.length + 1) {
        steps.push({ line: "done", note: "Every ticket is used. Tickets were tried smallest first, so this first full route is the smallest one.", view: view({}, Object.fromEntries(route.map((_, i) => [i, "match"]))) });
        return true;
      }
      const a = route[route.length - 1];
      const ds = out[a] || [];
      steps.push({ line: "try", note: ds.some((_, i) => !used[a][i]) ? `At ${a}. Try its unused tickets, smallest first: ${ds.filter((_, i) => !used[a][i]).join(", ")}.` : `At ${a}, but no unused ticket leaves it and ${t.length + 1 - route.length} ticket${t.length + 1 - route.length > 1 ? "s are" : " is"} still unused.`, view: view({}, { [route.length - 1]: "active" }, a) });
      for (let i = 0; i < ds.length; i++) {
        if (used[a][i] || (i > 0 && ds[i] === ds[i - 1] && !used[a][i - 1])) continue;
        used[a][i] = true;
        route.push(ds[i]);
        steps.push({ line: "take", note: `Fly ${a} → ${ds[i]}.`, view: view({ [idx[a][i]]: "new" }, { [route.length - 1]: "new" }) });
        if (steps.length > 400) throw new DSAViz.InputError("Too many steps to show. Try fewer tickets.");
        if (go()) return true;
        route.pop();
        used[a][i] = false;
        steps.push({ line: "undo", note: `Dead end after ${a} → ${ds[i]}: give that ticket back and try the next one from ${a}.`, view: view({ [idx[a][i]]: "cut" }, { [route.length - 1]: "active" }, a) });
      }
      steps.push({ line: "undo", note: `No ticket from ${a} leads to a full route. Back up.`, view: view({}, { [route.length - 1]: "cut" }, a) });
      return false;
    }
    go();
    steps.push({ line: "return", note: `Return ${route.join(", ")}. The first full route found, trying smallest tickets first.`, view: view({}, Object.fromEntries(route.map((_, i) => [i, "match"]))) });
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
