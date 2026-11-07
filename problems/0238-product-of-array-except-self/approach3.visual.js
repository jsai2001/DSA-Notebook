// Put the left products straight into ans, then sweep from the back with one running "right" product.
DSAViz.register("0238-product-of-array-except-self/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 2, 3, 4]", minLength: 2, maxLength: 8, minValue: -30, maxValue: 30 }],
  trace({ nums }) {
    const n = nums.length;
    const z = (x) => (x === 0 ? 0 : x);
    const ans = Array(n).fill(1);
    const steps = [];
    const view = (o = {}) => [{ type: "array", label: "nums", values: nums, marks: o.i !== undefined ? { [o.i]: "active" } : {}, pointers: o.i !== undefined ? { i: o.i } : {} }, { type: "array", label: o.lab || "ans", values: ans.slice(), marks: o.am || {} }, ...(o.right !== undefined ? [{ type: "vars", items: [{ name: "right", value: o.right, mark: "new" }] }] : [])];
    for (let i = 1; i < n; i++) ans[i] = z(ans[i - 1] * nums[i - 1]);
    steps.push({ line: ["init", "left"], note: `First pass: ans[i] = the product of everything before i: [${ans.join(", ")}].`, view: view({ lab: "ans (holds the left products for now)", am: Object.fromEntries(ans.map((_, i) => [i, "compare"])) }) });
    let right = 1;
    const done = {};
    for (let i = n - 1; i >= 0; i--) {
      const before = ans[i];
      ans[i] = z(ans[i] * right);
      done[i] = "match";
      steps.push({ line: "right", note: `ans[${i}] = ${before} (before) × ${right} (after) = ${ans[i]}. Then right × nums[${i}] = ${z(right * nums[i])}.`, view: view({ i, lab: "ans (green = final)", am: { ...done }, right: z(right * nums[i]) }) });
      right = z(right * nums[i]);
    }
    steps.push({ line: "return", note: `Return [${ans.join(", ")}]. Two passes, and only one extra number: O(n) time, O(1) space besides the answer.`, view: view({ am: done }) });
    return steps;
  },
});
