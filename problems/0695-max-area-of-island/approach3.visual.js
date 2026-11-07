// Iterative DFS with a stack: sink each cell as it's pushed, count it when it's popped. No recursion.
(function () {
DSAViz.register("0695-max-area-of-island/approach3", {
  inputs: [{ name: "grid", type: "int[][]", value: "[[1, 1, 0, 0, 0], [1, 1, 0, 0, 1], [0, 0, 0, 1, 1], [0, 0, 0, 1, 1], [1, 0, 0, 0, 0]]", maxRows: 6, maxCols: 6, minValue: 0, maxValue: 1 }],
  trace({ grid: input }) {
    checkGrid(input);
    const grid = input.map((row) => row.slice());
    const R = grid.length;
    const C = grid[0].length;
    const steps = [];
    let best = 0;
    let size = 0;
    const stack = [];
    const counted = []; // cells of this island already popped
    const view = (o = {}) => {
      const marks = {};
      for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) if (input[i][j] === 1 && grid[i][j] === 0) marks[`${i},${j}`] = "visited";
      counted.forEach(([i, j]) => (marks[`${i},${j}`] = "match"));
      (o.pushed || []).forEach(([i, j]) => (marks[`${i},${j}`] = "new"));
      if (o.at) marks[`${o.at[0]},${o.at[1]}`] = "active";
      return [
        gridView(grid, marks, "grid (dark = popped now, yellow = just pushed, green = counted, dashed = sunk)"),
        { type: "array", label: "stack (top on the right)", values: stack.map(([i, j]) => `(${i},${j})`), compact: true, marks: Object.fromEntries((o.pushed || []).map((_, k) => [stack.length - 1 - k, "new"])) },
        { type: "vars", items: [{ name: "size", value: size }, { name: "best", value: best, mark: o.better ? "new" : "" }] },
      ];
    };
    steps.push({ line: "init", note: "Scan the grid. A land cell starts a new island.", view: view() });
    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        if (grid[r][c] === 0) continue;
        grid[r][c] = 0;
        stack.push([r, c]);
        size = 0;
        counted.length = 0;
        steps.push({ line: ["cell", "start"], note: `(${r}, ${c}) is land: a new island. Sink it and push it.`, view: view({ pushed: [[r, c]] }) });
        while (stack.length) {
          const [i, j] = stack.pop();
          size++;
          counted.push([i, j]);
          const pushed = [];
          for (const [x, y] of [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]]) {
            if (x >= 0 && x < R && y >= 0 && y < C && grid[x][y] === 1) { grid[x][y] = 0; stack.push([x, y]); pushed.push([x, y]); }
          }
          steps.push({
            line: ["pop", "push"],
            note: `Pop (${i}, ${j}): size = ${size}. ${pushed.length ? `Land next to it: ${pushed.map(([x, y]) => `(${x}, ${y})`).join(", ")}. Sink and push ${pushed.length > 1 ? "them" : "it"}.` : "No unsunk land next to it."}`,
            view: view({ at: [i, j], pushed: pushed.slice().reverse() }),
          });
        }
        const better = size > best;
        best = Math.max(best, size);
        steps.push({ line: "best", note: `The stack is empty: this island has ${size} cell${size > 1 ? "s" : ""}. best = ${best}.`, view: view({ better }) });
        counted.length = 0;
      }
    }
    steps.push({ line: "return", note: `Return ${best}. Each land cell is pushed once and popped once: O(m·n) time, no recursion.`, view: view() });
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
