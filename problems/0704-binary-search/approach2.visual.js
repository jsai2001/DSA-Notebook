// Recursive binary search: compare with the middle and call again on the half that can still hold target.
DSAViz.register("0704-binary-search/approach2", {
  inputs: [
    { name: "nums", type: "int[]", value: "[-1, 0, 3, 5, 9, 12]", minLength: 1, maxLength: 12, minValue: -9999, maxValue: 9999 },
    { name: "target", type: "int", value: "9", min: -9999, max: 9999 },
  ],
  trace({ nums, target }) {
    if (nums.some((x, i) => i && x <= nums[i - 1])) throw new DSAViz.InputError("nums must be sorted, smallest first, with no repeats.");
    const steps = [];
    let lo = 0, hi = nums.length - 1, rounds = 0;
    const view = (mid, mm) => [{ type: "array", label: "nums (outlined = still possible, dashed = ruled out, dark = mid)", values: nums, marks: { ...Object.fromEntries(nums.map((_, k) => [k, k >= lo && k <= hi ? "window" : "ghost"])), ...(mid !== undefined ? { [mid]: mm || "active" } : {}) }, pointers: mid !== undefined ? (lo === hi ? { "lo = hi": lo } : { lo, hi, mid }) : lo <= hi ? { lo, hi } : {} }, { type: "vars", items: [{ name: "lo", value: lo }, { name: "hi", value: hi }, { name: "steps", value: rounds }] }];
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      rounds++;
      if (nums[mid] === target) {
        steps.push({ line: ["mid", "found"], note: `Return ${mid}. mid = ${mid}: nums[${mid}] = ${target}. Found in ${rounds} step${rounds > 1 ? "s" : ""}: O(log n).`, view: view(mid, "match") });
        return steps;
      }
      if (nums[mid] < target) {
        steps.push({ line: [["call", "mid"], "right"].flat(), note: `mid = ${mid}: nums[${mid}] = ${nums[mid]} < ${target}. Everything up to mid is too small: call find(lo = ${mid + 1}, hi).`, view: view(mid) });
        lo = mid + 1;
      } else {
        steps.push({ line: [["call", "mid"], "left"].flat(), note: `mid = ${mid}: nums[${mid}] = ${nums[mid]} > ${target}. Everything from mid on is too big: call find(lo, hi = ${mid - 1}).`, view: view(mid) });
        hi = mid - 1;
      }
    }
    steps.push({ line: ["call", "none"], note: `Return -1. lo = ${lo} > hi = ${hi}: nothing left to search, after ${rounds} step${rounds > 1 ? "s" : ""}.`, view: view() });
    return steps;
  },
});
