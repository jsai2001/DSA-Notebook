// Sweep queries left to right. Push intervals that have started into a min-heap by size; drop ones that already ended.
(function () {
const INPUTS = [
  { name: "intervals", type: "int[][]", value: "[[1, 4], [2, 4], [3, 6], [4, 4]]", maxRows: 6, maxCols: 2, minValue: 1, maxValue: 99 },
  { name: "queries", type: "int[]", value: "[2, 3, 4, 5]", minLength: 1, maxLength: 6, minValue: 1, maxValue: 99 },
];
function check(iv) {
  if (!iv.length) throw new DSAViz.InputError("Give at least one interval.");
  if (iv.some((x) => x.length !== 2)) throw new DSAViz.InputError("Each interval is [left, right], like [[1, 4], [2, 4]].");
  if (iv.some(([l, r]) => l > r)) throw new DSAViz.InputError("Each interval needs left ≤ right.");
}
const ivv = (iv, label, marks = {}) => ({ type: "array", label, values: iv.map(([l, r]) => `[${l}, ${r}]`), wide: true, marks, sub: iv.map(([l, r]) => `size ${r - l + 1}`) });
const show = (a) => `[${a.join(", ")}]`;
DSAViz.register("1851-minimum-interval-to-include-each-query/approach3", {
  inputs: INPUTS,
  trace({ intervals, queries }) {
    check(intervals);
    const iv = [...intervals].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const heap = [];
    const less = (a, b) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
    const up = () => { let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (!less(heap[i], heap[p])) break; [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } };
    const down = () => { let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < heap.length && less(heap[l], heap[m])) m = l; if (r < heap.length && less(heap[r], heap[m])) m = r; if (m === i) break; [heap[i], heap[m]] = [heap[m], heap[i]]; i = m; } };
    const hv = (marks = {}) => ({ type: "tree", label: "min-heap by size; caption = right end", values: heap.map(([s]) => s), captions: Object.fromEntries(heap.map(([, r], i) => [i, `ends ${r}`])), marks });
    const at = {};
    let i = 0;
    const steps = [{ line: "init", note: "Sort intervals by left end and the query points from left to right.", view: [ivv(iv, "intervals by left end"), hv()] }];
    for (const q of [...new Set(queries)].sort((a, b) => a - b)) {
      const added = [];
      while (i < iv.length && iv[i][0] <= q) { heap.push([iv[i][1] - iv[i][0] + 1, iv[i][1]]); up(); added.push(i); i++; }
      if (added.length) steps.push({ line: ["query", "push"], note: `Query ${q}: push ${added.map((k) => `[${iv[k]}]`).join(", ")}: they start at or before ${q}.`, view: [ivv(iv, "intervals by left end", Object.fromEntries(added.map((k) => [k, "new"]))), hv()] });
      const dropped = [];
      while (heap.length && heap[0][1] < q) { dropped.push(heap[0]); heap[0] = heap[heap.length - 1]; heap.pop(); down(); }
      if (dropped.length) steps.push({ line: "pop", note: `The top ended before ${q}: pop ${dropped.map(([s, r]) => `size ${s} (ends ${r})`).join(", ")}. Later queries are bigger, so they're gone for good.`, view: [ivv(iv, "intervals by left end"), hv()] });
      at[q] = heap.length ? heap[0][0] : -1;
      steps.push({ line: ["query", "answer"], note: heap.length ? `Query ${q}: the heap top contains ${q} and is the smallest started interval still open. Answer ${at[q]}.` : `Query ${q}: the heap is empty. Answer −1.`, view: [ivv(iv, "intervals by left end"), hv(heap.length ? { 0: "match" } : {})] });
    }
    const ans = queries.map((q) => at[q]);
    steps.push({ line: "return", note: `Return ${show(ans)}, in the queries' order. Each interval is pushed and popped once: O(n log n + q log q).`, view: [hv()] });
    return steps;
  },
});
})();
