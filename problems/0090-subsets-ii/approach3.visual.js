// Build up: each new number extends every subset so far; a repeat extends only the ones made in the last round.
DSAViz.register("0090-subsets-ii/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, 1, 2]", minLength: 1, maxLength: 5, minValue: -10, maxValue: 10 }],
  trace({ nums: given }) {
    const nums = [...given].sort((a, b) => a - b);
    const n = nums.length;
    const steps = [];
    const result = [[]];
    let added = 0;
    const fmt = (a) => `[${a.join(", ")}]`;
    const view = (i, o = {}) => {
      const marks = {};
      if (i !== undefined) {
        for (let k = 0; k < i; k++) marks[k] = "visited";
        if (i < n) marks[i] = "active";
      } else if (o.all) nums.forEach((_, k) => (marks[k] = "visited"));
      const rm = {};
      if (o.from) for (let k = o.from[0]; k < o.from[1]; k++) rm[k] = "compare";
      if (o.old) for (let k = 0; k < o.old; k++) rm[k] = rm[k] || "ghost";
      if (o.fresh) for (let k = result.length - o.fresh; k < result.length; k++) rm[k] = "new";
      return [
        { type: "array", label: "nums, sorted", values: nums, marks, pointers: i !== undefined && i < n ? { i } : {} },
        { type: "array", label: `result (${result.length})${o.from ? ": orange = extended this round, faded = left alone" : ""}`, values: result.map(fmt), wide: true, marks: rm },
        { type: "vars", items: [{ name: "added", value: `${added} (last round's subsets start here)` }] },
      ];
    };
    const sortedNote = given.join() === nums.join() ? "" : ` Sort first: ${fmt(nums)}.`;
    steps.push({ line: "init", note: `Start with just the empty subset, and add the numbers one at a time.${sortedNote}`, view: view(0) });
    nums.forEach((x, i) => {
      const repeat = i > 0 && x === nums[i - 1];
      const begin = repeat ? added : 0;
      const end = result.length;
      steps.push({
        line: ["next", "begin"],
        note: repeat
          ? `${x} again. Only the subsets from the last round (index ${begin} on) already used the previous ${x}; extending older ones would make subsets that already exist.`
          : `${x} is new: every subset so far (${end}) gets a copy with ${x} on the end.`,
        view: view(i, { from: [begin, end], old: begin }),
      });
      added = end;
      for (let j = begin; j < end; j++) result.push(result[j].concat([x]));
      steps.push({
        line: "extend",
        note: `Added ${result.slice(end).map(fmt).join(", ")}. Now ${result.length} subsets.`,
        view: view(i, { from: [begin, end], old: begin, fresh: end - begin }),
      });
    });
    steps.push({ line: "return", note: `Return all ${result.length}. No repeats were ever built, and no recursion.`, view: view(undefined, { all: true }) });
    return steps;
  },
});
