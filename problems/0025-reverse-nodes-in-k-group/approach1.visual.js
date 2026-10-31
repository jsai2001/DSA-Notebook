// Array of nodes: reverse each full block of k inside the array, then relink the nodes in that order.
DSAViz.register("0025-reverse-nodes-in-k-group/approach1", {
  inputs: [
    { name: "head", type: "int[]", value: "[1, 2, 3, 4, 5]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 1000 },
    { name: "k", type: "int", value: "2", min: 1, max: 8 },
  ],
  trace({ head, k }) {
    const n = head.length;
    if (k > n) throw new DSAViz.InputError(`k must be between 1 and the list length (${n}).`);
    const steps = [];
    const fmt = (arr) => `[${arr.join(", ")}]`;
    let nodes = []; // node positions, in array order
    const view = (opts = {}) => {
      const marks = {};
      if (opts.newest) marks[nodes.length - 1] = "new";
      if (opts.block) for (let i = opts.block[0]; i < opts.block[1]; i++) marks[i] = opts.flipped ? "new" : "window";
      if (opts.pair !== undefined) {
        marks[opts.pair] = "active";
        marks[opts.pair + 1] = "active";
      }
      const widgets = [
        {
          type: "list",
          label: "original list (#p = position)",
          nodes: head.map((v, i) => ({ value: v, caption: `#${i + 1}`, mark: opts.at === i ? "active" : "" })),
          pointers: opts.at !== undefined ? { head: opts.at } : {},
        },
        { type: "array", label: "nodes array (original position underneath)", values: nodes.map((i) => head[i]), sub: nodes.map((i) => `#${i + 1}`), marks, cut: opts.cut },
      ];
      if (opts.linked !== undefined) {
        widgets.push({
          type: "list",
          label: "relinked",
          nodes: nodes.slice(0, opts.linked).map((i, idx) => ({ value: head[i], caption: `#${i + 1}`, mark: opts.pair !== undefined && idx === opts.linked - 1 ? "new" : "" })),
          pointers: { head: 0 },
        });
      }
      return widgets;
    };

    steps.push({ line: "collect", note: "Put every node in an array, so any node can be reached by index.", view: view() });
    head.forEach((_, i) => {
      nodes.push(i);
      steps.push({ line: "collect", note: `Add node ${head[i]}.`, view: view({ at: i, newest: true }) });
    });
    for (let start = 0; start + k <= n; start += k) {
      steps.push({ line: "group", note: `A full group of k = ${k}: positions ${start} to ${start + k - 1}, ${fmt(nodes.slice(start, start + k).map((i) => head[i]))}.`, view: view({ block: [start, start + k] }) });
      nodes = nodes.slice(0, start).concat(nodes.slice(start, start + k).reverse(), nodes.slice(start + k));
      steps.push({ line: "reverse", note: `Reverse that slice of the array: ${fmt(nodes.slice(start, start + k).map((i) => head[i]))}. Only the array changes; the nodes aren't touched yet.`, view: view({ block: [start, start + k], flipped: true }) });
    }
    const tail = n % k;
    if (tail) {
      steps.push({ line: "group", note: `Only ${tail} node${tail === 1 ? "" : "s"} left (${fmt(nodes.slice(n - tail).map((i) => head[i]))}), fewer than k: the loop stops and they keep their order.`, view: view({ cut: n - tail }) });
    }
    for (let i = 0; i + 1 < n; i++) {
      steps.push({ line: "link", note: `nodes[${i}].next = nodes[${i + 1}]: ${head[nodes[i]]} → ${head[nodes[i + 1]]}.`, view: view({ pair: i, linked: i + 2 }) });
    }
    steps.push({
      line: "return",
      note: `The last node's next = null; return nodes[0]: ${fmt(nodes.map((i) => head[i]))}. O(n) time, but the array is O(n) extra space.`,
      view: view({ linked: n }),
    });
    return steps;
  },
});
