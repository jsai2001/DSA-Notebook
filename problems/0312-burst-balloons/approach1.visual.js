// Try every balloon as the next one to burst; remember the best for each set of balloons still there (a bitmask).
DSAViz.register("0312-burst-balloons/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[3, 1, 5, 8]", minLength: 1, maxLength: 6, minValue: 0, maxValue: 100 }],
  trace({ nums }) {
    const n = nums.length;
    const memo = new Map();
    const steps = [];
    const MAX = 80; let hidden = 0, states = 0;
    const push = (s) => (steps.length < MAX ? steps.push(s) : hidden++);
    const view = (mask, pick) => [{ type: "array", label: "balloons (dashed = already burst, green = the best one to burst next)", values: nums, marks: Object.fromEntries(nums.map((_, i) => [i, !(mask >> i & 1) ? "ghost" : i === pick ? "match" : ""]).filter(([, m]) => m)) }, { type: "vars", items: [{ name: "sets worked out", value: states }] }];
    const best = (mask) => {
      if (!mask) return 0;
      if (memo.has(mask)) return memo.get(mask);
      const alive = []; for (let i = 0; i < n; i++) if (mask >> i & 1) alive.push(i);
      let top = -1, pick = -1, how = "";
      alive.forEach((i, k) => { const l = k ? nums[alive[k - 1]] : 1, r = k + 1 < alive.length ? nums[alive[k + 1]] : 1; const v = l * nums[i] * r + best(mask & ~(1 << i)); if (v > top) { top = v; pick = i; how = `${l} × ${nums[i]} × ${r} = ${l * nums[i] * r}`; } });
      memo.set(mask, top); states++;
      push({ line: ["call", "memo", "try"], note: `Balloons left: ${alive.map((i) => nums[i]).join(", ")}. Best is to burst ${nums[pick]} next (${how}), then do the rest: ${top} in total.`, view: view(mask, pick) });
      return top;
    };
    push({ line: "init", note: "All balloons are still there. Try each one as the next to burst.", view: view((1 << n) - 1, -1) });
    const ans = best((1 << n) - 1);
    steps.push({ line: "return", note: `Return ${ans}. ${states} different sets of balloons${hidden ? ` (${hidden} steps not shown)` : ""}: up to 2ⁿ, so this only works for small n.`, view: view((1 << n) - 1, -1) });
    return steps;
  },
});
