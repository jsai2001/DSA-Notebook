// XOR every index 0..n and every value. Pairs cancel (x ^ x = 0); the missing number is left.
DSAViz.register("0268-missing-number/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[9, 6, 4, 2, 3, 5, 7, 0, 1]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 10 }],
  trace({ nums }) {
    const n = nums.length;
    if (nums.some((x) => x > n)) throw new DSAViz.InputError(`With ${n} values, each must be 0 to ${n}.`);
    if (new Set(nums).size !== n) throw new DSAViz.InputError("All values must be different.");
    const bits = (v) => v.toString(2).padStart(4, "0");
    let res = n;
    const steps = [];
    const view = (i) => [{ type: "array", label: "nums (dark = this index)", values: nums, marks: i !== undefined ? { [i]: "active" } : {}, pointers: i !== undefined ? { i } : {} }, { type: "vars", items: [{ name: "res", value: `${res} (${bits(res)})`, mark: i !== undefined ? "new" : "" }] }];
    steps.push({ line: "init", note: `res = n = ${n}. Indexes run 0..${n - 1}, so n is the one index with no slot: add it up front.`, view: view() });
    nums.forEach((x, i) => {
      const before = res;
      res ^= i ^ x;
      steps.push({ line: "xor", note: `res ^= ${i} (index) ^ ${x} (value): ${before} → ${res}.`, view: view(i) });
    });
    steps.push({ line: "return", note: `Return ${res}. Every number 0..n went in once as an index (or as n), and once as a value, except the missing one. x ^ x = 0, so only it is left. O(n) time, O(1) space.`, view: [{ type: "array", label: "nums", values: nums }, { type: "vars", items: [{ name: "res", value: res, mark: "match" }] }] });
    return steps;
  },
});
