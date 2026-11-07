// Count, then put each value in bucket[count]; read the buckets from the biggest count down.
(function () {
DSAViz.register("0347-top-k-frequent-elements/approach3", {
  inputs: [
    { name: "nums", type: "int[]", value: "[4, 1, 4, 2, 2, 4, 3, 1, 4, 1, 5]", minLength: 1, maxLength: 12 },
    { name: "k", type: "int", value: "2", min: 1, max: 12 },
  ],
  trace({ nums, k }) {
    check(nums, k);
    const steps = [];
    const { count, cview } = counter(nums, steps, "count");
    const bucket = Array.from({ length: nums.length + 1 }, () => []);
    const bview = (marks = {}) => ({ type: "array", label: "bucket[c] = values seen exactly c times", values: bucket.map((b) => (b.length ? b.join(" ") : "·")), marks, wide: true });
    for (const [x, c] of count) {
      bucket[c].push(x);
      steps.push({ line: "bucket", note: `${x} appears ${c} time${c > 1 ? "s" : ""}: put it in bucket[${c}].`, view: [cview({ [x]: "active" }), bview({ [c]: "new" })] });
    }
    const ans = [];
    const aview = () => ({ type: "array", label: `answer (${ans.length} of ${k})`, values: ans.length ? [...ans] : ["—"], marks: ans.length ? { [ans.length - 1]: "new" } : { 0: "ghost" } });
    for (let c = nums.length; c > 0; c--) {
      for (const x of bucket[c]) {
        ans.push(x);
        if (ans.length === k) {
          steps.push({ line: ["take", "return"], note: `Take ${x} from bucket[${c}]. That's ${k}: return [${ans.join(", ")}].`, view: [bview({ [c]: "match" }), aview()] });
          steps.push({ line: "return", note: `Return [${ans.join(", ")}]. No sort: counts are at most n, so the buckets do it in O(n).`, view: [aview()] });
          return steps;
        }
        steps.push({ line: "take", note: `Biggest count left with values: bucket[${c}]. Take ${x}.`, view: [bview({ [c]: "active" }), aview()] });
      }
    }
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
