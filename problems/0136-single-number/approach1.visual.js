// Count each value in a hash map, then find the one counted once.
(function () {
DSAViz.register("0136-single-number/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[4, 1, 2, 1, 2]", minLength: 1, maxLength: 9, minValue: -99, maxValue: 99 }],
  trace({ nums }) {
    checkNums(nums);
    const steps = [];
    const count = new Map();
    const view = (o = {}) => [
      { type: "array", label: "nums", values: nums, marks: o.k !== undefined ? { [o.k]: "active" } : {}, pointers: o.k !== undefined ? { x: o.k } : {} },
      { type: "map", label: "count", columns: ["value", "times seen"], entries: [...count].map(([x, c]) => [String(x), String(c)]), marks: o.key !== undefined ? { [String(o.key)]: o.found ? "match" : "new" } : {} },
    ];
    steps.push({ line: "init", note: "Count how many times each value appears.", view: view() });
    nums.forEach((x, k) => {
      count.set(x, (count.get(x) || 0) + 1);
      steps.push({ line: "count", note: `${x}: seen ${count.get(x)} time${count.get(x) === 1 ? "" : "s"} so far.`, view: view({ k, key: x }) });
    });
    const [single] = [...count].find(([, c]) => c === 1);
    steps.push({ line: "find", note: `${single} is the only value counted once. Return ${single}. O(n) time, but the map holds up to n / 2 + 1 values.`, view: view({ key: single, found: true }) });
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
