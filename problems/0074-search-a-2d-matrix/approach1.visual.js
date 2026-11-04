// Look at every cell, row by row, until the target turns up.
DSAViz.register("0074-search-a-2d-matrix/approach1", {
  inputs: [
    { name: "matrix", type: "int[][]", value: "[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]", maxRows: 5, maxCols: 5, minValue: -99, maxValue: 99 },
    { name: "target", type: "int", value: "16", min: -99, max: 99 },
  ],
  trace({ matrix, target }) {
    const m = matrix.length;
    const n = matrix[0].length;
    if (matrix.some((r) => r.length !== n)) throw new DSAViz.InputError("every row must have the same length, like [[1, 3], [5, 7]].");
    const flat = matrix.flat();
    if (flat.some((v, k) => k && (k % n === 0 ? v <= flat[k - 1] : v < flat[k - 1])))
      throw new DSAViz.InputError("each row must be sorted, and each row must start above the previous row's last value (the problem promises this).");
    const idx = (k) => [...Array(k).keys()];
    const steps = [];
    let looked = 0;
    let passed = false; // has a cell bigger than the target been seen yet?
    const view = (at, o = {}) => {
      const marks = {};
      for (let k = 0; k < looked - (at ? 1 : 0); k++) marks[`${Math.floor(k / n)},${k % n}`] = "visited";
      if (at) marks[`${at[0]},${at[1]}`] = o.hit ? "match" : "active";
      return [
        { type: "grid", label: `matrix (looking for ${target})`, rows: idx(m), cols: idx(n), cells: matrix.map((r) => r.slice()), marks },
        { type: "vars", items: [{ name: "cells looked at", value: looked }] },
      ];
    };
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        looked++;
        const v = matrix[i][j];
        if (v === target) {
          steps.push({ line: ["row", "cell", "found"], note: `matrix[${i}][${j}] = ${v}: found it. Return true.`, view: view([i, j], { hit: true }) });
          return steps;
        }
        const first = v > target && !passed;
        steps.push({ line: ["row", "cell"], note: `matrix[${i}][${j}] = ${v} ≠ ${target}.${v > target && !passed ? " It's already bigger than the target, so the rest can't match, but this approach doesn't use the sorting and keeps going." : ""}`, view: view([i, j]) });
        if (first) passed = true;
      }
    }
    steps.push({ line: "return", note: `Every one of the ${m * n} cells checked: ${target} isn't there. Return false. O(m·n), and it never uses the sorting.`, view: view(null) });
    return steps;
  },
});
