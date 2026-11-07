// Keep every value sorted; each add inserts at its place (found by binary search). The answer is k-th from the end.
DSAViz.register("0703-kth-largest-element-in-a-stream/approach2", {
  inputs: [
    { name: "k", type: "int", value: "3", min: 1, max: 9 },
    { name: "nums", type: "int[]", value: "[4, 5, 8, 2]", minLength: 0, maxLength: 8, minValue: -10000, maxValue: 10000 },
    { name: "adds", label: "values passed to add, in order", type: "int[]", value: "[3, 5, 10, 9, 4]", minLength: 1, maxLength: 6, minValue: -10000, maxValue: 10000 },
  ],
  trace({ k, nums, adds }) {
    if (k > nums.length + 1) throw new DSAViz.InputError(`k can be at most nums.length + 1 = ${nums.length + 1}: after the first add there must be k values.`);
    const all = nums.slice().sort((a, b) => a - b);
    const res = [];
    const steps = [{ line: "init", note: "Sort the starting values once, smallest first.", view: [{ type: "array", label: "nums, sorted", values: all.slice() }] }];
    adds.forEach((v) => {
      let lo = 0, hi = all.length;
      while (lo < hi) { const m = (lo + hi) >> 1; if (all[m] <= v) lo = m + 1; else hi = m; }
      all.splice(lo, 0, v);
      res.push(all[all.length - k]);
      steps.push({ line: ["add", "answer"], note: `add(${v}): binary search finds index ${lo}; insert there (the ${all.length - 1 - lo} value${all.length - 1 - lo === 1 ? "" : "s"} after it shift right). The k-th from the end is ${all[all.length - k]}.`, view: [{ type: "array", label: "all values, smallest first (yellow = inserted, green = k-th from the end)", values: all.slice(), marks: { [lo]: "new", [all.length - k]: "match" } }, { type: "array", label: "answers", values: res.slice(), marks: { [res.length - 1]: "new" } }] });
    });
    steps.push({ line: "answer", note: `Return [${res.join(", ")}]. The search is O(log n) but the shifting is O(n) per add.`, view: [{ type: "array", label: "answers", values: res }] });
    return steps;
  },
});
