// Keep every value; after each add, sort everything again and read position k - 1.
DSAViz.register("0703-kth-largest-element-in-a-stream/approach1", {
  inputs: [
    { name: "k", type: "int", value: "3", min: 1, max: 9 },
    { name: "nums", type: "int[]", value: "[4, 5, 8, 2]", minLength: 0, maxLength: 8, minValue: -10000, maxValue: 10000 },
    { name: "adds", label: "values passed to add, in order", type: "int[]", value: "[3, 5, 10, 9, 4]", minLength: 1, maxLength: 6, minValue: -10000, maxValue: 10000 },
  ],
  trace({ k, nums, adds }) {
    if (k > nums.length + 1) throw new DSAViz.InputError(`k can be at most nums.length + 1 = ${nums.length + 1}: after the first add there must be k values.`);
    const all = nums.slice();
    const res = [];
    const steps = [{ line: "init", note: `Store k = ${k} and all ${nums.length} starting values.`, view: [{ type: "array", label: "nums (all values)", values: all.slice() }] }];
    adds.forEach((v) => {
      all.push(v);
      all.sort((a, b) => b - a);
      res.push(all[k - 1]);
      steps.push({ line: ["add", "sort", "answer"], note: `add(${v}): append it and sort all ${all.length} values again. Position k − 1 = ${k - 1} holds ${all[k - 1]}.`, view: [{ type: "array", label: "all values, biggest first (green = the k-th biggest)", values: all.slice(), marks: { [k - 1]: "match", [all.indexOf(v)]: all.indexOf(v) === k - 1 ? "match" : "new" } }, { type: "array", label: "answers", values: res.slice(), marks: { [res.length - 1]: "new" } }] });
    });
    steps.push({ line: "answer", note: `Return [${res.join(", ")}]. Each add sorts every value: O(n log n) per call, and memory grows forever.`, view: [{ type: "array", label: "answers", values: res }] });
    return steps;
  },
});
