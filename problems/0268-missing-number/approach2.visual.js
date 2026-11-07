// Mark every value as seen, then check 0..n for the one that isn't.
DSAViz.register("0268-missing-number/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[9, 6, 4, 2, 3, 5, 7, 0, 1]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 10 }],
  trace({ nums }) {
    const n = nums.length;
    if (nums.some((x) => x > n)) throw new DSAViz.InputError(`With ${n} values, each must be 0 to ${n}.`);
    if (new Set(nums).size !== n) throw new DSAViz.InputError("All values must be different.");
    const seen = Array(n + 1).fill(false);
    nums.forEach((x) => (seen[x] = true));
    const steps = [{ line: "set", note: `Mark the ${n} values. The values can only be 0..${n}, so C++ and Java use an array of n + 1 flags; Python uses a set.`, view: [{ type: "array", label: "nums", values: nums }, { type: "array", label: "seen[x] (✓ = in nums)", values: seen.map((b) => (b ? "✓" : "")), marks: Object.fromEntries(seen.map((b, k) => [k, b ? "new" : ""]).filter(([, m]) => m)) }] }];
    const miss = seen.indexOf(false);
    steps.push({ line: ["check", "found"], note: `Return ${miss}. Checking 0, 1, 2, …: ${miss} is the first value not seen. O(n) time, O(n) space.`, view: [{ type: "array", label: "seen[x]", values: seen.map((b) => (b ? "✓" : "")), marks: { ...Object.fromEntries(Array.from({ length: miss }, (_, k) => [k, "match"])), [miss]: "cut" } }] });
    return steps;
  },
});
