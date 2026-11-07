// Keep the set of every reachable subset sum; each number adds itself to every old sum.
(function () {
function start(nums, steps, extra = []) {
  const total = nums.reduce((s, x) => s + x, 0);
  if (total > 40) throw new DSAViz.InputError(`The numbers add up to ${total}; keep it at most 40 here so the table fits.`);
  const nview = (marks = {}) => ({ type: "array", label: `nums (total ${total})`, values: nums, marks });
  if (total % 2) { steps.push({ line: "init", note: `The total ${total} is odd, so it can't split into two equal halves. Return false.`, view: [nview()] }); return null; }
  return { total, half: total / 2, nview };
}
DSAViz.register("0416-partition-equal-subset-sum/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 5, 11, 5]", minLength: 1, maxLength: 10, minValue: 1, maxValue: 40 }],
  trace({ nums }) {
    const steps = [];
    const s = start(nums, steps);
    if (!s) return steps;
    const { half, nview } = s;
    let sums = new Set([0]);
    const sv = (fresh = new Set()) => ({ type: "set", label: `reachable sums (≤ ${half})`, items: [...sums].sort((a, b) => a - b).map(String), marks: Object.fromEntries([...fresh].map((x) => [String(x), x === half ? "match" : "new"])) });
    steps.push({ line: "init", note: `Look for a subset summing to ${half}. To start, only 0 is reachable (take nothing).`, view: [nview(), sv()] });
    for (let i = 0; i < nums.length; i++) {
      const x = nums[i];
      const fresh = new Set([...sums].map((v) => v + x).filter((v) => v <= half && !sums.has(v)));
      fresh.forEach((v) => sums.add(v));
      if (sums.has(half)) {
        steps.push({ line: ["add", "found"], note: `Add ${x} to every reachable sum: new ${[...fresh].sort((a, b) => a - b).join(", ")}. ${half} is reachable.`, view: [nview({ [i]: "active" }), sv(fresh)] });
        steps.push({ line: "found", note: `Return true. At most ${half + 1} different sums, so O(n · sum).`, view: [nview(), sv()] });
        return steps;
      }
      steps.push({ line: "add", note: fresh.size ? `Add ${x} to every reachable sum: new ${[...fresh].sort((a, b) => a - b).join(", ")}.` : `Adding ${x} gives nothing new up to ${half}.`, view: [nview({ [i]: "active" }), sv(fresh)] });
    }
    steps.push({ line: "return", note: `Return false. ${half} never became reachable. O(n · sum).`, view: [nview(), sv()] });
    return steps;
  },
});
})();
