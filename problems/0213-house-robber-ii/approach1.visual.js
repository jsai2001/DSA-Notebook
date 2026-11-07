// Run House Robber twice with a memo: once without the last house, once without the first. Take the better.
(function () {
DSAViz.register("0213-house-robber-ii/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, 7, 9, 3, 1]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 1000 }],
  trace({ nums }) {
    const n = nums.length;
    const steps = [];
    if (n === 1) {
      steps.push({ line: ["init", "one"], note: `Return ${nums[0]}. One house has no neighbours: rob it.`, view: [street(nums, 0, 0)] });
      return steps;
    }
    const results = [];
    const memoView = (memo, lo, hi, mm) => ({ type: "array", label: "memo[i] = best(i), the most from house i to the end of this pass (? = not known yet)", values: nums.map((_, k) => (k < lo || k > hi ? "-" : memo[k] === undefined ? "?" : memo[k])), marks: mm });
    steps.push({ line: "init", note: "House 0 and the last house touch, so they can't both be robbed. Solve the street twice, each time leaving one of them out.", view: [street(nums, 0, n - 1)] });
    for (const [lo, hi] of [[0, n - 2], [1, n - 1]]) {
      const memo = {};
      steps.push({ line: "range", note: `${passName(lo, n)[0].toUpperCase()}${passName(lo, n).slice(1)}. Start with an empty memo.`, view: [street(nums, lo, hi), memoView(memo, lo, hi, {})] });
      const best = (i) => {
        if (i > hi) return 0;
        if (memo[i] !== undefined) { steps.push({ line: ["call", "memo"], note: `best(${i}) is in the memo: ${memo[i]}.`, view: [street(nums, lo, hi, { [i]: "active" }), memoView(memo, lo, hi, { [i]: "match" })] }); return memo[i]; }
        const skip = best(i + 1);
        const take = nums[i] + best(i + 2);
        memo[i] = Math.max(skip, take);
        steps.push({ line: ["call", "choose"], note: `best(${i}) = max(skip ${skip}, rob ${nums[i]} + ${take - nums[i]} = ${take}) = ${memo[i]}.`, view: [street(nums, lo, hi, { [i]: take > skip ? "match" : "active" }), memoView(memo, lo, hi, { [i]: "new" })] });
        return memo[i];
      };
      const r = best(lo);
      results.push(r);
      steps.push({ line: "range", note: `This pass gives ${r}.`, view: [street(nums, lo, hi), memoView(memo, lo, hi, { [lo]: "match" })] });
    }
    const ans = Math.max(...results);
    steps.push({ line: "answer", note: `Return ${ans} = max(${results[0]}, ${results[1]}). Two House Robber passes: O(n) time, O(n) memo.`, view: [street(nums, 0, n - 1), { type: "vars", items: [{ name: "pass 1", value: results[0], mark: results[0] === ans ? "match" : "" }, { name: "pass 2", value: results[1], mark: results[1] === ans ? "match" : "" }] }] });
    return steps;
  },
});

// nums with the left-out house dashed; extra marks on top.
const street = (nums, lo, hi, marks = {}, label) => ({ type: "array", label: label || "nums (the street is a circle: house 0 and the last house are neighbours; dashed = left out this pass)", values: nums, marks: { ...Object.fromEntries(nums.map((_, k) => [k, k < lo || k > hi ? "ghost" : ""]).filter(([, v]) => v)), ...marks } });
const passName = (lo, n) => (lo === 0 ? `pass 1: houses 0..${n - 2} (leave out the last)` : `pass 2: houses 1..${n - 1} (leave out the first)`);
})();
