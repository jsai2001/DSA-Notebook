// Top-down recursion with a memo: match(i, j) = does s[i:] match p[j:]? Each (i, j) is solved once.
DSAViz.register("0010-regular-expression-matching/approach2", {
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
    const memo = Array.from({ length: m + 1 }, () => Array(n + 1).fill(null));
    const stack = [];
    const steps = [];
    let hits = 0;
    const T = (v) => (v ? "T" : "F");
    const strip = (str, k, name) => {
      const marks = { [str.length]: "ghost" };
      if (k !== undefined && k < str.length) marks[k] = "active";
      return { type: "array", label: name === "j" ? "p" : "s", values: [...str, "end"], marks, pointers: k === undefined ? {} : { [name]: k } };
    };
    const view = (i, j, opts = {}) => {
      const marks = {};
      for (let r = 0; r <= m; r++) {
        for (let c = 0; c <= n; c++) if (memo[r][c] !== null) marks[`${r},${c}`] = memo[r][c] ? "match" : "visited";
      }
      if (i !== undefined) marks[`${i},${j}`] = opts.mark || "active";
      const pStrip = strip(p, j, "j");
      if (j !== undefined && j + 1 < n && p[j + 1] === "*") pStrip.marks[j + 1] = "window";
      return [
        strip(s, i, "i"),
        pStrip,
        {
          type: "grid",
          label: "memo[i][j]: does s[i:] match p[j:]? (blank = not solved yet; ∅ = nothing left)",
          rows: Array.from({ length: m + 1 }, (_, k) => `${k} ${k < m ? s[k] : "∅"}`),
          cols: Array.from({ length: n + 1 }, (_, k) => `${k} ${k < n ? p[k] : "∅"}`),
          corner: "i \\ j",
          cells: memo.map((row) => row.map((v) => (v === null ? "" : T(v)))),
          marks,
        },
        { type: "array", label: "call stack: match(i, j), bottom → top", values: stack.slice(), wide: true, marks: stack.length ? { [stack.length - 1]: "active" } : {} },
        { type: "vars", items: [{ name: "memo hits", value: hits, mark: opts.mark === "compare" ? "match" : "" }] },
      ];
    };

    steps.push({
      line: "init",
      note: `match(i, j) asks: does s[i:] match p[j:]? Each answer goes in memo[i][j], so the same question is never worked out twice.`,
      view: view(),
    });

    function match(i, j) {
      stack.push(`(${i}, ${j})`);
      steps.push({ line: "call", note: `match(${i}, ${j}): does "${s.slice(i)}" match "${p.slice(j)}"?`, view: view(i, j) });
      if (memo[i][j] !== null) {
        hits++;
        const ans = memo[i][j];
        steps.push({ line: "hit", note: `Already solved: memo[${i}][${j}] = ${T(ans)}. Reuse it.`, view: view(i, j, { mark: "compare" }) });
        stack.pop();
        return ans;
      }
      let ans;
      if (j === n) {
        ans = i === m;
        steps.push({
          line: "end",
          note: ans ? `The pattern is used up, and so is s: match.` : `The pattern is used up but "${s.slice(i)}" is left: no match.`,
          view: view(i, j),
        });
      } else {
        const first = i < m && (p[j] === s[i] || p[j] === ".");
        const why =
          i >= m
            ? `s is used up, so nothing can match '${p[j]}'`
            : first
              ? `'${p[j]}' matches s[${i}] = '${s[i]}'`
              : `'${p[j]}' doesn't match s[${i}] = '${s[i]}'`;
        if (j + 1 < n && p[j + 1] === "*") {
          steps.push({
            line: ["first", "star"],
            note: `${why}. "${p[j]}*" can repeat: first try it zero times, skipping to match(${i}, ${j + 2}).`,
            view: view(i, j),
          });
          ans = match(i, j + 2);
          if (!ans && first) {
            steps.push({
              line: "star",
              note: `Zero didn't work. Use one '${p[j]}' for s[${i}] and stay on "${p[j]}*": match(${i + 1}, ${j}).`,
              view: view(i, j),
            });
            ans = match(i + 1, j);
          }
        } else {
          steps.push({
            line: ["first", "single"],
            note: first ? `${why}. Move both on: match(${i + 1}, ${j + 1}).` : `${why}, so this is a dead end.`,
            view: view(i, j),
          });
          ans = first && match(i + 1, j + 1);
        }
      }
      memo[i][j] = ans;
      steps.push({ line: "store", note: `match(${i}, ${j}) = ${T(ans)}. Save it in memo[${i}][${j}].`, view: view(i, j, { mark: "new" }) });
      stack.pop();
      return ans;
    }

    const answer = match(0, 0);
    steps.push({
      line: "return",
      note: `Return ${answer}. At most (m + 1) × (n + 1) = ${(m + 1) * (n + 1)} different questions; the memo was reused ${hits} time${hits === 1 ? "" : "s"}.`,
      view: view(),
    });
    return steps;
  },
});
