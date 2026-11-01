// Monotonic stack: keep bars in decreasing height; a taller bar closes a pool, which is filled one horizontal layer at a time.
DSAViz.register("0042-trapping-rain-water/approach3", {
  inputs: [{ name: "height", type: "int[]", value: "[4, 2, 0, 3, 2, 5]", minLength: 1, maxLength: 12, minValue: 0, maxValue: 9 }],
  trace({ height }) {
    const n = height.length;
    const steps = [];
    const stack = [];
    const levels = height.slice();
    let total = 0;
    const view = (i, opts = {}) => {
      const marks = {};
      stack.forEach((k) => (marks[k] = "compare"));
      if (opts.bottom !== undefined) marks[opts.bottom] = "cut";
      if (opts.left !== undefined) marks[opts.left] = "match";
      if (i !== undefined && i < n) marks[i] = opts.leftWall ? "match" : "active";
      const fresh = {};
      if (opts.layer) for (let k = opts.layer[0]; k <= opts.layer[1]; k++) fresh[k] = true;
      return [
        { type: "bars", label: "height (orange = on the stack; blue = water found so far)", values: height, marks, levels, waterMarks: fresh, pointers: i !== undefined && i < n ? { i } : {} },
        { type: "array", label: "stack of indices (bottom → top), heights go down", values: stack.map((k) => `${k} (h ${height[k]})`), wide: true, marks: stack.length ? { [stack.length - 1]: "active" } : {} },
        { type: "vars", items: [...(opts.calc ? [{ name: "layer", value: opts.calc }] : []), { name: "total", value: total, mark: opts.layer ? "new" : "" }] },
      ];
    };

    steps.push({ line: "init", note: "Walk left to right with a stack of bars that get lower and lower. Water can only sit on a bar once a taller bar shows up on its right.", view: view() });
    for (let i = 0; i < n; i++) {
      steps.push({ line: "loop", note: `Bar ${i}, height ${height[i]}.`, view: view(i) });
      while (stack.length && height[stack[stack.length - 1]] < height[i]) {
        const bottom = stack.pop();
        if (!stack.length) {
          steps.push({
            line: ["pop", "no-left"],
            note: `Pop bar ${bottom} (height ${height[bottom]}): it's lower than bar ${i}, but there's no bar left of it on the stack, so water there would run off the left edge.`,
            view: view(i, { bottom }),
          });
          break;
        }
        const left = stack[stack.length - 1];
        const width = i - left - 1;
        const top = Math.min(height[left], height[i]);
        const depth = top - height[bottom];
        total += width * depth;
        for (let k = left + 1; k < i; k++) levels[k] = Math.max(levels[k], top);
        steps.push({
          line: ["pop", "fill"],
          note:
            depth > 0
              ? `Pop bar ${bottom} (height ${height[bottom]}). It sits between walls ${left} (h ${height[left]}) and ${i} (h ${height[i]}): a layer ${width} wide, from ${height[bottom]} up to min(${height[left]}, ${height[i]}) = ${top}. Add ${width} × ${depth} = ${width * depth}. total = ${total}.`
              : `Pop bar ${bottom} (height ${height[bottom]}). The wall on its left (bar ${left}) is the same height, so this layer is ${depth} deep: nothing to add.`,
          view: view(i, { bottom, left, layer: depth > 0 ? [left + 1, i - 1] : undefined, calc: `${width} × ${depth} = ${width * depth}` }),
        });
      }
      stack.push(i);
      steps.push({ line: "push", note: `Push bar ${i}. The stack's heights still go down from bottom to top.`, view: view(i) });
    }
    steps.push({
      line: "return",
      note: `Return ${total}. Each bar is pushed and popped at most once: O(n) time, O(n) space for the stack. The water was added in horizontal layers, not bar by bar.`,
      view: view(),
    });
    return steps;
  },
});
