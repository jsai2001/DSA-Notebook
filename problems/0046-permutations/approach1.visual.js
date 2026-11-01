// Backtracking with a used array: fill the path one position at a time with any number not used yet.
DSAViz.register("0046-permutations/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 2, 3]", minLength: 1, maxLength: 4, minValue: -10, maxValue: 10 }],
  trace({ nums }) {
    if (new Set(nums).size !== nums.length) throw new DSAViz.InputError("The numbers must all be different.");
    const steps = [];
    const result = [];
    const path = [];
    const used = nums.map(() => false);
    const fmt = (a) => `[${a.join(", ")}]`;
    const view = (i, opts = {}) => {
      const marks = {};
      used.forEach((u, k) => u && (marks[k] = "visited"));
      if (i !== undefined) marks[i] = opts.skip ? "cut" : "active";
      return [
        { type: "array", label: "nums (faded = used in path)", values: nums, marks, pointers: i !== undefined ? { i } : {} },
        { type: "array", label: "path", values: path.slice(), marks: opts.done ? Object.fromEntries(path.map((_, k) => [k, "match"])) : opts.added ? { [path.length - 1]: "new" } : {} },
        { type: "array", label: `result (${result.length} of ${[...Array(nums.length).keys()].reduce((p, k) => p * (k + 1), 1)})`, values: result.map(fmt), wide: true, marks: opts.done ? { [result.length - 1]: "new" } : {} },
      ];
    };

    steps.push({ line: "init", note: "Fill the path one position at a time. used[i] remembers which numbers are already in it.", view: view() });
    function backtrack() {
      if (path.length === nums.length) {
        result.push(path.slice());
        steps.push({ line: ["call", "done"], note: `Every position is filled: ${fmt(path)}. Add a copy to result.`, view: view(undefined, { done: true }) });
        return;
      }
      steps.push({ line: "call", note: `Position ${path.length}: try each number that isn't in the path yet.`, view: view() });
      for (let i = 0; i < nums.length; i++) {
        if (used[i]) {
          steps.push({ line: "skip", note: `${nums[i]} is already in the path: skip it.`, view: view(i, { skip: true }) });
          continue;
        }
        used[i] = true;
        path.push(nums[i]);
        steps.push({ line: "choose", note: `Put ${nums[i]} at position ${path.length - 1}: path = ${fmt(path)}. Go deeper.`, view: view(i, { added: true }) });
        backtrack();
        path.pop();
        used[i] = false;
        steps.push({ line: "undo", note: `Back: take ${nums[i]} out again, path = ${fmt(path)}, so the next number can try this position.`, view: view(i) });
      }
    }
    backtrack();
    steps.push({
      line: "return",
      note: `Return all ${result.length} permutations. n! of them, each copied in O(n), plus the "is it used?" checks: O(n · n!).`,
      view: view(),
    });
    return steps;
  },
});
