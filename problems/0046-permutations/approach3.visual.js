// Insertion: the permutations of k + 1 numbers are those of k numbers with the new one put in every gap.
DSAViz.register("0046-permutations/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 2, 3]", minLength: 1, maxLength: 4, minValue: -10, maxValue: 10 }],
  trace({ nums }) {
    if (new Set(nums).size !== nums.length) throw new DSAViz.InputError("The numbers must all be different.");
    const steps = [];
    let perms = [[]];
    let grown = [];
    const fmt = (a) => `[${a.join(", ")}]`;
    const view = (xi, opts = {}) => {
      const marks = {};
      if (xi !== undefined) {
        for (let k = 0; k < xi; k++) marks[k] = "visited";
        marks[xi] = "active";
      } else if (opts.all) nums.forEach((_, k) => (marks[k] = "visited"));
      const pmarks = {};
      if (opts.from !== undefined) pmarks[opts.from] = "compare";
      const gmarks = {};
      if (opts.fresh) for (let k = grown.length - opts.fresh; k < grown.length; k++) gmarks[k] = "new";
      return [
        { type: "array", label: "nums", values: nums, marks, pointers: xi !== undefined ? { x: xi } : {} },
        { type: "array", label: `perms (${perms.length})`, values: perms.map(fmt), wide: true, marks: pmarks },
        ...(xi !== undefined ? [{ type: "array", label: `grown (${grown.length})`, values: grown.map(fmt), wide: true, marks: gmarks }] : []),
      ];
    };

    steps.push({ line: "init", note: "Start with one empty permutation: the only arrangement of no numbers.", view: view() });
    nums.forEach((x, xi) => {
      grown = [];
      steps.push({ line: "next", note: `Add ${x}. Each of the ${perms.length} permutation${perms.length === 1 ? "" : "s"} so far has ${xi + 1} gap${xi ? "s" : ""} to put it in.`, view: view(xi) });
      perms.forEach((p, pi) => {
        const made = [];
        for (let pos = 0; pos <= p.length; pos++) made.push(p.slice(0, pos).concat([x], p.slice(pos)));
        grown.push(...made);
        steps.push({
          line: "insert",
          note: `${fmt(p)} with ${x} in each of its ${p.length + 1} gap${p.length ? "s" : ""}: ${made.map(fmt).join(", ")}.`,
          view: view(xi, { from: pi, fresh: made.length }),
        });
      });
      perms = grown;
      steps.push({ line: "next", note: `${xi + 1} number${xi ? "s" : ""}: ${perms.length} permutations (${xi + 1}!).`, view: view(xi) });
    });
    steps.push({
      line: "return",
      note: `Return all ${perms.length}. No recursion, but every round builds a whole new list, so it keeps (n − 1)! permutations around while making n!.`,
      view: view(undefined, { all: true }),
    });
    return steps;
  },
});
