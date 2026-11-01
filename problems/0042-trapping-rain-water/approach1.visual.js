// Brute force: for every bar, scan left and right for the tallest walls; water = the lower wall minus the bar.
DSAViz.register("0042-trapping-rain-water/approach1", {
  inputs: [{ name: "height", type: "int[]", value: "[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]", minLength: 1, maxLength: 12, minValue: 0, maxValue: 9 }],
  trace({ height }) {
    const n = height.length;
    const steps = [];
    const levels = height.slice(); // water top per bar (= the bar while dry)
    let total = 0;
    let scans = 0;
    const view = (i, opts = {}) => {
      const marks = {};
      if (opts.range) for (let k = opts.range[0]; k <= opts.range[1]; k++) marks[k] = "window";
      if (opts.walls) opts.walls.forEach((k) => (marks[k] = "match"));
      if (i !== undefined) marks[i] = "active";
      return [
        { type: "bars", label: "height (blue = water found so far)", values: height, marks, levels, waterMarks: opts.fresh ? { [i]: true } : {}, pointers: i !== undefined ? { i } : {} },
        {
          type: "vars",
          items: [
            ...(opts.lm !== undefined ? [{ name: "left_max", value: opts.lm }] : []),
            ...(opts.rm !== undefined ? [{ name: "right_max", value: opts.rm }] : []),
            { name: "total", value: total, mark: opts.fresh ? "new" : "" },
            { name: "bars scanned", value: scans },
          ],
        },
      ];
    };
    const argmax = (a, b) => {
      let best = a;
      for (let k = a; k <= b; k++) if (height[k] > height[best]) best = k;
      return best;
    };

    steps.push({ line: "init", note: "The water above a bar is as high as the lower of the tallest bar on its left and the tallest on its right (counting itself), minus its own height.", view: view() });
    for (let i = 0; i < n; i++) {
      steps.push({ line: "loop", note: `Bar ${i} (height ${height[i]}).`, view: view(i) });
      const L = argmax(0, i);
      scans += i + 1;
      steps.push({ line: "left", note: `Scan bars 0..${i}: the tallest is ${height[L]} (bar ${L}).`, view: view(i, { range: [0, i], walls: [L], lm: height[L] }) });
      const R = argmax(i, n - 1);
      scans += n - i;
      steps.push({ line: "right", note: `Scan bars ${i}..${n - 1}: the tallest is ${height[R]} (bar ${R}).`, view: view(i, { range: [i, n - 1], walls: [R], lm: height[L], rm: height[R] }) });
      const w = Math.min(height[L], height[R]) - height[i];
      total += w;
      levels[i] = height[i] + w;
      steps.push({
        line: "add",
        note: w
          ? `min(${height[L]}, ${height[R]}) − ${height[i]} = ${w}: bar ${i} holds ${w} unit${w === 1 ? "" : "s"} of water. total = ${total}.`
          : `min(${height[L]}, ${height[R]}) − ${height[i]} = 0: bar ${i} is as tall as the lower wall, so no water here.`,
        view: view(i, { walls: [L, R], lm: height[L], rm: height[R], fresh: w > 0 }),
      });
    }
    steps.push({
      line: "return",
      note: `Return ${total}. Every bar re-scanned the whole array (${scans} bars looked at for ${n} bars): O(n²).`,
      view: view(),
    });
    return steps;
  },
});
