// For each bar, the nearest shorter bar on the left and on the right (two stack passes); its rectangle lies between them.
DSAViz.register("0084-largest-rectangle-in-histogram/approach2", {
  inputs: [{ name: "heights", type: "int[]", value: "[2, 1, 5, 6, 2, 3]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 9 }],
  trace({ heights }) {
    const n = heights.length;
    const steps = [];
    const left = heights.map(() => "");
    const right = heights.map(() => "");
    let stack = [];
    let best = 0;
    let bestSpan = null;
    const view = (i, o = {}) => {
      const marks = {};
      stack.forEach((k) => (marks[k] = "compare"));
      if (o.span) for (let k = o.span[0]; k <= o.span[1]; k++) marks[k] = "match";
      if (o.final && bestSpan) for (let k = bestSpan[0]; k <= bestSpan[1]; k++) marks[k] = "match";
      if (i !== undefined && !o.final) marks[i] = o.span ? "match" : "active";
      return [
        { type: "bars", label: o.span || o.final ? "heights (green = the rectangle as tall as bar i)" : "heights (orange = on the stack: candidates for a shorter wall)", values: heights, marks, pointers: i !== undefined && !o.final ? { i } : {} },
        { type: "array", label: "left[i]: nearest shorter bar on the left (−1 = none)", values: left, marks: o.pass === "left" && i !== undefined ? { [i]: "new" } : {}, compact: true },
        { type: "array", label: `right[i]: nearest shorter bar on the right (${n} = none)`, values: right, marks: o.pass === "right" && i !== undefined ? { [i]: "new" } : {}, compact: true },
        { type: "vars", items: [{ name: "stack", value: stack.length ? stack.join(", ") : "empty" }, { name: "best", value: best, mark: o.newBest ? "match" : "" }] },
      ];
    };
    steps.push({ line: "init", note: "For each bar, find the nearest shorter bar on each side. The widest rectangle as tall as that bar lies between the two.", view: view() });
    for (let i = 0; i < n; i++) {
      const popped = [];
      while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) popped.push(stack.pop());
      left[i] = stack.length ? stack[stack.length - 1] : -1;
      steps.push({
        line: "leftpass",
        note: `${popped.length ? `Pop ${popped.join(", ")}: not shorter than ${heights[i]}, so they can't be the left wall of bar ${i} or of anything after it. ` : ""}left[${i}] = ${left[i]}${left[i] === -1 ? " (nothing shorter on the left)" : ` (height ${heights[left[i]]} < ${heights[i]})`}.`,
        view: view(i, { pass: "left" }),
      });
      stack.push(i);
    }
    stack = [];
    steps.push({ line: "rightpass", note: "The same pass from the right end gives right[i].", view: view() });
    for (let i = n - 1; i >= 0; i--) {
      const popped = [];
      while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) popped.push(stack.pop());
      right[i] = stack.length ? stack[stack.length - 1] : n;
      steps.push({
        line: "rightpass",
        note: `${popped.length ? `Pop ${popped.join(", ")}. ` : ""}right[${i}] = ${right[i]}${right[i] === n ? " (nothing shorter on the right)" : ` (height ${heights[right[i]]} < ${heights[i]})`}.`,
        view: view(i, { pass: "right" }),
      });
      stack.push(i);
    }
    stack = [];
    for (let i = 0; i < n; i++) {
      const w = right[i] - left[i] - 1;
      const area = heights[i] * w;
      const newBest = area > best;
      if (newBest) {
        best = area;
        bestSpan = [left[i] + 1, right[i] - 1];
      }
      steps.push({
        line: "area",
        note: `Bar ${i}: from ${left[i] + 1} to ${right[i] - 1}, width ${right[i]} − ${left[i]} − 1 = ${w}. ${heights[i]} × ${w} = ${area}.${newBest ? " New best." : ""}`,
        view: view(i, { span: [left[i] + 1, right[i] - 1], newBest }),
      });
    }
    steps.push({ line: "return", note: `Return ${best}. Each index is pushed and popped at most once per pass: O(n).`, view: view(undefined, { final: true }) });
    return steps;
  },
});
