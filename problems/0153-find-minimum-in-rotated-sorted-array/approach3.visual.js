// Binary search comparing nums[mid] with nums[hi]: the half that isn't sorted holds the minimum.
(function () {
DSAViz.register("0153-find-minimum-in-rotated-sorted-array/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[4, 5, 6, 7, 0, 1, 2]", minLength: 1, maxLength: 12, minValue: -99, maxValue: 99 }],
  trace({ nums }) {
    checkRotated(nums);
    const n = nums.length;
    const steps = [];
    let cmp = 0;
    const LABEL = "nums (outlined = still searched; yellow = nums[hi], compared against)";

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

    let lo = 0;
    let hi = n - 1;
    steps.push({ line: "init", note: `Search all of nums: lo = 0, hi = ${hi}. The minimum is the only number smaller than the one before it.`, view: view(lo, hi) });
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      cmp++;
      if (nums[mid] > nums[hi]) {
        steps.push({ line: ["loop", "mid", "right"], note: `nums[${mid}] = ${nums[mid]} > nums[hi] = ${nums[hi]}: going from mid to hi it drops somewhere, so the minimum is after mid. lo = ${mid + 1}.`, view: view(lo, hi, mid, { ref: hi }) });
        lo = mid + 1;
      } else {
        steps.push({ line: ["loop", "mid", "left"], note: `nums[${mid}] = ${nums[mid]} < nums[hi] = ${nums[hi]}: mid..hi is sorted, so the minimum is mid or to its left. hi = ${mid} (not ${mid} - 1: mid may be it).`, view: view(lo, hi, mid, { ref: hi }) });
        hi = mid;
      }
    }
    steps.push({ line: ["loop", "return"], note: `lo = hi = ${lo}: one number left. Return ${nums[lo]}. ${cmp} comparison${cmp === 1 ? "" : "s"}: O(log n).`, view: view(lo, hi, undefined, { found: lo }) });
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
