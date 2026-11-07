// Count each value, sort the values by count, take the first k.
(function () {
DSAViz.register("0347-top-k-frequent-elements/approach1", {
  inputs: [
    { name: "nums", type: "int[]", value: "[1, 1, 1, 2, 2, 3]", minLength: 1, maxLength: 12 },
    { name: "k", type: "int", value: "2", min: 1, max: 12 },
  ],
  trace({ nums, k }) {
    check(nums, k);
    const steps = [];
    const { count, cview } = counter(nums, steps, "count");
    const order = [...count.keys()].sort((a, b) => count.get(b) - count.get(a));
    const oview = (marks = {}) => ({ type: "array", label: "values, most frequent first", values: order, sub: order.map((x) => `×${count.get(x)}`), marks, cut: k < order.length ? k : undefined });
    steps.push({ line: "sort", note: `Sort the ${order.length} different values by count, biggest first.`, view: [cview(), oview()] });
    const ans = order.slice(0, k);
    steps.push({ line: "return", note: `Return [${ans.join(", ")}]: the first ${k}. The sort makes it O(n log n).`, view: [oview(Object.fromEntries(ans.map((_, i) => [i, "match"])))] });
    return steps;
  },
});
function check(nums, k) {
  const count = new Map();
  for (const x of nums) count.set(x, (count.get(x) || 0) + 1);
  if (k < 1 || k > count.size) throw new DSAViz.InputError(`k must be 1 to ${count.size} (the number of different values).`);
  const c = [...count.values()].sort((a, b) => b - a);
  if (k < c.length && c[k - 1] === c[k]) throw new DSAViz.InputError(`The answer must be unique: places ${k} and ${k + 1} by count are tied at ${c[k]}, so the top ${k} isn't one set. Change k or nums.`);
}
function counter(nums, steps, line, extra = () => []) {
  const count = new Map();
  const cview = (marks = {}) => ({ type: "map", label: "count", columns: ["value", "times"], entries: [...count], marks });
  nums.forEach((x, i) => {
    count.set(x, (count.get(x) || 0) + 1);
    steps.push({ line, note: `Count ${x}: seen ${count.get(x)} time${count.get(x) > 1 ? "s" : ""}.`, view: [{ type: "array", label: "nums", values: nums, marks: { [i]: "active" }, pointers: { i } }, cview({ [x]: "new" }), ...extra()] });
  });
  return { count, cview };
}
})();
