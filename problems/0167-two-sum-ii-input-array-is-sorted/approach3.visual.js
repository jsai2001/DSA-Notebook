// Two pointers from both ends: too small moves the left one right, too big moves the right one left.
(function () {
DSAViz.register("0167-two-sum-ii-input-array-is-sorted/approach3", {
  inputs: [
    { name: "numbers", type: "int[]", value: "[1, 3, 4, 6, 8, 11]", minLength: 2, maxLength: 10, minValue: -99, maxValue: 99 },
    { name: "target", type: "int", value: "10", min: -198, max: 198 },
  ],
  trace({ numbers, target }) {
    checkInput(numbers, target);
    const steps = [];
    let lo = 0;
    let hi = numbers.length - 1;
    const view = (o = {}) => {
      const marks = {};
      numbers.forEach((_, k) => (marks[k] = k < lo || k > hi ? "ghost" : "window"));
      marks[lo] = o.ok ? "match" : "active";
      marks[hi] = o.ok ? "match" : "active";
      return [
        { type: "array", label: "numbers (dashed = ruled out)", values: numbers, marks, pointers: { lo, hi } },
        { type: "vars", items: [{ name: "sum", value: numbers[lo] + numbers[hi], mark: o.ok ? "match" : "" }, { name: "target", value: target }] },
      ];
    };
    steps.push({ line: "init", note: "Start with the smallest and the largest number.", view: view() });
    while (lo < hi) {
      const s = numbers[lo] + numbers[hi];
      if (s === target) {
        steps.push({ line: ["loop", "found"], note: `${numbers[lo]} + ${numbers[hi]} = ${target}. Return [${lo + 1}, ${hi + 1}]. Each step rules out one number: O(n), O(1) memory.`, view: view({ ok: true }) });
        return steps;
      }
      if (s < target) {
        steps.push({ line: ["loop", "found", "up"], note: `${numbers[lo]} + ${numbers[hi]} = ${s} < ${target}. ${numbers[lo]} plus anything is at most this, so it can't be in the answer: lo + 1.`, view: view() });
        lo++;
      } else {
        steps.push({ line: ["loop", "found", "up", "down"], note: `${numbers[lo]} + ${numbers[hi]} = ${s} > ${target}. ${numbers[hi]} plus anything left is at least this, so it can't be in the answer: hi − 1.`, view: view() });
        hi--;
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
