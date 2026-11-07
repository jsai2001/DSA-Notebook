// Quickselect with a 3-way split: values bigger than the pivot, equal to it, smaller. Keep only the part with the answer.
DSAViz.register("0215-kth-largest-element-in-an-array/approach3", {
  inputs: [
    { name: "nums", type: "int[]", value: "[3, 2, 3, 1, 2, 4, 5, 5, 6]", minLength: 1, maxLength: 10, minValue: -10000, maxValue: 10000 },
    { name: "k", type: "int", value: "4", min: 1, max: 10 },
  ],
  trace({ nums: input, k: k0 }) {
    if (k0 > input.length) throw new DSAViz.InputError(`k must be between 1 and ${input.length} (the length of nums).`);
    let nums = input.slice();
    let k = k0;
    const steps = [];
    // The pivot is random in the code; here it's the middle value, so the steps are the same every run.
    while (true) {
      const pivot = nums[Math.floor(nums.length / 2)];
      const big = nums.filter((x) => x > pivot);
      const equal = nums.filter((x) => x === pivot).length;
      const small = nums.filter((x) => x < pivot);
      const parts = [{ type: "array", label: `nums now (dark = the pivot, ${pivot})`, values: nums, marks: { [Math.floor(nums.length / 2)]: "active" } }, { type: "array", label: "split: bigger | equal (yellow) | smaller", values: [...big, ...Array(equal).fill(pivot), ...small], cut: big.length, marks: Object.fromEntries(Array.from({ length: equal }, (_, j) => [big.length + j, "compare"])) }, { type: "vars", items: [{ name: "k", value: k }, { name: "bigger", value: big.length }, { name: "equal", value: equal }] }];
      steps.push({ line: ["loop", "pivot", "split"], note: `Pivot ${pivot} (random in the code; the middle value here). ${big.length} bigger, ${equal} equal, ${small.length} smaller.`, view: parts });
      if (k <= big.length) {
        steps.push({ line: "left", note: `k = ${k} ≤ ${big.length}: the answer is among the bigger values. Keep only those.`, view: parts });
        nums = big;
      } else if (k <= big.length + equal) {
        steps.push({ line: "found", note: `Return ${pivot}. ${big.length} values are bigger and k = ${k} falls on the pivot's copies. About n + n/2 + n/4 + … = O(n) on average.`, view: [{ type: "array", label: "the answer", values: [pivot], marks: { 0: "match" } }] });
        return steps;
      } else {
        const nk = k - big.length - equal;
        steps.push({ line: "right", note: `k = ${k} is past the ${big.length + equal} bigger-or-equal values: keep the smaller ones, and k becomes ${k} − ${big.length + equal} = ${nk}.`, view: parts });
        k = nk;
        nums = small;
      }
    }
  },
});
