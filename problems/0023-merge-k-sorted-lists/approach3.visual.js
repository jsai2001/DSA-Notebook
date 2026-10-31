// Min-heap of the k current heads: pop the smallest, attach it, push the next node from the same list.
DSAViz.register("0023-merge-k-sorted-lists/approach3", {
  inputs: [{ name: "lists", type: "int[][]", jagged: true, value: "[[1, 4, 5], [1, 3, 4], [2, 6]]", maxRows: 4, maxCols: 4, minValue: -99, maxValue: 99 }],
  trace({ lists }) {
    lists.forEach((l, i) => {
      for (let k = 1; k < l.length; k++) {
        if (l[k] < l[k - 1]) throw new DSAViz.InputError(`lists[${i}] must be sorted (non-decreasing), like [1, 4, 5].`);
      }
    });
    const steps = [];
    const fmt = (arr) => `[${arr.join(", ")}]`;
    const pos = lists.map(() => 0); // next node of each list that hasn't entered the heap
    let heap = []; // [{ src, k }], kept ordered by (value, src) for display
    const merged = [];
    const val = (m) => lists[m.src][m.k];
    const order = () => heap.sort((x, y) => val(x) - val(y) || x.src - y.src);
    const inHeap = (src, k) => heap.some((m) => m.src === src && m.k === k);
    // opts.popped: node just taken; opts.pushed: node that just entered the heap
    const view = (opts = {}) => {
      const widgets = lists.map((l, src) => ({
        type: "list",
        label: `lists[${src}]`,
        nodes: l.map((v, k) => {
          let mark = "";
          if (merged.some((m) => m.src === src && m.k === k)) mark = "visited";
          if (inHeap(src, k)) mark = "compare";
          if (opts.popped && opts.popped.src === src && opts.popped.k === k) mark = "active";
          if (opts.pushed && opts.pushed.src === src && opts.pushed.k === k) mark = "new";
          return { value: v, caption: `#${src}`, mark };
        }),
      }));
      if (!lists.length) widgets.push({ type: "vars", items: [{ name: "lists", value: "[] (k = 0)" }] });
      const hmarks = {};
      heap.forEach((m, idx) => {
        if (opts.pushed && m.src === opts.pushed.src && m.k === opts.pushed.k) hmarks[idx] = "new";
      });
      if (opts.top && heap.length) hmarks[0] = "active";
      widgets.push({
        type: "array",
        label: `heap (${heap.length} of at most ${lists.length}, shown smallest first)`,
        values: heap.map(val),
        sub: heap.map((m) => `#${m.src}`),
        marks: hmarks,
      });
      widgets.push({
        type: "list",
        label: "merged (from the dummy)",
        nodes: [{ value: "D", mark: "ghost", caption: "dummy" }].concat(
          merged.map((m, idx) => ({ value: val(m), caption: `#${m.src}`, mark: opts.attached && idx === merged.length - 1 ? "new" : "" }))
        ),
        pointers: { tail: merged.length },
      });
      return widgets;
    };

    steps.push({ line: "init", note: "A dummy node D in front of the answer, and tail on it.", view: view() });
    lists.forEach((l, src) => {
      if (l.length) {
        heap.push({ src, k: 0 });
        pos[src] = 1;
      }
    });
    order();
    const empties = lists.filter((l) => !l.length).length;
    steps.push({
      line: "heads",
      note: heap.length
        ? `Put the head of every non-empty list in a min-heap: ${fmt(heap.map(val))}.${empties ? ` ${empties} empty list${empties === 1 ? " is" : "s are"} skipped.` : ""} The smallest node overall must be one of these.`
        : "No non-empty lists: the heap starts empty.",
      view: view(),
    });
    while (heap.length) {
      steps.push({ line: "pop", note: `The heap's top is the smallest current head: ${val(heap[0])} from lists[${heap[0].src}].`, view: view({ top: true }) });
      const node = heap.shift();
      merged.push(node);
      steps.push({ line: "attach", note: `Pop it and attach it: tail.next = ${val(node)}, tail moves onto it.`, view: view({ popped: node, attached: true }) });
      if (node.k + 1 < lists[node.src].length) {
        const next = { src: node.src, k: node.k + 1 };
        heap.push(next);
        order();
        steps.push({
          line: "push",
          note: `lists[${node.src}] has a next node, ${val(next)}: push it so its list stays in the race. The heap never holds more than k nodes.`,
          view: view({ pushed: next }),
        });
      } else {
        steps.push({ line: "push", note: `lists[${node.src}] is used up: nothing to push.`, view: view() });
      }
    }
    steps.push({
      line: "return",
      note: merged.length
        ? `The heap is empty: return dummy.next = ${fmt(merged.map(val))}. Each of the N nodes was pushed and popped once at O(log k): O(N log k).`
        : "The heap is empty from the start: return dummy.next, which is null.",
      view: view(),
    });
    return steps;
  },
});
