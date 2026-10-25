// DP table: dp[i][j] is true when s[i..j] is a palindrome, filled by increasing length.
DSAViz.register("0005-longest-palindromic-substring/approach2", {
  inputs: [{ name: "s", type: "string", value: "babad", maxLength: 8 }],

  trace({ s }) {
    if (!/^[A-Za-z0-9]+$/.test(s)) {
      throw new DSAViz.InputError("s needs 1 to 8 letters or digits (no spaces or symbols).");
    }
    const n = s.length;
    const chars = Array.from(s);
    const steps = [];
    const dp = Array.from({ length: n }, () => Array(n).fill(null)); // null = not filled yet
    let start = 0;
    let best = 1;

    const view = (i, j, opts = {}) => {
      const cells = dp.map((row, r) => row.map((v, c) => (c < r ? "" : v === null ? "" : v ? "T" : "·")));
      const marks = {};
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          if (c < r) marks[`${r},${c}`] = "ghost";
          else if (dp[r][c]) marks[`${r},${c}`] = "match";
          else if (dp[r][c] === false) marks[`${r},${c}`] = "visited";
        }
      }
      if (opts.dep) marks[`${i + 1},${j - 1}`] = "compare";
      if (i !== undefined) marks[`${i},${j}`] = "active";
      const amarks = {};
      if (i !== undefined) {
        for (let k = i; k <= j; k++) amarks[k] = "window";
        amarks[i] = amarks[j] = "compare";
      }
      if (opts.final) for (let k = start; k < start + best; k++) amarks[k] = "match";
      return [
        {
          type: "array", label: "s", values: chars, marks: amarks,
          pointers: i !== undefined ? (i === j ? { "i, j": i } : { i, j }) : {},
        },
        {
          type: "grid", label: "dp[i][j] (row i, column j): T = palindrome",
          rows: chars.map((c, k) => `${k} ${c}`), cols: chars.map((c, k) => `${k} ${c}`), corner: "i\\j",
          cells, marks,
        },
        {
          type: "vars",
          items: [{ name: "best", value: `${best} ("${s.slice(start, start + best)}")`, mark: opts.newBest ? "match" : "" }],
        },
      ];
    };

    steps.push({
      line: "init",
      note: `Fill an ${n} × ${n} table: dp[i][j] says whether s[i..j] is a palindrome. Shorter substrings first, so each answer can reuse the one inside it.`,
      view: view(),
    });

    for (let length = 1; length <= n; length++) {
      for (let i = 0; i + length <= n; i++) {
        const j = i + length - 1;
        const ends = s[i] === s[j];
        const inner = length <= 2 ? null : dp[i + 1][j - 1];
        const ok = ends && (length <= 2 || inner);
        dp[i][j] = ok;
        let newBest = false;
        if (ok && length > best) {
          start = i;
          best = length;
          newBest = true;
        }
        let why;
        if (!ends) why = `s[${i}] = '${s[i]}' ≠ s[${j}] = '${s[j]}', so not a palindrome.`;
        else if (length === 1) why = `A single character '${s[i]}' is always a palindrome.`;
        else if (length === 2) why = `s[${i}] = s[${j}] = '${s[i]}', and there's nothing in between.`;
        else why = `Ends match ('${s[i]}'), and the inside dp[${i + 1}][${j - 1}] is ${inner ? "T" : "not a palindrome"}${ok ? "." : ", so this isn't either."}`;
        steps.push({
          line: ok ? (newBest ? ["check", "mark", "best"] : ["check", "mark"]) : "check",
          note: `dp[${i}][${j}] ("${s.slice(i, j + 1)}"): ${why}` + (newBest ? ` New best: "${s.slice(i, j + 1)}".` : ""),
          view: view(i, j, { dep: length > 2 && ends, newBest }),
        });
      }
    }

    steps.push({
      line: "return",
      note: `Return "${s.slice(start, start + best)}". The table has ${(n * (n + 1)) / 2} cells to fill: O(n²) time and O(n²) memory.`,
      view: view(undefined, undefined, { final: true }),
    });
    return steps;
  },
});
