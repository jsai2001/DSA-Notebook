// O(1) memory: find the middle, reverse the second half, then merge the two halves.
DSAViz.register("0143-reorder-list/approach3", {
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
    let slow = 0;
    let fast = 0;
    steps.push({ line: "middle", note: "Step 1: find the middle with slow (1 step) and fast (2 steps).", view: [listFrom("the list", 0, { pointers: { slow, fast } })] });
    while (nxt[fast] !== -1 && nxt[nxt[fast]] !== -1) {
      slow = nxt[slow];
      fast = nxt[nxt[fast]];
      steps.push({ line: "middle", note: `slow → node ${slow}, fast → node ${fast}.`, view: [listFrom("the list", 0, { pointers: { slow, fast }, marks: { [slow]: "window" } })] });
    }
    let second = nxt[slow];
    nxt[slow] = -1;
    let prev = -1;
    const firstHalf = () => listFrom("first half", 0, { marks: { [slow]: "window" } });
    const rev = () => ({ type: "list", label: "second half, reversed so far (prev)", nodes: walk(prev).map((i) => ({ value: String(head[i]), caption: `node ${i}`, mark: "" })) });
    const rest = () => ({ type: "list", label: "second half, not reversed yet", nodes: walk(second).map((i) => ({ value: String(head[i]), caption: `node ${i}`, mark: "" })) });
    steps.push({ line: "reverse", note: `fast can't take two more steps, so slow (node ${slow}) ends the first half. Cut after it, and reverse what follows.`, view: [firstHalf(), rest(), rev()] });
    while (second !== -1) {
      const next = nxt[second];
      nxt[second] = prev;
      prev = second;
      second = next;
      steps.push({ line: "reverse", note: `Point node ${prev} back at ${nxt[prev] === -1 ? "null" : `node ${nxt[prev]}`}.`, view: [firstHalf(), rest(), rev()] });
    }
    let first = 0;
    second = prev;
    const merged = (marks) => listFrom("merged so far (walked from the head)", 0, { marks });
    steps.push({ line: "merge", note: "Step 3: merge, taking one node from each half in turn. The reversed half is never longer than the first.", view: [merged({}), rev()] });
    while (second !== -1) {
      const n1 = nxt[first];
      const n2 = nxt[second];
      nxt[first] = second;
      nxt[second] = n1;
      steps.push({ line: "merge", note: `node ${first} → node ${second} → ${n1 === -1 ? "null" : `node ${n1}`}.`, view: [merged({ [first]: "visited", [second]: "new" })] });
      first = n1;
      second = n2;
    }
    steps.push({ line: "merge", note: `The second half is used up. Done, with no extra memory: ${walk(0).map((k) => head[k]).join(" → ")}.`, view: [listFrom("the reordered list", 0)] });
    return steps;
  },
});
