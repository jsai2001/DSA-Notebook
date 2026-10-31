// Simulation: each minute, scan the grid, collect every fresh orange next to a rotten one, then rot them.
DSAViz.register("0994-rotting-oranges/approach1", {
  inputs: [{ name: "grid", type: "int[][]", value: "[[2, 1, 1], [1, 1, 0], [0, 1, 1]]", maxRows: 6, maxCols: 6, minValue: 0, maxValue: 2 }],
  trace({ grid: start }) {
    const grid = start.map((row) => row.slice());
    const R = grid.length;
    const C = grid[0].length;
    const rotAt = grid.map((row) => row.map((v) => (v === 2 ? 0 : null))); // minute each orange rotted
    const steps = [];
    let minutes = 0;
    const cell = (r, c) => (grid[r][c] === 0 ? "" : grid[r][c] === 1 ? "🍊" : String(rotAt[r][c]));
    const view = (opts = {}) => {
      const marks = {};
      for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
          if (grid[r][c] === 0) marks[`${r},${c}`] = "ghost";
          else if (grid[r][c] === 2) marks[`${r},${c}`] = rotAt[r][c] === minutes && minutes > 0 ? "new" : "visited";
        }
      }
      (opts.pending || []).forEach(([r, c]) => (marks[`${r},${c}`] = "active"));
      (opts.stuck || []).forEach(([r, c]) => (marks[`${r},${c}`] = "compare"));
      return [
        {
          type: "grid",
          label: "grid (🍊 = fresh, number = minute it rotted, dark = about to rot)",
          rows: Array.from({ length: R }, (_, k) => k), cols: Array.from({ length: C }, (_, k) => k), corner: "r \\ c",
          cells: grid.map((row, r) => row.map((_, c) => cell(r, c))), marks,
        },
        { type: "vars", items: [{ name: "minutes", value: minutes }, { name: "fresh left", value: grid.flat().filter((v) => v === 1).length }] },
      ];
    };
    const near = (r, c) =>
      [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dr, dc]) => {
        const nr = r + dr;
        const nc = c + dc;
        return nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] === 2;
      });

    steps.push({ line: "init", note: `Rotten oranges (marked 0) spread to their up, down, left and right neighbors once a minute.`, view: view() });
    for (;;) {
      const toRot = [];
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (grid[r][c] === 1 && near(r, c)) toRot.push([r, c]);
      if (!toRot.length) {
        steps.push({
          line: ["minute", "scan", "stop"],
          note: `Scan the whole grid: no fresh orange touches a rotten one, so nothing changes any more. Stop.`,
          view: view(),
        });
        break;
      }
      steps.push({
        line: ["minute", "scan", "found"],
        note: `Scan the whole grid for fresh oranges next to a rotten one: ${toRot.map(([r, c]) => `(${r}, ${c})`).join(", ")}. Collect them first; rotting them during the scan would let the rot spread more than one step in a minute.`,
        view: view({ pending: toRot }),
      });
      minutes++;
      toRot.forEach(([r, c]) => {
        grid[r][c] = 2;
        rotAt[r][c] = minutes;
      });
      steps.push({ line: "rot", note: `Rot all ${toRot.length} at once. Minute ${minutes} is done.`, view: view() });
    }
    const stuck = [];
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (grid[r][c] === 1) stuck.push([r, c]);
    steps.push({
      line: stuck.length ? "check" : ["check", "return"],
      note: stuck.length
        ? `Still fresh: ${stuck.map(([r, c]) => `(${r}, ${c})`).join(", ")}. No rotten orange can ever reach ${stuck.length === 1 ? "it" : "them"}, so return -1.`
        : `No fresh oranges left. Return ${minutes}. Each minute rescanned the whole grid: O((m · n)²) in the worst case.`,
      view: view({ stuck }),
    });
    return steps;
  },
});
