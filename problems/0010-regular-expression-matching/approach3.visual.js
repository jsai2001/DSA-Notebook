// Bottom-up DP: dp[i][j] says whether the first i chars of s match the first j chars of p.
DSAViz.register("0010-regular-expression-matching/approach3", {
  inputs: [
    { name: "s", type: "string", value: "aab", maxLength: 7 },
    { name: "p", type: "string", value: "c*a*b", maxLength: 7 },
  ],
  trace({ s, p }) {
    if (!/^[a-z]*$/.test(s)) throw new DSAViz.InputError("s can only use lowercase letters a–z.");
    if (!p.length) throw new DSAViz.InputError("p can't be empty.");
    if (!/^[a-z.*]+$/.test(p)) throw new DSAViz.InputError("p can only use lowercase letters, '.' and '*'.");
    for (let k = 0; k < p.length; k++) {
      if (p[k] === "*" && (k === 0 || p[k - 1] === "*")) {
        throw new DSAViz.InputError("Each '*' needs a letter or '.' right before it, like a* or .*");
      }
    }
    const m = s.length;
    const n = p.length;
    const fits = (x, c) => x === c || x === ".";
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(null)); // null = not filled yet
    const steps = [];
    const T = (v) => (v ? "T" : "F");
    const view = (i, j, opts = {}) => {
      const marks = {};
      for (let r = 0; r <= m; r++) {
        for (let c = 0; c <= n; c++) {
          if (dp[r][c] === null) marks[`${r},${c}`] = "ghost";
          else marks[`${r},${c}`] = dp[r][c] ? "match" : "visited";
        }
      }
      (opts.deps || []).forEach(([r, c]) => (marks[`${r},${c}`] = "compare"));
      if (i !== undefined) marks[`${i},${j}`] = "active";
      if (opts.final) marks[`${m},${n}`] = dp[m][n] ? "match" : "compare";
      return [
        {
          type: "grid",
          label: "dp[i][j]: do the first i chars of s match the first j chars of p? (∅ = empty)",
          rows: ["0 ∅", ...Array.from(s, (c, k) => `${k + 1} ${c}`)],
          cols: ["0 ∅", ...Array.from(p, (c, k) => `${k + 1} ${c}`)],
          corner: "s \\ p",
          cells: dp.map((row) => row.map((v) => (v === null ? "" : T(v)))),
          marks,
        },
        {
          type: "vars",
          items: [
            { name: "s[:i]", value: i === undefined ? "–" : `"${s.slice(0, i)}"` },
            { name: "p[:j]", value: j === undefined ? "–" : `"${p.slice(0, j)}"` },
          ],
        },
      ];
    };

    dp[0][0] = true;
    for (let j = 1; j <= n; j++) dp[0][j] = false;
    for (let i = 1; i <= m; i++) dp[i][0] = false;
    steps.push({
      line: "init",
      note: `Row 0 is the empty string, column 0 the empty pattern. dp[0][0] = T (empty matches empty); a non-empty s never matches an empty pattern, so column 0 is F.`,
      view: view(),
    });

    for (let j = 2; j <= n; j++) {
      if (p[j - 1] !== "*") continue;
      dp[0][j] = dp[0][j - 2];
      steps.push({
        line: "empty",
        note: `"${p.slice(0, j)}" ends in "${p[j - 2]}*", which can mean zero ${p[j - 2]}s. So it matches "" exactly when "${p.slice(0, j - 2)}" does: dp[0][${j}] = dp[0][${j - 2}] = ${T(dp[0][j])}.`,
        view: view(0, j, { deps: [[0, j - 2]] }),
      });
    }

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const c = s[i - 1];
        if (p[j - 1] === "*") {
          const x = p[j - 2];
          const zero = dp[i][j - 2];
          const fitsX = fits(x, c);
          const more = fitsX && dp[i - 1][j];
          dp[i][j] = zero || more;
          const deps = [[i, j - 2]];
          if (fitsX) deps.push([i - 1, j]);
          steps.push({
            line: ["cell", "star"],
            note:
              `p[${j - 1}] is '*' on '${x}'. Zero ${x}s: dp[${i}][${j - 2}] = ${T(zero)}. ` +
              (fitsX
                ? `One more ${x}: '${x}' matches s[${i - 1}] = '${c}', and dp[${i - 1}][${j}] = ${T(dp[i - 1][j])}. `
                : `One more ${x}: '${x}' doesn't match s[${i - 1}] = '${c}'. `) +
              `So dp[${i}][${j}] = ${T(dp[i][j])}.`,
            view: view(i, j, { deps }),
          });
        } else {
          const ok = fits(p[j - 1], c);
          dp[i][j] = ok && dp[i - 1][j - 1];
          steps.push({
            line: ["cell", "single"],
            note: ok
              ? `'${p[j - 1]}' matches s[${i - 1}] = '${c}', so it depends on the rest: dp[${i - 1}][${j - 1}] = ${T(dp[i - 1][j - 1])}. dp[${i}][${j}] = ${T(dp[i][j])}.`
              : `'${p[j - 1]}' doesn't match s[${i - 1}] = '${c}', so dp[${i}][${j}] = F.`,
            view: view(i, j, { deps: ok ? [[i - 1, j - 1]] : [] }),
          });
        }
      }
    }

    steps.push({
      line: "return",
      note: `Return dp[${m}][${n}] = ${dp[m][n]}: "${s}" ${dp[m][n] ? "matches" : "doesn't match"} "${p}". ${(m + 1) * (n + 1)} cells, each O(1): O(m · n).`,
      view: view(undefined, undefined, { final: true }),
    });
    return steps;
  },
});
