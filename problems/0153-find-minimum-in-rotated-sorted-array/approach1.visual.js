// Look at every number and keep the smallest.
(function () {
DSAViz.register("0153-find-minimum-in-rotated-sorted-array/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[4, 5, 6, 7, 0, 1, 2]", minLength: 1, maxLength: 12, minValue: -99, maxValue: 99 }],
  trace({ nums }) {
    checkRotated(nums);
    const steps = [];
    let best = nums[0];
    let at = 0;
    steps.push({ line: "init", note: `best starts at nums[0] = ${best}.`, view: [{ type: "array", label: "nums", values: nums, marks: { 0: "match" } }, { type: "vars", items: [{ name: "best", value: best }] }] });
    nums.forEach((x, i) => {
      const better = x < best;
      if (better) { best = x; at = i; }
      const marks = {};
      for (let k = 0; k < i; k++) marks[k] = "visited";
      marks[at] = "match";
      if (i !== at) marks[i] = "active";
      steps.push({ line: "scan", note: `nums[${i}] = ${x}${better ? `: smaller, best = ${x}` : ""}.`, view: [{ type: "array", label: "nums (green = smallest so far)", values: nums, marks, pointers: { i } }, { type: "vars", items: [{ name: "best", value: best, mark: better ? "new" : "" }, { name: "numbers looked at", value: i + 1 }] }] });
    });
    steps.push({ line: "return", note: `Return ${best}. All ${nums.length} numbers were checked: O(n), and it never used the sorted order.`, view: [{ type: "array", label: "nums", values: nums, marks: { [at]: "match" } }] });
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
