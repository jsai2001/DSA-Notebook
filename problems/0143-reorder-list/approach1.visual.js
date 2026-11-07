// Put the nodes in an array, then link them front, back, front, back with two indexes.
DSAViz.register("0143-reorder-list/approach1", {
  inputs: [{ name: "head", type: "int[]", value: "[1, 2, 3, 4, 5]", minLength: 1, maxLength: 8, minValue: 1, maxValue: 999 }],
  trace({ head }) {
    const n = head.length;
    const nxt = head.map((_, i) => (i + 1 < n ? i + 1 : -1)); // the real next links, by node index
    const walk = (start) => {
      const out = [];
      for (let p = start; p !== -1 && out.length <= n; p = nxt[p]) out.push(p);
      return out;
    };
    // A list widget walked from `start` through the actual links (caption = node index).
    const listFrom = (label, start, o = {}) => ({
      type: "list",
      label,
      nodes: walk(start).map((i) => ({ value: String(head[i]), caption: `node ${i}`, mark: (o.marks || {})[i] || "" })),
      pointers: Object.fromEntries(Object.entries(o.pointers || {}).map(([k, v]) => [k, Math.max(0, walk(start).indexOf(v))])),
    });
    const target = [];
    for (let i = 0, j = n - 1; i <= j; i++, j--) { target.push(i); if (i !== j) target.push(j); }

    const steps = [];
    let linked = 1; // how many nodes, from the head, are already in their new order
    const view = (o = {}) => {
      const list = listFrom(o.label || "linked so far, walked from the head (the rest still has its old links)", 0, { marks: o.lmarks });
      if (!o.label) list.nodes = list.nodes.slice(0, linked);
      return [
        { type: "array", label: "nodes (the array holds the nodes, by index)", values: head.map((v) => `${v}`), sub: head.map((_, k) => `node ${k}`), marks: o.amarks || {}, pointers: o.ptr || {} },
        list,
      ];
    };
    steps.push({ line: ["init", "copy"], note: `Copy all ${n} nodes into an array, so the back of the list can be reached in O(1).`, view: view() });
    let i = 0;
    let j = n - 1;
    while (i < j) {
      nxt[i] = j;
      linked++;
      steps.push({ line: "link", note: `node ${i}.next = node ${j} (front, then back).`, view: view({ ptr: { i, j }, amarks: { [i]: "visited", [j]: "active" }, lmarks: { [i]: "visited", [j]: "new" } }) });
      i++;
      if (i === j) break;
      nxt[j] = i;
      linked++;
      steps.push({ line: "link", note: `node ${j}.next = node ${i} (back, then front).`, view: view({ ptr: { i, j }, amarks: { [j]: "visited", [i]: "active" }, lmarks: { [j]: "visited", [i]: "new" } }) });
      j--;
    }
    const looped = walk(0).length > n;
    nxt[i] = -1;
    steps.push({
      line: "cut",
      note: `node ${i} is the new last node. Set its next to null${looped ? ": it still pointed back into the list, which would loop forever" : ""}. Done: ${walk(0).map((k) => head[k]).join(" → ")}.`,
      view: view({ label: "the reordered list", lmarks: { [i]: "match" } }),
    });
    return steps;
  },
});
