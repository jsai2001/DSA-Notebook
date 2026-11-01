// Two binary searches: first find where the rotation starts, then search the one sorted part that can hold target.
DSAViz.register("0033-search-in-rotated-sorted-array/approach2", {
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
    const steps = [];
    let pivot; // known after step 1
    // opts.part: [a, b] the sorted part chosen in step 2; opts.found: mid is the answer
    const view = (lo, hi, mid, opts = {}) => {
      const marks = {};
      nums.forEach((_, k) => {
        if (k < lo || k > hi) marks[k] = "ghost";
        else if (opts.part) marks[k] = "window";
      });
      if (mid !== undefined) marks[mid] = opts.found ? "match" : opts.pivot ? "new" : "active";
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
        {
          type: "array",
          label: pivot === undefined ? "nums (step 1: find the smallest value)" : "nums (the line is where the rotation starts; faded = ruled out)",
          values: nums,
          marks,
          pointers,
          cut: pivot > 0 ? pivot : undefined,
        },
        {
          type: "vars",
          items: [{ name: "target", value: target }, ...(pivot === undefined ? [] : [{ name: "pivot", value: `${pivot} (nums[${pivot}] = ${nums[pivot]})` }])],
        },
      ];
    };

    let lo = 0;
    let hi = n - 1;
    steps.push({ line: "pivot", note: "Step 1: find the smallest value. Everything from there to the end is sorted, and so is everything before it.", view: view(lo, hi) });
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (nums[mid] > nums[hi]) {
        steps.push({
          line: "pivot-right",
          note: `mid = ${mid}: nums[mid] = ${nums[mid]} > nums[hi] = ${nums[hi]}, so the values drop somewhere after mid. The smallest is to the right: lo = ${mid + 1}.`,
          view: view(lo, hi, mid),
        });
        lo = mid + 1;
      } else {
        steps.push({
          line: "pivot-left",
          note: `mid = ${mid}: nums[mid] = ${nums[mid]} ≤ nums[hi] = ${nums[hi]}, so mid..hi is sorted. The smallest is mid or to its left: hi = ${mid}.`,
          view: view(lo, hi, mid),
        });
        hi = mid;
      }
    }
    pivot = lo;
    steps.push({
      line: "side",
      note: pivot === 0 ? `lo = hi = 0: nums[0] = ${nums[0]} is the smallest, so the array isn't rotated at all.` : `lo = hi = ${pivot}: the smallest value is nums[${pivot}] = ${nums[pivot]}. The rotation starts there.`,
      view: view(pivot, pivot, pivot, { pivot: true }),
    });
    if (nums[pivot] <= target && target <= nums[n - 1]) {
      lo = pivot;
      hi = n - 1;
      steps.push({ line: "side-right", note: `Step 2: ${nums[pivot]} ≤ ${target} ≤ ${nums[n - 1]}, so only the part [${pivot}..${n - 1}] can hold it.`, view: view(lo, hi, undefined, { part: true }) });
    } else {
      lo = 0;
      hi = pivot - 1;
      steps.push({
        line: "side-left",
        note:
          pivot === 0
            ? `Step 2: ${target} is outside ${nums[0]}..${nums[n - 1]}, the whole array's range. The other part is empty, so it can't be anywhere.`
            : `Step 2: ${target} isn't in ${nums[pivot]}..${nums[n - 1]}, so only the part [0..${pivot - 1}] (${nums[0]}..${nums[pivot - 1]}) can hold it.`,
        view: view(lo, hi, undefined, { part: true }),
      });
    }
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (nums[mid] === target) {
        steps.push({ line: ["search", "found"], note: `Step 3: mid = ${mid}, nums[mid] = ${nums[mid]} is the target. Return ${mid}.`, view: view(lo, hi, mid, { part: true, found: true }) });
        return steps;
      }
      if (nums[mid] < target) {
        steps.push({ line: ["search", "higher"], note: `Step 3: mid = ${mid}, nums[mid] = ${nums[mid]} < ${target}: go right, lo = ${mid + 1}.`, view: view(lo, hi, mid, { part: true }) });
        lo = mid + 1;
      } else {
        steps.push({ line: ["search", "lower"], note: `Step 3: mid = ${mid}, nums[mid] = ${nums[mid]} > ${target}: go left, hi = ${mid - 1}.`, view: view(lo, hi, mid, { part: true }) });
        hi = mid - 1;
      }
    }
    steps.push({ line: "missing", note: `lo > hi: ${target} isn't in nums. Return -1. Two binary searches, O(log n) each.`, view: view(lo, hi) });
    return steps;
  },
});
