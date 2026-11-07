// A max-heap of (value, index). Old tops whose index left the window are thrown away only when they reach the top.
(function () {
const win = (i, k, extra = {}) => ({ ...Object.fromEntries(Array.from({ length: k }, (_, j) => [i + j, "window"])), ...extra });
DSAViz.register("0239-sliding-window-maximum/approach2", {
  inputs: [
    { name: "nums", type: "int[]", value: "[1, 3, -1, -3, 5, 3, 6, 7]", minLength: 1, maxLength: 10, minValue: -10000, maxValue: 10000 },
    { name: "k", type: "int", value: "3", min: 1, max: 10 },
  ],
  trace({ nums, k }) {
    if (k > nums.length) throw new DSAViz.InputError(`k must be between 1 and ${nums.length} (the length of nums).`);
    let heap = [];
    const res = [];
    const steps = [];
    const view = (i, o = {}) => [{ type: "array", label: "nums (outlined = the window ending at i)", values: nums, marks: i >= k - 1 ? win(i - k + 1, k, { [i]: "active" }) : { [i]: "active" }, pointers: { i } }, { type: "array", label: "heap, biggest first (value @ index; red = slid out, thrown away)", values: (o.show || heap).map(([v, j]) => `${v} @ ${j}`), wide: true, marks: o.hm || {} }, { type: "array", label: "res", values: res.slice(), marks: o.rec ? { [res.length - 1]: "new" } : {} }];
    const sort = () => heap.sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    nums.forEach((x, i) => {
      heap.push([x, i]);
      sort();
      if (i < k - 1) { steps.push({ line: "push", note: `Push ${x} @ ${i}. The first window isn't full yet.`, view: view(i) }); return; }
      const dropped = [];
      const before = heap.slice();
      while (heap[0][1] <= i - k) dropped.push(heap.shift());
      res.push(heap[0][0]);
      steps.push({ line: ["push", "drop", "top"], note: `Push ${x} @ ${i}.${dropped.length ? ` The top ${dropped.map(([v, j]) => `${v} @ ${j}`).join(", ")} is outside the window (index ≤ ${i - k}): pop it.` : ""} The top, ${heap[0][0]}, is the max.`, view: view(i, { show: before, hm: { ...Object.fromEntries(dropped.map((_, j) => [j, "cut"])), [dropped.length]: "match" }, rec: true }) });
    });
    steps.push({ line: "return", note: `Return [${res.join(", ")}]. Old values stay in the heap until they reach the top, so it can hold up to n entries: O(n log n).`, view: view(nums.length - 1) });
    return steps;
  },
});
})();
