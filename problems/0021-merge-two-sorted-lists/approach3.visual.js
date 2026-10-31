// Iterative merge: a dummy node, a tail pointer, and always take the smaller head.
DSAViz.register("0021-merge-two-sorted-lists/approach3", {
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
    let i = 0;
    let j = 0;
    const merged = []; // [{ src: 0 | 1, k }]
    const fmt = (arr) => `[${arr.join(", ")}]`;
    const mergedValues = () => merged.map((m) => lists[m.src][m.k]);
    // opts.compare: highlight both heads; opts.took: the node just attached; opts.tailNew: tail sits on the newest node
    const view = (opts = {}) => {
      const source = (src, at) =>
        lists[src].map((v, k) => {
          let mark = "";
          if (k < at) mark = "visited";
          if (opts.compare && k === at) mark = "compare";
          if (opts.took && opts.took.src === src && opts.took.k === k) mark = "match";
          return { value: v, caption: `list${src + 1}`, mark };
        });
      const out = [{ value: "D", mark: "ghost", caption: "dummy" }].concat(
        merged.map((m, idx) => ({
          value: lists[m.src][m.k],
          caption: `list${m.src + 1}`,
          mark: idx >= (opts.newFrom ?? merged.length) ? "new" : "",
        }))
      );
      return [
        { type: "list", label: "list1", nodes: source(0, i), pointers: { list1: i } },
        { type: "list", label: "list2", nodes: source(1, j), pointers: { list2: j } },
        { type: "list", label: "merged (from the dummy)", nodes: out, pointers: { tail: opts.tail ?? merged.length } },
      ];
    };

    steps.push({ line: "init", note: "Put a dummy node D in front of the answer and start tail on it.", view: view({ tail: 0 }) });
    while (i < list1.length && j < list2.length) {
      const a = list1[i];
      const b = list2[j];
      steps.push({ line: "loop", note: `Both lists still have nodes: compare ${a} and ${b}.`, view: view({ compare: true }) });
      const left = a <= b;
      steps.push({
        line: "pick",
        note: left
          ? `${a} ≤ ${b}${a === b ? " (a tie goes to list1)" : ""}, so list1's node comes next.`
          : `${a} > ${b}, so list2's node comes next.`,
        view: view({ compare: true }),
      });
      const took = left ? { src: 0, k: i } : { src: 1, k: j };
      merged.push(took);
      if (left) i++;
      else j++;
      steps.push({
        line: left ? "left" : "right",
        note: `tail.next = ${left ? "list1" : "list2"} (${left ? a : b}), then ${left ? "list1" : "list2"} moves to its next node.`,
        view: view({ took, newFrom: merged.length - 1, tail: merged.length - 1 }),
      });
      steps.push({ line: "advance", note: `tail moves onto ${left ? a : b}, the last node of the answer so far.`, view: view({ newFrom: merged.length - 1 }) });
    }
    const done = i < list1.length ? "list2" : "list1";
    steps.push({
      line: "loop",
      note:
        !list1.length && !list2.length
          ? "Both lists are empty: the loop never runs."
          : `${i === list1.length && j === list2.length ? "Both lists are" : done + " is"} used up: stop comparing.`,
      view: view(),
    });
    const before = merged.length;
    const restSrc = i < list1.length ? 0 : 1;
    const restFrom = restSrc === 0 ? i : j;
    const rest = lists[restSrc].slice(restFrom);
    rest.forEach((_, d) => merged.push({ src: restSrc, k: restFrom + d }));
    if (restSrc === 0) i = list1.length;
    else j = list2.length;
    steps.push({
      line: "rest",
      note: rest.length
        ? `Attach what's left of list${restSrc + 1} in one step: ${fmt(rest)}. It's already sorted, and every value is ≥ the tail.`
        : "Nothing is left in either list: tail.next = null.",
      view: view({ newFrom: before, tail: before }),
    });
    steps.push({
      line: "return",
      note: `Return dummy.next: ${fmt(mergedValues())}. Each node was linked once: O(m + n) time, O(1) extra space.`,
      view: view(),
    });
    return steps;
  },
});
