// Every window: look at all k values and take the biggest.
(function () {
const win = (i, k, extra = {}) => ({ ...Object.fromEntries(Array.from({ length: k }, (_, j) => [i + j, "window"])), ...extra });
DSAViz.register("0239-sliding-window-maximum/approach1", {
  inputs: [
    { name: "nums", type: "int[]", value: "[1, 3, -1, -3, 5, 3, 6, 7]", minLength: 1, maxLength: 10, minValue: -10000, maxValue: 10000 },
    { name: "k", type: "int", value: "3", min: 1, max: 10 },
  ],
  trace({ nums, k }) {
    if (k > nums.length) throw new DSAViz.InputError(`k must be between 1 and ${nums.length} (the length of nums).`);
    const res = [];
    const steps = [];
    steps.push({ line: "init", note: `${nums.length - k + 1} windows of size ${k}.`, view: [{ type: "array", label: "nums", values: nums }, { type: "array", label: "res", values: [] }] });
    for (let i = 0; i + k <= nums.length; i++) {
      const m = Math.max(...nums.slice(i, i + k));
      res.push(m);
      steps.push({ line: "window", note: `Window ${i}..${i + k - 1}: scan all ${k} values. The biggest is ${m}.`, view: [{ type: "array", label: "nums (outlined = the window, green = its max)", values: nums, marks: win(i, k, { [i + nums.slice(i, i + k).indexOf(m)]: "match" }) }, { type: "array", label: "res", values: res.slice(), marks: { [res.length - 1]: "new" } }] });
    }
    steps.push({ line: "return", note: `Return [${res.join(", ")}]. Each window is scanned again from scratch: O(n·k).`, view: [{ type: "array", label: "nums", values: nums }, { type: "array", label: "res", values: res }] });
    return steps;
  },
});
})();
