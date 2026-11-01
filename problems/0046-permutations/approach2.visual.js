// Backtracking by swapping: positions 0..k-1 are fixed; swap each remaining number into position k, recurse, swap back.
DSAViz.register("0046-permutations/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 2, 3]", minLength: 1, maxLength: 4, minValue: -10, maxValue: 10 }],
  trace({ nums: input }) {
    if (new Set(input).size !== input.length) throw new DSAViz.InputError("The numbers must all be different.");
    const nums = input.slice();
    const n = nums.length;
    const steps = [];
    const result = [];
    const fmt = (a) => `[${a.join(", ")}]`;
    const view = (k, opts = {}) => {
      const marks = {};
      for (let p = 0; p < Math.min(k ?? 0, n); p++) marks[p] = "match";
      if (opts.swap) opts.swap.forEach((p) => (marks[p] = opts.back ? "compare" : "new"));
      const pointers = {};
      if (k !== undefined && k < n) pointers.k = k;
      if (opts.i !== undefined && opts.i !== k) pointers.i = opts.i;
      if (opts.i !== undefined && opts.i === k) pointers["k, i"] = k;
      if (pointers["k, i"] !== undefined) delete pointers.k;
      return [
        { type: "array", label: "nums (green = fixed positions; the line splits fixed | still to arrange)", values: nums.slice(), marks, pointers, cut: k !== undefined && k > 0 && k < n ? k : undefined },
        { type: "array", label: `result (${result.length})`, values: result.map(fmt), wide: true, marks: opts.done ? { [result.length - 1]: "new" } : {} },
      ];
    };

    steps.push({ line: "init", note: "No extra path or used array: arrange nums in place. backtrack(k) decides which number sits at position k.", view: view(0) });
    function backtrack(k) {
      if (k === n) {
        result.push(nums.slice());
        steps.push({ line: ["call", "done"], note: `All ${n} positions are fixed: ${fmt(nums)}. Add a copy.`, view: view(n, { done: true }) });
        return;
      }
      steps.push({ line: "call", note: `backtrack(${k}): positions 0..${k - 1 < 0 ? "none" : k - 1} are fixed. Each of nums[${k}..${n - 1}] gets a turn at position ${k}.`, view: view(k) });
      for (let i = k; i < n; i++) {
        [nums[k], nums[i]] = [nums[i], nums[k]];
        steps.push({
          line: "swap",
          note: i === k ? `Keep nums[${k}] = ${nums[k]} at position ${k} (swap with itself) and go deeper.` : `Swap positions ${k} and ${i}: ${nums[k]} moves to position ${k}. nums = ${fmt(nums)}. Go deeper.`,
          view: view(k, { i, swap: i === k ? [k] : [k, i] }),
        });
        backtrack(k + 1);
        [nums[k], nums[i]] = [nums[i], nums[k]];
        steps.push({
          line: "undo",
          note: i === k ? `Back at position ${k}: nothing to undo for a self-swap.` : `Back: swap positions ${k} and ${i} again, so nums is ${fmt(nums)} like before and the next number can have its turn.`,
          view: view(k, { i, swap: i === k ? [k] : [k, i], back: true }),
        });
      }
    }
    backtrack(0);
    steps.push({ line: "return", note: `Return all ${result.length}. The array was rearranged in place and restored after every swap: O(n · n!) time, only the O(n) call stack extra.`, view: view() });
    return steps;
  },
});
