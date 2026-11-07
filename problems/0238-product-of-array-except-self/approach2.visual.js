// left[i] = product of everything before i, right[i] = product of everything after i; the answer is their product.
DSAViz.register("0238-product-of-array-except-self/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 2, 3, 4]", minLength: 2, maxLength: 8, minValue: -30, maxValue: 30 }],
  trace({ nums }) {
    const n = nums.length;
    const z = (x) => (x === 0 ? 0 : x);
    const left = Array(n).fill(1), right = Array(n).fill(1);
    for (let i = 1; i < n; i++) left[i] = z(left[i - 1] * nums[i - 1]);
    for (let i = n - 2; i >= 0; i--) right[i] = z(right[i + 1] * nums[i + 1]);
    const ans = nums.map((_, i) => z(left[i] * right[i]));
    const steps = [];
    const v = (o = {}) => [{ type: "array", label: "nums", values: nums }, { type: "array", label: "left[i] = product before i", values: o.l || [], marks: o.lm || {} }, { type: "array", label: "right[i] = product after i", values: o.r || [], marks: o.rm || {} }, { type: "array", label: "ans = left × right", values: o.a || [], marks: o.am || {} }];
    steps.push({ line: "init", note: "Everything except nums[i] = (everything before i) × (everything after i).", view: v() });
    steps.push({ line: "left", note: `Left to right: left[0] = 1 (nothing before it), then left[i] = left[i − 1] × nums[i − 1]. left = [${left.join(", ")}].`, view: v({ l: left, lm: Object.fromEntries(left.map((_, i) => [i, "new"])) }) });
    steps.push({ line: "right", note: `Right to left: right[n − 1] = 1, then right[i] = right[i + 1] × nums[i + 1]. right = [${right.join(", ")}].`, view: v({ l: left, r: right, rm: Object.fromEntries(right.map((_, i) => [i, "new"])) }) });
    steps.push({ line: "combine", note: `Return [${ans.join(", ")}]. Each ans[i] = left[i] × right[i]. Three passes: O(n) time, O(n) for the two arrays.`, view: v({ l: left, r: right, a: ans, am: Object.fromEntries(ans.map((_, i) => [i, "match"])) }) });
    return steps;
  },
});
