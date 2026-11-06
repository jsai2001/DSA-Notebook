// Sort, then start-index backtracking; in each loop, a number equal to the one before it is skipped.
DSAViz.register("0090-subsets-ii/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, 1, 2]", minLength: 1, maxLength: 5, minValue: -10, maxValue: 10 }],
  trace({ nums: given }) {
    const nums = [...given].sort((a, b) => a - b);
    const n = nums.length;
    const total = Object.values(nums.reduce((c, x) => ((c[x] = (c[x] || 0) + 1), c), {})).reduce((p, k) => p * (k + 1), 1);
    const steps = [];
    const result = [];
    const path = [];
    const taken = [];
    const fmt = (a) => `[${a.join(", ")}]`;
    const view = (start, i, o = {}) => {
      const marks = {};
      taken.forEach((k) => (marks[k] = "match"));
      for (let k = 0; k < start; k++) if (!taken.includes(k)) marks[k] = "ghost"; // can't come next
      if (i !== undefined) marks[i] = o.skip ? "cut" : "active";
      const pointers = {};
      if (start !== undefined && start < n) pointers.start = start;
      if (i !== undefined) pointers.i = i;
      return [
        { type: "array", label: "nums, sorted (green = in path, faded = before start, red = skipped repeat)", values: nums, marks, pointers },
        { type: "array", label: "path", values: path.slice(), marks: o.recorded ? Object.fromEntries(path.map((_, k) => [k, "match"])) : o.added ? { [path.length - 1]: "new" } : {} },
        { type: "array", label: `result (${result.length} of ${total})`, values: result.map(fmt), wide: true, marks: o.recorded ? { [result.length - 1]: "new" } : {} },
      ];
    };
    const sortedNote = given.join() === nums.join() ? "" : ` Sorted: ${fmt(nums)}, so equal numbers sit side by side.`;
    steps.push({ line: "init", note: `Every path is a subset: record it, then extend it with each later number.${sortedNote} ${total} different subsets to find.`, view: view(0) });
    function backtrack(start) {
      result.push(path.slice());
      steps.push({
        line: ["call", "record"],
        note: `Record ${fmt(path)}${path.length ? "" : " (the empty subset counts)"}.${start < n ? ` Next place: one of nums[${start}..${n - 1}].` : " Nothing after it to add."}`,
        view: view(start, undefined, { recorded: true }),
      });
      for (let i = start; i < n; i++) {
        if (i > start && nums[i] === nums[i - 1]) {
          steps.push({ line: "dup", note: `nums[${i}] = ${nums[i]}, the same as nums[${i - 1}], which already had its turn in this place. It would build the same subsets again: skip it.`, view: view(start, i, { skip: true }) });
          continue;
        }
        path.push(nums[i]);
        taken.push(i);
        steps.push({
          line: "choose",
          note: `Add ${nums[i]}: path = ${fmt(path)}.${i === start && i > 0 && nums[i] === nums[i - 1] ? ` (Equal to nums[${i - 1}], but it's first in this place, so it gets its turn: that's how ${fmt(path)} is built.)` : ""} Recurse on ${i + 1}.`,
          view: view(start, i, { added: true }),
        });
        backtrack(i + 1);
        path.pop();
        taken.pop();
        steps.push({ line: "undo", note: `Pop ${nums[i]}: path = ${fmt(path)}.`, view: view(start, i) });
      }
    }
    backtrack(0);
    steps.push({ line: "return", note: `Return all ${result.length}. Each call added one new subset and none were repeats: O(n · 2ⁿ) at most.`, view: view(n) });
    return steps;
  },
});
