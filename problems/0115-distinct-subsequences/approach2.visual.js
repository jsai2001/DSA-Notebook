// 2D table: dp[i][j] = ways to spell the first j letters of t with the first i letters of s.
DSAViz.register("0115-distinct-subsequences/approach2", {
  inputs: [
    { name: "s", type: "string", value: "babgbag", maxLength: 9 },
    { name: "t", type: "string", value: "bag", maxLength: 4 },
  ],
  trace({ s, t }) {
    for (const [name, x] of [["s", s], ["t", t]]) if (!/^[A-Za-z]+$/.test(x)) throw new DSAViz.InputError(`${name} must be 1 or more letters.`);
    const m = s.length;
    const n = t.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(""));
    const rows = ["·", ...s].map((c, i) => `${i} ${c}`);
    const cols = ["·", ...t].map((c, j) => `${j} ${c}`);
    const steps = [];
    const view = (i, j, o = {}) => {
      const marks = {};
      if (o.col0) for (let r = 0; r <= m; r++) marks[`${r},0`] = "new";
      if (o.skip) marks[`${i - 1},${j}`] = "compare";
      if (o.use) marks[`${i - 1},${j - 1}`] = "match";
      if (i !== undefined && j !== undefined && !o.col0) marks[`${i},${j}`] = "active";
      if (o.final) marks[`${m},${n}`] = "match";
      return [{ type: "grid", label: "dp (row i = first i letters of s, column j = first j of t); orange = skip s[i−1], green = use it", rows, cols, cells: dp.map((r) => r.slice()), marks, corner: "s \\ t" }];
    };
    for (let i = 0; i <= m; i++) dp[i][0] = 1;
    for (let j = 1; j <= n; j++) dp[0][j] = 0;
    steps.push({ line: "init", note: "Column 0 is all 1: the empty start of t is spelled one way, by using nothing. Row 0 (no letters of s) is 0 everywhere else.", view: view(0, 0, { col0: true }) });
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const same = s[i - 1] === t[j - 1];
        dp[i][j] = dp[i - 1][j] + (same ? dp[i - 1][j - 1] : 0);
        steps.push({
          line: same ? ["loop", "skip", "use"] : ["loop", "skip"],
          note: same
            ? `dp[${i}][${j}]: s[${i - 1}] = "${s[i - 1]}" equals t[${j - 1}]. Skip it (${dp[i - 1][j]}) + use it (${dp[i - 1][j - 1]}) = ${dp[i][j]}.`
            : `dp[${i}][${j}]: s[${i - 1}] = "${s[i - 1]}" isn't t[${j - 1}] = "${t[j - 1]}", so it can only be skipped: ${dp[i][j]}.`,
          view: view(i, j, { skip: true, use: same }),
        });
      }
    }
    steps.push({ line: "answer", note: `Return dp[${m}][${n}] = ${dp[m][n]}. ${m} × ${n} cells, one addition each: O(m · n).`, view: view(undefined, undefined, { final: true }) });
    return steps;
  },
});
