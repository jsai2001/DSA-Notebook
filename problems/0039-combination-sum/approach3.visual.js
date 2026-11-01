// Bottom-up DP: dp[t] lists every combination for t; candidates in the outer loop keep each combination in one order.
DSAViz.register("0039-combination-sum/approach3", {
  inputs: [
    { name: "candidates", type: "int[]", value: "[2, 3, 5]", minLength: 1, maxLength: 4, minValue: 2, maxValue: 40 },
    { name: "target", type: "int", value: "8", min: 1, max: 10 },
  ],
  trace({ candidates: cands, target }) {
    if (new Set(cands).size !== cands.length) throw new DSAViz.InputError("The candidates must all be different.");
    const steps = [];
    const dp = Array.from({ length: target + 1 }, () => []);
    dp[0] = [[]];
    const fmt = (arr) => `[${arr.join(", ")}]`;
    const show = (t) => (dp[t].length ? dp[t].map(fmt).join(" ") : "—");
    // opts.t: amount being filled; opts.from: amount it reads
    const view = (ci, opts = {}) => {
      const marks = {};
      if (opts.from !== undefined) marks[opts.from] = "compare";
      if (opts.t !== undefined) marks[opts.t] = opts.fresh ? "new" : "active";
      if (opts.final) marks[target] = "match";
      return [
        {
          type: "array",
          label: "candidates (outer loop)",
          values: cands,
          marks: Object.fromEntries(cands.map((_, k) => [k, ci === undefined ? "" : k < ci ? "visited" : k === ci ? "active" : ""])),
          pointers: ci !== undefined ? { c: ci } : {},
        },
        { type: "map", label: "dp[t]: every combination that adds up to t", columns: ["t", "combinations"], entries: dp.map((_, t) => [t, show(t)]), marks },
      ];
    };

    steps.push({ line: "init", note: `dp[0] = [[]]: there's exactly one way to make 0, take nothing. Every other dp[t] starts empty.`, view: view() });
    cands.forEach((c, ci) => {
      steps.push({
        line: "coin",
        note: `Candidate ${c}: for each amount t from ${c} up to ${target}, every combination for t - ${c} plus one more ${c} is a combination for t.`,
        view: view(ci),
      });
      for (let t = c; t <= target; t++) {
        const from = dp[t - c];
        if (!from.length) {
          steps.push({ line: "amount", note: `t = ${t}: dp[${t - c}] is empty, so ${c} adds nothing here.`, view: view(ci, { t, from: t - c }) });
          continue;
        }
        const made = from.map((combo) => combo.concat([c]));
        dp[t].push(...made);
        steps.push({
          line: ["amount", "extend"],
          note: `t = ${t}: dp[${t - c}] = ${from.map(fmt).join(" ")}, each plus ${c}: add ${made.map(fmt).join(" ")}.`,
          view: view(ci, { t, from: t - c, fresh: true }),
        });
      }
    });
    steps.push({
      line: "return",
      note: dp[target].length
        ? `Return dp[${target}]: ${dp[target].map(fmt).join(", ")}. Because the candidates are the outer loop, ${cands[0]}s are always added before later candidates, so no combination appears twice. The table also keeps every smaller amount's answers.`
        : `Return dp[${target}] = []: no combination adds up to ${target}.`,
      view: view(undefined, { final: true }),
    });
    return steps;
  },
});
