// Reverse the flow: from each ocean's edge, climb to equal or higher cells (DFS). Cells reached from both oceans are the answer.
(function () {
const INPUT = [{ name: "heights", type: "int[][]", value: "[[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]", maxRows: 6, maxCols: 6, minValue: 0, maxValue: 99 }];
const gv = (g, label, marks = {}) => ({ type: "grid", label, rows: g.map((_, k) => k), cols: g[0].map((_, k) => k), corner: "r \\ c", cells: g.map((r) => r.map(String)), marks });
const show = (ans) => `[${ans.map(([r, c]) => `[${r}, ${c}]`).join(", ")}]`;
const NB = (i, j) => [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]];
const fromSet = (s, mark) => Object.fromEntries([...s].map((k) => [k, mark]));
DSAViz.register("0417-pacific-atlantic-water-flow/approach2", {
  inputs: INPUT,
  trace({ heights: g }) {
    const m = g.length, n = g[0].length;
    const pac = new Set(), atl = new Set();
    const views = (pm = {}, am = {}) => [gv(g, "Pacific reach (top, left edges)", { ...fromSet(pac, "visited"), ...pm }), gv(g, "Atlantic reach (bottom, right edges)", { ...fromSet(atl, "visited"), ...am })];
    const steps = [{ line: "init", note: "Water flows down, so walk up from each ocean: a cell reached by climbing can drain into that ocean.", view: views() }];
    function climb(i, j, seen) {
      if (seen.has(`${i},${j}`)) return;
      seen.add(`${i},${j}`);
      for (const [x, y] of NB(i, j)) if (x >= 0 && x < m && y >= 0 && y < n && !seen.has(`${x},${y}`) && g[x][y] >= g[i][j]) climb(x, y, seen);
    }
    const run = (i, j, seen, name) => {
      if (seen.has(`${i},${j}`)) return;
      const before = new Set(seen);
      climb(i, j, seen);
      const fresh = [...seen].filter((k) => !before.has(k));
      const mk = Object.fromEntries(fresh.map((k) => [k, "new"]));
      mk[`${i},${j}`] = "active";
      steps.push({ line: ["edges", "climb"], note: `${name} edge cell (${i}, ${j}): climb from it. ${fresh.length} new cell${fresh.length > 1 ? "s" : ""} can drain into the ${name}.`, view: seen === pac ? views(mk, {}) : views({}, mk) });
    };
    for (let c = 0; c < n; c++) { run(0, c, pac, "Pacific"); run(m - 1, c, atl, "Atlantic"); }
    for (let r = 0; r < m; r++) { run(r, 0, pac, "Pacific"); run(r, n - 1, atl, "Atlantic"); }
    const ans = [];
    for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (pac.has(`${r},${c}`) && atl.has(`${r},${c}`)) ans.push([r, c]);
    steps.push({ line: "return", note: `Return ${show(ans)}: the cells in both. Each search visits a cell once: O(m·n).`, view: [gv(g, "heights; green = both oceans", Object.fromEntries(ans.map(([r, c]) => [`${r},${c}`, "match"])))] });
    return steps;
  },
});
})();
