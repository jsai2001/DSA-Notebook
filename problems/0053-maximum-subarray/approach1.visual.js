// Brute force: every start i, then every end j, keeping a running sum of nums[i..j].
DSAViz.register("0053-maximum-subarray/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[-2, 1, -3, 4, -1, 2]", minLength: 1, maxLength: 8, minValue: -99, maxValue: 99 }],
  trace({ nums }) {
    const n = nums.length;
    const steps = [];
    let best = nums[0];
    let bestRange = [0, 0];
    let sums = 0;
    const view = (i, j, total, opts = {}) => {
      const marks = {};
      if (i !== undefined) for (let k = i; k <= j; k++) marks[k] = "window";
      if (opts.final) for (let k = bestRange[0]; k <= bestRange[1]; k++) marks[k] = "match";
      if (j !== undefined) marks[j] = opts.improved ? "new" : "active";
      const pointers = {};
      if (i !== undefined) {
        if (i === j) pointers["i, j"] = i;
        else { pointers.i = i; pointers.j = j; }
      }
      return [
        { type: "array", label: "nums (shaded = the subarray nums[i..j])", values: nums, marks, pointers },
        {
          type: "vars",
          items: [
            ...(total !== undefined ? [{ name: "total", value: total }] : []),
            { name: "best", value: `${best} (nums[${bestRange[0]}..${bestRange[1]}])`, mark: opts.improved ? "new" : opts.final ? "match" : "" },
            { name: "sums looked at", value: sums },
          ],
        },
      ];
    };

    steps.push({ line: "init", note: `best starts at nums[0] = ${nums[0]}, not 0: if every number is negative, the answer is negative.`, view: view() });
    for (let i = 0; i < n; i++) {
      let total = 0;
      steps.push({ line: "start", note: `Start i = ${i}: total = 0.`, view: view(i, i - 1, 0) });
      for (let j = i; j < n; j++) {
        total += nums[j];
        sums++;
        const improved = total > best;
        if (improved) { best = total; bestRange = [i, j]; }
        steps.push({
          line: "extend",
          note: `Add nums[${j}] = ${nums[j]}: sum of nums[${i}..${j}] = ${total}.${improved ? ` New best.` : ""}`,
          view: view(i, j, total, { improved }),
        });
      }
    }
    steps.push({
      line: "return",
      note: `Return ${best}, from nums[${bestRange[0]}..${bestRange[1]}]. It looked at all ${sums} subarrays: n(n + 1) / 2, O(n²).`,
      view: view(undefined, undefined, undefined, { final: true }),
    });
    return steps;
  },
});
