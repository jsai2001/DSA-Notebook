// Walk like a snake: keep going in one direction, and turn right when the next cell is off the grid or already taken.
DSAViz.register("0054-spiral-matrix/approach1", {
  inputs: [{ name: "matrix", type: "int[][]", value: "[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]", maxRows: 5, maxCols: 5, minValue: -99, maxValue: 99 }],
  trace({ matrix }) {
    const m = matrix.length;
    const n = matrix[0].length;
    if (matrix.some((r) => r.length !== n)) throw new DSAViz.InputError("every row must have the same length, like [[1, 2], [3, 4]].");
    const NAMES = ["right", "down", "left", "up"];
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];
    const seen = matrix.map((r) => r.map(() => false));
    const result = [];
    const steps = [];
    const inside = (r, c) => r >= 0 && r < m && c >= 0 && c < n;
    const view = (o = {}) => {
      const marks = {};
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (seen[i][j]) marks[`${i},${j}`] = o.final ? "match" : "visited";
      if (o.look && inside(...o.look)) marks[`${o.look[0]},${o.look[1]}`] = o.blocked ? "cut" : "compare";
      if (o.at) marks[`${o.at[0]},${o.at[1]}`] = "active";
      const rm = {};
      if (o.fresh && result.length) rm[result.length - 1] = "new";
      if (o.final) result.forEach((_, k) => (rm[k] = "match"));
      return [
        { type: "grid", label: "matrix (dark = the cell we're on, yellow = the next cell, grey = taken)", rows: [...Array(m).keys()], cols: [...Array(n).keys()], cells: matrix.map((r) => r.slice()), marks },
        { type: "vars", items: [{ name: "(r, c)", value: o.at ? `(${o.at[0]}, ${o.at[1]})` : "-" }, { name: "direction d", value: o.d !== undefined ? NAMES[o.d] : "-", mark: o.turned ? "new" : "" }] },
        { type: "array", label: `result (${result.length} of ${m * n})`, values: result.slice(), compact: true, marks: rm },
      ];
    };
    let r = 0;
    let c = 0;
    let d = 0;
    steps.push({ line: "init", note: `Start at the top-left corner heading right. seen marks the cells already taken; the four directions are tried in the order right, down, left, up.`, view: view({ at: [0, 0], d }) });
    for (let k = 0; k < m * n; k++) {
      result.push(matrix[r][c]);
      seen[r][c] = true;
      steps.push({ line: "take", note: `Take matrix[${r}][${c}] = ${matrix[r][c]}. That's ${k + 1} of ${m * n}.`, view: view({ at: [r, c], d, fresh: true }) });
      if (k === m * n - 1) break;
      let nr = r + dr[d];
      let nc = c + dc[d];
      if (!inside(nr, nc) || seen[nr][nc]) {
        const why = inside(nr, nc) ? `(${nr}, ${nc}) is already taken` : `(${nr}, ${nc}) is off the grid`;
        steps.push({ line: "turn", note: `Going ${NAMES[d]}, the next cell ${why}. Turn right.`, view: view({ at: [r, c], d, look: [nr, nc], blocked: true }) });
        d = (d + 1) % 4;
        nr = r + dr[d];
        nc = c + dc[d];
        steps.push({ line: "turn", note: `Now heading ${NAMES[d]}: the next cell is (${nr}, ${nc}).`, view: view({ at: [r, c], d, look: [nr, nc], turned: true }) });
      } else {
        steps.push({ line: "look", note: `Going ${NAMES[d]}, the next cell (${nr}, ${nc}) is free. Step onto it.`, view: view({ at: [r, c], d, look: [nr, nc] }) });
      }
      r = nr;
      c = nc;
    }
    steps.push({ line: "return", note: `All ${m * n} cells taken: the loop has run m·n times, so it stops (the step it works out after the last cell is never used). One right turn is always enough here: the spiral never paints itself into a corner. O(m·n) time, plus O(m·n) for seen.`, view: view({ final: true }) });
    return steps;
  },
});
