// Collect every node from all k lists, sort them by value, and relink the same nodes in that order.
DSAViz.register("0023-merge-k-sorted-lists/approach1", {
  inputs: [{ name: "lists", type: "int[][]", jagged: true, value: "[[1, 4, 5], [1, 3, 4], [2, 6]]", maxRows: 4, maxCols: 4, minValue: -99, maxValue: 99 }],
  trace({ lists }) {
    lists.forEach((l, i) => {
      for (let k = 1; k < l.length; k++) {
        if (l[k] < l[k - 1]) throw new DSAViz.InputError(`lists[${i}] must be sorted (non-decreasing), like [1, 4, 5].`);
      }
    });
    const steps = [];
    const fmt = (arr) => `[${arr.join(", ")}]`;
    let nodes = []; // [{ src, k }]
    const val = (m) => lists[m.src][m.k];
    const view = (opts = {}) => {
      const widgets = lists.map((l, src) => ({
        type: "list",
        label: `lists[${src}]`,
        nodes: l.map((v, k) => ({ value: v, caption: `#${src}`, mark: opts.at && opts.at[0] === src && opts.at[1] === k ? "active" : "" })),
        pointers: opts.at && opts.at[0] === src ? { node: opts.at[1] } : {},
      }));
      if (!lists.length) widgets.push({ type: "vars", items: [{ name: "lists", value: "[] (k = 0)" }] });
      const marks = {};
      if (opts.newest) marks[nodes.length - 1] = "new";
      if (opts.pair !== undefined) {
        marks[opts.pair] = "active";
        marks[opts.pair + 1] = "active";
      }
      if (opts.sorted) nodes.forEach((_, idx) => (marks[idx] = "match"));
      widgets.push({ type: "array", label: "nodes array (source list underneath)", values: nodes.map(val), sub: nodes.map((m) => `#${m.src}`), marks });
      if (opts.linked !== undefined) {
        widgets.push({
          type: "list",
          label: "relinked",
          nodes: nodes.slice(0, opts.linked).map((m, idx) => ({ value: val(m), caption: `#${m.src}`, mark: idx === opts.linked - 1 && opts.pair !== undefined ? "new" : "" })),
          pointers: opts.linked ? { head: 0 } : {},
        });
      }
      return widgets;
    };

    steps.push({ line: "collect", note: `Walk all ${lists.length} list${lists.length === 1 ? "" : "s"} and put every node in one array.`, view: view() });
    lists.forEach((list, src) =>
      list.forEach((v, k) => {
        nodes.push({ src, k });
        steps.push({ line: "collect", note: `Add lists[${src}]'s node ${v}.`, view: view({ at: [src, k], newest: true }) });
      })
    );
    nodes = nodes.slice().sort((x, y) => val(x) - val(y));
    steps.push({
      line: "sort",
      note: nodes.length ? `Sort all ${nodes.length} nodes by value: ${fmt(nodes.map(val))}.` : "There are no nodes to sort.",
      view: view({ sorted: true }),
    });
    for (let k = 0; k + 1 < nodes.length; k++) {
      steps.push({
        line: "link",
        note: `nodes[${k}].next = nodes[${k + 1}]: ${val(nodes[k])} → ${val(nodes[k + 1])}.`,
        view: view({ pair: k, linked: k + 2 }),
      });
    }
    steps.push({
      line: "return",
      note: nodes.length
        ? `Set the last node's next to null and return nodes[0]: ${fmt(nodes.map(val))}. Sorting all N nodes costs O(N log N) and ignores that each list was already sorted.`
        : `No nodes at all (${lists.length ? "only empty lists" : "no lists"}): return null.`,
      view: view({ linked: nodes.length }),
    });
    return steps;
  },
});
