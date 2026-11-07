// Recursion: for each number, take it or skip it, looking for a subset that adds up to half the total.
(function () {
function start(nums, steps, extra = []) {
  const total = nums.reduce((s, x) => s + x, 0);
  if (total > 40) throw new DSAViz.InputError(`The numbers add up to ${total}; keep it at most 40 here so the table fits.`);
  const nview = (marks = {}) => ({ type: "array", label: `nums (total ${total})`, values: nums, marks });
  if (total % 2) { steps.push({ line: "init", note: `The total ${total} is odd, so it can't split into two equal halves. Return false.`, view: [nview()] }); return null; }
  return { total, half: total / 2, nview };
}
DSAViz.register("0416-partition-equal-subset-sum/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 5, 11, 5]", minLength: 1, maxLength: 7, minValue: 1, maxValue: 40 }],
  trace({ nums }) {
    const steps = [];
    const s = start(nums, steps);
    if (!s) return steps;
    const { half, nview } = s;
    const chosen = [];
    const cview = () => ({ type: "array", label: "taken so far", values: chosen.length ? [...chosen] : ["—"], marks: chosen.length ? {} : { 0: "ghost" } });
    steps.push({ line: "init", note: `Look for some numbers that add up to half the total: ${half}.`, view: [nview(), cview()] });
    let calls = 0;
    function pick(i, left) {
      calls++;
      if (left === 0) { steps.push({ line: ["call", "found"], note: `${chosen.join(" + ")} = ${half}. Found a half.`, view: [nview(), cview()] }); return true; }
      if (i === nums.length || left < 0) { steps.push({ line: ["call", "dead"], note: left < 0 ? `Overshot by ${-left}. Dead end: back up.` : `No numbers left and still ${left} short. Dead end: back up.`, view: [nview(), cview()] }); return false; }
      chosen.push(nums[i]);
      steps.push({ line: "call", note: `Take nums[${i}] = ${nums[i]}: ${left} − ${nums[i]} = ${left - nums[i]} still needed.`, view: [nview({ [i]: "new" }), cview()] });
      if (pick(i + 1, left - nums[i])) return true;
      chosen.pop();
      steps.push({ line: "call", note: `Skip nums[${i}] = ${nums[i]} instead: still ${left} needed.`, view: [nview({ [i]: "visited" }), cview()] });
      return pick(i + 1, left);
    }
    const ok = pick(0, half);
    steps.push({ line: "return", note: `Return ${ok}. ${calls} calls. Each number doubles the choices: O(2ⁿ) at worst.`, view: [nview(), cview()] });
    return steps;
  },
});
})();
