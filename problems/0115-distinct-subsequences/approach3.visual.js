// One row, right to left: for each letter of s, dp[j] += dp[j − 1] wherever t[j − 1] is that letter.
DSAViz.register("0115-distinct-subsequences/approach3", {
  inputs: [
    { name: "s", type: "string", value: "rabbbit", maxLength: 10 },
    { name: "t", type: "string", value: "rabbit", maxLength: 6 },
  ],
  trace({ s, t }) {
    for (const [name, x] of [["s", s], ["t", t]]) if (!/^[A-Za-z]+$/.test(x)) throw new DSAViz.InputError(`${name} must be 1 or more letters.`);
    const n = t.length;
    const dp = [1, ...Array(n).fill(0)];
    const steps = [];
    const view = (i, o = {}) => {
      const sm = {};
      for (let k = 0; k < i; k++) sm[k] = "visited";
      if (i < s.length) sm[i] = "active";
      const dm = {};
      if (o.j !== undefined) {
        dm[o.j] = "new";
        dm[o.j - 1] = "compare";
      }
      if (o.final) dm[n] = "match";
      return [
        { type: "array", label: "s", values: [...s], marks: sm, pointers: i < s.length ? { i } : {} },
        { type: "array", label: "dp[j] = ways to spell t[:j] so far (top row: t[j − 1])", values: dp.slice(), sub: ["·", ...t], marks: dm, pointers: o.j !== undefined ? { j: o.j } : {} },
      ];
    };
    steps.push({ line: "init", note: "dp[0] = 1 (the empty start of t), the rest 0. Then take the letters of s one at a time.", view: view(-1) });
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      const hits = [];
      for (let j = n; j >= 1; j--) if (t[j - 1] === ch) hits.push(j);
      if (!hits.length) {
        steps.push({ line: "loop", note: `"${ch}" isn't in t: nothing changes.`, view: view(i) });
        continue;
      }
      for (const j of hits) {
        const before = dp[j];
        dp[j] += dp[j - 1];
        steps.push({
          line: ["loop", "use"],
          note: `"${ch}" = t[${j - 1}]: dp[${j}] += dp[${j - 1}], ${before} + ${dp[j - 1]} = ${dp[j]}.${hits.includes(j - 1) ? ` (Right to left: dp[${j - 1}] hasn't been updated with this "${ch}" yet.)` : ""}`,
          view: view(i, { j }),
        });
      }
    }
    steps.push({ line: "answer", note: `Return dp[${n}] = ${dp[n]}. One row of ${n + 1} numbers was enough.`, view: view(s.length, { final: true }) });
    return steps;
  },
});
