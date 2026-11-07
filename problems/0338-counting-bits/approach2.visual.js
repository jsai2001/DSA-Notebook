// DP: clearing the lowest 1 gives a smaller number we already know; add 1.
(function () {
DSAViz.register("0338-counting-bits/approach2", {
  inputs: [{ name: "n", type: "int", value: "8", min: 0, max: 16 }],
  trace({ n }) {
    const ans = Array(n + 1).fill(0);
    const done = (k) => ans.map((v, i) => (i <= k ? v : "·"));
    const steps = [];
    const view = (k, marks = {}) => ({ type: "array", label: "ans; caption = number in binary", values: done(k), marks: { ...Object.fromEntries(ans.map((_, i) => [i, i > k ? "ghost" : ""]).filter(([, m]) => m)), ...marks }, sub: ans.map((_, i) => bin(i)) });
    steps.push({ line: "init", note: "ans[0] = 0: zero has no 1 bits.", view: [view(0, { 0: "match" })] });
    for (let i = 1; i <= n; i++) {
      const j = i & (i - 1);
      ans[i] = ans[j] + 1;
      steps.push({ line: ["num", "store"], note: `i = ${bin(i)}. Clear its lowest 1: ${bin(j)} = ${j}. ans[${i}] = ans[${j}] + 1 = ${ans[i]}.`, view: [view(i, { [j]: "compare", [i]: "new" })] });
    }
    steps.push({ line: "return", note: `Return [${ans.join(", ")}]. One step per number: O(n).`, view: [view(n, Object.fromEntries(ans.map((_, i) => [i, "match"])))] });
    return steps;
  },
});
const bin = (x) => x.toString(2);
})();
