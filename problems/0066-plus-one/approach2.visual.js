// From the right: 9s turn into 0s, and the first digit under 9 goes up by one, then stop.
DSAViz.register("0066-plus-one/approach2", {
  inputs: [{ name: "digits", type: "int[]", value: "[1, 2, 9, 9]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 9 }],
  trace({ digits }) {
    if (digits.length > 1 && digits[0] === 0) throw new DSAViz.InputError("digits can't start with 0 (no leading zeros), unless it's just [0].");
    const d = digits.slice();
    const steps = [];
    let looked = 0;
    const view = (i, o = {}) => {
      const marks = {};
      for (let k = (i ?? -1) + 1; k < d.length; k++) if (i !== undefined) marks[k] = "visited";
      if (i !== undefined && i >= 0) marks[i] = o.mark || "active";
      if (o.final) d.forEach((_, k) => (marks[k] = "match"));
      if (o.grew) marks[0] = "new";
      return [
        { type: "array", label: "digits (changed in place)", values: d.slice(), marks, pointers: i !== undefined && i >= 0 ? { i } : {} },
        { type: "vars", items: [{ name: "digits looked at", value: looked }] },
      ];
    };
    steps.push({ line: "loop", note: `Start at the last digit. Only the run of 9s at the end, and the digit just before it, can change.`, view: view(undefined) });
    for (let i = d.length - 1; i >= 0; i--) {
      looked++;
      if (d[i] < 9) {
        d[i]++;
        steps.push({
          line: ["loop", "stop"],
          note: `${d[i] - 1} < 9, so it takes the 1 without carrying: ${d[i] - 1} → ${d[i]}. Nothing to its left changes, so return right away.`,
          view: view(i, { mark: "new" }),
        });
        steps.push({
          line: "stop",
          note: `Return [${d.join(", ")}]. Only ${looked} of ${d.length} digit${d.length === 1 ? "" : "s"} looked at: as many as the trailing 9s, plus one. O(n) in the worst case, O(1) extra space.`,
          view: view(undefined, { final: true }),
        });
        return steps;
      }
      d[i] = 0;
      steps.push({ line: ["loop", "nine"], note: `9 + 1 = 10: write 0 here and carry 1 into the digit on the left.`, view: view(i, { mark: "cut" }) });
    }
    d.unshift(1);
    steps.push({
      line: "grow",
      note: `The loop ran out: every digit was 9 and is now 0. ${"9".repeat(digits.length)} + 1 = 1${"0".repeat(digits.length)}, so put a 1 in front. Return [${d.join(", ")}].`,
      view: view(undefined, { final: true, grew: true }),
    });
    return steps;
  },
});
