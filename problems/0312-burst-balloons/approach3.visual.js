// The same intervals, filled bottom-up: short gaps first, so dp[lo][k] and dp[k][hi] are ready when dp[lo][hi] needs them.
DSAViz.register("0312-burst-balloons/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[3, 1, 5, 8]", minLength: 1, maxLength: 6, minValue: 0, maxValue: 100 }],
  trace({ nums }) {
    const a = [1, ...nums, 1], m = a.length;
    const dp = Array.from({ length: m }, () => Array(m).fill(null));
    const steps = [];
    const view = (lo, hi, k) => [{ type: "array", label: "a = [1] + nums + [1] (dark = k, burst last; yellow = lo and hi, its neighbours then)", values: a, marks: lo === undefined ? { 0: "ghost", [m - 1]: "ghost" } : { [lo]: "compare", [hi]: "compare", [k]: "active" } }, { type: "grid", label: "dp[lo][hi] (blank = not worked out; green = just set)", rows: a.map((_, i) => i), cols: a.map((_, i) => i), corner: "lo \\ hi", cells: dp.map((r, i) => r.map((v, j) => (j <= i + 1 && v === null ? (j > i ? 0 : "") : v === null ? "" : v))), marks: lo === undefined ? {} : { [`${lo},${hi}`]: "match" } }];
    steps.push({ line: "init", note: "Pad both ends with a 1. Intervals with nothing inside (hi = lo + 1) give 0.", view: view() });
    const fill = (lo, hi) => {
      let best = -1, bk = -1;
      for (let k = lo + 1; k < hi; k++) { const v = dp[lo][k] + a[lo] * a[k] * a[hi] + dp[k][hi]; if (v > best) { best = v; bk = k; } }
      dp[lo][hi] = best;
      steps.push({ line: ["gap", "last"], note: `dp[${lo}][${hi}]: the best last balloon is a[${bk}] = ${a[bk]}. dp[${lo}][${bk}] + ${a[lo]}×${a[bk]}×${a[hi]} + dp[${bk}][${hi}] = ${dp[lo][bk]} + ${a[lo] * a[bk] * a[hi]} + ${dp[bk][hi]} = ${best}.`, view: view(lo, hi, bk) });
    };
    for (let i = 0; i + 1 < m; i++) dp[i][i + 1] = 0;

    for (let gap = 2; gap < m; gap++) for (let lo = 0; lo + gap < m; lo++) fill(lo, lo + gap);
    steps.push({ line: "return", note: `Return ${dp[0][m - 1]}. About n² intervals, n choices each: O(n³).`, view: view() });
    return steps;
  },
});
