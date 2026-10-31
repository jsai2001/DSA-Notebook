// Brute force: try every pair of lines; the water is as high as the shorter one.
DSAViz.register("0011-container-with-most-water/approach1", {
  inputs: [{ name: "height", type: "int[]", value: "[1, 8, 6, 2, 5, 4, 8, 3, 7]", minLength: 2, maxLength: 9, minValue: 0, maxValue: 20 }],
  trace({ height }) {
    const n = height.length;
    const steps = [];
    let best = 0;
    let bestPair = null;
    const view = (i, j, opts = {}) => {
      const marks = {};
      if (i !== undefined) {
        marks[i] = height[i] <= height[j] ? "compare" : "active";
        marks[j] = height[j] < height[i] ? "compare" : "active";
      }
      if (opts.final && bestPair) bestPair.forEach((k) => (marks[k] = "match"));
      const water = i !== undefined ? [i, j] : opts.final ? bestPair : undefined;
      return [
        { type: "bars", label: "height (yellow = the shorter line, which sets the water level)", values: height, marks, pointers: i !== undefined ? { i, j } : {}, water },
        {
          type: "vars",
          items: [
            { name: "area", value: opts.area === undefined ? "–" : opts.area },
            { name: "best", value: bestPair ? `${best} (lines ${bestPair[0]} and ${bestPair[1]})` : best, mark: opts.newBest ? "match" : "" },
          ],
        },
      ];
    };

    steps.push({
      line: "init",
      note: `Check every pair i < j. Water between two lines is as high as the shorter one and as wide as j - i. That's ${(n * (n - 1)) / 2} pairs here.`,
      view: view(),
    });
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const h = Math.min(height[i], height[j]);
        const area = h * (j - i);
        const newBest = area > best;
        if (newBest) {
          best = area;
          bestPair = [i, j];
        }
        steps.push({
          line: newBest ? ["pair", "area", "best"] : ["pair", "area"],
          note: `Lines ${i} and ${j}: min(${height[i]}, ${height[j]}) × (${j} - ${i}) = ${h} × ${j - i} = ${area}.` + (newBest ? ` New best.` : ""),
          view: view(i, j, { area, newBest }),
        });
      }
    }
    steps.push({
      line: "return",
      note: `Return ${best}. Every pair was checked: O(n²), about 5 × 10⁹ pairs at n = 10⁵, which is too slow.`,
      view: view(undefined, undefined, { final: true }),
    });
    return steps;
  },
});
