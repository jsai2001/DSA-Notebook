// 2D table: dp[i][j] is true when the first i of s1 and the first j of s2 make the first i + j of s3.
DSAViz.register("0097-interleaving-string/approach2", {
  inputs: [
    { name: "s1", type: "string", value: "aab", maxLength: 5 },
    { name: "s2", type: "string", value: "axy", maxLength: 5 },
    { name: "s3", type: "string", value: "aaxaby", maxLength: 10 },
  ],
  trace({ s1, s2, s3 }) {
    for (const [name, x] of [["s1", s1], ["s2", s2], ["s3", s3]]) if (!/^[a-z]*$/.test(x)) throw new DSAViz.InputError(`${name} must be lowercase letters (a–z), or "" for empty.`);
    const m = s1.length;
    const n = s2.length;
    const steps = [];
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(""));
    const rows = ["·", ...s1].map((c, i) => `${i} ${c}`);
    const cols = ["·", ...s2].map((c, j) => `${j} ${c}`);
    const show = (v) => (v === "" ? "" : v ? "T" : "F");
    const view = (i, j, o = {}) => {
      const marks = {};
      for (let r = 0; r <= m; r++) for (let c = 0; c <= n; c++) if (dp[r][c] === true) marks[`${r},${c}`] = "visited";
      if (o.from1) marks[`${i - 1},${j}`] = "compare";
      if (o.from2) marks[`${i},${j - 1}`] = "compare";
      if (i !== undefined) marks[`${i},${j}`] = dp[i][j] === true ? "new" : "active";
      if (o.path) o.path.forEach(([r, c]) => (marks[`${r},${c}`] = "match"));
      const s3m = {};
      if (i !== undefined && i + j > 0) s3m[i + j - 1] = "active";
      return [
        { type: "array", label: "s3", values: [...s3], marks: s3m, pointers: i !== undefined && i + j > 0 ? { k: i + j - 1 } : {} },
        { type: "grid", label: "dp (row i = first i of s1, column j = first j of s2; T = can make the first i + j of s3)", rows, cols, cells: dp.map((r) => r.map(show)), marks, corner: "s1 \\ s2" },
      ];
    };
    if (m + n !== s3.length) {
      steps.push({ line: "len", note: `len(s1) + len(s2) = ${m} + ${n} = ${m + n}, but s3 has ${s3.length} letters. They can't match: return false.`, view: view() });
      return steps;
    }
    dp[0][0] = true;
    steps.push({ line: "init", note: "dp[0][0] = T: nothing from either string makes the empty start of s3.", view: view(0, 0) });
    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        if (i === 0 && j === 0) continue;
        const ch = s3[i + j - 1];
        const a = i > 0 && s1[i - 1] === ch && dp[i - 1][j] === true;
        const b = j > 0 && s2[j - 1] === ch && dp[i][j - 1] === true;
        dp[i][j] = a || b;
        const why = [];
        if (i > 0) why.push(s1[i - 1] !== ch ? `s1 gives "${s1[i - 1]}"` : dp[i - 1][j] ? `from s1 ("${ch}", above is T)` : `s1 has "${ch}" but above is F`);
        if (j > 0) why.push(s2[j - 1] !== ch ? `s2 gives "${s2[j - 1]}"` : dp[i][j - 1] ? `from s2 ("${ch}", left is T)` : `s2 has "${ch}" but left is F`);
        steps.push({
          line: ["loop", "from1", "from2"],
          note: `dp[${i}][${j}]: the last letter is s3[${i + j - 1}] = "${ch}". ${why.join("; ")}. ${dp[i][j] ? "T" : "F"}.`,
          view: view(i, j, { from1: a, from2: b }),
        });
      }
    }
    // Walk back along a true path to show one interleaving.
    let path = null;
    if (dp[m][n]) {
      path = [[m, n]];
      let i = m, j = n;
      while (i || j) {
        const ch = s3[i + j - 1];
        if (i > 0 && s1[i - 1] === ch && dp[i - 1][j]) i--;
        else j--;
        path.push([i, j]);
      }
    }
    steps.push({
      line: "answer",
      note: dp[m][n] ? `Return true. The green cells are one way through: each step down takes a letter from s1, each step right one from s2.` : `Return false: dp[${m}][${n}] is F, so no mix of s1 and s2 makes s3.`,
      view: view(undefined, undefined, { path }),
    });
    return steps;
  },
});
