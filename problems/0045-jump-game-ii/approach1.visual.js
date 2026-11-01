// DP: dp[i] = fewest jumps to reach i; from each i, every index it can jump to gets dp[i] + 1 if that's better.
DSAViz.register("0045-jump-game-ii/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, 3, 1, 1, 4]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 6 }],
  trace({ nums }) {
    const n = nums.length;
    let far = 0;
    for (let i = 0; i < n; i++) {
      if (i > far) throw new DSAViz.InputError(`The last index can't be reached (index ${i} is cut off). The problem guarantees it can; try [2, 3, 1, 1, 4].`);
      far = Math.max(far, i + nums[i]);
    }
    const steps = [];
    const dp = Array(n).fill(n);
    dp[0] = 0;
    let work = 0;
    const show = (v) => (v >= n ? "∞" : String(v));
    const view = (i, opts = {}) => {
      const marks = {};
      if (i !== undefined) {
        for (let j = i + 1; j <= Math.min(n - 1, i + nums[i]); j++) marks[j] = "window";
        marks[i] = "active";
      }
      const dmarks = {};
      (opts.improved || []).forEach((j) => (dmarks[j] = "new"));
      if (opts.final) dmarks[n - 1] = "match";
      return [
        { type: "array", label: "nums (shaded = one jump from i)", values: nums, marks, pointers: i !== undefined ? { i } : {} },
        { type: "array", label: "dp[i]: fewest jumps to reach i", values: dp.map(show), marks: dmarks },
        { type: "vars", items: [{ name: "updates tried", value: work }] },
      ];
    };

    steps.push({ line: "init", note: "dp[0] = 0: you start there. Every other index is ∞ until something reaches it.", view: view() });
    for (let i = 0; i < n; i++) {
      const top = Math.min(n - 1, i + nums[i]);
      const improved = [];
      for (let j = i + 1; j <= top; j++) {
        work++;
        if (dp[i] + 1 < dp[j]) {
          dp[j] = dp[i] + 1;
          improved.push(j);
        }
      }
      if (top <= i) {
        steps.push({ line: "from", note: i === n - 1 ? `Index ${i} is the last index: nothing to jump to.` : `nums[${i}] = 0: no jumps from index ${i}.`, view: view(i) });
        continue;
      }
      steps.push({
        line: ["from", "relax"],
        note:
          top === i + 1
            ? `From index ${i} (dp = ${dp[i]}), one jump reaches index ${top}, in ${dp[i] + 1}. ${improved.length ? "That's better than before." : "That's no better than before."}`
            : `From index ${i} (dp = ${dp[i]}), one jump reaches ${i + 1}..${top}: each can be reached in ${dp[i] + 1}. ${improved.length ? `Better for ${improved.join(", ")}.` : "None of them improves."}`,
        view: view(i, { improved }),
      });
    }
    steps.push({
      line: "return",
      note: `Return dp[${n - 1}] = ${dp[n - 1]}. It tried ${work} updates: up to n × max(nums), O(n · k).`,
      view: view(undefined, { final: true }),
    });
    return steps;
  },
});
