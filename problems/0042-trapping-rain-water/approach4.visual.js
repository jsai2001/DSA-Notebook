// Two pointers: move the lower end inward; that side's running max alone decides its water.
DSAViz.register("0042-trapping-rain-water/approach4", {
  inputs: [{ name: "height", type: "int[]", value: "[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]", minLength: 1, maxLength: 12, minValue: 0, maxValue: 9 }],
  trace({ height }) {
    const n = height.length;
    const steps = [];
    const levels = height.slice();
    const done = new Set();
    let left = 0;
    let right = n - 1;
    let leftMax = 0;
    let rightMax = 0;
    let total = 0;
    const view = (opts = {}) => {
      const marks = {};
      done.forEach((k) => (marks[k] = "visited"));
      if (left <= right) {
        marks[left] = opts.side === "left" ? "active" : "compare";
        marks[right] = opts.side === "right" ? "active" : "compare";
      }
      const pointers = {};
      if (left === right) pointers["left, right"] = left;
      else if (left < right) {
        pointers.left = left;
        pointers.right = right;
      }
      return [
        { type: "bars", label: "height (blue = water found so far; faded = done)", values: height, marks, levels, waterMarks: opts.fresh !== undefined ? { [opts.fresh]: true } : {}, pointers },
        {
          type: "vars",
          items: [
            { name: "left_max", value: leftMax, mark: opts.side === "left" ? "new" : "" },
            { name: "right_max", value: rightMax, mark: opts.side === "right" ? "new" : "" },
            { name: "total", value: total, mark: opts.fresh !== undefined ? "new" : "" },
          ],
        },
      ];
    };

    steps.push({
      line: "init",
      note: `left = 0, right = ${n - 1}, and the tallest bar seen from each end is 0 so far.`,
      view: view(),
    });
    while (left < right) {
      if (height[left] < height[right]) {
        const i = left;
        leftMax = Math.max(leftMax, height[i]);
        const w = leftMax - height[i];
        total += w;
        levels[i] = leftMax;
        done.add(i);
        steps.push({
          line: ["loop", "move-left"],
          note: `height[left] = ${height[i]} < height[right] = ${height[right]}: there's a wall of at least ${height[right]} on the right, so bar ${i}'s water depends only on left_max. left_max = ${leftMax}, water ${leftMax} − ${height[i]} = ${w}${w ? `, total = ${total}` : ""}. Move left in.`,
          view: view({ side: "left", fresh: w ? i : undefined }),
        });
        left++;
      } else {
        const i = right;
        rightMax = Math.max(rightMax, height[i]);
        const w = rightMax - height[i];
        total += w;
        levels[i] = rightMax;
        done.add(i);
        steps.push({
          line: ["loop", "move-right"],
          note: `height[left] = ${height[left]} ≥ height[right] = ${height[i]}: there's a wall of at least ${height[left]} on the left, so bar ${i}'s water depends only on right_max. right_max = ${rightMax}, water ${rightMax} − ${height[i]} = ${w}${w ? `, total = ${total}` : ""}. Move right in.`,
          view: view({ side: "right", fresh: w ? i : undefined }),
        });
        right--;
      }
    }
    steps.push({
      line: "return",
      note: `left and right meet at bar ${left}, the tallest bar, which holds no water. Return ${total}. One pass, and only a few variables: O(n) time, O(1) space.`,
      view: view(),
    });
    return steps;
  },
});
