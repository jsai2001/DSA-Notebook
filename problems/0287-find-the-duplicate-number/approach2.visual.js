// Binary search on the value: if more than mid values are <= mid, the repeat is in 1..mid (pigeonhole).
DSAViz.register("0287-find-the-duplicate-number/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 3, 4, 2, 2]", minLength: 2, maxLength: 10, minValue: 1, maxValue: 9 }],
  trace({ nums }) {
    const n = nums.length - 1;
    if (nums.some((x) => x > n)) throw new DSAViz.InputError(`With ${n + 1} values, each must be 1 to ${n}.`);
    const cnt = {}; nums.forEach((x) => (cnt[x] = (cnt[x] || 0) + 1));
    if (Object.values(cnt).filter((c) => c > 1).length !== 1) throw new DSAViz.InputError("Exactly one value must repeat (it may appear more than twice).");
    let lo = 1, hi = n;
    const steps = [{ line: "init", note: `The duplicate is one of the values 1..${n}. Search that range, not the array.`, view: [{ type: "array", label: "nums", values: nums }, { type: "vars", items: [{ name: "lo", value: lo }, { name: "hi", value: hi }] }] }];
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      const count = nums.filter((x) => x <= mid).length;
      const left = count > mid;
      steps.push({ line: ["guess", "count", left ? "left" : "right"], note: `mid = ${mid}: ${count} value${count === 1 ? "" : "s"} are ≤ ${mid}. ${left ? `That's more than ${mid}, so two of them share a value in 1..${mid}: hi = ${mid}.` : `At most ${mid}, so 1..${mid} has no repeat: lo = ${mid + 1}.`}`, view: [{ type: "array", label: `nums (yellow = ≤ ${mid})`, values: nums, marks: Object.fromEntries(nums.map((x, k) => [k, x <= mid ? "compare" : ""]).filter(([, m]) => m)) }, { type: "vars", items: [{ name: "lo", value: left ? lo : mid + 1 }, { name: "hi", value: left ? mid : hi }, { name: "count", value: count, mark: left ? "cut" : "match" }] }] });
      if (left) hi = mid; else lo = mid + 1;
    }
    steps.push({ line: "return", note: `Return ${lo}. lo = hi. log n rounds, each counting all n values: O(n log n), O(1) space, and nums isn't changed.`, view: [{ type: "array", label: "nums", values: nums, marks: Object.fromEntries(nums.map((x, k) => [k, x === lo ? "match" : ""]).filter(([, m]) => m)) }] });
    return steps;
  },
});
