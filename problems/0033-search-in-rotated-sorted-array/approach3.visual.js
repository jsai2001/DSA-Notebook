// One binary search: one half of [lo, hi] is always sorted; check if target fits in it, and keep the right half.
DSAViz.register("0033-search-in-rotated-sorted-array/approach3", {
  inputs: [
    { name: "nums", type: "int[]", value: "[4, 5, 6, 7, 0, 1, 2]", minLength: 1, maxLength: 10, minValue: -99, maxValue: 99 },
    { name: "target", type: "int", value: "0", min: -99, max: 99 },
  ],
  trace({ nums, target }) {
    const n = nums.length;
    if (new Set(nums).size !== n) throw new DSAViz.InputError("The values in nums must all be different.");
    const drops = nums.filter((v, i) => i > 0 && v < nums[i - 1]).length;
    if (drops > 1 || (drops === 1 && nums[n - 1] > nums[0])) {
      throw new DSAViz.InputError("nums must be a sorted array rotated once, like [4, 5, 6, 7, 0, 1, 2].");
    }
    const pivot = nums.indexOf(Math.min(...nums)); // where the rotation starts, for the divider line
    const steps = [];
    // opts.sorted: [a, b] range to shade as the sorted half; opts.found: mid is the answer
    const view = (lo, hi, mid, opts = {}) => {
      const marks = {};
      nums.forEach((_, k) => {
        if (k < lo || k > hi) marks[k] = "ghost";
        else if (opts.sorted && k >= opts.sorted[0] && k <= opts.sorted[1]) marks[k] = "window";
      });
      if (mid !== undefined) marks[mid] = opts.found ? "match" : "active";
      const pointers = {};
      const put = (name, idx) => {
        if (idx < 0 || idx >= n) return;
        const same = Object.keys(pointers).find((k) => pointers[k] === idx);
        if (same) {
          delete pointers[same];
          pointers[`${same}, ${name}`] = idx;
        } else pointers[name] = idx;
      };
      if (lo <= hi) {
        put("lo", lo);
        if (mid !== undefined) put("mid", mid);
        put("hi", hi);
      }
      return [
        { type: "array", label: "nums (the line is where the rotation starts; faded = ruled out)", values: nums, marks, pointers, cut: pivot > 0 ? pivot : undefined },
        { type: "vars", items: [{ name: "target", value: target }, { name: "lo", value: lo }, { name: "hi", value: hi }] },
      ];
    };

    let lo = 0;
    let hi = n - 1;
    let round = 0;
    steps.push({ line: "init", note: `Search all of nums: lo = 0, hi = ${n - 1}.`, view: view(lo, hi) });
    while (lo <= hi) {
      round++;
      const mid = Math.floor((lo + hi) / 2);
      if (nums[mid] === target) {
        steps.push({
          line: ["loop", "found"],
          note: `mid = (${lo} + ${hi}) / 2 = ${mid}, and nums[${mid}] = ${nums[mid]} is the target: return ${mid}. ${round} round${round === 1 ? "" : "s"}.`,
          view: view(lo, hi, mid, { found: true }),
        });
        return steps;
      }
      steps.push({ line: "loop", note: `mid = (${lo} + ${hi}) / 2 = ${mid}: nums[${mid}] = ${nums[mid]}, not the target.`, view: view(lo, hi, mid) });
      if (nums[lo] <= nums[mid]) {
        const inside = nums[lo] <= target && target < nums[mid];
        steps.push({
          line: "left-sorted",
          note: `nums[lo] = ${nums[lo]} ≤ nums[mid] = ${nums[mid]}${lo === mid ? " (lo and mid are the same cell, which still counts)" : ""}: the left half [${lo}..${mid}] is sorted, so it holds exactly the values from ${nums[lo]} up to ${nums[mid]}.`,
          view: view(lo, hi, mid, { sorted: [lo, mid] }),
        });
        if (inside) {
          steps.push({ line: "in-left", note: `${nums[lo]} ≤ ${target} < ${nums[mid]}: the target can only be in that half. hi = mid - 1 = ${mid - 1}.`, view: view(lo, mid - 1) });
          hi = mid - 1;
        } else {
          const why = lo === mid ? `The sorted half is just ${nums[lo]}, already checked` : `${target} isn't in ${nums[lo]} ≤ x < ${nums[mid]}, so it's not in the sorted half`;
          steps.push({ line: "not-left", note: `${why}: look right. lo = mid + 1 = ${mid + 1}.`, view: view(mid + 1, hi) });
          lo = mid + 1;
        }
      } else {
        const inside = nums[mid] < target && target <= nums[hi];
        steps.push({
          line: "right-sorted",
          note: `nums[lo] = ${nums[lo]} > nums[mid] = ${nums[mid]}: the drop is in the left half, so the right half [${mid}..${hi}] is sorted (${nums[mid]} up to ${nums[hi]}).`,
          view: view(lo, hi, mid, { sorted: [mid, hi] }),
        });
        if (inside) {
          steps.push({ line: "in-right", note: `${nums[mid]} < ${target} ≤ ${nums[hi]}: the target can only be in that half. lo = mid + 1 = ${mid + 1}.`, view: view(mid + 1, hi) });
          lo = mid + 1;
        } else {
          steps.push({ line: "not-right", note: `${target} isn't in ${nums[mid]} < x ≤ ${nums[hi]}, so it's not in the sorted half: look left. hi = mid - 1 = ${mid - 1}.`, view: view(lo, mid - 1) });
          hi = mid - 1;
        }
      }
    }
    steps.push({ line: "missing", note: `lo = ${lo} > hi = ${hi}: nothing left to search, so ${target} isn't in nums. Return -1 after ${round} round${round === 1 ? "" : "s"}: each round halves the range, O(log n).`, view: view(lo, hi) });
    return steps;
  },
});
