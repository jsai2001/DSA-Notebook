// The same DP with two variables: prev1 = dp[i − 1], prev2 = dp[i − 2], slid along after each digit.
DSAViz.register("0091-decode-ways/approach3", {
  inputs: [{ name: "s", type: "string", value: "226", maxLength: 12 }],
  trace({ s }) {
    if (!/^[0-9]+$/.test(s)) throw new DSAViz.InputError("s must be 1 or more digits (0–9).");
    const n = s.length;
    let prev2 = 0;
    let prev1 = 1;
    const steps = [];
    const view = (i, o = {}) => {
      const sm = {};
      for (let k = 0; k < (i ?? n + 1) - 1; k++) sm[k] = "visited";
      if (i !== undefined && i <= n) {
        sm[i - 1] = o.oneOk === false ? "cut" : "active";
        if (o.pair) sm[i - 2] = o.pairOk ? "compare" : "cut";
        if (o.pair && o.pairOk) sm[i - 1] = "compare"; // both digits of the pair
      }
      return [
        { type: "array", label: "s", values: [...s], marks: sm, pointers: i !== undefined && i <= n ? { i: i - 1 } : {} },
        {
          type: "vars",
          items: [
            { name: "prev2 (dp[i−2])", value: prev2, mark: o.used2 ? "compare" : "" },
            { name: "prev1 (dp[i−1])", value: prev1, mark: o.used1 ? "compare" : o.shifted ? "new" : "" },
            ...(o.cur !== undefined ? [{ name: "cur (dp[i])", value: o.cur, mark: "new" }] : []),
          ],
        },
      ];
    };
    steps.push({ line: "init", note: "prev1 = dp[0] = 1 (reading nothing is one way), prev2 = 0 (no value before it; the first digit can't make a two-digit letter anyway).", view: view() });
    for (let i = 1; i <= n; i++) {
      let cur = 0;
      const oneOk = s[i - 1] !== "0";
      if (oneOk) cur += prev1;
      const two = i >= 2 ? s.slice(i - 2, i) : "";
      const pairOk = i >= 2 && Number(two) >= 10 && Number(two) <= 26;
      if (pairOk) cur += prev2;
      const parts = [];
      parts.push(oneOk ? `"${s[i - 1]}" alone: + prev1 (${prev1})` : `"0" alone: no letter`);
      if (i >= 2) parts.push(pairOk ? `"${two}": + prev2 (${prev2})` : `"${two}": not a letter`);
      steps.push({
        line: ["loop", "one", "two"],
        note: `Digit ${i}: ${parts.join("; ")}. cur = ${cur}.`,
        view: view(i, { oneOk, pair: i >= 2, pairOk, used1: oneOk, used2: pairOk, cur }),
      });
      prev2 = prev1;
      prev1 = cur;
      steps.push({ line: "shift", note: `Slide: prev2 = ${prev2}, prev1 = ${prev1}.${prev1 === 0 && prev2 === 0 ? " Both are 0, so everything after is 0 too." : ""}`, view: view(i, { shifted: true }) });
    }
    steps.push({ line: "answer", note: `Return prev1 = ${prev1}. O(n) time, and only two numbers kept: O(1) space.`, view: view() });
    return steps;
  },
});
