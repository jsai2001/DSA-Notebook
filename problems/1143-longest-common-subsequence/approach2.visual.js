// dp[i][j] = LCS of the first i letters of text1 and the first j of text2, filled row by row.
DSAViz.register("1143-longest-common-subsequence/approach2", {
  inputs: [
    { name: "text1", type: "string", value: "abcde", maxLength: 7 },
    { name: "text2", type: "string", value: "ace", maxLength: 7 },
  ],
  trace({ text1, text2 }) {
    if (!/^[a-z]+$/.test(text1) || !/^[a-z]+$/.test(text2)) throw new DSAViz.InputError("Both texts must be 1 to 7 lowercase letters.");
    const m = text1.length, n = text2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    const filled = Array.from({ length: m + 1 }, (_, i) => Array(n + 1).fill(i === 0));
    for (let i = 0; i <= m; i++) filled[i][0] = true;
    const steps = [];
    const view = (marks = {}) => [{ type: "grid", label: "dp[i][j]: rows are text1, columns text2; · = no letters (yellow = the cells it came from; green = new, from a match; dark = new)", rows: ["·", ...text1], cols: ["·", ...text2], corner: "", cells: dp.map((r, i) => r.map((v, j) => (filled[i][j] ? v : ""))), marks }];
    steps.push({ line: "init", note: "Row 0 and column 0 are 0: an empty text has nothing in common with anything.", view: view() });
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
      filled[i][j] = true;
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        steps.push({ line: ["row", "cell", "same"], note: `'${text1[i - 1]}' = '${text2[j - 1]}': dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dp[i][j]}.`, view: view({ [`${i - 1},${j - 1}`]: "compare", [`${i},${j}`]: "match" }) });
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        steps.push({ line: ["row", "cell", "diff"], note: `'${text1[i - 1]}' ≠ '${text2[j - 1]}': dp[${i}][${j}] = max(up ${dp[i - 1][j]}, left ${dp[i][j - 1]}) = ${dp[i][j]}.`, view: view({ [`${i - 1},${j}`]: "compare", [`${i},${j - 1}`]: "compare", [`${i},${j}`]: "active" }) });
      }
    }
    steps.push({ line: "return", note: `Return ${dp[m][n]}. (m + 1) × (n + 1) cells: O(m·n) time and space.`, view: view({ [`${m},${n}`]: "match" }) });
    return steps;
  },
});
