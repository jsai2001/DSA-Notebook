// One-pass hash map: for each number, look up target - num among the values seen so far.
DSAViz.register("0001-two-sum/approach2", {
  inputs: [
    { name: "nums", type: "int[]", value: "[3, 2, 4]", minLength: 2, maxLength: 10 },
    { name: "target", type: "int", value: "6" },
  ],

  trace({ nums, target }) {
    const steps = [];
    const seen = new Map(); // value -> index, in insertion order

    // Elements before i are "visited" (already in the map).
    const arrayMarks = (i, extra) => {
      const marks = {};
      for (let k = 0; k < i; k++) marks[k] = "visited";
      if (i < nums.length) marks[i] = "active";
      return Object.assign(marks, extra);
    };
    const view = (i, marks, mapMarks, vars) => [
      { type: "array", label: "nums", values: nums, pointers: i < nums.length ? { i } : {}, marks },
      {
        type: "map",
        label: "seen {value: index}",
        columns: ["value", "index"],
        entries: Array.from(seen.entries()),
        marks: mapMarks,
      },
      { type: "vars", items: [{ name: "target", value: target }, ...vars] },
    ];

    steps.push({
      line: "init",
      note: "Start with an empty map. It will remember each value we pass and its index.",
      view: view(nums.length, {}, {}, []),
    });

    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      const complement = target - num;
      const vars = [
        { name: "i", value: i },
        { name: "num", value: num },
        { name: "complement", value: complement, mark: "compare" },
      ];

      steps.push({
        line: "complement",
        note: `i = ${i}: num = ${num}, so we need complement = ${target} - ${num} = ${complement}.`,
        view: view(i, arrayMarks(i), {}, vars),
      });

      if (seen.has(complement)) {
        const j = seen.get(complement);
        const matchVars = vars.map((v) => (v.name === "complement" ? { ...v, mark: "match" } : v));
        steps.push({
          line: "check",
          note: `${complement} is in seen at index ${j}. nums[${j}] + nums[${i}] = ${complement} + ${num} = ${target}.`,
          view: view(i, arrayMarks(i, { [j]: "match", [i]: "match" }), { [complement]: "match" }, matchVars),
        });
        steps.push({
          line: "found",
          note: `Return [${j}, ${i}]. One pass: we looked at ${i + 1} of ${nums.length} elements, each lookup O(1).`,
          view: view(i, arrayMarks(i, { [j]: "match", [i]: "match" }), { [complement]: "match" }, matchVars),
        });
        return steps;
      }

      steps.push({
        line: "check",
        note: `${complement} is not in seen yet, so no pair ends at index ${i}.`,
        view: view(i, arrayMarks(i), {}, vars),
      });

      const updating = seen.has(num);
      seen.set(num, i);
      steps.push({
        line: "store",
        note: updating
          ? `${num} was already in seen; update it to the newer index ${i}.`
          : `Store ${num} → ${i}, so a later number that needs ${num} can find it.`,
        view: view(i, arrayMarks(i), { [num]: "new" }, vars),
      });
    }

    steps.push({
      line: "notfound",
      note: `Reached the end without finding a pair that adds up to ${target}. (LeetCode guarantees one exists.)`,
      view: view(nums.length, arrayMarks(nums.length), {}, []),
    });
    return steps;
  },
});
