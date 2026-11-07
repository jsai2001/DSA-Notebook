// Keep a min-heap of the k biggest values seen so far. Its top is the answer.
DSAViz.register("0215-kth-largest-element-in-an-array/approach2", {
  inputs: [
    { name: "nums", type: "int[]", value: "[3, 2, 3, 1, 2, 4, 5, 5, 6]", minLength: 1, maxLength: 10, minValue: -10000, maxValue: 10000 },
    { name: "k", type: "int", value: "4", min: 1, max: 10 },
  ],
  trace({ nums, k }) {
    if (k > nums.length) throw new DSAViz.InputError(`k must be between 1 and ${nums.length} (the length of nums).`);
    const steps = [];
    const heap = [];
    const view = (o = {}) => [
      { type: "array", label: "nums (dark = this value)", values: nums, marks: o.i !== undefined ? { [o.i]: "active" } : {} },
      { type: "array", label: `heap, smallest first (at most k = ${k}; yellow = just added, red = popped)`, values: o.show || heap.slice().sort((a, b) => a - b), marks: o.hm || {} },
    ];
    steps.push({ line: "init", note: `Start with an empty min-heap. It will hold the ${k} biggest values seen so far.`, view: view() });
    nums.forEach((x, i) => {
      heap.push(x);
      const sorted = heap.slice().sort((a, b) => a - b);
      if (heap.length > k) {
        const drop = sorted[0];
        heap.splice(heap.indexOf(drop), 1);
        steps.push({ line: ["push", "pop"], note: `Push ${x}. That's ${k + 1} values: pop the smallest, ${drop}. It can't be in the top ${k}.`, view: view({ i, show: sorted, hm: sorted.lastIndexOf(x) === 0 ? { 0: "cut" } : { 0: "cut", [sorted.lastIndexOf(x)]: "new" } }) });
      } else steps.push({ line: "push", note: `Push ${x}. The heap has ${heap.length} of ${k}.`, view: view({ i, hm: { [sorted.lastIndexOf(x)]: "new" } }) });
    });
    const top = Math.min(...heap);
    steps.push({ line: "return", note: `Return ${top}. The heap holds the ${k} biggest values, and its top is the smallest of them. O(n log k) time, O(k) space.`, view: view({ hm: { 0: "match" } }) });
    return steps;
  },
});
