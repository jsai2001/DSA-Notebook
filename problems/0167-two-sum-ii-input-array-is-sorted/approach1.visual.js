// Check every pair i < j.
(function () {
DSAViz.register("0167-two-sum-ii-input-array-is-sorted/approach1", {
  inputs: [
    { name: "numbers", type: "int[]", value: "[1, 3, 4, 6, 8, 11]", minLength: 2, maxLength: 10, minValue: -99, maxValue: 99 },
    { name: "target", type: "int", value: "10", min: -198, max: 198 },
  ],
  trace({ numbers, target }) {
    checkInput(numbers, target);
    const n = numbers.length;
    const steps = [];
    let checked = 0;
    const view = (i, j, o = {}) => [
      { type: "array", label: "numbers", values: numbers, marks: { [i]: o.ok ? "match" : "active", [j]: o.ok ? "match" : "compare" }, pointers: { i, j } },
      { type: "vars", items: [{ name: "sum", value: numbers[i] + numbers[j], mark: o.ok ? "match" : "" }, { name: "target", value: target }, { name: "pairs checked", value: checked }] },
    ];
    steps.push({ line: "init", note: `Try every pair. ${n} numbers make ${(n * (n - 1)) / 2} pairs.`, view: [{ type: "array", label: "numbers", values: numbers }] });
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        checked++;
        const s = numbers[i] + numbers[j];
        if (s === target) {
          steps.push({ line: ["pair", "check", "found"], note: `${numbers[i]} + ${numbers[j]} = ${target}. Return [${i + 1}, ${j + 1}]: 1-indexed. ${checked} pairs checked: O(n²).`, view: view(i, j, { ok: true }) });
          return steps;
        }
        steps.push({ line: ["pair", "check"], note: `${numbers[i]} + ${numbers[j]} = ${s}, not ${target}.`, view: view(i, j) });
      }
    }
    return steps;
  },
});

// LeetCode's promises: sorted, and exactly one pair adds up to target.
function checkInput(numbers, target) {
  if (numbers.some((x, k) => k && x < numbers[k - 1])) throw new DSAViz.InputError("numbers must be sorted from small to large.");
  let pairs = 0;
  for (let i = 0; i < numbers.length; i++) for (let j = i + 1; j < numbers.length; j++) if (numbers[i] + numbers[j] === target) pairs++;
  if (pairs !== 1) throw new DSAViz.InputError(pairs ? `${pairs} pairs add up to ${target}; the problem promises exactly one.` : `No pair adds up to ${target}; the problem promises exactly one.`);
}
})();
