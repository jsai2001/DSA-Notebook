// Two pointers, skipping: after measuring at height h, skip every line no taller than h.
DSAViz.register("0011-container-with-most-water/approach3", {
  inputs: [{ name: "height", type: "int[]", value: "[1, 8, 6, 2, 5, 4, 8, 3, 7]", minLength: 2, maxLength: 12, minValue: 0, maxValue: 20 }],
  trace({ height }) {
    const n = height.length;
    const steps = [];
    let left = 0;
    let right = n - 1;
    let best = 0;
    let bestPair = null;
    let h = null;
    let measured = 0;
    const view = (opts = {}) => {
      const marks = {};
      for (let k = 0; k < n; k++) if (k < left || k > right) marks[k] = "visited";
      if (opts.skip !== undefined) marks[opts.skip] = "compare";
      else if (!opts.final) {
        marks[left] = "active";
        marks[right] = "active";
      }
      if (opts.final && bestPair) bestPair.forEach((k) => (marks[k] = "match"));
      return [
        {
          type: "bars", label: "height (yellow = being skipped, dashed = dropped)", values: height, marks,
          pointers: opts.final ? {} : left === right ? { "left, right": left } : { left, right },
          water: opts.final ? bestPair : opts.water,
        },
        {
          type: "vars",
          items: [
            { name: "h", value: h === null ? "–" : h },
            { name: "best", value: bestPair ? `${best} (lines ${bestPair[0]} and ${bestPair[1]})` : best, mark: opts.newBest ? "match" : "" },
            { name: "areas measured", value: measured },
          ],
        },
      ];
    };

    steps.push({ line: "init", note: `Start at both ends, like Approach 2.`, view: view({ water: [left, right] }) });
    while (left < right) {
      h = Math.min(height[left], height[right]);
      const area = h * (right - left);
      measured++;
      const newBest = area > best;
      if (newBest) {
        best = area;
        bestPair = [left, right];
      }
      steps.push({
        line: newBest ? ["loop", "area", "best"] : ["loop", "area"],
        note: `h = min(${height[left]}, ${height[right]}) = ${h}. Area ${h} × ${right - left} = ${area}.` + (newBest ? ` New best.` : ` Best stays ${best}.`),
        view: view({ water: [left, right], newBest }),
      });
      const pairL = left;
      const pairR = right;
      while (left < right && height[left] <= h) {
        steps.push({
          line: "skipleft",
          note: `Line ${left} (height ${height[left]}) ≤ ${h}: any container using it is narrower and no higher than ${h}, so skip it.`,
          view: view({ skip: left, water: [pairL, pairR] }),
        });
        left++;
      }
      while (left < right && height[right] <= h) {
        steps.push({
          line: "skipright",
          note: `Line ${right} (height ${height[right]}) ≤ ${h}: same reason, skip it.`,
          view: view({ skip: right, water: [pairL, pairR] }),
        });
        right--;
      }
    }
    steps.push({
      line: ["loop", "return"],
      note: `Return ${best}. Only ${measured} area${measured === 1 ? " was" : "s were"} measured; Approach 2 would measure ${n - 1}. Still O(n), just fewer multiplications.`,
      view: view({ final: true }),
    });
    return steps;
  },
});
