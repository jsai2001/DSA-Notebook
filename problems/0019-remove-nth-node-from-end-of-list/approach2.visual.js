// Stack: push every node (dummy first), pop n, and the top is the node just before the target.
DSAViz.register("0019-remove-nth-node-from-end-of-list/approach2", {
  inputs: [
    { name: "head", type: "int[]", value: "[1, 2, 3, 4, 5]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 100 },
    { name: "n", type: "int", value: "2", min: 1, max: 8 },
  ],
  trace({ head, n }) {
    const L = head.length;
    if (n > L) throw new DSAViz.InputError(`n must be between 1 and the list length (${L}).`);
    const steps = [];
    const target = L - n;
    const labels = ["dummy", ...head.map(String)];
    let stack = [];
    const view = (opts = {}) => {
      const nodes = [{ value: "D", mark: "ghost", caption: "dummy" }].concat(
        head.map((v, k) => ({ value: v, caption: `${L - k} from end`, mark: opts.removed && k === target ? "cut" : opts.target && k === target ? "compare" : "" }))
      );
      const shown = opts.removed ? nodes.filter((_, i) => i !== target + 1) : nodes;
      const smarks = {};
      if (stack.length) smarks[stack.length - 1] = opts.topPrev ? "match" : "active";
      return [
        { type: "list", label: "list", nodes: shown, pointers: opts.pointers || {} },
        { type: "array", label: "stack (bottom → top)", values: stack.map((i) => labels[i]), wide: true, marks: smarks },
        ...(opts.popped !== undefined ? [{ type: "vars", items: [{ name: "popped", value: opts.popped }] }] : []),
      ];
    };
    steps.push({ line: "dummy", note: `Put a dummy in front of the head, then push every node onto a stack.`, view: view() });
    for (let i = 0; i <= L; i++) {
      stack.push(i);
      steps.push({ line: "push", note: `Push ${labels[i]}.`, view: view({ pointers: { node: i } }) });
    }
    const popped = [];
    for (let k = 0; k < n; k++) {
      popped.push(labels[stack.pop()]);
      steps.push({
        line: "pop",
        note: `Pop ${popped[popped.length - 1]} (${k + 1} of ${n}).` + (k === n - 1 ? ` That was the ${n}${n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"} from the end: the target.` : ""),
        view: view({ popped: popped.join(", "), target: k === n - 1 }),
      });
    }
    steps.push({
      line: "unlink",
      note: `The top of the stack, ${labels[stack[stack.length - 1]]}, is just before the target: prev.next = prev.next.next skips ${head[target]}.`,
      view: view({ pointers: { prev: target }, removed: true, topPrev: true }),
    });
    steps.push({
      line: "return",
      note: `Return dummy.next: [${head.filter((_, k) => k !== target).join(", ")}]. One pass, but the stack holds every node: O(L) extra space.`,
      view: view({ removed: true }),
    });
    return steps;
  },
});
