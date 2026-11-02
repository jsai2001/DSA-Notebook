// Divide and conquer: the best subarray is in the left half, the right half, or crosses the middle.
DSAViz.register("0053-maximum-subarray/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[-2, 1, -3, 4, -1, 2, 1, -5]", minLength: 1, maxLength: 8, minValue: -99, maxValue: 99 }],
  trace({ nums }) {
    const n = nums.length;
    const steps = [];
    const stack = [];
    const view = (lo, hi, opts = {}) => {
      const marks = {};
      nums.forEach((_, k) => {
        if (lo !== undefined && (k < lo || k > hi)) marks[k] = "ghost";
      });
      if (opts.cross) for (let k = opts.cross[0]; k <= opts.cross[1]; k++) marks[k] = "window";
      if (opts.best) for (let k = opts.best[0]; k <= opts.best[1]; k++) marks[k] = "match";
      const pointers = {};
      if (lo !== undefined && lo === hi) pointers["lo, hi"] = lo;
      else if (lo !== undefined) { pointers.lo = lo; pointers.hi = hi; }
      return [
        { type: "array", label: "nums (faded = outside this call; the line is the middle)", values: nums, marks, pointers, cut: opts.mid !== undefined ? opts.mid + 1 : undefined },
        { type: "array", label: "call stack: best(lo, hi), newest on the right", values: stack.map(([a, b]) => `${a}..${b}`), wide: true, marks: stack.length ? { [stack.length - 1]: "active" } : {} },
        ...(opts.items ? [{ type: "vars", items: opts.items }] : []),
      ];
    };

    steps.push({ line: "start", note: `best(0, ${n - 1}): split the array in half, solve each half, and also check the subarrays that cross the middle.`, view: view(0, n - 1) });
    function best(lo, hi) {
      stack.push([lo, hi]);
      if (lo === hi) {
        steps.push({ line: ["call", "base"], note: `best(${lo}, ${hi}): one number, so the answer is nums[${lo}] = ${nums[lo]}.`, view: view(lo, hi, { best: [lo, lo] }) });
        stack.pop();
        return { sum: nums[lo], range: [lo, lo] };
      }
      const mid = Math.floor((lo + hi) / 2);
      steps.push({ line: ["call", "split"], note: `best(${lo}, ${hi}): split at mid = ${mid} into ${lo}..${mid} and ${mid + 1}..${hi}.`, view: view(lo, hi, { mid }) });
      const L = best(lo, mid);
      const R = best(mid + 1, hi);
      let total = 0, leftRun = -Infinity, li = mid;
      for (let i = mid; i >= lo; i--) { total += nums[i]; if (total > leftRun) { leftRun = total; li = i; } }
      total = 0;
      let rightRun = -Infinity, rj = mid + 1;
      for (let j = mid + 1; j <= hi; j++) { total += nums[j]; if (total > rightRun) { rightRun = total; rj = j; } }
      const C = { sum: leftRun + rightRun, range: [li, rj] };
      steps.push({
        line: "cross",
        note: `Crossing the middle: the best run ending at ${mid} is nums[${li}..${mid}] = ${leftRun}, the best starting at ${mid + 1} is nums[${mid + 1}..${rj}] = ${rightRun}. Together ${C.sum}. Each run must hold at least one number, so they start at −∞, not 0.`,
        view: view(lo, hi, { mid, cross: [li, rj], items: [{ name: "left half", value: L.sum }, { name: "right half", value: R.sum }, { name: "crossing", value: C.sum }] }),
      });
      const win = [L, R, C].reduce((a, b) => (b.sum > a.sum ? b : a));
      const which = win === L ? "left half" : win === R ? "right half" : "crossing";
      steps.push({
        line: "combine",
        note: `best(${lo}, ${hi}) = max(${L.sum}, ${R.sum}, ${C.sum}) = ${win.sum}, from the ${which}: nums[${win.range[0]}..${win.range[1]}].`,
        view: view(lo, hi, { mid, best: win.range, items: [{ name: "left half", value: L.sum }, { name: "right half", value: R.sum }, { name: "crossing", value: C.sum }] }),
      });
      stack.pop();
      return win;
    }
    const ans = best(0, n - 1);
    steps.push({
      line: "start",
      note: `Return ${ans.sum}, from nums[${ans.range[0]}..${ans.range[1]}]. log n levels, and each level scans every number once for the crossing runs: O(n log n).`,
      view: view(undefined, undefined, { best: ans.range }),
    });
    return steps;
  },
});
