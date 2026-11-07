// Two straight-street passes with just prev and cur: without the last house, then without the first.
(function () {
DSAViz.register("0213-house-robber-ii/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, 7, 9, 3, 1]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 1000 }],
  trace({ nums }) {
    const n = nums.length;
    const steps = [];
    if (n === 1) {
      steps.push({ line: "one", note: `Return ${nums[0]}. One house has no neighbours: rob it.`, view: [street(nums, 0, 0)] });
      return steps;
    }
    const results = [];
    for (const [lo, hi] of [[0, n - 2], [1, n - 1]]) {
      let prev = 0, cur = 0;
      const vars = (mark) => ({ type: "vars", items: [{ name: "prev", value: prev }, { name: "cur", value: cur, mark }] });
      steps.push({ line: "range", note: `${passName(lo, n)[0].toUpperCase()}${passName(lo, n).slice(1)}. prev = cur = 0.`, view: [street(nums, lo, hi), vars("")] });
      for (let k = lo; k <= hi; k++) {
        const take = prev + nums[k], old = cur;
        [prev, cur] = [cur, Math.max(cur, take)];
        steps.push({ line: ["loop", "choose"], note: `House ${k} (${nums[k]}): skip → ${old}, rob → prev + ${nums[k]} = ${take}. cur = ${cur}.`, view: [street(nums, lo, hi, { [k]: take > old ? "match" : "active" }), vars("new")] });
      }
      results.push(cur);
      steps.push({ line: "range", note: `This pass gives ${cur}.`, view: [street(nums, lo, hi), vars("match")] });
    }
    const ans = Math.max(...results);
    steps.push({ line: "answer", note: `Return ${ans} = max(${results[0]}, ${results[1]}). O(n) time, O(1) space.`, view: [street(nums, 0, n - 1), { type: "vars", items: [{ name: "pass 1", value: results[0], mark: results[0] === ans ? "match" : "" }, { name: "pass 2", value: results[1], mark: results[1] === ans ? "match" : "" }] }] });
    return steps;
  },
});

// nums with the left-out house dashed; extra marks on top.
const street = (nums, lo, hi, marks = {}, label) => ({ type: "array", label: label || "nums (the street is a circle: house 0 and the last house are neighbours; dashed = left out this pass)", values: nums, marks: { ...Object.fromEntries(nums.map((_, k) => [k, k < lo || k > hi ? "ghost" : ""]).filter(([, v]) => v)), ...marks } });
const passName = (lo, n) => (lo === 0 ? `pass 1: houses 0..${n - 2} (leave out the last)` : `pass 2: houses 1..${n - 1} (leave out the first)`);
})();
