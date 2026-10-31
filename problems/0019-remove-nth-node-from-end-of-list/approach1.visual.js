// Two passes: count the length, then walk length - n steps from a dummy node and skip the next node.
DSAViz.register("0019-remove-nth-node-from-end-of-list/approach1", {
  inputs: [
    { name: "head", type: "int[]", value: "[1, 2, 3, 4, 5]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 100 },
    { name: "n", type: "int", value: "2", min: 1, max: 8 },
  ],
  trace({ head, n }) {
    const L = head.length;
    if (n > L) throw new DSAViz.InputError(`n must be between 1 and the list length (${L}).`);
    const steps = [];
    const target = L - n; // index in head of the node to remove
    // List view with a dummy at index 0; real node k is list index k + 1.
    const view = (opts = {}) => {
      const nodes = [{ value: "D", mark: "ghost", caption: "dummy" }].concat(
        head.map((v, k) => ({
          value: v,
          caption: `${L - k} from end`,
          mark: opts.removed && k === target ? "cut" : opts.target && k === target ? "compare" : opts.counted !== undefined && k < opts.counted ? "visited" : "",
        }))
      );
      const shown = opts.removed ? nodes.filter((_, i) => i !== target + 1) : nodes;
      const pointers = {};
      Object.entries(opts.pointers || {}).forEach(([name, i]) => {
        pointers[name] = opts.removed && i > target + 1 ? i - 1 : i;
      });
      return [
        { type: "list", label: opts.removed ? "list (after removing the target)" : "list (dummy in front)", nodes: shown, pointers },
        { type: "vars", items: [{ name: "length", value: opts.length === undefined ? "–" : opts.length }, { name: "n", value: n }] },
      ];
    };
    let length = 0;
    steps.push({ line: "count", note: `First pass: walk the whole list to count it.`, view: view({ pointers: { node: 1 }, counted: 0, length }) });
    for (let k = 0; k < L; k++) {
      length++;
      steps.push({ line: "count", note: `Count node ${head[k]}: length = ${length}.`, view: view({ pointers: { node: k + 2 }, counted: k + 1, length }) });
    }
    steps.push({
      line: "dummy",
      note: `length = ${L}. The ${n}${n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"} from the end is node #${target + 1} from the start. Put a dummy in front so prev can stop just before it, even when it's the head.`,
      view: view({ pointers: { prev: 0 }, length, target: true }),
    });
    for (let k = 0; k < target; k++) {
      steps.push({
        line: "walk",
        note: `Second pass, step ${k + 1} of ${target} (length - n = ${L} - ${n}): prev moves to ${head[k]}.`,
        view: view({ pointers: { prev: k + 1 }, length, target: true }),
      });
    }
    if (target === 0) {
      steps.push({ line: "walk", note: `length - n = 0: prev stays on the dummy, because the target is the head.`, view: view({ pointers: { prev: 0 }, length, target: true }) });
    }
    steps.push({
      line: "unlink",
      note: `prev.next = prev.next.next: skip ${head[target]}.` + (target === 0 ? ` The head is gone, so the answer starts at dummy.next.` : ""),
      view: view({ pointers: { prev: target }, length, removed: true }),
    });
    const rest = head.filter((_, k) => k !== target);
    steps.push({
      line: "return",
      note: `Return dummy.next: [${rest.join(", ")}]. Two passes over the list: O(L) time, O(1) extra space.`,
      view: view({ length, removed: true }),
    });
    return steps;
  },
});
