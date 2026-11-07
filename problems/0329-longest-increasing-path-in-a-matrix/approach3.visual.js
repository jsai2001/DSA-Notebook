// DFS with a memo: longest(r, c) = 1 + the best longest() of a bigger neighbour, worked out once per cell.
(function () {
DSAViz.register("0329-longest-increasing-path-in-a-matrix/approach3", {
  inputs: [{ name: "matrix", type: "int[][]", value: "[[9, 9, 4], [6, 6, 8], [2, 1, 1]]", maxRows: 4, maxCols: 4, minValue: 0, maxValue: 99 }],
  trace({ matrix: g }) {
    const memo = g.map((r) => r.map(() => 0));
    const steps = [{ line: "init", note: "memo starts empty. Values must strictly increase, so a path never loops back: the memo is safe.", view: [gv(g, {}, "matrix"), gv(g, {}, "memo", memo.map((r) => r.map(() => "")))] }];
    const cells = () => memo.map((r) => r.map((v) => (v ? String(v) : "")));
    const longest = (r, c) => {
      if (memo[r][c]) { steps.push({ line: ["call", "memo"], note: `longest(${r},${c}) is known: ${memo[r][c]}.`, view: [gv(g, { [`${r},${c}`]: "match" }, "matrix"), gv(g, { [`${r},${c}`]: "match" }, "memo", cells())] }); return memo[r][c]; }
      let b = 1, from = null;
      for (const [x, y] of nbrs(g, r, c)) if (g[x][y] > g[r][c]) { const v = 1 + longest(x, y); if (v > b) { b = v; from = [x, y]; } }
      memo[r][c] = b;
      steps.push({ line: ["call", "step", "store"], note: from ? `longest(${r},${c}) = 1 + longest(${from[0]},${from[1]}) = ${b} (${g[r][c]} → ${g[from[0]][from[1]]} …).` : `longest(${r},${c}): no bigger neighbour, so 1.`, view: [gv(g, { [`${r},${c}`]: "active", ...(from ? { [`${from[0]},${from[1]}`]: "compare" } : {}) }, "matrix (dark = this cell, yellow = the best next cell)"), gv(g, { [`${r},${c}`]: "new" }, "memo", cells())] });
      return b;
    };
    let ans = 0;
    for (let r = 0; r < g.length; r++) for (let c = 0; c < g[0].length; c++) ans = Math.max(ans, longest(r, c));
    steps.push({ line: "return", note: `Return ${ans}, the biggest memo value. Each cell is worked out once: O(m·n).`, view: [gv(g, {}, "memo", cells())] });
    return steps;
  },
});

const gv = (g, marks, label, cells) => ({ type: "grid", label, rows: g.map((_, k) => k), cols: g[0].map((_, k) => k), corner: "r \\ c", cells: cells || g.map((r) => r.map(String)), marks });
const nbrs = (g, r, c) => [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]].filter(([x, y]) => x >= 0 && y >= 0 && x < g.length && y < g[0].length);
})();
