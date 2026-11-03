// Fill the table dp[i][j] (first i letters of word1 → first j letters of word2) row by row, then read the edits back.
DSAViz.register("0072-edit-distance/approach2", {
  inputs: [
    { name: "word1", type: "string", value: "horse", maxLength: 6 },
    { name: "word2", type: "string", value: "ros", maxLength: 6 },
  ],
  trace({ word1, word2 }) {
    for (const [name, w] of [["word1", word1], ["word2", word2]]) if (!/^[a-z]*$/.test(w)) throw new DSAViz.InputError(`${name} can only use lowercase letters a–z (or be empty: "").`);
    const m = word1.length;
    const n = word2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(""));
    const steps = [];
    const rows = ['""', ...word1.split("").map((c, i) => `${i + 1} ${c}`)];
    const cols = ['""', ...word2.split("").map((c, j) => `${c} ${j + 1}`)];
    const view = (o = {}) => {
      const marks = {};
      for (let i = 0; i <= m; i++) for (let j = 0; j <= n; j++) if (dp[i][j] !== "") marks[`${i},${j}`] = "visited";
      (o.from || []).forEach(([i, j]) => (marks[`${i},${j}`] = "compare"));
      if (o.best) marks[`${o.best[0]},${o.best[1]}`] = "match";
      if (o.at) marks[`${o.at[0]},${o.at[1]}`] = "new";
      (o.path || []).forEach(([i, j]) => (marks[`${i},${j}`] = "match"));
      const widgets = [{ type: "grid", label: "dp[i][j]: edits to turn word1's first i letters into word2's first j", rows, cols, cells: dp.map((r) => r.slice()), marks, corner: "" }];
      if (o.ops) widgets.push({ type: "array", label: "one cheapest set of edits (from the green path)", values: o.ops.length ? o.ops : ["no edits"], wide: true, marks: {} });
      return widgets;
    };
    steps.push({ line: "init", note: `Row i is "${word1}" cut to i letters, column j is "${word2}" cut to j letters. dp[${m}][${n}] will be the answer.`, view: view() });
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    steps.push({ line: "base", note: `Edges first. Turning i letters into "" takes i deletions (first column); building j letters from "" takes j insertions (top row).`, view: view() });
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const a = word1[i - 1];
        const b = word2[j - 1];
        if (a === b) {
          dp[i][j] = dp[i - 1][j - 1];
          steps.push({
            line: ["fill", "same"],
            note: `"${a}" = "${b}": the last letters already match, so keep them for free. dp[${i}][${j}] = dp[${i - 1}][${j - 1}] = ${dp[i][j]}.`,
            view: view({ at: [i, j], from: [[i - 1, j - 1]] }),
          });
        } else {
          const rep = dp[i - 1][j - 1];
          const del = dp[i - 1][j];
          const ins = dp[i][j - 1];
          dp[i][j] = 1 + Math.min(rep, del, ins);
          const pick = rep <= del && rep <= ins ? `replace ${a} with ${b}` : del <= ins ? `delete ${a}` : `insert ${b}`;
          steps.push({
            line: ["fill", "edit"],
            note: `"${a}" ≠ "${b}": one edit plus the cheapest of replace (↖ ${rep}), delete ${a} (↑ ${del}), insert ${b} (← ${ins}). dp[${i}][${j}] = 1 + ${Math.min(rep, del, ins)} = ${dp[i][j]} (${pick}).`,
            view: view({ at: [i, j], from: [[i - 1, j - 1], [i - 1, j], [i, j - 1]] }),
          });
        }
      }
    }
    // Walk back from the corner to one cheapest set of edits.
    const path = [[m, n]];
    const ops = [];
    let i = m;
    let j = n;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && word1[i - 1] === word2[j - 1] && dp[i][j] === dp[i - 1][j - 1]) {
        i--;
        j--;
      } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
        ops.unshift(`replace ${word1[i - 1]} → ${word2[j - 1]}`);
        i--;
        j--;
      } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
        ops.unshift(`delete ${word1[i - 1]}`);
        i--;
      } else {
        ops.unshift(`insert ${word2[j - 1]}`);
        j--;
      }
      path.push([i, j]);
    }
    steps.push({
      line: "answer",
      note: `Return dp[${m}][${n}] = ${dp[m][n]}. Following the choices back from the corner gives the edits. ${(m + 1) * (n + 1)} cells, O(1) each: O(m·n) time and space.`,
      view: view({ path, ops }),
    });
    return steps;
  },
});
