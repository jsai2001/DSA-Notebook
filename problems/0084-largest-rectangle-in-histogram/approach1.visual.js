// Every pair of edges: from each left edge i, grow j to the right and keep the shortest bar seen.
DSAViz.register("0084-largest-rectangle-in-histogram/approach1", {
  inputs: [{ name: "heights", type: "int[]", value: "[2, 1, 5, 6, 2, 3]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 9 }],
  trace({ heights }) {
    const n = heights.length;
    const steps = [];
    let best = 0;
    let bestSpan = null;
    const span = (a, b) => (a === b ? `bar ${a}` : `bars ${a}..${b}`);
    const view = (i, j, o = {}) => {
      const marks = {};
      if (o.final) {
        if (bestSpan) for (let k = bestSpan[0]; k <= bestSpan[1]; k++) marks[k] = "match";
      } else if (i !== undefined) {
        for (let k = i; k <= j; k++) marks[k] = "match";
        if (o.low !== undefined) marks[o.low] = "compare";
      }
      return [
        { type: "bars", label: "heights (green = the rectangle i..j; orange = its shortest bar, which sets the height)", values: heights, marks, pointers: i !== undefined && !o.final ? (i === j ? { i } : { i, j }) : {} },
        {
          type: "vars",
          items: [
            ...(o.area !== undefined ? [{ name: "area", value: o.area, mark: o.newBest ? "new" : "" }] : []),
            { name: "best", value: bestSpan ? `${best} (${span(bestSpan[0], bestSpan[1])})` : best, mark: o.newBest ? "match" : "" },
          ],
        },
      ];
    };
    steps.push({ line: "init", note: `Try every left edge i and every right edge j ≥ i: ${(n * (n + 1)) / 2} rectangles for ${n} bars.`, view: view() });
    for (let i = 0; i < n; i++) {
      let low = heights[i];
      let lowAt = i;
      for (let j = i; j < n; j++) {
        if (heights[j] < low) {
          low = heights[j];
          lowAt = j;
        }
        const area = low * (j - i + 1);
        const newBest = area > best;
        if (newBest) {
          best = area;
          bestSpan = [i, j];
        }
        steps.push({
          line: [j === i ? "start" : "grow", "area"],
          note: `${span(i, j)}: the shortest is ${low}${j - i ? ` (bar ${lowAt})` : ""}, so ${low} × ${j - i + 1} = ${area}.${newBest ? " New best." : ""}`,
          view: view(i, j, { low: lowAt, area, newBest }),
        });
      }
    }
    steps.push({ line: "return", note: `Return ${best}. Every pair was tried: O(n²).`, view: view(undefined, undefined, { final: true }) });
    return steps;
  },
});
