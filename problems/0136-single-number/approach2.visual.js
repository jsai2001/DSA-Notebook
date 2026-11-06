// Sort so equal values sit together, then check the pairs (0, 1), (2, 3), ...
(function () {
DSAViz.register("0136-single-number/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[4, 1, 2, 1, 2]", minLength: 1, maxLength: 9, minValue: -99, maxValue: 99 }],
  trace({ nums }) {
    checkNums(nums);
    const a = [...nums].sort((x, y) => x - y);
    const steps = [];
    const view = (o = {}) => {
      const marks = {};
      for (let k = 0; k < (o.i ?? 0); k++) marks[k] = "visited";
      if (o.i !== undefined && o.i + 1 < a.length) { marks[o.i] = o.broken ? "match" : "window"; marks[o.i + 1] = o.broken ? "cut" : "window"; }
      if (o.last) marks[a.length - 1] = "match";
      return [{ type: "array", label: "sorted (dashed = pairs that matched; green = the single number)", values: a, marks, pointers: o.i !== undefined && o.i < a.length ? { i: o.i } : {} }];
    };
    steps.push({ line: "sort", note: `Sort: ${a.join(", ")}. Each pair of equal values is now side by side.`, view: view() });
    for (let i = 0; i + 1 < a.length; i += 2) {
      if (a[i] !== a[i + 1]) {
        steps.push({ line: ["pair", "broken"], note: `Pair (${i}, ${i + 1}): ${a[i]} ≠ ${a[i + 1]}. Everything before matched in pairs, so ${a[i]} is the one without a partner. Return ${a[i]}.`, view: view({ i, broken: true }) });
        return steps;
      }
      steps.push({ line: "pair", note: `Pair (${i}, ${i + 1}): ${a[i]} = ${a[i + 1]}. Next pair.`, view: view({ i }) });
    }
    steps.push({ line: "last", note: `Every pair matched, so the single number is the last one. Return ${a[a.length - 1]}. Sorting costs O(n log n).`, view: view({ i: a.length - 1, last: true }) });
    return steps;
  },
});

// Every value twice except one, as the problem promises.
function checkNums(nums) {
  const c = new Map();
  nums.forEach((x) => c.set(x, (c.get(x) || 0) + 1));
  const once = [...c].filter(([, k]) => k === 1);
  if ([...c.values()].some((k) => k > 2) || once.length !== 1) throw new DSAViz.InputError("Every number must appear exactly twice, except one that appears once, like [4, 1, 2, 1, 2].");
}
})();
