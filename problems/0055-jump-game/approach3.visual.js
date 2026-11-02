// Left to right: farthest is the furthest index reachable so far. Getting to an index beyond it means you're stuck.
DSAViz.register("0055-jump-game/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[3, 2, 1, 0, 4]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 6 }],
  trace({ nums }) {
    const n = nums.length;
    let farthest = 0;
    const steps = [];
    const view = (i, opts = {}) => {
      const marks = {};
      for (let k = 0; k <= Math.min(farthest, n - 1); k++) marks[k] = "window";
      for (let k = 0; k < (i ?? 0); k++) marks[k] = "visited";
      if (opts.done) for (let k = 0; k < n; k++) marks[k] = "visited";
      if (i !== undefined && i < n) marks[i] = opts.stuck ? "cut" : opts.grew ? "new" : "active";
      if (opts.final) marks[n - 1] = "match";
      const pointers = {};
      const f = Math.min(farthest, n - 1);
      if (i !== undefined && i < n && i !== f) pointers.i = i;
      pointers[i === f ? "i, farthest" : "farthest"] = f;
      return [
        { type: "array", label: "nums (outlined = reachable so far, grey = already looked at; i + nums[i] underneath)", values: nums, sub: nums.map((v, k) => k + v), marks, pointers },
        { type: "vars", items: [{ name: "farthest", value: farthest, mark: opts.grew ? "new" : "" }] },
      ];
    };
    steps.push({ line: "init", note: "farthest = 0: so far, all we know is that we can stand on index 0.", view: view(undefined) });
    for (let i = 0; i < n; i++) {
      if (i > farthest) {
        steps.push({
          line: ["scan", "stuck"],
          note: `i = ${i} but farthest = ${farthest}: no index before ${i} can jump this far, so neither ${i} nor anything after it is reachable. Return false.`,
          view: view(i, { stuck: true }),
        });
        return steps;
      }
      const before = farthest;
      farthest = Math.max(farthest, i + nums[i]);
      steps.push({
        line: ["scan", "reach"],
        note:
          farthest > before
            ? `${i} ≤ ${before}, so index ${i} is reachable. From it you can get to ${i + nums[i]}: farthest = ${farthest}${farthest >= n - 1 ? `, which covers the last index` : ""}.`
            : `${i} ≤ ${before}, so index ${i} is reachable. It gets to ${i + nums[i]}, no further than ${before}: farthest stays ${farthest}.`,
        view: view(i, { grew: farthest > before }),
      });
    }
    steps.push({ line: "return", note: `Every index was within reach, including the last one. Return true. One pass, one variable: O(n) time, O(1) space.`, view: view(undefined, { done: true, final: true }) });
    return steps;
  },
});
