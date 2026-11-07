// longest(i) = the longest increasing subsequence that starts at i: 1 + the best longest(j) over bigger nums[j] after i.
DSAViz.register("0300-longest-increasing-subsequence/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[10, 9, 2, 5, 3, 7, 101, 18]", minLength: 1, maxLength: 10, minValue: -10000, maxValue: 10000 }],
  trace({ nums }) {
    const n = nums.length;
    const memo = Array(n).fill(null);
    const steps = [];
    const MAX = 120; let hidden = 0;
    const push = (s) => (steps.length < MAX ? steps.push(s) : hidden++);
    const view = (i, o = {}) => [{ type: "array", label: "nums (dark = i, yellow = bigger values after it)", values: nums, marks: i === undefined ? {} : { ...Object.fromEntries(nums.map((x, j) => [j, j > i && x > nums[i] ? "compare" : ""]).filter(([, m]) => m)), [i]: "active" } }, { type: "array", label: "memo[i] = longest(i) (? = not known yet)", values: memo.map((v) => (v === null ? "?" : v)), marks: i !== undefined && memo[i] !== null ? { [i]: o.hit ? "match" : "new" } : {} }];
    push({ line: "init", note: "Try every start i. longest(i) is remembered the first time it's worked out.", view: view() });
    const longest = (i) => {
      if (memo[i] !== null) { push({ line: ["call", "store"], note: `longest(${i}) is known: ${memo[i]}.`, view: view(i, { hit: true }) }); return memo[i]; }
      let best = 1;
      for (let j = i + 1; j < n; j++) if (nums[j] > nums[i]) best = Math.max(best, 1 + longest(j));
      memo[i] = best;
      const nexts = nums.map((x, j) => (j > i && x > nums[i] ? j : -1)).filter((j) => j >= 0);
      push({ line: ["call", "memo", "try", "store"], note: nexts.length ? `longest(${i}): ${nums[i]} can be followed by ${nexts.map((j) => nums[j]).join(", ")}. Best is 1 + ${best - 1} = ${best}.` : `longest(${i}): nothing bigger comes after ${nums[i]}, so 1.`, view: view(i) });
      return best;
    };
    let ans = 0;
    for (let i = 0; i < n; i++) ans = Math.max(ans, longest(i));
    steps.push({ line: "return", note: `Return ${ans}, the biggest memo value${hidden ? ` (${hidden} steps not shown)` : ""}. Each i loops over every later j once: O(n²).`, view: view() });
    return steps;
  },
});
