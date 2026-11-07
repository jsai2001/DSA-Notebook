// For each number, binary search the part after it for target - number.
(function () {
DSAViz.register("0167-two-sum-ii-input-array-is-sorted/approach2", {
  inputs: [
    { name: "numbers", type: "int[]", value: "[1, 3, 4, 6, 8, 11]", minLength: 2, maxLength: 10, minValue: -99, maxValue: 99 },
    { name: "target", type: "int", value: "10", min: -198, max: 198 },
  ],
  trace({ numbers, target }) {
    checkInput(numbers, target);
    const n = numbers.length;
    const steps = [];
    let probes = 0;
    const view = (i, lo, hi, mid, o = {}) => {
      const marks = {};
      numbers.forEach((_, k) => (marks[k] = k <= i ? "ghost" : k >= lo && k <= hi ? "window" : "ghost"));
      marks[i] = o.ok ? "match" : "active";
      if (mid !== undefined) marks[mid] = o.ok ? "match" : "compare";
      const pointers = { i };
      if (mid !== undefined) pointers.mid = mid;
      return [
        { type: "array", label: "numbers (outlined = where the search looks: only after i)", values: numbers, marks, pointers },
        { type: "vars", items: [{ name: "need", value: target - numbers[i] }, { name: "binary-search probes", value: probes }] },
      ];
    };
    for (let i = 0; i < n; i++) {
      const need = target - numbers[i];
      let lo = i + 1;
      let hi = n - 1;
      steps.push({ line: ["pick", "search"], note: `numbers[${i}] = ${numbers[i]} needs ${target} − ${numbers[i]} = ${need}. Search only after index ${i}, so the same number isn't used twice.`, view: view(i, lo, hi) });
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        probes++;
        if (numbers[mid] === need) {
          steps.push({ line: ["search", "found"], note: `numbers[${mid}] = ${need}. Return [${i + 1}, ${mid + 1}]. ${probes} probes: O(log n) per number, O(n log n) in all.`, view: view(i, lo, hi, mid, { ok: true }) });
          return steps;
        }
        const up = numbers[mid] < need;
        steps.push({ line: "search", note: `numbers[${mid}] = ${numbers[mid]} is ${up ? "too small: look right" : "too big: look left"}.`, view: view(i, lo, hi, mid) });
        if (up) lo = mid + 1; else hi = mid - 1;
      }
      steps.push({ line: "search", note: `${need} isn't after index ${i}. Next number.`, view: view(i, 1, 0) });
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
