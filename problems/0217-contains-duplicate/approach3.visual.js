// Remember every value in a hash set; meeting one that's already there means a duplicate.
DSAViz.register("0217-contains-duplicate/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 2, 3, 1]", minLength: 1, maxLength: 10, minValue: -1000000000, maxValue: 1000000000 }],
  trace({ nums }) {
    const seen = [];
    const steps = [];
    const view = (i, o = {}) => [{ type: "array", label: "nums (dark = this value)", values: nums, marks: i === undefined ? {} : { [i]: o.hit ? "match" : "active" } }, { type: "set", label: "seen", items: seen.map(String), marks: o.key !== undefined ? { [String(o.key)]: o.hit ? "match" : "new" } : {} }];
    steps.push({ line: "init", note: "Start with an empty set.", view: view() });
    for (let i = 0; i < nums.length; i++) {
      const x = nums[i];
      if (seen.includes(x)) {
        steps.push({ line: ["loop", "found"], note: `${x} is already in seen.`, view: view(i, { hit: true, key: x }) });
        steps.push({ line: "found", note: `Return true. Each lookup is O(1) on average.`, view: view(i, { hit: true, key: x }) });
        return steps;
      }
      seen.push(x);
      steps.push({ line: ["loop", "found", "add"], note: `${x} isn't in seen: add it.`, view: view(i, { key: x }) });
    }
    steps.push({ line: "none", note: `Return false. All ${nums.length} values are different. O(n) time, O(n) space.`, view: view() });
    return steps;
  },
});
