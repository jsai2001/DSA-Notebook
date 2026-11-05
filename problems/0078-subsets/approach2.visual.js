// Start index: record path at every call, then extend it only with numbers after the last one taken.
DSAViz.register("0078-subsets/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 2, 3]", minLength: 1, maxLength: 4, minValue: -10, maxValue: 10 }],
  trace({ nums }) {
    if (new Set(nums).size !== nums.length) throw new DSAViz.InputError("The numbers must all be different.");
    const n = nums.length;
    const steps = [];
    const result = [];
    const path = [];
    const taken = [];
    const fmt = (a) => `[${a.join(", ")}]`;
    const view = (start, i, o = {}) => {
      const marks = {};
      taken.forEach((k) => (marks[k] = "match"));
      for (let k = 0; k < start; k++) if (!taken.includes(k)) marks[k] = "ghost"; // can't come next
      if (i !== undefined) marks[i] = "active";
      const pointers = {};
      if (start !== undefined && start < n) pointers.start = start;
      if (i !== undefined) pointers.i = i;
      return [
        { type: "array", label: "nums (green = in path, faded = before start: can't come next)", values: nums, marks, pointers },
        { type: "array", label: "path", values: path.slice(), marks: o.recorded ? Object.fromEntries(path.map((_, k) => [k, "match"])) : o.added ? { [path.length - 1]: "new" } : {} },
        { type: "array", label: `result (${result.length} of ${2 ** n})`, values: result.map(fmt), wide: true, marks: o.recorded ? { [result.length - 1]: "new" } : {} },
      ];
    };
    steps.push({ line: "init", note: "Every path is a subset. Record it, then extend it with each later number in turn.", view: view(0) });
    function backtrack(start) {
      result.push(path.slice());
      steps.push({
        line: ["call", "record"],
        note: `Record ${fmt(path)}${path.length ? "" : " (the empty subset counts)"}.${start < n ? ` Next number: one of nums[${start}..${n - 1}].` : " Nothing after it to add."}`,
        view: view(start, undefined, { recorded: true }),
      });
      for (let i = start; i < n; i++) {
        path.push(nums[i]);
        taken.push(i);
        steps.push({ line: "choose", note: `Add ${nums[i]}: path = ${fmt(path)}. Recurse on ${i + 1}, so only numbers after ${nums[i]} can follow.`, view: view(start, i, { added: true }) });
        backtrack(i + 1);
        path.pop();
        taken.pop();
        steps.push({ line: "undo", note: `Pop ${nums[i]}: path = ${fmt(path)}. ${i + 1 < n ? `Try ${nums[i + 1]} in its place.` : "No more numbers to try here."}`, view: view(start, i) });
      }
    }
    backtrack(0);
    steps.push({ line: "return", note: `Return all ${result.length}. One call per subset, no dead ends: O(n · 2ⁿ) with the copies.`, view: view(n) });
    return steps;
  },
});
