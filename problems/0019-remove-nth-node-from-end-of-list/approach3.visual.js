// One pass, two pointers: fast starts n + 1 steps ahead of slow; when fast falls off the end, slow is just before the target.
DSAViz.register("0019-remove-nth-node-from-end-of-list/approach3", {
  inputs: [
    { name: "head", type: "int[]", value: "[1, 2, 3, 4, 5]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 100 },
    { name: "n", type: "int", value: "2", min: 1, max: 8 },
  ],
  trace({ head, n }) {
    const L = head.length;
    if (n > L) throw new DSAViz.InputError(`n must be between 1 and the list length (${L}).`);
    const steps = [];
    const target = L - n;
    // list index: 0 = dummy, k + 1 = head[k], L + 1 = null
    const view = (fast, slow, opts = {}) => {
      const nodes = [{ value: "D", mark: "ghost", caption: "dummy" }].concat(
        head.map((v, k) => {
          const i = k + 1;
          let mark = "";
          if (opts.removed && k === target) mark = "cut";
          else if (opts.target && k === target) mark = "compare";
          else if (fast !== undefined && i > slow && i < fast) mark = "window";
          return { value: v, caption: `${L - k} from end`, mark };
        })
      );
      const shown = opts.removed ? nodes.filter((_, i) => i !== target + 1) : nodes;
      const fix = (i) => (opts.removed && i > target + 1 ? i - 1 : i);
      const pointers = {};
      if (fast !== undefined) {
        if (fast === slow) pointers["fast, slow"] = fix(fast);
        else {
          pointers.fast = fix(fast);
          pointers.slow = fix(slow);
        }
      }
      const gap = fast !== undefined ? Math.max(0, fast - slow - 1) : undefined;
      return [
        { type: "list", label: "list (shaded = the nodes between slow and fast)", nodes: shown, pointers },
        { type: "vars", items: [{ name: "n", value: n }, { name: "nodes between", value: gap === undefined ? "–" : gap, mark: gap === n ? "match" : "" }] },
      ];
    };
    let fast = 0;
    let slow = 0;
    steps.push({ line: "dummy", note: `Put a dummy in front and start fast and slow on it.`, view: view(fast, slow) });
    for (let k = 0; k <= n; k++) {
      fast++;
      steps.push({
        line: "gap",
        note: `Move fast ahead (${k + 1} of n + 1 = ${n + 1}).` + (k === n ? ` Now there are exactly n = ${n} nodes between slow and fast.` : ""),
        view: view(fast, slow),
      });
    }
    while (fast <= L) {
      fast++;
      slow++;
      steps.push({
        line: "move",
        note: fast > L
          ? `Move both: fast is now past the end (null). The gap kept n = ${n} nodes between them, so slow is just before the ${n}${n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"} from the end.`
          : `Move both one step. The gap stays the same.`,
        view: view(fast, slow, { target: fast > L }),
      });
    }
    if (slow === 0) {
      steps.push({ line: "move", note: `fast already fell off the end, so slow never moved: the target is the head, and slow is on the dummy.`, view: view(fast, slow, { target: true }) });
    }
    steps.push({
      line: "unlink",
      note: `slow.next = slow.next.next: skip ${head[target]}.` + (target === 0 ? ` The head is gone, so the answer starts at dummy.next.` : ""),
      view: view(fast, slow, { removed: true }),
    });
    steps.push({
      line: "return",
      note: `Return dummy.next: [${head.filter((_, k) => k !== target).join(", ")}]. One pass, O(1) extra space.`,
      view: view(undefined, undefined, { removed: true }),
    });
    return steps;
  },
});
