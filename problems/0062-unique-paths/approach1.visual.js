// Top-down: paths(r, c) = paths(r - 1, c) + paths(r, c - 1), each cell worked out once and remembered.
DSAViz.register("0062-unique-paths/approach1", {
  inputs: [
    { name: "m", type: "int", value: "3", min: 1, max: 5 },
    { name: "n", type: "int", value: "4", min: 1, max: 6 },
  ],
  trace({ m, n }) {
    const memo = Array.from({ length: m }, () => Array(n).fill(null));
    const stack = [];
    const steps = [];
    let calls = 0;
    const view = (o = {}) => {
      const marks = {};
      for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (memo[r][c] !== null) marks[`${r},${c}`] = "visited";
      stack.forEach(([r, c]) => (marks[`${r},${c}`] = "window"));
      (o.from || []).forEach(([r, c]) => (marks[`${r},${c}`] = "compare"));
      if (o.at) marks[`${o.at[0]},${o.at[1]}`] = o.mark || "active";
      if (o.final) marks[`${m - 1},${n - 1}`] = "match";
      return [
        {
          type: "grid",
          label: "paths to each cell, filled in as calls return (outlined = waiting on the call stack; the code only stores the inner cells in memo)",
          rows: [...Array(m).keys()],
          cols: [...Array(n).keys()],
          cells: memo.map((row) => row.map((v) => (v === null ? "" : v))),
          marks,
        },
        { type: "array", label: "call stack (bottom → top)", values: stack.map(([r, c]) => `paths(${r},${c})`), wide: true, marks: stack.length ? { [stack.length - 1]: "active" } : {} },
        { type: "vars", items: [{ name: "calls", value: calls }] },
      ];
    };
    steps.push({ line: ["init", "answer"], note: `Ask for paths(${m - 1}, ${n - 1}), the bottom-right corner. You can only move right or down, so you arrive there from the cell above or the cell to its left.`, view: view() });
    const paths = (r, c) => {
      calls++;
      stack.push([r, c]);
      if (r === 0 || c === 0) {
        memo[r][c] = 1;
        steps.push({
          line: ["call", "edge"],
          note: `paths(${r}, ${c}): ${r === 0 && c === 0 ? "the start itself" : r === 0 ? "top row" : "left column"}. The only way there is a straight line: 1.`,
          view: view({ at: [r, c], mark: "new" }),
        });
        stack.pop();
        return 1;
      }
      if (memo[r][c] !== null) {
        steps.push({ line: ["call", "memo"], note: `paths(${r}, ${c}) is already in memo: ${memo[r][c]}. No new calls.`, view: view({ at: [r, c], mark: "match" }) });
        stack.pop();
        return memo[r][c];
      }
      steps.push({ line: ["call", "memo", "add"], note: `paths(${r}, ${c}) isn't known yet. It's paths(${r - 1}, ${c}) (from above) + paths(${r}, ${c - 1}) (from the left).`, view: view({ at: [r, c], from: [[r - 1, c], [r, c - 1]] }) });
      const up = paths(r - 1, c);
      const left = paths(r, c - 1);
      memo[r][c] = up + left;
      steps.push({ line: ["add", "memo"], note: `paths(${r}, ${c}) = ${up} + ${left} = ${memo[r][c]}. Remember it.`, view: view({ at: [r, c], mark: "new", from: [[r - 1, c], [r, c - 1]] }) });
      stack.pop();
      return memo[r][c];
    };
    const answer = paths(m - 1, n - 1);
    steps.push({
      line: "answer",
      note: `There ${answer === 1 ? "is 1 path" : `are ${answer} paths`}. ${calls} call${calls === 1 ? "" : "s"} in all: each cell is worked out once, and at most two more calls reuse it. O(m·n).`,
      view: view({ final: true }),
    });
    return steps;
  },
});
