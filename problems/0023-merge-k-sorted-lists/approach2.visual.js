// Merge one list at a time into a growing answer, using Merge Two Sorted Lists each time.
DSAViz.register("0023-merge-k-sorted-lists/approach2", {
  inputs: [{ name: "lists", type: "int[][]", jagged: true, value: "[[1, 4, 5], [1, 3, 4], [2, 6]]", maxRows: 4, maxCols: 4, minValue: -99, maxValue: 99 }],
  trace({ lists }) {
    lists.forEach((l, i) => {
      for (let k = 1; k < l.length; k++) {
        if (l[k] < l[k - 1]) throw new DSAViz.InputError(`lists[${i}] must be sorted (non-decreasing), like [1, 4, 5].`);
      }
    });
    const steps = [];
    const fmt = (arr) => `[${arr.join(", ")}]`;
    let result = []; // [{ value, src }]
    let work = 0;
    // merge two runs the way mergeTwo does (ties go to the answer so far, a)
    const mergeTwo = (a, b) => {
      const out = [];
      let i = 0;
      let j = 0;
      while (i < a.length && j < b.length) out.push(a[i].value <= b[j].value ? a[i++] : b[j++]);
      return out.concat(a.slice(i), b.slice(j));
    };
    const view = (opts = {}) => {
      const widgets = lists.map((l, src) => ({
        type: "list",
        label: `lists[${src}]${opts.done !== undefined && src < opts.done ? " (merged in)" : ""}`,
        nodes: l.map((v) => ({
          value: v,
          caption: `#${src}`,
          mark: src === opts.next ? "active" : opts.done !== undefined && src < opts.done ? "visited" : "",
        })),
        pointers: src === opts.next ? { head: 0 } : {},
      }));
      if (!lists.length) widgets.push({ type: "vars", items: [{ name: "lists", value: "[] (k = 0)" }] });
      widgets.push({
        type: "list",
        label: `result (${result.length} node${result.length === 1 ? "" : "s"})`,
        nodes: result.map((m) => ({ value: m.value, caption: `#${m.src}`, mark: m.src === opts.fresh ? "new" : "" })),
        pointers: { result: 0 }, // on an empty answer this points at null
      });
      widgets.push({ type: "vars", items: [{ name: "work so far", value: `${work} node${work === 1 ? "" : "s"}` }] });
      return widgets;
    };

    steps.push({
      line: "init",
      note: `Start with an empty answer. "work" adds up the nodes in both lists of every merge: that's how much each mergeTwo can walk.`,
      view: view({ done: 0 }),
    });
    lists.forEach((l, src) => {
      steps.push({
        line: "each",
        note: `Next is lists[${src}] = ${fmt(l)}. It gets merged with the whole answer so far (${result.length} node${result.length === 1 ? "" : "s"}).`,
        view: view({ next: src, done: src }),
      });
      const cost = result.length + l.length;
      work += cost;
      result = mergeTwo(result, l.map((value) => ({ value, src })));
      steps.push({
        line: "merge",
        note: `mergeTwo(result, lists[${src}]) → ${fmt(result.map((m) => m.value))}. This merge had ${cost} node${cost === 1 ? "" : "s"} to go through.`,
        view: view({ fresh: src, done: src + 1 }),
      });
    });
    steps.push({
      line: "return",
      note: lists.length && !result.length
        ? "Every list was empty, so result is still null: return null."
        : lists.length
        ? `Return result: ${fmt(result.map((m) => m.value))}. The early nodes get walked again in every later merge, so the work grows like k · N.`
        : "No lists: the loop never runs, so return null.",
      view: view({ done: lists.length }),
    });
    return steps;
  },
});
