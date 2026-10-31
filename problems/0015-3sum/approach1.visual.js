// Brute force: try every triple of indexes; keep sorted triplets in a set so repeats count once.
DSAViz.register("0015-3sum/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[-1, 0, 1, 2, -1, -4]", minLength: 3, maxLength: 6, minValue: -9, maxValue: 9 }],
  trace({ nums }) {
    const n = nums.length;
    const steps = [];
    const found = new Map(); // "a,b,c" -> triplet
    const view = (i, j, k, opts = {}) => {
      const marks = {};
      if (i !== undefined) [i, j, k].forEach((x) => (marks[x] = opts.hit ? "match" : "active"));
      return [
        { type: "array", label: "nums", values: nums, marks, pointers: i !== undefined ? { i, j, k } : {} },
        { type: "set", label: "found (sorted triplets)", items: [...found.keys()].map((key) => `[${key}]`), marks: opts.newKey ? { [`[${opts.newKey}]`]: "new" } : {} },
        { type: "vars", items: [{ name: "sum", value: opts.sum === undefined ? "–" : opts.sum, mark: opts.hit ? "match" : "" }] },
      ];
    };
    steps.push({
      line: "init",
      note: `Try all ${(n * (n - 1) * (n - 2)) / 6} triples i < j < k. Store each hit sorted, so the same three numbers found in a different order count once.`,
      view: view(),
    });
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        for (let k = j + 1; k < n; k++) {
          const sum = nums[i] + nums[j] + nums[k];
          if (sum !== 0) {
            steps.push({ line: ["pick", "check"], note: `${nums[i]} + ${nums[j]} + ${nums[k]} = ${sum}. Not 0.`, view: view(i, j, k, { sum }) });
            continue;
          }
          const key = [nums[i], nums[j], nums[k]].sort((a, b) => a - b).join(", ");
          const dup = found.has(key);
          found.set(key, true);
          steps.push({
            line: ["pick", "check", "found"],
            note: `${nums[i]} + ${nums[j]} + ${nums[k]} = 0. Sorted: [${key}].` + (dup ? ` Already in the set, so it isn't added twice.` : ` Add it.`),
            view: view(i, j, k, { sum, hit: true, newKey: dup ? undefined : key }),
          });
        }
      }
    }
    steps.push({
      line: "return",
      note: `Return ${found.size} triplet${found.size === 1 ? "" : "s"}. That was every triple: O(n³), about 4.5 × 10⁹ at n = 3000.`,
      view: view(),
    });
    return steps;
  },
});
