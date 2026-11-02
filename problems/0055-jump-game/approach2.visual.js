// Move the goal left: whenever i can land on the current goal, reaching i is enough, so i becomes the goal.
DSAViz.register("0055-jump-game/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, 3, 1, 1, 4]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 6 }],
  trace({ nums }) {
    const n = nums.length;
    let goal = n - 1;
    const goals = new Set([goal]); // every index that was the goal at some point reaches the end
    const steps = [];
    const view = (i, opts = {}) => {
      const marks = {};
      for (let k = i === undefined ? n : i + 1; k < n; k++) marks[k] = "visited";
      goals.forEach((k) => (marks[k] = "window"));
      if (i !== undefined) marks[i] = opts.moved ? "new" : opts.miss ? "cut" : "active";
      marks[goal] = opts.final ? (goal === 0 ? "match" : "cut") : marks[goal] === "new" ? "new" : "match";
      const pointers = {};
      if (i !== undefined && i !== goal) pointers.i = i;
      pointers[i === goal ? "i, goal" : "goal"] = goal;
      return [
        { type: "array", label: "nums (i + nums[i] underneath; green = goal, outlined = earlier goals)", values: nums, sub: nums.map((v, k) => k + v), marks, pointers },
        { type: "vars", items: [{ name: "goal", value: goal, mark: opts.moved ? "new" : "" }] },
      ];
    };
    steps.push({ line: "init", note: `goal = ${n - 1}, the last index: from there you're already done. The question becomes "can we reach goal?", and goal moves left whenever it can.`, view: view(undefined) });
    for (let i = n - 2; i >= 0; i--) {
      if (i + nums[i] >= goal) {
        const old = goal;
        goal = i;
        goals.add(i);
        steps.push({
          line: ["scan", "move"],
          note: `${i} + ${nums[i]} = ${i + nums[i]} ≥ ${old}: from ${i} you can land on ${old}${i + nums[i] > old ? ` (a shorter jump is allowed)` : ""}. So reaching ${i} is enough: goal = ${i}.`,
          view: view(i, { moved: true }),
        });
      } else {
        steps.push({ line: "scan", note: `${i} + ${nums[i]} = ${i + nums[i]} < ${goal}: from ${i} you can't get to goal ${goal}. Leave goal where it is.`, view: view(i, { miss: true }) });
      }
    }
    steps.push({
      line: "return",
      note: goal === 0
        ? `goal reached 0, where we start. Return true. One pass, one variable: O(n) time, O(1) space.`
        : `goal stopped at ${goal}: nothing to its left can get there, so index 0 can't reach the end. Return false.`,
      view: view(undefined, { final: true }),
    });
    return steps;
  },
});
