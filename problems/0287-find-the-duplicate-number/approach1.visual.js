// Remember every value; the first one met again is the duplicate.
DSAViz.register("0287-find-the-duplicate-number/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 3, 4, 2, 2]", minLength: 2, maxLength: 10, minValue: 1, maxValue: 9 }],
  trace({ nums }) {
    const n = nums.length - 1;
    if (nums.some((x) => x > n)) throw new DSAViz.InputError(`With ${n + 1} values, each must be 1 to ${n}.`);
    const cnt = {}; nums.forEach((x) => (cnt[x] = (cnt[x] || 0) + 1));
    if (Object.values(cnt).filter((c) => c > 1).length !== 1) throw new DSAViz.InputError("Exactly one value must repeat (it may appear more than twice).");
    const seen = [];
    const steps = [{ line: "init", note: "An empty set (an array of n flags in C++ and Java).", view: [{ type: "array", label: "nums", values: nums }, { type: "set", label: "seen", items: [] }] }];
    for (let i = 0; i < nums.length; i++) {
      const x = nums[i];
      if (seen.includes(x)) { steps.push({ line: ["loop", "found"], note: `Return ${x}. It's already in seen. O(n) time, but O(n) extra space, which the follow-up rules out.`, view: [{ type: "array", label: "nums", values: nums, marks: { [i]: "match", [nums.indexOf(x)]: "match" } }, { type: "set", label: "seen", items: seen.map(String), marks: { [String(x)]: "match" } }] }); return steps; }
      seen.push(x);
      steps.push({ line: ["loop", "found", "add"], note: `${x} is new: add it.`, view: [{ type: "array", label: "nums", values: nums, marks: { [i]: "active" } }, { type: "set", label: "seen", items: seen.map(String), marks: { [String(x)]: "new" } }] });
    }
    return steps;
  },
});
