// Prefix and suffix maximums: work out the tallest wall on each side once, then each bar is O(1).
DSAViz.register("0042-trapping-rain-water/approach2", {
  inputs: [{ name: "height", type: "int[]", value: "[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]", minLength: 1, maxLength: 12, minValue: 0, maxValue: 9 }],
  trace({ height }) {
    const n = height.length;
    const steps = [];
    const left = Array(n).fill("");
    const right = Array(n).fill("");
    const levels = height.slice();
    let total = 0;
    const view = (opts = {}) => {
      const bmarks = {};
      if (opts.i !== undefined) bmarks[opts.i] = "active";
      const lm = {};
      const rm = {};
      if (opts.left !== undefined) lm[opts.left] = "new";
      if (opts.right !== undefined) rm[opts.right] = "new";
      if (opts.i !== undefined && opts.pick) {
        (opts.pick === "left" ? lm : rm)[opts.i] = "match";
        (opts.pick === "left" ? rm : lm)[opts.i] = "compare";
      }
      return [
        { type: "bars", label: "height (blue = water found so far)", values: height, marks: bmarks, levels, waterMarks: opts.fresh ? { [opts.i]: true } : {}, pointers: opts.i !== undefined ? { i: opts.i } : {} },
        { type: "array", label: "left_max[i]: tallest in 0..i", values: left, marks: lm, compact: true },
        { type: "array", label: "right_max[i]: tallest in i..n-1", values: right, marks: rm, compact: true },
        { type: "vars", items: [{ name: "total", value: total, mark: opts.fresh ? "new" : "" }] },
      ];
    };

    steps.push({ line: "left", note: "Pass 1, left to right: left_max[i] = max(left_max[i − 1], height[i]).", view: view() });
    for (let i = 0; i < n; i++) {
      left[i] = i ? Math.max(left[i - 1], height[i]) : height[0];
      steps.push({ line: "left", note: i ? `left_max[${i}] = max(${left[i - 1]}, ${height[i]}) = ${left[i]}.` : `left_max[0] = height[0] = ${height[0]}.`, view: view({ left: i }) });
    }
    steps.push({ line: "right", note: "Pass 2, right to left: right_max[i] = max(right_max[i + 1], height[i]).", view: view() });
    for (let i = n - 1; i >= 0; i--) {
      right[i] = i < n - 1 ? Math.max(right[i + 1], height[i]) : height[n - 1];
      steps.push({ line: "right", note: i < n - 1 ? `right_max[${i}] = max(${right[i + 1]}, ${height[i]}) = ${right[i]}.` : `right_max[${n - 1}] = height[${n - 1}] = ${height[n - 1]}.`, view: view({ right: i }) });
    }
    for (let i = 0; i < n; i++) {
      const wall = Math.min(left[i], right[i]);
      const w = wall - height[i];
      total += w;
      levels[i] = wall;
      steps.push({
        line: "add",
        note: `Bar ${i}: min(${left[i]}, ${right[i]}) − ${height[i]} = ${w}${w ? `. total = ${total}` : ", no water"}. Two lookups instead of two scans.`,
        view: view({ i, pick: left[i] <= right[i] ? "left" : "right", fresh: w > 0 }),
      });
    }
    steps.push({ line: "return", note: `Return ${total}. Three passes: O(n) time, but two extra arrays: O(n) space.`, view: view() });
    return steps;
  },
});
