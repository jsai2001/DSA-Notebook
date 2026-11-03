// Find the last digit that isn't 9: it goes up by one, everything after it becomes 0, everything before it stays.
DSAViz.register("0066-plus-one/approach3", {
  inputs: [{ name: "digits", type: "int[]", value: "[8, 9, 9, 9]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 9 }],
  trace({ digits }) {
    if (digits.length > 1 && digits[0] === 0) throw new DSAViz.InputError("digits can't start with 0 (no leading zeros), unless it's just [0].");
    const n = digits.length;
    const steps = [];
    let result = null;
    const view = (k, o = {}) => {
      const marks = {};
      for (let j = k + 1; j < n; j++) marks[j] = "cut";
      if (k >= 0 && k < n) marks[k] = o.found ? "match" : "active";
      const widgets = [{ type: "array", label: "digits (not changed)", values: digits, marks, pointers: k >= 0 && k < n ? { k } : {} }];
      if (result) {
        const rm = {};
        result.forEach((_, j) => (rm[j] = "match"));
        if (o.highlight !== undefined) rm[o.highlight] = "new";
        widgets.push({ type: "array", label: "result (a new list)", values: result, marks: rm });
      }
      return widgets;
    };
    let k = n - 1;
    steps.push({ line: "find", note: `k starts at the last digit. Walk left past the 9s at the end: those are the digits that will roll over to 0.`, view: view(k) });
    while (k >= 0 && digits[k] === 9) {
      k--;
      steps.push({
        line: "find",
        note: k >= 0 ? `digits[${k + 1}] is 9 (red: it will become 0). Move left: k = ${k}.` : `digits[0] is 9 too: k = −1. Every digit is 9.`,
        view: view(k),
      });
    }
    if (k < 0) {
      result = [1, ...Array(n).fill(0)];
      steps.push({ line: "grow", note: `All 9s: the answer is 1 followed by ${n} zero${n === 1 ? "" : "s"}, one digit longer.`, view: view(k, { highlight: 0 }) });
      return steps;
    }
    steps.push({
      line: "find",
      note: `digits[${k}] = ${digits[k]} isn't 9: this is the digit that goes up. ${n - 1 - k ? `The ${n - 1 - k === 1 ? "digit" : `${n - 1 - k} digits`} after it ${n - 1 - k === 1 ? "is" : "are"} 9.` : "It's the last digit, so no 9s follow it."}`,
      view: view(k, { found: true }),
    });
    result = [...digits.slice(0, k), digits[k] + 1, ...Array(n - 1 - k).fill(0)];
    steps.push({
      line: "build",
      note: `${k ? `Copy digits[0..${k - 1}] as they are` : "Nothing comes before it"}, then ${digits[k]} + 1 = ${digits[k] + 1}${n - 1 - k ? `, then ${n - 1 - k} zero${n - 1 - k === 1 ? "" : "s"}` : ""}. The input isn't touched. O(n) time and space.`,
      view: view(k, { found: true, highlight: k }),
    });
    return steps;
  },
});
