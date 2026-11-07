// Compare every pair (i, j) with i < j.
DSAViz.register("0217-contains-duplicate/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 2, 3, 1]", minLength: 1, maxLength: 10, minValue: -1000000000, maxValue: 1000000000 }],
  trace({ nums }) {
    const n = nums.length;
    const steps = [];
    let pairs = 0;
    const view = (i, j, hit) => [{ type: "array", label: "nums (yellow = the pair being compared, green = equal)", values: nums, marks: i === undefined ? {} : { [i]: hit ? "match" : "compare", [j]: hit ? "match" : "compare" }, pointers: i === undefined ? {} : { i, j } }, { type: "vars", items: [{ name: "pairs compared", value: pairs }] }];
    steps.push({ line: "init", note: `${n} values: up to ${(n * (n - 1)) / 2} pairs to compare.`, view: view() });
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      pairs++;
      if (nums[i] === nums[j]) {
        steps.push({ line: ["pair", "found"], note: `nums[${i}] = nums[${j}] = ${nums[i]}.`, view: view(i, j, true) });
        steps.push({ line: "found", note: `Return true. Found after ${pairs} comparison${pairs > 1 ? "s" : ""}.`, view: view(i, j, true) });
        return steps;
      }
      steps.push({ line: "pair", note: `nums[${i}] = ${nums[i]}, nums[${j}] = ${nums[j]}: different.`, view: view(i, j, false) });
    }
    steps.push({ line: "none", note: `Return false. All ${pairs} pairs differ: O(n²) time.`, view: view() });
    return steps;
  },
});
