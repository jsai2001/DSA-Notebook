// Monotonic deque of indexes: values go down from front to back, so the front is always the window's max.
(function () {
const win = (i, k, extra = {}) => ({ ...Object.fromEntries(Array.from({ length: k }, (_, j) => [i + j, "window"])), ...extra });
DSAViz.register("0239-sliding-window-maximum/approach3", {
  inputs: [
    { name: "nums", type: "int[]", value: "[1, 3, -1, -3, 5, 3, 6, 7]", minLength: 1, maxLength: 10, minValue: -10000, maxValue: 10000 },
    { name: "k", type: "int", value: "3", min: 1, max: 10 },
  ],
  trace({ nums, k }) {
    if (k > nums.length) throw new DSAViz.InputError(`k must be between 1 and ${nums.length} (the length of nums).`);
    const dq = [];
    const res = [];
    const steps = [];
    const view = (i, o = {}) => [{ type: "array", label: "nums (outlined = the window, dark = i)", values: nums, marks: i === undefined ? {} : i >= k - 1 ? win(i - k + 1, k, { [i]: "active" }) : { [i]: "active" }, pointers: i === undefined ? {} : { i } }, { type: "array", label: "deque: value @ index, front on the left (green = front = max)", values: dq.map((j) => `${nums[j]} @ ${j}`), wide: true, marks: dq.length && o.rec ? { 0: "match" } : {} }, { type: "array", label: "res", values: res.slice(), marks: o.rec ? { [res.length - 1]: "new" } : {} }];
    steps.push({ line: "init", note: "An empty deque. It keeps only values that could still become a window's max.", view: view() });
    nums.forEach((x, i) => {
      const popped = [];
      while (dq.length && nums[dq[dq.length - 1]] <= x) popped.push(dq.pop());
      dq.push(i);
      let out = null;
      if (dq[0] <= i - k) out = dq.shift();
      const rec = i >= k - 1;
      if (rec) res.push(nums[dq[0]]);
      const parts = [`nums[${i}] = ${x}.`];
      if (popped.length) parts.push(`Pop ${popped.map((j) => nums[j]).join(", ")} from the back: smaller than or equal to ${x} and older, so never a max again.`);
      parts.push(`Push ${x} @ ${i}.`);
      if (out !== null) parts.push(`The front (index ${out}) slid out of the window: drop it.`);
      if (rec) parts.push(`Max = the front, ${nums[dq[0]]}.`);
      steps.push({ line: ["step", "pop", "push", "out", "record"], note: parts.join(" "), view: view(i, { rec }) });
    });
    steps.push({ line: "return", note: `Return [${res.join(", ")}]. Each index is pushed once and popped at most once: O(n) time, O(k) space.`, view: view() });
    return steps;
  },
});
})();
