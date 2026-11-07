// Sort biggest first and read position k - 1.
DSAViz.register("0215-kth-largest-element-in-an-array/approach1", {
  inputs: [
    { name: "nums", type: "int[]", value: "[3, 2, 3, 1, 2, 4, 5, 5, 6]", minLength: 1, maxLength: 10, minValue: -10000, maxValue: 10000 },
    { name: "k", type: "int", value: "4", min: 1, max: 10 },
  ],
  trace({ nums, k }) {
    if (k > nums.length) throw new DSAViz.InputError(`k must be between 1 and ${nums.length} (the length of nums).`);
    const sorted = nums.slice().sort((a, b) => b - a);
    return [
      { line: "sort", note: `Sort all ${nums.length} values, biggest first.`, view: [{ type: "array", label: "nums", values: nums }, { type: "array", label: "sorted, biggest first", values: sorted }] },
      { line: "pick", note: `Return ${sorted[k - 1]}. It's at index k − 1 = ${k - 1}. Sorting costs O(n log n), more than needed for one value.`, view: [{ type: "array", label: "sorted, biggest first (green = the k-th biggest)", values: sorted, marks: { [k - 1]: "match" }, pointers: { "k−1": k - 1 } }] },
    ];
  },
});
