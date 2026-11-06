// Remember every node passed (the node, not its value); seeing one again means a cycle.
DSAViz.register("0141-linked-list-cycle/approach1", {
  inputs: [
    { name: "head", type: "int[]", value: "[3, 2, 0, -4]", minLength: 0, maxLength: 8, minValue: -99, maxValue: 99 },
    { name: "pos", label: "pos (index the tail links back to; -1 = no cycle)", type: "int", value: "1" },
  ],
  trace({ head, pos }) {
    const n = head.length;
    if (!Number.isInteger(pos) || pos < -1 || pos >= Math.max(n, 1) || (n === 0 && pos !== -1)) {
      throw new DSAViz.InputError(n ? `pos must be -1 (no cycle) or an index from 0 to ${n - 1}.` : "With an empty list, pos must be -1.");
    }
    const next = (i) => (i === null ? null : i + 1 < n ? i + 1 : pos >= 0 ? pos : null);
    const list = (pointers, marks = {}) => ({
      type: "list",
      label: pos >= 0 ? `head (under each node: its index; the tail links back to ${pos}, so the "null" end is never reached)` : "head (under each node: its index)",
      nodes: head.map((v, i) => ({ value: String(v), caption: i === n - 1 && pos >= 0 ? `${i} ↩ ${pos}` : String(i), mark: marks[i] || "" })),
      pointers: Object.fromEntries(Object.entries(pointers).map(([k, v]) => [k, v === null ? n : v])),
    });

    const steps = [];
    const seen = [];
    const view = (node, o = {}) => {
      const marks = {};
      seen.forEach((i) => (marks[i] = "visited"));
      if (node !== null && node !== undefined) marks[node] = o.found ? "match" : "active";
      return [
        list(node === undefined ? {} : { node }, marks),
        { type: "set", label: "seen (node indexes; the real code stores the nodes)", items: seen.map(String), marks: o.found ? { [String(node)]: "match" } : o.added ? { [String(node)]: "new" } : {} },
      ];
    };
    steps.push({ line: "init", note: "Walk the list, remembering every node passed. Store the nodes themselves: values can repeat.", view: view(n ? 0 : null) });
    let node = n ? 0 : null;
    while (node !== null) {
      if (seen.includes(node)) {
        steps.push({ line: ["walk", "found"], note: `Node ${node} is already in seen: we came back to it, so there's a cycle. Return true.`, view: view(node, { found: true }) });
        return steps;
      }
      seen.push(node);
      steps.push({ line: "walk", note: `Node ${node} (value ${head[node]}) is new. Add it to seen and move to ${next(node) === null ? "null" : `node ${next(node)}`}.`, view: view(node, { added: true }) });
      node = next(node);
    }
    steps.push({ line: "none", note: `Reached null: the list ends, so no cycle. Return false. O(n) time, but seen holds all ${n} node${n === 1 ? "" : "s"}.`, view: view(null) });
    return steps;
  },
});
