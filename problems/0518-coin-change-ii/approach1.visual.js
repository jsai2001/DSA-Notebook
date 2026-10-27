// Top-down recursion with memo: ways(i, rem) = take coins[i] + skip to coins[i + 1].
DSAViz.register("0518-coin-change-ii/approach1", {
  inputs: [
    { name: "coins", type: "int[]", value: "[1, 2, 5]", minLength: 1, maxLength: 3, minValue: 1, maxValue: 10 },
    { name: "amount", type: "int", value: "5", min: 0, max: 8 },
  ],
  trace({ coins, amount }) {
    if (new Set(coins).size !== coins.length) {
      throw new DSAViz.InputError("coins must all be different (LeetCode guarantees this).");
    }
    const n = coins.length;
    const memo = Array.from({ length: n }, () => Array(amount + 1).fill(null));
    const stack = [];
    const steps = [];
    let hits = 0;
    const label = (i, rem) => `ways(${i}, ${rem})`;
    const view = (opts = {}) => {
      const marks = {};
      for (let r = 0; r < n; r++) {
        for (let c = 0; c <= amount; c++) if (memo[r][c] !== null) marks[`${r},${c}`] = "visited";
      }
      const inGrid = opts.i !== undefined && opts.i < n && opts.rem >= 0;
      if (inGrid) marks[`${opts.i},${opts.rem}`] = opts.mark || "active";
      const smarks = {};
      if (stack.length) smarks[stack.length - 1] = "active";
      return [
        { type: "array", label: "call stack (bottom → top)", values: stack.slice(), marks: smarks, compact: true },
        {
          type: "grid",
          label: "memo[i][rem] = ways to make rem using coins[i:]",
          rows: coins.map((c, k) => `${k}: ${c}`),
          cols: Array.from({ length: amount + 1 }, (_, a) => a),
          corner: "i \\ rem",
          cells: memo.map((row) => row.map((v) => (v === null ? "" : v))),
          marks,
        },
        { type: "vars", items: [{ name: "memo hits", value: hits, mark: opts.mark === "compare" ? "match" : "" }] },
      ];
    };

    steps.push({
      line: "init",
      note: `ways(i, rem) counts the ways to make rem using coins[i], coins[i + 1], …. Each call either takes coins[i] (and may take it again) or skips to the next coin. The memo stores each answer so it's computed once.`,
      view: view(),
    });

    function ways(i, rem) {
      stack.push(label(i, rem));
      steps.push({ line: "call", note: `Call ${label(i, rem)}: make ${rem} using coins from index ${i}.`, view: view({ i, rem }) });
      let result;
      if (rem === 0) {
        result = 1;
        steps.push({ line: "done", note: `rem is 0: the coins picked so far add up exactly. That's 1 way.`, view: view({ i, rem }) });
      } else if (rem < 0 || i === n) {
        result = 0;
        const why = rem < 0 ? `rem is ${rem}: the last coin overshot` : `no coins left but ${rem} still to make`;
        steps.push({ line: "dead", note: `${why}. 0 ways.`, view: view({ i, rem }) });
      } else if (memo[i][rem] !== null) {
        result = memo[i][rem];
        hits++;
        steps.push({
          line: "hit",
          note: `Already solved: memo[${i}][${rem}] = ${result}. Reuse it instead of recursing again.`,
          view: view({ i, rem, mark: "compare" }),
        });
      } else {
        steps.push({
          line: "split",
          note: `Two choices: take ${coins[i]} → ${label(i, rem - coins[i])}, or skip it → ${label(i + 1, rem)}. Add both.`,
          view: view({ i, rem }),
        });
        const take = ways(i, rem - coins[i]);
        const skip = ways(i + 1, rem);
        memo[i][rem] = take + skip;
        result = memo[i][rem];
        steps.push({
          line: "store",
          note: `${label(i, rem)} = ${take} (take ${coins[i]}) + ${skip} (skip) = ${result}. Save it in memo[${i}][${rem}].`,
          view: view({ i, rem, mark: "new" }),
        });
      }
      stack.pop();
      return result;
    }

    const answer = ways(0, amount);
    steps.push({
      line: "return",
      note: `Return ways(0, ${amount}) = ${answer}. The memo reused ${hits} answer${hits === 1 ? "" : "s"}; without it the same calls would repeat many times (exponential time).`,
      view: view(),
    });
    return steps;
  },
});
