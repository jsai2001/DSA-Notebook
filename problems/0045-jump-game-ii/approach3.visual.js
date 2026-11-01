// Greedy by levels: the indices reachable with k jumps form a window; scanning it gives the next window's end.
DSAViz.register("0045-jump-game-ii/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, 3, 1, 1, 4]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 6 }],
  trace({ nums }) {
    const n = nums.length;
    let far = 0;
    for (let i = 0; i < n; i++) {
      if (i > far) throw new DSAViz.InputError(`The last index can't be reached (index ${i} is cut off). The problem guarantees it can; try [2, 3, 1, 1, 4].`);
      far = Math.max(far, i + nums[i]);
    }
    const steps = [];
    let jumps = 0;
    let end = 0;
    let start = 0; // first index of the current window, for the picture
    let farthest = 0;
    const view = (i, opts = {}) => {
      const marks = {};
      for (let k = 0; k < start; k++) marks[k] = "visited";
      for (let k = start; k <= Math.min(end, n - 1); k++) marks[k] = "window";
      if (i !== undefined) marks[i] = "active";
      if (opts.final) marks[n - 1] = "match";
      const pointers = {};
      const add = (name, idx) => {
        const key = Object.keys(pointers).find((k) => pointers[k] === idx);
        if (key) {
          delete pointers[key];
          pointers[`${key}, ${name}`] = idx;
        } else pointers[name] = idx;
      };
      if (i !== undefined) add("i", i);
      add("end", Math.min(end, n - 1));
      add("farthest", Math.min(farthest, n - 1));
      return [
        { type: "array", label: `nums (shaded = reachable with ${jumps} jump${jumps === 1 ? "" : "s"}; i + nums[i] underneath)`, values: nums, sub: nums.map((v, k) => k + v), marks, pointers },
        { type: "vars", items: [{ name: "jumps", value: jumps, mark: opts.jumped ? "new" : "" }, { name: "end", value: end }, { name: "farthest", value: farthest }] },
      ];
    };

    steps.push({ line: "init", note: "With 0 jumps you can only be at index 0, so the first window is just [0]. end = 0 is where it stops.", view: view() });
    if (n === 1) {
      steps.push({ line: "return", note: "There's only one index: you're already at the end. Return 0.", view: view(undefined, { final: true }) });
      return steps;
    }
    for (let i = 0; i < n - 1; i++) {
      const before = farthest;
      farthest = Math.max(farthest, i + nums[i]);
      steps.push({
        line: "scan",
        note: `Index ${i} can reach ${i + nums[i]}. farthest = max(${before}, ${i + nums[i]}) = ${farthest}: the furthest any index in this window gets with one more jump.`,
        view: view(i),
      });
      if (i === end) {
        jumps++;
        start = end + 1;
        end = farthest;
        steps.push({
          line: "level",
          note: `i reached end: every index reachable with ${jumps - 1} jump${jumps - 1 === 1 ? "" : "s"} has been looked at. Take jump ${jumps}; it can land anywhere up to ${Math.min(end, n - 1)}${end >= n - 1 ? `, which covers the last index` : ""}.`,
          view: view(i, { jumped: true }),
        });
      }
    }
    steps.push({
      line: "return",
      note: `The loop stops before the last index (standing there needs no jump). Return ${jumps}. One pass and three variables: O(n) time, O(1) space.`,
      view: view(undefined, { final: true }),
    });
    return steps;
  },
});
