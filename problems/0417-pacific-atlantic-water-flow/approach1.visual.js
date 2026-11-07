// From every cell, follow the water downhill and see which edges it touches.
(function () {
const INPUT = [{ name: "heights", type: "int[][]", value: "[[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]", maxRows: 6, maxCols: 6, minValue: 0, maxValue: 99 }];
const gv = (g, label, marks = {}) => ({ type: "grid", label, rows: g.map((_, k) => k), cols: g[0].map((_, k) => k), corner: "r \\ c", cells: g.map((r) => r.map(String)), marks });
const show = (ans) => `[${ans.map(([r, c]) => `[${r}, ${c}]`).join(", ")}]`;
const NB = (i, j) => [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]];
const fromSet = (s, mark) => Object.fromEntries([...s].map((k) => [k, mark]));
DSAViz.register("0417-pacific-atlantic-water-flow/approach1", {
  inputs: INPUT,
  trace({ heights: g }) {
    const m = g.length, n = g[0].length, ans = [];
    const steps = [{ line: "init", note: "Pacific: top and left edges. Atlantic: bottom and right edges. Water moves to a neighbour that's equal or lower.", view: [gv(g, "heights")] }];
    for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) {
      let pac = false, atl = false;
      const seen = new Set([`${r},${c}`]), stack = [[r, c]];
      while (stack.length && !(pac && atl)) {
        const [i, j] = stack.pop();
        pac = pac || i === 0 || j === 0; atl = atl || i === m - 1 || j === n - 1;
        for (const [x, y] of NB(i, j)) if (x >= 0 && x < m && y >= 0 && y < n && !seen.has(`${x},${y}`) && g[x][y] <= g[i][j]) { seen.add(`${x},${y}`); stack.push([x, y]); }
      }
      if (pac && atl) ans.push([r, c]);
      const marks = { ...fromSet(seen, "visited"), [`${r},${c}`]: pac && atl ? "match" : "active" };
      steps.push({ line: pac && atl ? ["cell", "flow", "both"] : ["cell", "flow"], note: `(${r}, ${c}), height ${g[r][c]}: water spreads over ${seen.size} cell${seen.size > 1 ? "s" : ""} (grey) and reaches ${pac && atl ? "both oceans. Keep it." : pac ? "only the Pacific." : atl ? "only the Atlantic." : "neither ocean."}`, view: [gv(g, "heights; grey = where the water from this cell goes", marks)] });
    }
    steps.push({ line: "return", note: `Return ${show(ans)}. A search from every cell: O((m·n)²) at worst.`, view: [gv(g, "heights; green = both oceans", Object.fromEntries(ans.map(([r, c]) => [`${r},${c}`, "match"])))] });
    return steps;
  },
});
})();
