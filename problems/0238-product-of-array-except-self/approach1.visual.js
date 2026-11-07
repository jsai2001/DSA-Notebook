// For each i, multiply every other value.
DSAViz.register("0238-product-of-array-except-self/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 2, 3, 4]", minLength: 2, maxLength: 8, minValue: -30, maxValue: 30 }],
  trace({ nums }) {
    const n = nums.length;
    const ans = [];
    const steps = [];
    let mults = 0;
    steps.push({ line: "init", note: `${n} answers, each a product of ${n - 1} values.`, view: [{ type: "array", label: "nums", values: nums }, { type: "array", label: "ans", values: [] }] });
    for (let i = 0; i < n; i++) {
      let p = 1;
      for (let j = 0; j < n; j++) if (j !== i) { p *= nums[j]; mults++; }
      p = p === 0 ? 0 : p;
      ans.push(p);
      steps.push({ line: ["each", "mult", "store"], note: `ans[${i}] = ${nums.filter((_, j) => j !== i).join(" × ")} = ${p}.`, view: [{ type: "array", label: "nums (yellow = multiplied, dashed = left out)", values: nums, marks: Object.fromEntries(nums.map((_, j) => [j, j === i ? "ghost" : "compare"])) }, { type: "array", label: "ans", values: ans.slice(), marks: { [i]: "new" } }] });
    }
    steps.push({ line: "return", note: `Return [${ans.join(", ")}]. ${mults} multiplications: O(n²).`, view: [{ type: "array", label: "nums", values: nums }, { type: "array", label: "ans", values: ans }] });
    return steps;
  },
});
