// One row: dp[j] holds the row above until it's overwritten, and dp[j − 1] is already this row.
DSAViz.register("0097-interleaving-string/approach3", {
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
    const dp = Array(n + 1).fill("");
    let row = 0; // which row of the table dp[] holds (left of j: this row; from j on: the row above)
    const show = (v) => (v === "" ? "" : v ? "T" : "F");
    const view = (i, j, o = {}) => {
      const marks = {};
      if (j !== undefined) {
        for (let c = 0; c < j; c++) marks[c] = "visited";
        for (let c = j + 1; c <= n; c++) if (i > 0) marks[c] = "ghost";
        if (o.from1) marks[j] = "compare";
        if (o.from2) marks[j - 1] = "compare";
        if (o.stored) marks[j] = dp[j] ? "new" : "cut";
      }
      if (o.final) marks[n] = dp[n] ? "match" : "cut";
      const s3m = {};
      if (i !== undefined && i + j > 0) s3m[i + j - 1] = "active";
      const s1m = i !== undefined && i > 0 ? { [i - 1]: "active" } : {};
      const s2m = j !== undefined && j > 0 ? { [j - 1]: "active" } : {};
      return [
        { type: "array", label: "s1", values: [...s1], marks: s1m, compact: true },
        { type: "array", label: "s2", values: [...s2], marks: s2m, compact: true },
        { type: "array", label: "s3", values: [...s3], marks: s3m, pointers: i !== undefined && i + j > 0 ? { k: i + j - 1 } : {} },
        { type: "array", label: `dp[j], one row (row ${row}; faded = still the row above)`, values: dp.map(show), marks, pointers: j !== undefined ? { j } : {} },
      ];
    };
    if (m + n !== s3.length) {
      steps.push({ line: "len", note: `len(s1) + len(s2) = ${m + n}, but s3 has ${s3.length} letters: return false.`, view: view() });
      return steps;
    }
    for (let i = 0; i <= m; i++) {
      row = i;
      for (let j = 0; j <= n; j++) {
        if (i === 0 && j === 0) {
          dp[0] = true;
          steps.push({ line: ["loop", "init"], note: "Row 0, j = 0: dp[0] = T (nothing makes the empty start).", view: view(0, 0, { stored: true }) });
          continue;
        }
        const ch = s3[i + j - 1];
        const above = dp[j];
        const a = i > 0 && above === true && s1[i - 1] === ch;
        const b = j > 0 && dp[j - 1] === true && s2[j - 1] === ch;
        const parts = [];
        if (i > 0) parts.push(`dp[${j}] still holds the row above (${show(above)})${s1[i - 1] === ch ? `, and s1 gives "${ch}"` : `, but s1 gives "${s1[i - 1]}"`}`);
        if (j > 0) parts.push(`dp[${j - 1}] is this row (${show(dp[j - 1])})${s2[j - 1] === ch ? `, and s2 gives "${ch}"` : `, but s2 gives "${s2[j - 1]}"`}`);
        dp[j] = a || b;
        steps.push({
          line: ["loop", "from1", "from2", "store"],
          note: `Row ${i}, j = ${j}, next letter "${ch}": ${parts.join("; ")}. dp[${j}] = ${show(dp[j])}.`,
          view: view(i, j, { from1: a, from2: b, stored: true }),
        });
      }
    }
    const cells = (k) => `${k} cell${k === 1 ? "" : "s"}`;
    steps.push({
      line: "answer",
      note: `dp[${n}] = ${show(dp[n])}: return ${dp[n] ? "true" : "false"}. ${(m + 1) * (n + 1) > n + 1 ? `${cells(n + 1)} of memory instead of ${cells((m + 1) * (n + 1))}.` : "Only one row here anyway."}`,
      view: view(undefined, undefined, { final: true }),
    });
    return steps;
  },
});
