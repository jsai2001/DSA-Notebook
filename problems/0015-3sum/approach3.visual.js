// Sort, fix the first number, then close in on the rest with two pointers, skipping repeats.
DSAViz.register("0015-3sum/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[-1, 0, 1, 2, -1, -4]", minLength: 3, maxLength: 10, minValue: -9, maxValue: 9 }],
  trace({ nums: input }) {
    const nums = input.slice().sort((a, b) => a - b);
    const n = nums.length;
    const steps = [];
    const result = [];
    const view = (i, lo, hi, opts = {}) => {
      const marks = {};
      if (i !== undefined) {
        for (let k = 0; k < i; k++) marks[k] = "visited";
        marks[i] = "active";
      }
      if (lo !== undefined && lo < hi) {
        marks[lo] = opts.hit ? "match" : "compare";
        marks[hi] = opts.hit ? "match" : "compare";
      }
      if (opts.skip !== undefined) marks[opts.skip] = "ghost";
      const pointers = {};
      if (i !== undefined) pointers.i = i;
      if (lo !== undefined && lo < hi) {
        pointers.lo = lo;
        pointers.hi = hi;
      }
      if (opts.skip !== undefined) pointers.lo = opts.skip;
      return [
        { type: "array", label: "nums (sorted)", values: nums, marks, pointers },
        { type: "array", label: "result", values: result.map((t) => `[${t.join(", ")}]`), wide: true, marks: opts.hit ? { [result.length - 1]: "new" } : {} },
        { type: "vars", items: [{ name: "total", value: opts.total === undefined ? "–" : opts.total, mark: opts.hit ? "match" : "" }] },
      ];
    };
    steps.push({ line: "init", note: `Sort: [${nums.join(", ")}]. Sorted order is what lets the two pointers know which way to move.`, view: view() });
    for (let i = 0; i + 2 < n; i++) {
      if (nums[i] > 0) {
        steps.push({ line: ["fix", "stop"], note: `nums[${i}] = ${nums[i]} > 0: the smallest of the three is positive, so no sum can be 0. Stop.`, view: view(i) });
        break;
      }
      if (i > 0 && nums[i] === nums[i - 1]) {
        steps.push({ line: ["fix", "skip"], note: `nums[${i}] = ${nums[i]} is the same as the previous first number. Skip it, or every triplet would be found twice.`, view: view(i) });
        continue;
      }
      let lo = i + 1;
      let hi = n - 1;
      steps.push({ line: "fix", note: `Fix nums[${i}] = ${nums[i]}. lo starts just after it, hi at the end.`, view: view(i, lo, hi) });
      while (lo < hi) {
        const total = nums[i] + nums[lo] + nums[hi];
        if (total < 0) {
          steps.push({ line: ["loop", "sum", "less"], note: `${nums[i]} + ${nums[lo]} + ${nums[hi]} = ${total} < 0. Too small, and hi is already the largest left, so move lo right.`, view: view(i, lo, hi, { total }) });
          lo++;
        } else if (total > 0) {
          steps.push({ line: ["loop", "sum", "more"], note: `${nums[i]} + ${nums[lo]} + ${nums[hi]} = ${total} > 0. Too big, and lo is already the smallest left, so move hi left.`, view: view(i, lo, hi, { total }) });
          hi--;
        } else {
          result.push([nums[i], nums[lo], nums[hi]]);
          steps.push({ line: ["loop", "sum", "found"], note: `${nums[i]} + ${nums[lo]} + ${nums[hi]} = 0. Found [${nums[i]}, ${nums[lo]}, ${nums[hi]}]. Move both pointers in.`, view: view(i, lo, hi, { total, hit: true }) });
          lo++;
          hi--;
          while (lo < hi && nums[lo] === nums[lo - 1]) {
            steps.push({ line: "dedupe", note: `nums[${lo}] = ${nums[lo]} is the middle number we just used. Skip it so the same triplet isn't added again.`, view: view(i, lo, hi, { skip: lo }) });
            lo++;
          }
        }
      }
    }
    steps.push({
      line: "return",
      note: `Return ${result.length} triplet${result.length === 1 ? "" : "s"}, with no repeats and no extra set. O(n²) time; the sort is O(n log n).`,
      view: view(),
    });
    return steps;
  },
});
