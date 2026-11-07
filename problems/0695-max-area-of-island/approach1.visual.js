// For every land cell, flood its whole island again with a fresh seen set, and keep the biggest count.
(function () {
DSAViz.register("0695-max-area-of-island/approach1", {
  inputs: [{ name: "grid", type: "int[][]", value: "[[1, 1, 0, 0, 0], [1, 1, 0, 0, 1], [0, 0, 0, 1, 1], [0, 0, 0, 1, 1], [1, 0, 0, 0, 0]]", maxRows: 6, maxCols: 6, minValue: 0, maxValue: 1 }],
  trace({ grid }) {
    checkGrid(grid);
    const R = grid.length;
    const C = grid[0].length;
    const steps = [];
    let best = 0;
    let work = 0;
    const counted = {}; // island cells already counted from an earlier start (for the note only)
    const view = (o = {}) => {
      const marks = {};
      (o.seen || []).forEach(([i, j]) => (marks[`${i},${j}`] = "new"));
      if (o.at) marks[`${o.at[0]},${o.at[1]}`] = "active";
      return [
        gridView(grid, marks, "grid (dark = start cell, yellow = its island, found from scratch)"),
        { type: "vars", items: [{ name: "best", value: best, mark: o.better ? "new" : "" }, { name: "cells visited in total", value: work }] },
      ];
    };
    steps.push({ line: "init", note: `A ${R} × ${C} grid. Every land cell will count its own island.`, view: view() });
    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        if (grid[r][c] === 0) continue;
        const seen = [[r, c]];
        const has = new Set([`${r},${c}`]);
        const stack = [[r, c]];
        while (stack.length) {
          const [i, j] = stack.pop();
          for (const [x, y] of [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]]) {
            if (x >= 0 && x < R && y >= 0 && y < C && grid[x][y] === 1 && !has.has(`${x},${y}`)) { has.add(`${x},${y}`); seen.push([x, y]); stack.push([x, y]); }
          }
        }
        work += seen.length;
        const again = counted[`${r},${c}`];
        seen.forEach(([i, j]) => (counted[`${i},${j}`] = true));
        const better = seen.length > best;
        best = Math.max(best, seen.length);
        steps.push({
          line: ["cell", "fill", "best"],
          note: `Land at (${r}, ${c}): flood its island with a new seen set: ${seen.length} cell${seen.length > 1 ? "s" : ""}.${again ? " Same island as before, counted all over again." : ""} best = ${best}.`,
          view: view({ at: [r, c], seen, better }),
        });
      }
    }
    steps.push({ line: "return", note: `Return ${best}. ${work} cell visits for ${grid.flat().filter((x) => x).length} land cells: an island of k cells is flooded k times, O((m·n)²) at worst.`, view: view() });
    return steps;
  },
});

function checkGrid(grid) {
  if (!grid.length || !grid[0].length) throw new DSAViz.InputError("Give at least one row, like [[1, 0], [1, 1]].");
  if (grid.some((row) => row.length !== grid[0].length)) throw new DSAViz.InputError("Every row needs the same number of cells.");
  if (grid.some((row) => row.some((x) => x !== 0 && x !== 1))) throw new DSAViz.InputError("Cells are 0 (water) or 1 (land).");
}
function gridView(grid, marks, label) {
  return { type: "grid", label, rows: grid.map((_, k) => k), cols: grid[0].map((_, k) => k), corner: "r \\ c", cells: grid.map((row) => row.map(String)), marks };
}
})();
