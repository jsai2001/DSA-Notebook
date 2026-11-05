// One pass: a stack of rising bars; a shorter bar pops the top, whose walls are then the new bar and the bar below it.
DSAViz.register("0084-largest-rectangle-in-histogram/approach3", {
  inputs: [{ name: "heights", type: "int[]", value: "[2, 1, 5, 6, 2, 3]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 9 }],
  trace({ heights }) {
    const n = heights.length;
    const steps = [];
    const stack = [];
    let best = 0;
    let bestSpan = null;
    const view = (i, o = {}) => {
      const marks = {};
      stack.forEach((k) => (marks[k] = "compare"));
      if (o.span) for (let k = o.span[0]; k <= o.span[1]; k++) marks[k] = "match";
      if (o.final && bestSpan) for (let k = bestSpan[0]; k <= bestSpan[1]; k++) marks[k] = "match";
      if (i !== undefined && i < n && !o.final) marks[i] = "active";
      const pointers = {};
      if (i !== undefined && i < n && !o.final) pointers.i = i;
      return [
        { type: "bars", label: `heights (orange = on the stack, rising; green = the rectangle just scored)${i === n && !o.final ? "; i = n: a height-0 bar past the end" : ""}`, values: heights, marks, pointers },
        { type: "array", label: "stack of indices (bottom → top), heights rise", values: stack.map((k) => `${k} (h ${heights[k]})`), wide: true, marks: stack.length ? { [stack.length - 1]: "active" } : {} },
        {
          type: "vars",
          items: [
            ...(o.calc ? [{ name: "area", value: o.calc, mark: o.newBest ? "new" : "" }] : []),
            { name: "best", value: bestSpan ? `${best} (bars ${bestSpan[0]}..${bestSpan[1]})` : best, mark: o.newBest ? "match" : "" },
          ],
        },
      ];
    };
    steps.push({ line: "init", note: "Walk left to right, keeping a stack of bars whose heights rise. A bar waits on the stack until a shorter bar ends its rectangle.", view: view() });
    for (let i = 0; i <= n; i++) {
      const h = i < n ? heights[i] : 0;
      steps.push({
        line: "loop",
        note: i < n ? `Bar ${i}, height ${h}.` : `Past the last bar: pretend there's one more of height 0 at i = ${n}, so every bar still waiting gets scored.`,
        view: view(i),
      });
      while (stack.length && heights[stack[stack.length - 1]] >= h) {
        const top = stack.pop();
        const left = stack.length ? stack[stack.length - 1] : -1;
        const w = i - left - 1;
        const area = heights[top] * w;
        const newBest = area > best;
        if (newBest) {
          best = area;
          bestSpan = [left + 1, i - 1];
        }
        steps.push({
          line: ["pop", "width"],
          note: `Bar ${top} (height ${heights[top]}) is not shorter than ${h}: pop it. Its right wall is ${i}; ${left === -1 ? "nothing is under it on the stack, so it reaches the left end" : `its left wall is bar ${left}, the one under it (height ${heights[left]})`}. Width ${i} − ${left} − 1 = ${w}, area ${heights[top]} × ${w} = ${area}.${newBest ? " New best." : ""}`,
          view: view(i, { span: [left + 1, i - 1], calc: `${heights[top]} × ${w} = ${area}`, newBest }),
        });
      }
      if (i < n) {
        stack.push(i);
        steps.push({ line: "push", note: `Push bar ${i}. The stack still rises from bottom to top.`, view: view(i) });
      }
    }
    steps.push({ line: "return", note: `Return ${best}. Every bar was pushed once and popped once: O(n).`, view: view(undefined, { final: true }) });
    return steps;
  },
});
