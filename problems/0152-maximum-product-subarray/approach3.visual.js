// Keep the largest (hi) and smallest (lo) product ending at each index; a negative number swaps them.
DSAViz.register("0152-maximum-product-subarray/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, 3, -2, 4, -1]", minLength: 1, maxLength: 8, minValue: -10, maxValue: 10 }],
  trace({ nums }) {
    const n = nums.length;
    const steps = [];
    const HI = Array(n).fill("");
    const LO = Array(n).fill("");
    let hi = nums[0];
    let lo = nums[0];
    let best = nums[0];
    HI[0] = hi;
    LO[0] = lo;
    const view = (o = {}) => {
      const marks = {};
      if (o.i !== undefined) { marks[`0,${o.i}`] = o.hm || "new"; marks[`1,${o.i}`] = "new"; }
      return [
        { type: "array", label: "nums", values: nums, marks: o.i !== undefined ? { [o.i]: "active" } : {}, pointers: o.i !== undefined ? { x: o.i } : {} },
        { type: "grid", label: "products of subarrays ending at each index", rows: ["hi (largest)", "lo (smallest)"], cols: [...Array(n).keys()], corner: "", cells: [HI.map(String), LO.map(String)], marks },
        { type: "vars", items: [{ name: "best", value: best, mark: o.better ? "match" : "" }] },
      ];
    };
    steps.push({ line: "init", note: `At index 0 the only subarray is [${nums[0]}]: hi = lo = best = ${nums[0]}.`, view: view({ i: 0 }) });
    for (let i = 1; i < n; i++) {
      const x = nums[i];
      let note = "";
      const line = ["loop"];
      if (x < 0) {
        [hi, lo] = [lo, hi];
        note = `${x} is negative: multiplying flips the order, so swap hi and lo first (hi = ${hi}, lo = ${lo}). `;
        line.push("swap");
      }
      const pickHi = x >= hi * x ? `start fresh at ${x}` : `extend: ${hi} × ${x} = ${hi * x}`;
      const pickLo = x <= lo * x ? `start fresh at ${x}` : `extend: ${lo} × ${x} = ${lo * x}`;
      hi = Math.max(x, hi * x);
      lo = Math.min(x, lo * x);
      HI[i] = hi;
      LO[i] = lo;
      const better = hi > best;
      if (better) best = hi;
      line.push("update", "best");
      steps.push({ line, note: `${note}hi = ${hi} (${pickHi}); lo = ${lo} (${pickLo}).${better ? ` New best: ${best}.` : ""}`, view: view({ i, better, hm: better ? "match" : "new" }) });
    }
    steps.push({ line: "return", note: `Return ${best}. One pass with three numbers: O(n) time, O(1) memory.`, view: view() });
    return steps;
  },
});
