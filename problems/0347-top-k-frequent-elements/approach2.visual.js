// Count, then keep a min-heap of the k most frequent values; push each, drop the least frequent when over k.
(function () {
DSAViz.register("0347-top-k-frequent-elements/approach2", {
  inputs: [
    { name: "nums", type: "int[]", value: "[4, 1, 4, 2, 2, 4, 3, 1, 4, 1, 5]", minLength: 1, maxLength: 12 },
    { name: "k", type: "int", value: "2", min: 1, max: 12 },
  ],
  trace({ nums, k }) {
    check(nums, k);
    const steps = [];
    const { count, cview } = counter(nums, steps, "count");
    const heap = [];
    const less = (a, b) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
    const up = () => { let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (!less(heap[i], heap[p])) break; [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } };
    const down = () => { let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < heap.length && less(heap[l], heap[m])) m = l; if (r < heap.length && less(heap[r], heap[m])) m = r; if (m === i) break; [heap[i], heap[m]] = [heap[m], heap[i]]; i = m; } };
    const hview = (marks = {}) => ({ type: "tree", label: "min-heap by count; caption = count", values: heap.map(([, x]) => x), captions: Object.fromEntries(heap.map(([c], i) => [i, `×${c}`])), marks });
    for (const [x, c] of count) {
      heap.push([c, x]);
      up();
      const at = heap.findIndex((h) => h[1] === x);
      steps.push({ line: "push", note: `Push ${x} (×${c}).`, view: [cview({ [x]: "active" }), hview({ [at]: "new" })] });
      if (heap.length > k) {
        const [dc, dx] = heap[0];
        steps.push({ line: "pop", note: `${heap.length} in the heap, more than k = ${k}. Drop the top: ${dx} (×${dc}) is the least frequent.`, view: [cview({ [dx]: "cut" }), hview({ 0: "cut" })] });
        heap[0] = heap[heap.length - 1];
        heap.pop();
        down();
      }
    }
    const ans = heap.map((h) => h[1]);
    steps.push({ line: "return", note: `Return [${ans.join(", ")}]: what's left in the heap. The heap never holds more than k + 1, so O(n log k).`, view: [hview(Object.fromEntries(heap.map((_, i) => [i, "match"])))] });
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
