// Two pointers: start at both ends; always drop the shorter line.
DSAViz.register("0011-container-with-most-water/approach2", {
  inputs: [{ name: "height", type: "int[]", value: "[1, 8, 6, 2, 5, 4, 8, 3, 7]", minLength: 2, maxLength: 12, minValue: 0, maxValue: 20 }],
  trace({ height }) {
    const n = height.length;
    const steps = [];
    let left = 0;
    let right = n - 1;
    let best = 0;
    let bestPair = null;
    const view = (opts = {}) => {
      const marks = {};
      for (let k = 0; k < n; k++) if (k < left || k > right) marks[k] = "visited";
      if (!opts.final) {
        marks[left] = height[left] < height[right] ? "compare" : "active";
        marks[right] = height[left] < height[right] ? "active" : "compare";
      }
      if (opts.final && bestPair) bestPair.forEach((k) => (marks[k] = "match"));
      return [
        {
          type: "bars", label: "height (yellow = the shorter line, dashed = dropped)", values: height, marks,
          pointers: opts.final ? {} : left === right ? { "left, right": left } : { left, right },
          water: opts.final ? bestPair : [left, right],
        },
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
      note: `Start with the widest container: left = 0, right = ${n - 1}. Every move makes it narrower, so it only gets bigger if the water gets higher.`,
      view: view(),
    });
    while (left < right) {
      const h = Math.min(height[left], height[right]);
      const area = h * (right - left);
      const newBest = area > best;
      if (newBest) {
        best = area;
        bestPair = [left, right];
      }
      steps.push({
        line: newBest ? ["loop", "area", "best"] : ["loop", "area"],
        note: `min(${height[left]}, ${height[right]}) × (${right} - ${left}) = ${h} × ${right - left} = ${area}.` + (newBest ? ` New best.` : ` Best stays ${best}.`),
        view: view({ area, newBest }),
      });
      if (height[left] < height[right]) {
        steps.push({
          line: ["move", "moveleft"],
          note: `Line ${left} (height ${height[left]}) is shorter. Any narrower container that keeps it is at most ${height[left]} high, so none can beat ${area}. Drop it: left = ${left + 1}.`,
          view: view({ area }),
        });
        left++;
      } else {
        steps.push({
          line: ["move", "moveright"],
          note:
            (height[left] === height[right]
              ? `Both lines are ${height[left]}: either can go, because any container that keeps one of them is at most ${height[left]} high. `
              : `Line ${right} (height ${height[right]}) is shorter, so no narrower container that keeps it can beat ${area}. `) +
            `Drop the right one: right = ${right - 1}.`,
          view: view({ area }),
        });
        right--;
      }
    }
    steps.push({
      line: ["loop", "return"],
      note: `left meets right. Return ${best}. Each step dropped one line, so it took n - 1 = ${n - 1} steps: O(n).`,
      view: view({ final: true }),
    });
    return steps;
  },
});
