// best(i) = max(best(i + 1), nums[i] + best(i + 2)), remembered so each i is worked out once.
DSAViz.register("0198-house-robber/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, 7, 9, 3, 1]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 400 }],
  trace({ nums }) {
    const n = nums.length;
    const steps = [];
    const memo = Array(n).fill(null);
    const open = [];
    const view = (o = {}) => {
      const hm = {};
      if (o.i !== undefined && o.i < n) hm[o.i] = o.rob ? "match" : "active";
      if (o.rob && o.i + 1 < n) hm[o.i + 1] = "ghost";
      const mm = {};
      if (o.i !== undefined && o.i < n) mm[o.i] = o.hit ? "match" : o.set ? "new" : "active";
      return [
        { type: "array", label: o.rob ? "nums (green = robbed, dashed = its neighbour, skipped)" : "nums (houses; dark = house i)", values: nums, marks: hm },
        { type: "array", label: "memo[i] = best(i), the most from house i onward (? = not known yet)", values: memo.map((v) => (v === null ? "?" : v)), marks: mm },
        { type: "array", label: "open calls best(i), outermost first", values: open.map((i) => `best(${i})`), wide: true },
      ];
    };
    steps.push({ line: "init", note: "best(i) = the most you can take from house i to the end. The answer is best(0).", view: view() });
    const best = (i) => {
      open.push(i);
      if (i >= n) {
        steps.push({ line: ["call", "base"], note: `best(${i}): past the last house. Return 0.`, view: view({ i }) });
        open.pop();
        return 0;
      }
      if (memo[i] !== null) {
        steps.push({ line: ["call", "memo"], note: `best(${i}) is already in the memo: ${memo[i]}. No new calls.`, view: view({ i, hit: true }) });
        open.pop();
        return memo[i];
      }
      steps.push({ line: ["call", "memo"], note: `best(${i}): not known yet. Work out skip = best(${i + 1}) and rob = ${nums[i]} + best(${i + 2}).`, view: view({ i }) });
      const skip = best(i + 1);
      const take = nums[i] + best(i + 2);
      memo[i] = Math.max(skip, take);
      steps.push({ line: ["choose", "memo"], note: `best(${i}) = max(skip ${skip}, rob ${nums[i]} + ${take - nums[i]} = ${take}) = ${memo[i]}.${take > skip ? ` Robbing house ${i} wins.` : ` Skipping house ${i} is ${take === skip ? "as good" : "better"}.`}`, view: view({ i, set: true, rob: take > skip }) });
      open.pop();
      return memo[i];
    };
    const ans = best(0);
    steps.push({ line: "answer", note: `Return ${ans}. Each best(i) is worked out once and asked for at most twice: O(n) time, O(n) memo and call stack.`, view: view() });
    return steps;
  },
});
