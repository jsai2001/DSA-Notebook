// Bottom-up: ways(k) only needs the two values before it, so keep just prev and cur.
DSAViz.register("0070-climbing-stairs/approach2", {
  inputs: [{ name: "n", type: "int", value: "6", min: 1, max: 15 }],
  trace({ n }) {
    const seen = Array(n + 1).fill("");
    seen[0] = 1;
    seen[1] = 1;
    let prev = 1;
    let cur = 1;
    let k = 1; // cur is ways(k), prev is ways(k - 1)
    const steps = [];
    const view = (o = {}) => {
      const marks = {};
      for (let i = 0; i <= k; i++) marks[i] = "visited";
      marks[k - 1] = "compare";
      marks[k] = o.fresh ? "new" : "active";
      if (o.final) marks[n] = "match";
      const pointers = { prev: k - 1, cur: k };
      return [
        { type: "array", label: "ways(k) for each step k (the code only keeps the two highlighted ones)", values: seen.slice(), marks, pointers },
        { type: "vars", items: [{ name: "prev", value: prev }, { name: "cur", value: cur, mark: o.fresh ? "new" : "" }] },
      ];
    };
    steps.push({ line: "init", note: `prev = ways(0) = 1 (standing at the bottom is one way: do nothing) and cur = ways(1) = 1.`, view: view() });
    for (let step = 0; step < n - 1; step++) {
      const next = prev + cur;
      steps.push({
        line: "loop",
        note: `ways(${k + 1}) = ways(${k}) + ways(${k - 1}) = ${cur} + ${prev} = ${next}: the last move was 1 step (from ${k}) or 2 steps (from ${k - 1}). Shift: prev = ${cur}, cur = ${next}.`,
        view: (() => {
          prev = cur;
          cur = next;
          k++;
          seen[k] = cur;
          return view({ fresh: true });
        })(),
      });
    }
    steps.push({
      line: "answer",
      note: `Return cur = ways(${n}) = ${cur}. ${n - 1} addition${n - 1 === 1 ? "" : "s"}: O(n) time, and O(1) space because only two numbers are kept.`,
      view: view({ final: true }),
    });
    return steps;
  },
});
