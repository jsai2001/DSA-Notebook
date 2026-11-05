// Bitmask: each number 0 .. 2^n − 1 is one subset; bit i says whether nums[i] is in it.
DSAViz.register("0078-subsets/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 2, 3]", minLength: 1, maxLength: 4, minValue: -10, maxValue: 10 }],
  trace({ nums }) {
    if (new Set(nums).size !== nums.length) throw new DSAViz.InputError("The numbers must all be different.");
    const n = nums.length;
    const steps = [];
    const result = [];
    const fmt = (a) => `[${a.join(", ")}]`;
    // Bits are shown under the numbers they pick: bit i lines up with nums[i].
    const view = (mask, o = {}) => {
      const marks = {};
      const bits = nums.map((_, i) => (mask === undefined ? "·" : (mask >> i) & 1));
      const bitMarks = {};
      if (mask !== undefined)
        nums.forEach((_, i) => {
          if ((mask >> i) & 1) {
            marks[i] = "match";
            bitMarks[`0,${i}`] = "match";
          } else marks[i] = "ghost";
        });
      return [
        { type: "array", label: "nums (green = picked by this mask)", values: nums, marks },
        { type: "grid", label: mask === undefined ? "bits" : `mask = ${mask} (binary ${mask.toString(2).padStart(n, "0")}, written right to left here: bit i sits under nums[i])`, rows: ["bit"], cols: nums.map((_, i) => String(i)), cells: [bits], marks: bitMarks, corner: "" },
        { type: "array", label: `result (${result.length} of ${2 ** n})`, values: result.map(fmt), wide: true, marks: o.added ? { [result.length - 1]: "new" } : {} },
      ];
    };
    steps.push({ line: "init", note: `${n} numbers, so ${2 ** n} masks: 0 to ${2 ** n - 1}. Each one's bits say which numbers to take.`, view: view() });
    for (let mask = 0; mask < 1 << n; mask++) {
      const subset = nums.filter((_, i) => (mask >> i) & 1);
      result.push(subset);
      const on = nums.map((_, i) => i).filter((i) => (mask >> i) & 1);
      steps.push({
        line: ["mask", "bit", "add"],
        note: on.length ? `mask ${mask}: bit${on.length > 1 ? "s" : ""} ${on.join(", ")} ${on.length > 1 ? "are" : "is"} 1, so take ${on.map((i) => nums[i]).join(", ")}. Add ${fmt(subset)}.` : `mask 0: every bit is 0, so this is the empty subset. Add [].`,
        view: view(mask, { added: true }),
      });
    }
    steps.push({ line: "return", note: `Return all ${result.length}. ${2 ** n} masks × ${n} bit tests each: O(n · 2ⁿ), no recursion.`, view: view(undefined) });
    return steps;
  },
});
