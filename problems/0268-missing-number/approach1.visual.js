// Sort: then index i should hold i. The first index that doesn't is the missing number.
DSAViz.register("0268-missing-number/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[9, 6, 4, 2, 3, 5, 7, 0, 1]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 10 }],
  trace({ nums }) {
    const n = nums.length;
    if (nums.some((x) => x > n)) throw new DSAViz.InputError(`With ${n} values, each must be 0 to ${n}.`);
    if (new Set(nums).size !== n) throw new DSAViz.InputError("All values must be different.");
    const a = nums.slice().sort((x, y) => x - y);
    const steps = [{ line: "sort", note: `Sort. If nothing were missing before the end, index i would hold i.`, view: [{ type: "array", label: "nums", values: nums }, { type: "array", label: "sorted", values: a }] }];
    for (let i = 0; i < n; i++) {
      if (a[i] !== i) {
        steps.push({ line: ["scan", "found"], note: `Return ${i}. Index ${i} holds ${a[i]}, not ${i}: ${i} is missing. Sorting costs O(n log n).`, view: [{ type: "array", label: "sorted (green = in place, red = the first gap)", values: a, marks: { ...Object.fromEntries(Array.from({ length: i }, (_, k) => [k, "match"])), [i]: "cut" } }] });
        return steps;
      }
    }
    steps.push({ line: ["scan", "end"], note: `Return ${n}. Every index 0..${n - 1} holds its own number, so the missing one is n = ${n}.`, view: [{ type: "array", label: "sorted (green = in place)", values: a, marks: Object.fromEntries(a.map((_, k) => [k, "match"])) }] });
    return steps;
  },
});
