// Only the last two dp values are ever used: keep them in prev and cur.
DSAViz.register("0198-house-robber/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, 7, 9, 3, 1]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 400 }],
  trace({ nums }) {
    const steps = [];
    let prev = 0;
    let cur = 0;
    const view = (o = {}) => [
      { type: "array", label: "nums (dark = this house, green = robbing it gives more)", values: nums, marks: o.k !== undefined ? { [o.k]: o.rob ? "match" : "active" } : {} },
      { type: "vars", items: [{ name: "prev", value: prev }, { name: "cur", value: cur, mark: o.k !== undefined ? "new" : o.done ? "match" : "" }] },
    ];
    steps.push({ line: "init", note: "prev = best up to two houses back, cur = best up to the last house. Both start at 0.", view: view() });
    nums.forEach((x, k) => {
      const take = prev + x;
      const rob = take > cur;
      const old = cur;
      [prev, cur] = [cur, Math.max(cur, take)];
      steps.push({ line: ["loop", "choose"], note: `House ${k} (${x}): skip → ${old}, rob → prev + ${x} = ${take}. cur = ${cur}, and prev becomes the old cur, ${prev}.`, view: view({ k, rob }) });
    });
    steps.push({ line: "return", note: `Return ${cur}. O(n) time, O(1) space: two numbers instead of a table.`, view: view({ done: true }) });
    return steps;
  },
});
