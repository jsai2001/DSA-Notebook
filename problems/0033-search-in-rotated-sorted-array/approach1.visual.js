// Linear scan: check every value from left to right.
DSAViz.register("0033-search-in-rotated-sorted-array/approach1", {
  inputs: [
    { name: "nums", type: "int[]", value: "[4, 5, 6, 7, 0, 1, 2]", minLength: 1, maxLength: 10, minValue: -99, maxValue: 99 },
    { name: "target", type: "int", value: "0", min: -99, max: 99 },
  ],
  trace({ nums, target }) {
    const n = nums.length;
    if (new Set(nums).size !== n) throw new DSAViz.InputError("The values in nums must all be different.");
    const drops = nums.filter((v, i) => i > 0 && v < nums[i - 1]).length;
    if (drops > 1 || (drops === 1 && nums[n - 1] > nums[0])) {
      throw new DSAViz.InputError("nums must be a sorted array rotated once, like [4, 5, 6, 7, 0, 1, 2].");
    }
    const steps = [];
    const view = (i, found) => {
      const marks = {};
      for (let k = 0; k < (i ?? n); k++) marks[k] = "visited";
      if (i !== undefined && i < n) marks[i] = found ? "match" : "active";
      return [
        { type: "array", label: "nums", values: nums, marks, pointers: i !== undefined && i < n ? { i } : {} },
        { type: "vars", items: [{ name: "target", value: target }, { name: "checked", value: `${Math.min(i ?? n, n) + (found ? 1 : 0)} of ${n}` }] },
      ];
    };
    for (let i = 0; i < n; i++) {
      if (nums[i] === target) {
        steps.push({ line: "found", note: `nums[${i}] = ${nums[i]} is the target: return ${i}. It took ${i + 1} look${i ? "s" : ""}; in the worst case it's all n.`, view: view(i, true) });
        return steps;
      }
      steps.push({ line: ["loop", "check"], note: `nums[${i}] = ${nums[i]} ≠ ${target}: keep going.`, view: view(i) });
    }
    steps.push({ line: "missing", note: `Checked all ${n} values and none is ${target}: return -1. O(n), and it never uses the fact that the array is (almost) sorted.`, view: view() });
    return steps;
  },
});
