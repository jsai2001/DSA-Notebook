// Try every subarray: fix a start, extend the end one step at a time with a running product.
DSAViz.register("0152-maximum-product-subarray/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, 3, -2, 4]", minLength: 1, maxLength: 8, minValue: -10, maxValue: 10 }],
  trace({ nums }) {
    const n = nums.length;
    const steps = [];
    let best = nums[0];
    let bestR = [0, 0];
    let count = 0;
    const view = (o = {}) => {
      const marks = {};
      if (o.r) for (let k = o.r[0]; k <= o.r[1]; k++) marks[k] = "window";
      if (o.final) for (let k = bestR[0]; k <= bestR[1]; k++) marks[k] = "match";
      return [
        { type: "array", label: "nums (outlined = the subarray now; green at the end = the best one)", values: nums, marks, pointers: o.r ? { i: o.r[0], j: o.r[1] } : {} },
        { type: "vars", items: [...(o.prod !== undefined ? [{ name: "prod", value: o.prod }] : []), { name: "best", value: best, mark: o.better ? "match" : "" }, { name: "subarrays checked", value: count }] },
      ];
    };
    steps.push({ line: "init", note: `best starts at nums[0] = ${nums[0]}, not 0: if every product is negative, the answer is negative.`, view: view() });
    for (let i = 0; i < n; i++) {
      let prod = 1;
      for (let j = i; j < n; j++) {
        prod *= nums[j];
        count++;
        const better = prod > best;
        if (better) { best = prod; bestR = [i, j]; }
        steps.push({ line: j === i ? ["start", "extend", "best"] : ["extend", "best"], note: `nums[${i}..${j}]: product ${prod}.${better ? " New best." : ""}`, view: view({ r: [i, j], prod, better }) });
      }
    }
    steps.push({ line: "return", note: `Return ${best}, from nums[${bestR[0]}..${bestR[1]}]. ${count} subarrays: n(n + 1) / 2, so O(n²).`, view: view({ final: true }) });
    return steps;
  },
});
