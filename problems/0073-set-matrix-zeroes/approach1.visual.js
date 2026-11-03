// Copy the matrix, find the zeros in the copy, and wipe their rows and columns in the real one.
DSAViz.register("0073-set-matrix-zeroes/approach1", {
  inputs: [{ name: "matrix", type: "int[][]", value: "[[1, 2, 0], [4, 5, 6], [0, 8, 9]]", maxRows: 5, maxCols: 5, minValue: -99, maxValue: 99 }],
  trace({ matrix }) {
    const m = matrix.length;
    const n = matrix[0].length;
    if (matrix.some((r) => r.length !== n)) throw new DSAViz.InputError("every row must have the same length, like [[1, 0], [3, 4]].");
    const original = matrix.map((r) => r.slice());
    const mat = matrix.map((r) => r.slice());
    const idx = (k) => [...Array(k).keys()];
    const steps = [];
    let writes = 0;
    const view = (o = {}) => {
      const om = {};
      const mm = {};
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (original[i][j] === 0) om[`${i},${j}`] = "visited";
      if (o.at) {
        om[`${o.at[0]},${o.at[1]}`] = "active";
        for (let c = 0; c < n; c++) mm[`${o.at[0]},${c}`] = "new";
        for (let r = 0; r < m; r++) mm[`${r},${o.at[1]}`] = "new";
      }
      if (o.final) for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) mm[`${i},${j}`] = mat[i][j] === 0 ? "match" : "";
      return [
        { type: "grid", label: "original: the copy we read the zeros from (grey = its zeros)", rows: idx(m), cols: idx(n), cells: original.map((r) => r.slice()), marks: om },
        { type: "grid", label: "matrix: the one we change", rows: idx(m), cols: idx(n), cells: mat.map((r) => r.slice()), marks: mm },
        { type: "vars", items: [{ name: "cells written", value: writes }] },
      ];
    };
    steps.push({ line: "copy", note: `Copy the matrix first. If we wiped rows in the matrix we're reading, the new zeros would look like original ones and spread.`, view: view() });
    let zeros = 0;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (original[i][j] !== 0) continue;
        zeros++;
        for (let c = 0; c < n; c++) mat[i][c] = 0;
        for (let r = 0; r < m; r++) mat[r][j] = 0;
        writes += m + n;
        steps.push({ line: ["scan", "wipe"], note: `original[${i}][${j}] is 0: wipe row ${i} and column ${j} of matrix (${m + n} writes).`, view: view({ at: [i, j] }) });
      }
    }
    steps.push({
      line: "scan",
      note: zeros
        ? `Every cell of the copy checked: ${zeros} zero${zeros === 1 ? "" : "s"}, ${writes} writes. Each zero costs m + n writes, so it's O(m·n·(m + n)) at worst, plus O(m·n) for the copy.`
        : `No zeros in the matrix, so nothing changes.`,
      view: view({ final: true }),
    });
    return steps;
  },
});
