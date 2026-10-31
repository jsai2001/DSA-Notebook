// Collect every node into an array, stable-sort it by value, and relink the same nodes in that order.
DSAViz.register("0021-merge-two-sorted-lists/approach1", {
  inputs: [
    { name: "list1", type: "int[]", value: "[1, 2, 4]", minLength: 0, maxLength: 8, minValue: -99, maxValue: 99 },
    { name: "list2", type: "int[]", value: "[1, 3, 4]", minLength: 0, maxLength: 8, minValue: -99, maxValue: 99 },
  ],
  trace({ list1, list2 }) {
    for (const [name, v] of [["list1", list1], ["list2", list2]]) {
      for (let k = 1; k < v.length; k++) {
        if (v[k] < v[k - 1]) throw new DSAViz.InputError(`${name} must be sorted (non-decreasing), like [1, 2, 4].`);
      }
    }
    const lists = [list1, list2];
    const steps = [];
    const fmt = (arr) => `[${arr.join(", ")}]`;
    let nodes = []; // [{ src, k }]
    const val = (m) => lists[m.src][m.k];
    // opts.at: [src, k] of the node being read; opts.linked: how many array cells are joined so far
    const view = (opts = {}) => {
      const source = (src) => {
        const at = opts.at && opts.at[0] === src ? opts.at[1] : undefined;
        return {
          type: "list",
          label: `list${src + 1}`,
          nodes: lists[src].map((v, k) => ({ value: v, caption: `list${src + 1}`, mark: k === at ? "active" : "" })),
          pointers: at === undefined ? {} : { node: at },
        };
      };
      const marks = {};
      if (opts.newest) marks[nodes.length - 1] = "new";
      if (opts.pair !== undefined) {
        marks[opts.pair] = "active";
        marks[opts.pair + 1] = "active";
      }
      if (opts.sorted) nodes.forEach((_, idx) => (marks[idx] = marks[idx] || "match"));
      const widgets = [
        source(0),
        source(1),
        { type: "array", label: "nodes array (source list underneath)", values: nodes.map(val), sub: nodes.map((m) => `list${m.src + 1}`), marks },
      ];
      if (opts.linked !== undefined) {
        widgets.push({
          type: "list",
          label: "relinked",
          nodes: nodes.slice(0, opts.linked).map((m, idx) => ({ value: val(m), caption: `list${m.src + 1}`, mark: idx === opts.linked - 1 && opts.pair !== undefined ? "new" : "" })),
          pointers: opts.linked ? { head: 0 } : {},
        });
      }
      return widgets;
    };

    steps.push({ line: "collect", note: "Walk list1, then list2, and put every node in one array.", view: view() });
    lists.forEach((list, src) =>
      list.forEach((v, k) => {
        nodes.push({ src, k });
        steps.push({ line: "collect", note: `Add list${src + 1}'s node ${v}.`, view: view({ at: [src, k], newest: true }) });
      })
    );
    // Array.prototype.sort is stable, like Python's sort, std::stable_sort and Java's List.sort
    nodes = nodes.slice().sort((x, y) => val(x) - val(y));
    steps.push({
      line: "sort",
      note: nodes.length
        ? `Sort the nodes by value: ${fmt(nodes.map(val))}. The sort is stable, so on a tie list1's node stays first.`
        : "There are no nodes to sort.",
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
        ? `Set the last node's next to null and return nodes[0]: ${fmt(nodes.map(val))}. The sort ignores that both lists were already sorted: O((m + n) log(m + n)) time, O(m + n) space.`
        : "Both lists were empty: return null.",
      view: view({ linked: nodes.length }),
    });
    return steps;
  },
});
