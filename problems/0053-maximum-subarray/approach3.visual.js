// Kadane: cur = best sum of a subarray ending at i. Either extend the previous run or start fresh at nums[i].
DSAViz.register("0053-maximum-subarray/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[-2, 1, -3, 4, -1, 2, 1, -5, 4]", minLength: 1, maxLength: 12, minValue: -99, maxValue: 99 }],
  trace({ nums }) {
    const n = nums.length;
    const steps = [];
    let cur = nums[0];
    let best = nums[0];
    let runStart = 0;
    let bestRange = [0, 0];
    const curs = [nums[0]];
    const view = (i, opts = {}) => {
      const marks = {};
      if (i !== undefined) for (let k = runStart; k <= i; k++) marks[k] = "window";
      if (opts.final) for (let k = bestRange[0]; k <= bestRange[1]; k++) marks[k] = "match";
      if (i !== undefined) marks[i] = opts.restart ? "new" : "active";
      return [
        { type: "array", label: "nums (shaded = the run ending at i; cur underneath)", values: nums, sub: nums.map((_, k) => (k < curs.length ? String(curs[k]) : "")), marks, pointers: i !== undefined ? { i } : {} },
        {
          type: "vars",
          items: [
            { name: "cur", value: cur, mark: opts.restart ? "new" : "" },
            { name: "best", value: `${best} (nums[${bestRange[0]}..${bestRange[1]}])`, mark: opts.improved ? "new" : opts.final ? "match" : "" },
          ],
        },
      ];
    };

    steps.push({ line: "init", note: `cur and best start at nums[0] = ${nums[0]}. cur is the best sum of a subarray that ends exactly here.`, view: view(0) });
    for (let i = 1; i < n; i++) {
      const extend = cur + nums[i];
      const restart = nums[i] > extend;
      const before = cur;
      cur = restart ? nums[i] : extend;
      if (restart) runStart = i;
      curs.push(cur);
      steps.push({
        line: ["loop", "cur"],
        note: restart
          ? `i = ${i}: the run so far is ${before}, which only drags ${nums[i]} down (${before} + ${nums[i]} = ${extend} < ${nums[i]}). Start a new run here: cur = ${cur}.`
          : `i = ${i}: extend the run: cur = max(${nums[i]}, ${before} + ${nums[i]}) = ${cur}.`,
        view: view(i, { restart }),
      });
      const improved = cur > best;
      if (improved) { best = cur; bestRange = [runStart, i]; }
      steps.push({
        line: "best",
        note: improved ? `cur = ${cur} beats best: best = ${best}, nums[${bestRange[0]}..${bestRange[1]}].` : `best stays ${best} (cur = ${cur}).`,
        view: view(i, { improved }),
      });
    }
    steps.push({
      line: "return",
      note: `Return ${best}, from nums[${bestRange[0]}..${bestRange[1]}]. One pass and two variables: O(n) time, O(1) space.`,
      view: view(undefined, { final: true }),
    });
    return steps;
  },
});
