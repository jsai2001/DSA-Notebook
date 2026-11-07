// Push every node on a stack; pop from the back and slip each one in after the next front node.
DSAViz.register("0143-reorder-list/approach2", {
  inputs: [{ name: "head", type: "int[]", value: "[1, 2, 3, 4, 5]", minLength: 1, maxLength: 8, minValue: 1, maxValue: 999 }],
  trace({ head }) {
    const n = head.length;
    const nxt = head.map((_, i) => (i + 1 < n ? i + 1 : -1)); // the real next links, by node index
    // Walk the actual links, stopping before any node comes up a second time.
    const walk = (start) => {
      const out = [];
      for (let p = start; p !== -1 && !out.includes(p); p = nxt[p]) out.push(p);
      return out;
    };
    // A list widget walked from `start` (caption = node index; ↩ marks a link back into the list).
    const listFrom = (label, start, o = {}) => {
      const order = walk(start);
      const lastNext = order.length ? nxt[order[order.length - 1]] : -1;
      return {
        type: "list",
        label,
        nodes: order.map((i, k) => ({ value: String(head[i]), caption: k === order.length - 1 && lastNext !== -1 ? `node ${i} ↩ ${lastNext}` : `node ${i}`, mark: (o.marks || {})[i] || "" })),
        pointers: Object.fromEntries(Object.entries(o.pointers || {}).map(([k, v]) => [k, Math.max(0, order.indexOf(v))])),
      };
    };
    const target = [];
    for (let i = 0, j = n - 1; i <= j; i++, j--) { target.push(i); if (i !== j) target.push(j); }

    const steps = [];
    const stack = [];
    const view = (o = {}) => [
      { type: "array", label: "stack (bottom → top; the top is the current tail)", values: stack.map((k) => `${head[k]}`), sub: stack.map((k) => `node ${k}`), marks: stack.length ? { [stack.length - 1]: "active" } : {} },
      listFrom(o.label || "the list, walked from the head (↩ = still linked back into the list until the end)", 0, { marks: o.marks, pointers: o.cur !== undefined ? { cur: o.cur } : {} }),
    ];
    for (let k = 0; k < n; k++) stack.push(k);
    steps.push({ line: ["init", "push"], note: `Push all ${n} nodes. Popping now gives the nodes from the back.`, view: view() });
    let cur = 0;
    const moves = Math.floor((n - 1) / 2);
    steps.push({ line: "insert", note: `${moves} node${moves === 1 ? "" : "s"} must move from the back to the front half.`, view: view({ cur }) });
    for (let k = 0; k < moves; k++) {
      const last = stack.pop();
      nxt[last] = nxt[cur];
      nxt[cur] = last;
      const was = cur;
      cur = nxt[last];
      steps.push({ line: "insert", note: `Pop node ${last} (value ${head[last]}) and put it right after node ${was}. Move cur two ahead, to node ${cur}.`, view: view({ cur, marks: { [last]: "new", [was]: "visited" } }) });
    }
    const top = stack[stack.length - 1];
    nxt[top] = -1;
    steps.push({ line: "cut", note: `node ${top}, now on top, is the new tail: set its next to null. Done: ${walk(0).map((k) => head[k]).join(" → ")}.`, view: view({ label: "the reordered list", marks: { [top]: "match" } }) });
    return steps;
  },
});
