// Try both signs for every number: 2ⁿ sign choices, count the ones that hit target.
(function () {
const sumOf = (a) => a.reduce((s, x) => s + x, 0);
const nv = (nums, marks = {}, label = "nums") => ({ type: "array", label, values: nums, marks });
DSAViz.register("0494-target-sum/approach1", {
  inputs: [
    { name: "nums", type: "int[]", value: "[1, 1, 1, 1, 1]", minLength: 1, maxLength: 6, minValue: 0, maxValue: 100 },
    { name: "target", type: "int", value: "3", min: -1000, max: 1000 },
  ],
  trace({ nums, target }) {
    const steps = [{ line: "call", note: `Give each number a + or −. Count the choices whose total is ${target}.`, view: [nv(nums)] }];
    const signs = [];
    let found = 0, leaves = 0;
    const sv = () => ({ type: "array", label: "signs so far", values: signs.length ? signs.map((s, i) => `${s}${nums[i]}`) : ["—"], marks: signs.length ? { [signs.length - 1]: "new" } : { 0: "ghost" } });
    function ways(i, total) {
      if (i === nums.length) {
        leaves++;
        const ok = total === target;
        if (ok) found++;
        steps.push({ line: "leaf", note: `${signs.map((s, k) => `${s}${nums[k]}`).join(" ")} = ${total}${ok ? ` = target. Count it (${found} so far).` : `, not ${target}.`}`, view: [nv(nums), sv(), { type: "vars", items: [{ name: "total", value: total, mark: ok ? "match" : "cut" }, { name: "ways", value: found }] }] });
        return ok ? 1 : 0;
      }
      signs.push("+"); const a = ways(i + 1, total + nums[i]); signs.pop();
      signs.push("−"); const b = ways(i + 1, total - nums[i]); signs.pop();
      return a + b;
    }
    const r = ways(0, 0);
    steps.push({ line: "return", note: `Return ${r}. All ${leaves} sign choices were tried: O(2ⁿ).`, view: [nv(nums), { type: "vars", items: [{ name: "ways", value: r, mark: "match" }] }] });
    return steps;
  },
});
})();
