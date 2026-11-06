// Two passes with a map: make every copy first, then link next and random through the map.
(function () {
DSAViz.register("0138-copy-list-with-random-pointer/approach1", {
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

    const made = [];
    const linked = [];
    const view = (o = {}) => [
      origList(o),
      { type: "map", label: "copies (original index → its copy)", columns: ["original", "copy"], entries: [["null", "null"], ...made.map((i) => [String(i), `${i}′ (value ${L[i].val})`])], marks: o.fresh !== undefined ? { [String(o.fresh)]: "new" } : {} },
      {
        type: "list",
        label: "the copy (′ = new node; r→? = not linked yet)",
        nodes: made.map((i) => ({ value: String(L[i].val), caption: `${i}′ ${linked.includes(i) ? rnd(L[i].random, "′") : "r→?"}`, mark: o.at === i && o.linking ? "new" : "" })),
      },
    ];
    steps.push({ line: "init", note: "Map each original node to its copy. null maps to null, so a missing next or random needs no special case.", view: view() });
    for (let i = 0; i < n; i++) {
      made.push(i);
      steps.push({ line: "make", note: `Pass 1: make ${i}′ with value ${L[i].val}. Don't link anything yet: the node its random points to may not have a copy yet.`, view: view({ at: i, fresh: i }) });
    }
    for (let i = 0; i < n; i++) {
      linked.push(i);
      const nxt = i + 1 < n ? `${i + 1}′` : "null";
      const r = L[i].random === null ? "null" : `${L[i].random}′`;
      steps.push({ line: "link", note: `Pass 2: ${i}′.next = copies[${i + 1 < n ? i + 1 : "null"}] = ${nxt}; ${i}′.random = copies[${L[i].random === null ? "null" : L[i].random}] = ${r}.`, view: view({ at: i, linking: true }) });
    }
    steps.push({ line: "return", note: n ? `Return 0′. Every copy points only at copies. O(n) time, O(n) for the map.` : "The list is empty: return null.", view: view() });
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
