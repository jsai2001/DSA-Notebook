// Build from smaller answers: every valid string is "(" + inside + ")" + after, split by its first pair.
DSAViz.register("0022-generate-parentheses/approach3", {
  inputs: [{ name: "n", type: "int", value: "3", min: 1, max: 4 }],
  trace({ n }) {
    const steps = [];
    const dp = [[""]];
    const show = (s) => (s === "" ? '""' : s);
    // opts.k: row being built; opts.c: split; opts.ia / opts.ib: inside / after cells in use
    const view = (opts = {}) =>
      dp.map((row, k) => {
        const marks = {};
        let label = `dp[${k}]: ${k} pair${k === 1 ? "" : "s"}`;
        if (opts.k !== undefined && opts.c !== undefined) {
          const inside = opts.c;
          const after = opts.k - 1 - opts.c;
          const roles = [];
          if (k === inside) roles.push("inside");
          if (k === after) roles.push("after");
          if (roles.length) label += ` (${roles.join(" and ")})`;
          if (k === inside) row.forEach((_, i) => (marks[i] = opts.ia === undefined || opts.ia === i ? "active" : ""));
          if (k === after) row.forEach((_, i) => (marks[i] = marks[i] || (opts.ib === undefined || opts.ib === i ? "compare" : "")));
        }
        if (k === opts.k) {
          label += " (building)";
          if (opts.fresh) marks[row.length - 1] = "new";
        }
        return { type: "array", label, values: row.map(show), wide: true, marks };
      });

    steps.push({
      line: "init",
      note: `dp[k] will hold every valid string with k pairs. With 0 pairs there's exactly one: the empty string.`,
      view: view(),
    });
    for (let k = 1; k <= n; k++) {
      dp.push([]);
      steps.push({
        line: "size",
        note: `Build dp[${k}]. Every valid string starts with '(', and its matching ')' splits the rest: c pairs inside, ${k} - 1 - c after.`,
        view: view({ k }),
      });
      for (let c = 0; c < k; c++) {
        const a = k - 1 - c;
        const count = dp[c].length * dp[a].length;
        steps.push({
          line: "split",
          note: `c = ${c}: ${c} pair${c === 1 ? "" : "s"} inside (dp[${c}]) and ${a} after (dp[${a}]): ${dp[c].length} × ${dp[a].length} = ${count} string${count === 1 ? "" : "s"}.`,
          view: view({ k, c }),
        });
        dp[c].forEach((inside, ia) =>
          dp[a].forEach((after, ib) => {
            const s = "(" + inside + ")" + after;
            dp[k].push(s);
            steps.push({
              line: "combine",
              note: `"(" + "${inside}" + ")" + "${after}" = "${s}".`,
              view: view({ k, c, ia, ib, fresh: true }),
            });
          })
        );
      }
    }
    steps.push({
      line: "return",
      note: `Return dp[${n}]: ${dp[n].length} string${dp[n].length === 1 ? "" : "s"}. No duplicates: a string's first '(' and its matching ')' fix c, inside and after, so it's made exactly once.`,
      view: view(),
    });
    return steps;
  },
});
