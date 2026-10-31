// Sort, fix the first number, then run Two Sum with a hash set on the rest.
DSAViz.register("0015-3sum/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[-1, 0, 1, 2, -1, -4]", minLength: 3, maxLength: 8, minValue: -9, maxValue: 9 }],
  trace({ nums: input }) {
    const nums = input.slice().sort((a, b) => a - b);
    const n = nums.length;
    const steps = [];
    const found = new Map();
    let seen = [];
    const view = (i, j, opts = {}) => {
      const marks = {};
      if (i !== undefined) marks[i] = "active";
      if (opts.skip !== undefined) marks[opts.skip] = "visited";
      if (j !== undefined) marks[j] = opts.hit ? "match" : "compare";
      const pointers = {};
      if (i !== undefined) pointers.i = i;
      if (j !== undefined) pointers.j = j;
      if (opts.skip !== undefined) pointers.i = opts.skip;
      return [
        { type: "array", label: "nums (sorted)", values: nums, marks, pointers },
        { type: "set", label: "seen: values between i and j", items: seen.slice(), marks: opts.need !== undefined && opts.hit ? { [opts.need]: "match" } : opts.stored !== undefined ? { [opts.stored]: "new" } : {} },
        { type: "set", label: "found", items: [...found.keys()].map((k) => `[${k}]`), marks: opts.newKey ? { [`[${opts.newKey}]`]: "new" } : {} },
        { type: "vars", items: [{ name: "need", value: opts.need === undefined ? "–" : opts.need, mark: opts.hit ? "match" : "" }] },
      ];
    };
    steps.push({
      line: "init",
      note: `Sort: [${nums.join(", ")}]. Then each triplet found comes out in increasing order, which makes repeats easy to spot.`,
      view: view(),
    });
    for (let i = 0; i < n; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) {
        steps.push({ line: "skip", note: `nums[${i}] = ${nums[i]} is the same first number as last time: it would find the same triplets. Skip it.`, view: view(undefined, undefined, { skip: i }) });
        continue;
      }
      seen = [];
      steps.push({ line: "fix", note: `Fix nums[${i}] = ${nums[i]}. Now find two numbers to its right that add up to ${-nums[i]}: that's Two Sum.`, view: view(i) });
      for (let j = i + 1; j < n; j++) {
        const need = -nums[i] - nums[j];
        const hit = seen.includes(need);
        let newKey;
        if (hit) {
          const key = `${nums[i]}, ${need}, ${nums[j]}`;
          if (!found.has(key)) newKey = key;
          found.set(key, true);
        }
        steps.push({
          line: hit ? ["scan", "need", "check", "found"] : ["scan", "need", "check"],
          note:
            `nums[${j}] = ${nums[j]} needs ${-nums[i]} - ${nums[j]} = ${need}. ` +
            (hit
              ? `${need} is in seen: [${nums[i]}, ${need}, ${nums[j]}]` + (newKey ? `. Add it.` : `, already found.`)
              : `${need} isn't in seen yet.`),
          view: view(i, j, { need, hit, newKey }),
        });
        if (!seen.includes(nums[j])) seen.push(nums[j]);
        steps.push({ line: "store", note: `Add ${nums[j]} to seen for the numbers after it.`, view: view(i, j, { stored: nums[j] }) });
      }
    }
    steps.push({
      line: "return",
      note: `Return ${found.size} triplet${found.size === 1 ? "" : "s"}. One Two Sum pass per first number: O(n²) time, plus O(n) for the set.`,
      view: view(),
    });
    return steps;
  },
});
