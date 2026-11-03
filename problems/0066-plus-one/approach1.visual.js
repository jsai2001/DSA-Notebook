// Add 1 the way you would on paper: start with a carry of 1 at the last digit and carry left.
DSAViz.register("0066-plus-one/approach1", {
  inputs: [{ name: "digits", type: "int[]", value: "[1, 2, 9, 9]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 9 }],
  trace({ digits }) {
    if (digits.length > 1 && digits[0] === 0) throw new DSAViz.InputError("digits can't start with 0 (no leading zeros), unless it's just [0].");
    const result = digits.slice();
    let carry = 1;
    const steps = [];
    const view = (i, o = {}) => {
      const marks = {};
      for (let k = (i ?? result.length) + 1; k < result.length; k++) marks[k] = "visited";
      if (i !== undefined && i >= 0) marks[i] = o.fresh ? "new" : "active";
      if (o.final) result.forEach((_, k) => (marks[k] = "match"));
      if (o.grew) marks[0] = "new";
      return [
        { type: "array", label: "result (a copy of digits)", values: result.slice(), marks, pointers: i !== undefined && i >= 0 ? { i } : {} },
        { type: "vars", items: [{ name: "carry", value: carry, mark: o.carryNew ? "new" : "" }] },
      ];
    };
    steps.push({ line: "init", note: `Copy digits. Adding one is just a carry of 1 going into the last digit.`, view: view(undefined) });
    for (let i = result.length - 1; i >= 0; i--) {
      const before = result[i];
      const total = before + carry;
      result[i] = total % 10;
      const was = carry;
      carry = Math.floor(total / 10);
      steps.push({
        line: "loop",
        note:
          was === 0
            ? `${before} + 0 = ${total}: nothing changes. The loop keeps going anyway; it always visits every digit.`
            : total === 10
              ? `${before} + 1 = 10: write 0, carry 1 to the left.`
              : `${before} + 1 = ${total}: write ${total}, carry 0.`,
        view: view(i, { fresh: was > 0, carryNew: was !== carry }),
      });
    }
    if (carry) {
      result.unshift(carry);
      steps.push({ line: "grow", note: `The carry fell off the front: every digit was 9. Put a 1 in front: the number got one digit longer.`, view: view(undefined, { grew: true }) });
    } else {
      steps.push({ line: "grow", note: `carry is 0 after the first digit, so the length stays the same.`, view: view(undefined) });
    }
    steps.push({ line: "return", note: `Return [${result.join(", ")}]. Every digit was visited: O(n) time, O(n) for the copy.`, view: view(undefined, { final: true }) });
    return steps;
  },
});
