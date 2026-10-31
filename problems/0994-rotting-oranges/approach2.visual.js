// Multi-source BFS: start with every rotten orange in the queue; each BFS level is one minute.
DSAViz.register("0994-rotting-oranges/approach2", {
  inputs: [{ name: "grid", type: "int[][]", value: "[[2, 1, 1], [1, 1, 0], [0, 1, 1]]", maxRows: 6, maxCols: 6, minValue: 0, maxValue: 2 }],
  trace({ grid: start }) {
    const grid = start.map((row) => row.slice());
    const R = grid.length;
    const C = grid[0].length;
    const rotAt = grid.map((row) => row.map((v) => (v === 2 ? 0 : null)));
    const queue = [];
    let fresh = 0;
    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        if (grid[r][c] === 2) queue.push([r, c]);
        else if (grid[r][c] === 1) fresh++;
      }
    }
    const steps = [];
    let minutes = 0;
    const cell = (r, c) => (grid[r][c] === 0 ? "" : grid[r][c] === 1 ? "🍊" : String(rotAt[r][c]));
    const view = (opts = {}) => {
      const marks = {};
      for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
          if (grid[r][c] === 0) marks[`${r},${c}`] = "ghost";
          else if (grid[r][c] === 2) marks[`${r},${c}`] = "visited";
        }
      }
      queue.forEach(([r, c]) => (marks[`${r},${c}`] = "new"));
      (opts.stuck || []).forEach(([r, c]) => (marks[`${r},${c}`] = "compare"));
      if (opts.at) marks[`${opts.at[0]},${opts.at[1]}`] = "active";
      return [
        {
          type: "grid",
          label: "grid (🍊 = fresh, number = minute it rotted, yellow = in the queue)",
          rows: Array.from({ length: R }, (_, k) => k), cols: Array.from({ length: C }, (_, k) => k), corner: "r \\ c",
          cells: grid.map((row, r) => row.map((_, c) => cell(r, c))), marks,
        },
        { type: "array", label: "queue (front → back)", values: queue.map(([r, c]) => `(${r}, ${c})`), wide: true, marks: queue.length ? { 0: "active" } : {} },
        { type: "vars", items: [{ name: "minutes", value: minutes }, { name: "fresh", value: fresh, mark: opts.freshDrop ? "new" : "" }] },
      ];
    };

    steps.push({
      line: "init",
      note: `Put every rotten orange in the queue at once (${queue.length} of them) and count the fresh ones (${fresh}). They all spread at the same time, so they start together.`,
      view: view(),
    });
    while (queue.length && fresh) {
      minutes++;
      const level = queue.length;
      steps.push({
        line: "minute",
        note: `Minute ${minutes}: the ${level} orange${level === 1 ? "" : "s"} now in the queue spread. Oranges they rot join the back of the queue for the next minute.`,
        view: view(),
      });
      for (let k = 0; k < level; k++) {
        const [r, c] = queue.shift();
        const rotted = [];
        for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] === 1) {
            grid[nr][nc] = 2;
            rotAt[nr][nc] = minutes;
            fresh--;
            queue.push([nr, nc]);
            rotted.push(`(${nr}, ${nc})`);
          }
        }
        steps.push({
          line: rotted.length ? ["pop", "look", "rot"] : ["pop", "look"],
          note: rotted.length
            ? `Take (${r}, ${c}). It rots ${rotted.join(" and ")}; mark ${rotted.length === 1 ? "it" : "them"} rotten right away so no orange is queued twice. fresh = ${fresh}.`
            : `Take (${r}, ${c}). No fresh neighbors.`,
          view: view({ at: [r, c], freshDrop: rotted.length > 0 }),
        });
      }
    }
    const stuck = [];
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (grid[r][c] === 1) stuck.push([r, c]);
    steps.push({
      line: ["minute", "return"],
      note: fresh
        ? `The queue is empty but ${fresh} orange${fresh === 1 ? " is" : "s are"} still fresh: ${stuck.map(([r, c]) => `(${r}, ${c})`).join(", ")}. Return -1.`
        : `No fresh oranges left. Return ${minutes}. Each cell was queued at most once: O(m · n).`,
      view: view({ stuck }),
    });
    return steps;
  },
});
