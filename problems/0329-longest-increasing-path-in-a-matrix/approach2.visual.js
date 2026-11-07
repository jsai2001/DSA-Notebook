// Peel layers from the peaks down (topological order). The number of layers is the longest increasing path.
(function () {
DSAViz.register("0329-longest-increasing-path-in-a-matrix/approach2", {
  inputs: [{ name: "matrix", type: "int[][]", value: "[[9, 9, 4], [6, 6, 8], [2, 1, 1]]", maxRows: 4, maxCols: 4, minValue: 0, maxValue: 99 }],
  trace({ matrix: g }) {
    const bigger = g.map((row, r) => row.map((v, c) => nbrs(g, r, c).filter(([x, y]) => g[x][y] > v).length));
    const peeled = {};
    let layer = [];
    g.forEach((row, r) => row.forEach((_, c) => { if (!bigger[r][c]) layer.push([r, c]); }));
    const steps = [{ line: ["init", "count"], note: `Count each cell's bigger neighbours. Cells with none are peaks: ${layer.map(([r, c]) => g[r][c]).join(", ")}. Every increasing path ends at a peak.`, view: [gv(g, Object.fromEntries(layer.map(([r, c]) => [`${r},${c}`, "new"])), "matrix (yellow = this layer)"), gv(g, {}, "bigger[r][c]: bigger neighbours not peeled yet", bigger.map((r) => r.map(String)))] }];
    let length = 0;
    while (layer.length) {
      length++;
      layer.forEach(([r, c]) => (peeled[`${r},${c}`] = "visited"));
      const next = [];
      for (const [r, c] of layer) for (const [x, y] of nbrs(g, r, c)) if (g[x][y] < g[r][c] && --bigger[x][y] === 0) next.push([x, y]);
      steps.push({ line: ["peel", "drop"], note: `Layer ${length}: peel ${layer.map(([r, c]) => g[r][c]).join(", ")}. Their smaller neighbours lose a bigger neighbour.${next.length ? ` ${next.map(([r, c]) => g[r][c]).join(", ")} reach 0: the next layer.` : " Nothing left."}`, view: [gv(g, { ...peeled, ...Object.fromEntries(next.map(([r, c]) => [`${r},${c}`, "new"])) }, "matrix (grey = peeled, yellow = next layer)"), gv(g, {}, "bigger[r][c]", bigger.map((r) => r.map(String)))] });
      layer = next;
    }
    steps.push({ line: "return", note: `Return ${length}. Each layer is one step of the longest path. Every cell is peeled once: O(m·n), no recursion.`, view: [gv(g, peeled, "matrix")] });
    return steps;
  },
});

const gv = (g, marks, label, cells) => ({ type: "grid", label, rows: g.map((_, k) => k), cols: g[0].map((_, k) => k), corner: "r \\ c", cells: cells || g.map((r) => r.map(String)), marks });
const nbrs = (g, r, c) => [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]].filter(([x, y]) => x >= 0 && y >= 0 && x < g.length && y < g[0].length);
})();
