// Reverse the flow with a BFS from all of an ocean's edge cells at once. Cells reached from both oceans are the answer.
(function () {
const INPUT = [{ name: "heights", type: "int[][]", value: "[[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]", maxRows: 6, maxCols: 6, minValue: 0, maxValue: 99 }];
const gv = (g, label, marks = {}) => ({ type: "grid", label, rows: g.map((_, k) => k), cols: g[0].map((_, k) => k), corner: "r \\ c", cells: g.map((r) => r.map(String)), marks });
const show = (ans) => `[${ans.map(([r, c]) => `[${r}, ${c}]`).join(", ")}]`;
const NB = (i, j) => [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]];
const fromSet = (s, mark) => Object.fromEntries([...s].map((k) => [k, mark]));
DSAViz.register("0417-pacific-atlantic-water-flow/approach3", {
  inputs: INPUT,
  trace({ heights: g }) {
    const m = g.length, n = g[0].length;
    const steps = [{ line: "init", note: "Water flows down, so search up from each ocean: a cell reached by climbing can drain into that ocean.", view: [gv(g, "heights")] }];
    function reach(starts, name) {
      const seen = new Set(starts.map(([i, j]) => `${i},${j}`));
      let wave = [...new Set(starts.map(([i, j]) => `${i},${j}`))].map((k) => k.split(",").map(Number));
      steps.push({ line: "seed", note: `${name}: start the BFS from all ${wave.length} edge cells at once.`, view: [gv(g, `${name} reach`, fromSet(seen, "new"))] });
      let round = 0;
      while (wave.length) {
        const next = [];
        for (const [i, j] of wave) for (const [x, y] of NB(i, j)) if (x >= 0 && x < m && y >= 0 && y < n && !seen.has(`${x},${y}`) && g[x][y] >= g[i][j]) { seen.add(`${x},${y}`); next.push([x, y]); }
        if (next.length) {
          round++;
          steps.push({ line: "bfs", note: `${name}, wave ${round}: ${next.length} more cell${next.length > 1 ? "s" : ""} are equal or higher than a reached neighbour.`, view: [gv(g, `${name} reach`, { ...fromSet(seen, "visited"), ...Object.fromEntries(next.map(([x, y]) => [`${x},${y}`, "new"])) })] });
        }
        wave = next;
      }
      steps.push({ line: "bfs", note: `${name}: the queue is empty. ${seen.size} cell${seen.size > 1 ? "s" : ""} can drain into it.`, view: [gv(g, `${name} reach`, fromSet(seen, "visited"))] });
      return seen;
    }
    const top = [], bottom = [];
    for (let c = 0; c < n; c++) { top.push([0, c]); bottom.push([m - 1, c]); }
    for (let r = 0; r < m; r++) { top.push([r, 0]); bottom.push([r, n - 1]); }
    const pac = reach(top, "Pacific"), atl = reach(bottom, "Atlantic");
    const ans = [];
    for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (pac.has(`${r},${c}`) && atl.has(`${r},${c}`)) ans.push([r, c]);
    steps.push({ line: "return", note: `Return ${show(ans)}: the cells in both. Each BFS visits a cell once, no recursion: O(m·n).`, view: [gv(g, "heights; green = both oceans", Object.fromEntries(ans.map(([r, c]) => [`${r},${c}`, "match"])))] });
    return steps;
  },
});
})();
