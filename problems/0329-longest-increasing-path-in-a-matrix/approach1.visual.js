// From every cell, try every bigger neighbour, with no memory: the same paths are walked again and again.
(function () {
DSAViz.register("0329-longest-increasing-path-in-a-matrix/approach1", {
  inputs: [{ name: "matrix", type: "int[][]", value: "[[9, 9, 4], [6, 6, 8], [2, 1, 1]]", maxRows: 4, maxCols: 4, minValue: 0, maxValue: 99 }],
  trace({ matrix: g }) {
    let calls = 0;
    const longest = (r, c) => { calls++; let b = 1; for (const [x, y] of nbrs(g, r, c)) if (g[x][y] > g[r][c]) b = Math.max(b, 1 + longest(x, y)); return b; };
    const steps = [{ line: "init", note: "Start a fresh search from every cell.", view: [gv(g, {}, "matrix")] }];
    const res = g.map((r) => r.map(() => ""));
    let ans = 0;
    for (let r = 0; r < g.length; r++) for (let c = 0; c < g[0].length; c++) {
      const before = calls; const v = longest(r, c); res[r][c] = v; ans = Math.max(ans, v);
      steps.push({ line: ["return", "call", "step"], note: `From (${r},${c}) = ${g[r][c]}: the longest path is ${v}, found with ${calls - before} call${calls - before > 1 ? "s" : ""}, none remembered.`, view: [gv(g, { [`${r},${c}`]: "active" }, "matrix (dark = the start)"), gv(g, { [`${r},${c}`]: "new" }, "longest path from each start", res), { type: "vars", items: [{ name: "calls so far", value: calls }] }] });
    }
    steps.push({ line: "return", note: `Return ${ans}. ${calls} calls in total. On a grid where values rise along diagonals the count grows exponentially: 5.9 s in Python at just 12 × 12.`, view: [gv(g, {}, "longest path from each start", res)] });
    return steps;
  },
});

const gv = (g, marks, label, cells) => ({ type: "grid", label, rows: g.map((_, k) => k), cols: g[0].map((_, k) => k), corner: "r \\ c", cells: cells || g.map((r) => r.map(String)), marks });
const nbrs = (g, r, c) => [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]].filter(([x, y]) => x >= 0 && y >= 0 && x < g.length && y < g[0].length);
})();
