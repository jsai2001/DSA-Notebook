// One pass with a map: copy_of(node) makes a copy the first time it's asked for.
(function () {
DSAViz.register("0138-copy-list-with-random-pointer/approach2", {
  inputs: [{ name: "head", label: "head ([value, random index] per node)", type: "string", value: "[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]", maxLength: 90, raw: true }],
  trace({ head }) {
    const L = parseList(head);
    const n = L.length;
    const steps = [];

    const rnd = (r, p = "") => (r === null ? "r→∅" : `r→${r}${p}`);
    const origList = (o = {}) => ({
      type: "list",
      label: "original list (under each node: its index, then r→ where random points; ∅ = null)",
      nodes: L.map((x, i) => ({ value: String(x.val), caption: `${i} ${rnd(x.random)}`, mark: o.at === i ? "active" : o.seen && o.seen.includes(i) ? "visited" : "" })),
    });

    const made = new Set();
    const order = [];
    const links = {};
    const copyOf = (i) => {
      if (i === null) return "null";
      if (!made.has(i)) { made.add(i); order.push(i); return `${i}′ (new)`; }
      return `${i}′`;
    };
    const view = (o = {}) => [
      origList(o),
      { type: "map", label: "copies (made the first time they're needed)", columns: ["original", "copy"], entries: order.map((i) => [String(i), `${i}′${links[i] ? `: next → ${links[i].next}, ${links[i].random}` : " (not linked yet)"}`]), marks: Object.fromEntries((o.fresh || []).map((i) => [String(i), "new"])) },
    ];
    steps.push({ line: "init", note: "Walk the list once. copy_of(x) returns x's copy, making it if this is the first time x is asked for.", view: view() });
    for (let i = 0; i < n; i++) {
      const before = new Set(made);
      const c = copyOf(i);
      const nx = copyOf(i + 1 < n ? i + 1 : null);
      const r = copyOf(L[i].random);
      links[i] = { next: nx.replace(" (new)", ""), random: `random → ${r.replace(" (new)", "")}` };
      const fresh = order.filter((k) => !before.has(k));
      steps.push({
        line: ["walk", "get", "link"],
        note: `At ${i}: copy is ${c}; next = ${nx}; random = ${r}.${fresh.length ? ` Made ${fresh.map((k) => `${k}′`).join(", ")} just now.` : " No new copies needed."}`,
        view: view({ at: i, fresh }),
      });
    }
    steps.push({ line: ["return", "get"], note: n ? `Return copy_of(head) = 0′. One pass, each copy made exactly once. O(n) time, O(n) for the map.` : "The list is empty: return null.", view: view() });
    return steps;
  },
});

// Read LeetCode's form: [[val, random_index], ...], with null for no random pointer.
function parseList(text) {
  let a;
  try {
    a = JSON.parse(text.trim() || "[]");
  } catch (e) {
    throw new DSAViz.InputError("Type the list like [[7, null], [13, 0], [11, 4]]: each pair is [value, index of its random node or null].");
  }
  if (!Array.isArray(a) || a.some((p) => !Array.isArray(p) || p.length !== 2 || !Number.isInteger(p[0]) || !(p[1] === null || Number.isInteger(p[1])))) {
    throw new DSAViz.InputError("Each node is [value, random index or null], like [13, 0].");
  }
  if (a.length > 6) throw new DSAViz.InputError("Up to 6 nodes here, so the steps stay readable.");
  if (a.some(([v]) => v < -99 || v > 99)) throw new DSAViz.InputError("Values must be between -99 and 99 here.");
  if (a.some(([, r]) => r !== null && (r < 0 || r >= a.length))) throw new DSAViz.InputError(`A random index must be null or between 0 and ${a.length - 1}.`);
  return a.map(([val, random]) => ({ val, random }));
}
})();
