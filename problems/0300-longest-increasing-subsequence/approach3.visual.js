// tails[L] = the smallest possible last value of an increasing subsequence of length L + 1. Binary search keeps it sorted.
DSAViz.register("0300-longest-increasing-subsequence/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[10, 9, 2, 5, 3, 7, 101, 18]", minLength: 1, maxLength: 10, minValue: -10000, maxValue: 10000 }],
  trace({ nums }) {
    const tails = [];
    const steps = [{ line: "init", note: "tails starts empty. A smaller tail is better: more values can come after it.", view: [{ type: "array", label: "nums", values: nums }, { type: "array", label: "tails (always sorted)", values: [] }] }];
    nums.forEach((x, i) => {
      let lo = 0, hi = tails.length;
      while (lo < hi) { const m = (lo + hi) >> 1; if (tails[m] < x) lo = m + 1; else hi = m; }
      const ext = lo === tails.length;
      const old = tails[lo];
      tails[lo] = x;
      steps.push({ line: ext ? ["each", "search", "extend"] : ["each", "search", "replace"], note: ext ? `${x} is bigger than every tail: append it. There's now an increasing subsequence of length ${tails.length}.` : `The first tail ≥ ${x} is ${old}, at index ${lo}. Replace it: a length-${lo + 1} subsequence can now end at the smaller ${x}.`, view: [{ type: "array", label: "nums (dark = this value)", values: nums, marks: { [i]: "active" } }, { type: "array", label: "tails (always sorted; yellow = changed)", values: tails.slice(), marks: { [lo]: "new" } }] });
    });
    steps.push({ line: "return", note: `Return ${tails.length}. tails isn't always a real subsequence, but its length is the answer. n binary searches: O(n log n).`, view: [{ type: "array", label: "tails", values: tails, marks: Object.fromEntries(tails.map((_, k) => [k, "match"])) }] });
    return steps;
  },
});
