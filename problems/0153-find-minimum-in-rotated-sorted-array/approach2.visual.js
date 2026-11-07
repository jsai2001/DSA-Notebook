// Binary search for the first number smaller than nums[0] (after a check for "not rotated").
(function () {
DSAViz.register("0153-find-minimum-in-rotated-sorted-array/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[4, 5, 6, 7, 0, 1, 2]", minLength: 1, maxLength: 12, minValue: -99, maxValue: 99 }],
  trace({ nums }) {
    checkRotated(nums);
    const n = nums.length;
    const steps = [];
    let cmp = 1;
    const LABEL = "nums (outlined = still searched; yellow = nums[0], compared against)";

    const view = (lo, hi, mid, o = {}) => {
      const marks = {};
      nums.forEach((_, k) => { if (k < lo || k > hi) marks[k] = "ghost"; else marks[k] = "window"; });
      if (mid !== undefined) marks[mid] = "active";
      if (o.ref !== undefined) marks[o.ref] = marks[o.ref] === "active" ? "active" : "compare";
      if (o.found !== undefined) marks[o.found] = "match";
      const pointers = {};
      if (lo <= hi) { pointers.lo = lo; pointers.hi = hi; }
      if (mid !== undefined) pointers.mid = mid;
      return [{ type: "array", label: LABEL, values: nums, marks, pointers }, { type: "vars", items: [{ name: "comparisons", value: cmp }] }];
    };

    if (nums[0] <= nums[n - 1]) {
      steps.push({ line: "sorted", note: `nums[0] = ${nums[0]} ≤ nums[${n - 1}] = ${nums[n - 1]}: not rotated${n === 1 ? " (one number)" : ""}, so the first number is the smallest. Return ${nums[0]}.`, view: view(0, n - 1, undefined, { found: 0 }) });
      return steps;
    }
    let lo = 1;
    let hi = n - 1;
    steps.push({ line: ["sorted", "init"], note: `nums[0] = ${nums[0]} > nums[${n - 1}] = ${nums[n - 1]}: rotated. Everything before the drop is ≥ nums[0], everything after is smaller. Find the first number smaller than ${nums[0]}.`, view: view(lo, hi, undefined, { ref: 0 }) });
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      cmp++;
      if (nums[mid] >= nums[0]) {
        steps.push({ line: ["loop", "mid", "right"], note: `nums[${mid}] = ${nums[mid]} ≥ ${nums[0]}: mid is before the drop. lo = ${mid + 1}.`, view: view(lo, hi, mid, { ref: 0 }) });
        lo = mid + 1;
      } else {
        steps.push({ line: ["loop", "mid", "left"], note: `nums[${mid}] = ${nums[mid]} < ${nums[0]}: mid is after the drop, so the minimum is mid or earlier. hi = ${mid}.`, view: view(lo, hi, mid, { ref: 0 }) });
        hi = mid;
      }
    }
    steps.push({ line: "return", note: `lo = hi = ${lo}. Return ${nums[lo]}. ${cmp} comparisons: O(log n).`, view: view(lo, hi, undefined, { found: lo }) });
    return steps;
  },
});

// The input must be a sorted list of different numbers, rotated (possibly 0 times).
function checkRotated(nums) {
  const n = nums.length;
  if (new Set(nums).size !== n) throw new DSAViz.InputError("The numbers must all be different.");
  let drops = 0;
  for (let i = 0; i < n; i++) if (nums[i] > nums[(i + 1) % n]) drops++;
  if (n > 1 && drops !== 1) throw new DSAViz.InputError("Use a sorted list that was rotated, like [4, 5, 6, 7, 0, 1, 2].");
}
})();
