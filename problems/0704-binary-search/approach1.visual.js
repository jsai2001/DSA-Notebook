// Check every value from the left; ignores that nums is sorted.
DSAViz.register("0704-binary-search/approach1", {
  inputs: [
    { name: "nums", type: "int[]", value: "[-1, 0, 3, 5, 9, 12]", minLength: 1, maxLength: 12, minValue: -9999, maxValue: 9999 },
    { name: "target", type: "int", value: "9", min: -9999, max: 9999 },
  ],
  trace({ nums, target }) {
    if (nums.some((x, i) => i && x <= nums[i - 1])) throw new DSAViz.InputError("nums must be sorted, smallest first, with no repeats.");
    const steps = [];
    for (let i = 0; i < nums.length; i++) {
      const hit = nums[i] === target;
      steps.push({ line: hit ? ["scan", "found"] : "scan", note: hit ? `nums[${i}] = ${target}: found.` : `nums[${i}] = ${nums[i]} ≠ ${target}.`, view: [{ type: "array", label: "nums (dashed = checked)", values: nums, marks: { ...Object.fromEntries(Array.from({ length: i }, (_, k) => [k, "ghost"])), [i]: hit ? "match" : "active" }, pointers: { i } }] });
      if (hit) { steps.push({ line: "found", note: `Return ${i}. ${i + 1} value${i ? "s" : ""} checked: O(n).`, view: [{ type: "array", label: "nums", values: nums, marks: { [i]: "match" } }] }); return steps; }
    }
    steps.push({ line: "none", note: `Return -1. All ${nums.length} values checked: O(n).`, view: [{ type: "array", label: "nums", values: nums, marks: Object.fromEntries(nums.map((_, k) => [k, "ghost"])) }] });
    return steps;
  },
});
