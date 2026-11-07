// Sort, so equal values sit next to each other, then compare neighbours.
DSAViz.register("0217-contains-duplicate/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 2, 3, 1]", minLength: 1, maxLength: 10, minValue: -1000000000, maxValue: 1000000000 }],
  trace({ nums }) {
    const s = nums.slice().sort((a, b) => a - b);
    const steps = [];
    const view = (i, hit) => [{ type: "array", label: "sorted (yellow = the two neighbours, green = equal)", values: s, marks: i === undefined ? {} : { [i - 1]: hit ? "match" : "compare", [i]: hit ? "match" : "compare" }, pointers: i === undefined ? {} : { i } }];
    steps.push({ line: "sort", note: "Sort: any repeated value now has a copy right next to it.", view: [{ type: "array", label: "nums", values: nums }, ...view()] });
    for (let i = 1; i < s.length; i++) {
      if (s[i] === s[i - 1]) {
        steps.push({ line: ["scan", "found"], note: `sorted[${i - 1}] = sorted[${i}] = ${s[i]}.`, view: view(i, true) });
        steps.push({ line: "found", note: "Return true. Sorting costs O(n log n); the scan is O(n).", view: view(i, true) });
        return steps;
      }
      steps.push({ line: "scan", note: `${s[i - 1]} and ${s[i]} differ.`, view: view(i, false) });
    }
    steps.push({ line: "none", note: "Return false. No two neighbours are equal, so no value repeats. O(n log n) time.", view: view() });
    return steps;
  },
});
