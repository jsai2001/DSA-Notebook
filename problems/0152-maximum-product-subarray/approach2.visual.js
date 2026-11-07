// The best product is a prefix or a suffix of some zero-free stretch: scan both ways, restarting after zeros.
DSAViz.register("0152-maximum-product-subarray/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, -5, -2, -4, 3]", minLength: 1, maxLength: 8, minValue: -10, maxValue: 10 }],
  trace({ nums }) {
    const n = nums.length;
    const steps = [];
    const L = Array(n).fill("");
    const R = Array(n).fill("");
    let best = nums[0];
    let left = 1;
    let right = 1;
    const view = (o = {}) => [
      { type: "array", label: "nums", values: nums, pointers: o.i !== undefined ? { i: o.i, "n-1-i": n - 1 - o.i } : {} },
      { type: "array", label: "left: product of the prefix ending here (restarts after a 0)", values: L.map(String), marks: o.i !== undefined ? { [o.i]: o.lm || "new" } : {} },
      { type: "array", label: "right: product of the suffix starting here (restarts after a 0)", values: R.map(String), marks: o.i !== undefined ? { [n - 1 - o.i]: o.rm || "new" } : {} },
      { type: "vars", items: [{ name: "best", value: best, mark: o.better ? "match" : "" }] },
    ];
    steps.push({ line: "init", note: "Between zeros, an even number of negatives means the whole stretch is best; an odd number means drop everything up to the first negative, or from the last one. Both are a prefix or a suffix.", view: view() });
    for (let i = 0; i < n; i++) {
      const lFrom = left !== 0 ? String(left) : "1 (restart after a 0)";
      const rFrom = right !== 0 ? String(right) : "1 (restart after a 0)";
      left = (left !== 0 ? left : 1) * nums[i];
      right = (right !== 0 ? right : 1) * nums[n - 1 - i];
      L[i] = left;
      R[n - 1 - i] = right;
      const top = Math.max(left, right);
      const better = top > best;
      if (better) best = top;
      steps.push({
        line: ["scan", "best"],
        note: `left = ${lFrom} × ${nums[i]} = ${left}; right = ${rFrom} × ${nums[n - 1 - i]} = ${right}.${better ? ` New best: ${best}.` : ""}`,
        view: view({ i, better, lm: left === best && better ? "match" : "new", rm: right === best && better ? "match" : "new" }),
      });
    }
    steps.push({ line: "return", note: `Return ${best}. Two products in one pass: O(n) time, O(1) memory.`, view: view() });
    return steps;
  },
});
