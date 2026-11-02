// Every path is (m - 1) downs and (n - 1) rights in some order, so count the orders: C(m + n - 2, min(m, n) - 1).
DSAViz.register("0062-unique-paths/approach3", {
  inputs: [
    { name: "m", type: "int", value: "3", min: 1, max: 20 },
    { name: "n", type: "int", value: "7", min: 1, max: 20 },
  ],
  trace({ m, n }) {
    const total = m + n - 2;
    const k = Math.min(m, n) - 1;
    const steps = [];
    let result = 1;
    // One example path, drawn on the grid when it's small enough: all rights, then all downs.
    const small = m <= 6 && n <= 8;
    const moves = "R".repeat(n - 1) + "D".repeat(m - 1);
    const view = (o = {}) => {
      const widgets = [];
      if (small) {
        const marks = {};
        let r = 0;
        let c = 0;
        marks["0,0"] = "match";
        for (const mv of moves) {
          if (mv === "R") c++;
          else r++;
          marks[`${r},${c}`] = "match";
        }
        widgets.push({ type: "grid", label: "one path (green): right, right, …, then down", rows: [...Array(m).keys()], cols: [...Array(n).keys()], cells: Array.from({ length: m }, () => Array(n).fill("")), marks });
      }
      widgets.push({ type: "array", label: `its moves: ${n - 1} R and ${m - 1} D (every path has the same moves, in some order)`, values: moves.split(""), compact: true, marks: {} });
      widgets.push({
        type: "vars",
        items: [
          { name: "total = m + n − 2", value: total },
          { name: "k = min(m, n) − 1", value: k },
          { name: "result", value: result, mark: o.fresh ? "new" : o.final ? "match" : "" },
          ...(o.i ? [{ name: "i", value: o.i }] : []),
        ],
      });
      return widgets;
    };
    steps.push({
      line: "init",
      note: total === 0
        ? `m = n = 1: you start on the corner, so there's 1 path (no moves at all).`
        : `Every path makes ${total} moves: ${m - 1} down and ${n - 1} right. A path is just a choice of which ${k} of the ${total} moves are the ${m <= n ? "downs" : "rights"}: C(${total}, ${k}). Pick the smaller side for fewer steps.`,
      view: view(),
    });
    for (let i = 1; i <= k; i++) {
      const before = result;
      result = (result * (total - k + i)) / i;
      steps.push({
        line: "step",
        note:
          `i = ${i}: result = ${before} × ${total - k + i} ÷ ${i} = ${result}. That's C(${total - k + i}, ${i}), so the division always comes out even.` +
          (before % i ? ` Dividing first would lose the remainder: ${before} ÷ ${i} × ${total - k + i} gives ${Math.floor(before / i) * (total - k + i)}.` : ""),
        view: view({ i, fresh: true }),
      });
    }
    steps.push({
      line: "answer",
      note: k === 0
        ? `k = 0: a single row or column, so there's exactly 1 path${total ? " (a straight line)" : ""}. Return 1.`
        : `Return ${result}. ${k} multiply-and-divide steps: O(min(m, n)) time, O(1) space.` +
          (result > 2e9 ? ` (LeetCode never asks this one: its answers are at most 2 · 10⁹, and this would overflow the int it returns.)` : ""),
      view: view({ final: true }),
    });
    return steps;
  },
});
