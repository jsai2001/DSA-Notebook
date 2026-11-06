// Bottom-up: dp[i] = ways to decode the first i digits, from dp[i − 1] (last digit alone) and dp[i − 2] (last two).
DSAViz.register("0091-decode-ways/approach2", {
  inputs: [{ name: "s", type: "string", value: "2101", maxLength: 10 }],
  trace({ s }) {
    if (!/^[0-9]+$/.test(s)) throw new DSAViz.InputError("s must be 1 or more digits (0–9).");
    const n = s.length;
    const dp = Array(n + 1).fill("");
    dp[0] = 1;
    const steps = [];
    const view = (i, o = {}) => {
      const sm = {};
      if (i !== undefined && i >= 1) sm[i - 1] = o.one === false ? "cut" : "active";
      if (o.pair) {
        sm[i - 2] = o.pairOk ? "compare" : "cut";
        if (o.pairOk) sm[i - 1] = "compare"; // both digits of the pair
      }
      const dm = {};
      for (let k = 0; k < (i ?? n + 1); k++) dm[k] = "visited";
      if (o.from1) dm[i - 1] = "compare";
      if (o.from2) dm[i - 2] = "compare";
      if (i !== undefined && i <= n) dm[i] = o.done ? "new" : "active";
      if (o.final) dm[n] = "match";
      return [
        { type: "array", label: "s", values: [...s], marks: sm },
        { type: "array", label: "dp[i] = ways to decode the first i digits", values: dp.slice(), marks: dm, pointers: i !== undefined && i <= n && !o.final ? { i } : {} },
      ];
    };
    steps.push({ line: "init", note: "dp[0] = 1: no digits can be read in exactly one way (read nothing). It's what a two-digit letter at the start adds onto.", view: view(1) });
    for (let i = 1; i <= n; i++) {
      dp[i] = 0;
      const d = s[i - 1];
      const one = d !== "0";
      if (one) dp[i] += dp[i - 1];
      steps.push({
        line: ["loop", "one"],
        note: one ? `Last digit "${d}" alone is a letter: add dp[${i - 1}] = ${dp[i - 1]}. dp[${i}] = ${dp[i]} so far.` : `Last digit is "0": it can't be a letter on its own. Add nothing.`,
        view: view(i, { one, from1: one }),
      });
      if (i >= 2) {
        const two = s.slice(i - 2, i);
        const ok = Number(two) >= 10 && Number(two) <= 26;
        if (ok) dp[i] += dp[i - 2];
        steps.push({
          line: "two",
          note: ok ? `Last two "${two}" are a letter (10–26): add dp[${i - 2}] = ${dp[i - 2]}. dp[${i}] = ${dp[i]}.` : `Last two "${two}" ${two[0] === "0" ? "start with 0" : "are more than 26"}: not a letter. dp[${i}] = ${dp[i]}.`,
          view: view(i, { pair: true, pairOk: ok, one, from2: ok, done: true }),
        });
      } else steps.push({ line: "two", note: `Only one digit so far: no two-digit letter. dp[1] = ${dp[1]}.`, view: view(i, { one, done: true }) });
    }
    steps.push({ line: "answer", note: `Return dp[${n}] = ${dp[n]}. ${n} digits, constant work each: O(n).`, view: view(n + 1, { final: true }) });
    return steps;
  },
});
