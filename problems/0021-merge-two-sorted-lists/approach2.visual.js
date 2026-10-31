// Recursive merge: the smaller head goes first, and its next is the merge of everything after it.
DSAViz.register("0021-merge-two-sorted-lists/approach2", {
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
    const head = (src, at) => (at < lists[src].length ? String(lists[src][at]) : "null");
    const frames = []; // calls still waiting for their answer: { i, j, src }
    let returned = null; // [{ src, k }] once the recursion starts to unwind
    const view = (i, j, opts = {}) => {
      const source = (src, at) =>
        lists[src].map((v, k) => {
          let mark = "";
          if (k < at) mark = "visited";
          if (opts.compare && k === at) mark = "compare";
          if (opts.took && opts.took.src === src && opts.took.k === k) mark = "match";
          return { value: v, caption: `list${src + 1}`, mark };
        });
      const calls = frames.map((f) => `(${head(0, f.i)}, ${head(1, f.j)})`);
      if (opts.current) calls.push(`(${head(0, i)}, ${head(1, j)})`);
      const widgets = [
        { type: "list", label: "list1", nodes: source(0, i), pointers: { list1: i } },
        { type: "list", label: "list2", nodes: source(1, j), pointers: { list2: j } },
        { type: "array", label: "call stack: merge(list1, list2), newest on the right", values: calls, wide: true, marks: calls.length ? { [calls.length - 1]: "active" } : {} },
      ];
      if (returned) {
        widgets.push({
          type: "list",
          label: "returned so far",
          nodes: returned.map((m, idx) => ({ value: lists[m.src][m.k], caption: `list${m.src + 1}`, mark: idx === 0 && opts.fresh ? "new" : "" })),
          pointers: returned.length ? { head: 0 } : {},
        });
      }
      return widgets;
    };

    let i = 0;
    let j = 0;
    for (;;) {
      if (i === list1.length || j === list2.length) {
        const src = i === list1.length ? 1 : 0;
        const from = src === 0 ? i : j;
        returned = lists[src].slice(from).map((_, d) => ({ src, k: from + d }));
        const empty = i === list1.length ? "list1" : "list2";
        steps.push({
          line: "base",
          note: returned.length
            ? `${empty} is null: return list${src + 1} as it is, ${fmt(lists[src].slice(from))}.`
            : "Both lists are null: return null.",
          view: view(i, j, { current: true, fresh: true }),
        });
        break;
      }
      const a = list1[i];
      const b = list2[j];
      const left = a <= b;
      steps.push({
        line: "pick",
        note: left
          ? `${a} ≤ ${b}${a === b ? " (a tie goes to list1)" : ""}: list1's node is first.`
          : `${a} > ${b}: list2's node is first.`,
        view: view(i, j, { current: true, compare: true }),
      });
      frames.push({ i, j, src: left ? 0 : 1 });
      steps.push({
        line: left ? "left" : "right",
        note: `Its next is the merge of the rest: call merge(${left ? "list1.next" : "list1"}, ${left ? "list2" : "list2.next"}).`,
        view: view(left ? i + 1 : i, left ? j : j + 1, { current: true, took: left ? { src: 0, k: i } : { src: 1, k: j } }),
      });
      if (left) i++;
      else j++;
    }
    const depth = frames.length + 1;
    while (frames.length) {
      const f = frames.pop();
      const took = f.src === 0 ? { src: 0, k: f.i } : { src: 1, k: f.j };
      returned = [took].concat(returned);
      const v = lists[took.src][took.k];
      steps.push({
        line: f.src === 0 ? "left" : "right",
        note: `Back in merge(${head(0, f.i)}, ${head(1, f.j)}): set ${v}.next to the returned list and return ${v}: ${fmt(returned.map((m) => lists[m.src][m.k]))}.`,
        view: view(f.i, f.j, { current: true, took, fresh: true }),
      });
    }
    // the outermost call's return is the answer
    steps[steps.length - 1].note += ` That's the answer. The stack went ${depth} call${depth === 1 ? "" : "s"} deep: O(m + n) space.`;
    return steps;
  },
});
