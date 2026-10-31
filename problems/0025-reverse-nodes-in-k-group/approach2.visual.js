// Recursion: check that k nodes exist, let the call on the rest finish first, then reverse this group onto its answer.
DSAViz.register("0025-reverse-nodes-in-k-group/approach2", {
  inputs: [
    { name: "head", type: "int[]", value: "[1, 2, 3, 4, 5]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 1000 },
    { name: "k", type: "int", value: "2", min: 1, max: 8 },
  ],
  trace({ head, k }) {
    const n = head.length;
    if (k > n) throw new DSAViz.InputError(`k must be between 1 and the list length (${n}).`);
    const steps = [];
    const fmt = (arr) => `[${arr.join(", ")}]`;
    const order = head.map((_, i) => i); // display order of node positions
    const flipped = new Set();
    const frames = []; // start index of each waiting call
    const view = (opts = {}) => {
      const nodes = order.map((i, idx) => {
        let mark = flipped.has(i) ? "visited" : "";
        if (opts.window && idx >= opts.window[0] && idx < opts.window[1]) mark = opts.fresh ? "new" : "window";
        return { value: head[i], caption: `#${i + 1}`, mark };
      });
      const calls = frames.map((s) => `head = ${head[order[s]]}`);
      if (opts.current !== undefined) calls.push(opts.current < n ? `head = ${head[order[opts.current]]}` : "head = null");
      return [
        { type: "list", label: "list (#p = original position)", nodes, pointers: opts.pointers || {} },
        { type: "array", label: "call stack (newest on the right)", values: calls, wide: true, marks: calls.length ? { [calls.length - 1]: "active" } : {} },
      ];
    };

    let s = 0;
    for (;;) {
      if (s + k > n) {
        const left = order.slice(s).map((i) => head[i]);
        steps.push({
          line: "short",
          note: left.length
            ? `Only ${left.length} node${left.length === 1 ? "" : "s"} left (${fmt(left)}), fewer than k = ${k}: return head as it is.`
            : "head is null: no nodes left, so return null.",
          view: view({ current: s, window: [s, n], pointers: { head: s } }),
        });
        break;
      }
      steps.push({
        line: "check",
        note: `Walk k = ${k} nodes from ${head[order[s]]}: a whole group ${fmt(order.slice(s, s + k).map((i) => head[i]))} is there. node stops on ${s + k < n ? head[order[s + k]] : "null"}, the first node after it.`,
        view: view({ current: s, window: [s, s + k], pointers: { head: s, node: s + k } }),
      });
      frames.push(s);
      steps.push({
        line: "recurse",
        note: `Before touching this group, call reverseKGroup(${s + k < n ? head[order[s + k]] : "null"}, ${k}) on the rest. This call waits for its answer.`,
        view: view({ current: s + k, pointers: { node: s + k } }),
      });
      s += k;
    }
    let answer = s < n ? s : n; // display index of the rest's answer (n = null)
    while (frames.length) {
      const start = frames.pop();
      const group = order.slice(start, start + k);
      const restLabel = answer < n ? head[order[answer]] : "null";
      order.splice(start, k, ...group.slice().reverse());
      group.forEach((i) => flipped.add(i));
      steps.push({
        line: "flip",
        note: `Back in the call for ${head[group[0]]}: the rest's answer starts at ${restLabel}. Reverse ${fmt(group.map((i) => head[i]))} onto it, so ${head[group[0]]} now points to ${restLabel}.`,
        view: view({ current: start, window: [start, start + k], fresh: true, pointers: { prev: start } }),
      });
      steps.push({
        line: "return",
        note: `Return ${head[group[k - 1]]}, the group's new first node.${frames.length ? " The caller links its group to it." : ` That's the answer: ${fmt(order.map((i) => head[i]))}.`}`,
        view: view({ current: start, pointers: { returned: start } }),
      });
      answer = start;
    }
    const depth = Math.floor(n / k) + 1;
    steps[steps.length - 1].note += ` The stack went ${depth} calls deep (n / k + 1): O(n / k) space.`;
    return steps;
  },
});
