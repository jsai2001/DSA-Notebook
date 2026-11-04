// From the top-right corner: too big → go left (drop the column), too small → go down (drop the row).
DSAViz.register("0074-search-a-2d-matrix/approach2", {
  inputs: [
    { name: "matrix", type: "int[][]", value: "[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]", maxRows: 5, maxCols: 5, minValue: -99, maxValue: 99 },
    { name: "target", type: "int", value: "30", min: -99, max: 99 },
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
    let r = 0;
    let c = n - 1;
    let looked = 0;
    const view = (o = {}) => {
      const marks = {};
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (i < r || j > c) marks[`${i},${j}`] = "visited";
      for (let i = r; i < m; i++) for (let j = 0; j <= c; j++) marks[`${i},${j}`] = "window";
      if (r < m && c >= 0) marks[`${r},${c}`] = o.hit ? "match" : "active";
      return [
        { type: "grid", label: `matrix (outlined = where ${target} could still be)`, rows: idx(m), cols: idx(n), cells: matrix.map((x) => x.slice()), marks },
        { type: "vars", items: [{ name: "(r, c)", value: r < m && c >= 0 ? `(${r}, ${c})` : "off the matrix" }, { name: "cells looked at", value: looked }] },
      ];
    };
    steps.push({ line: "init", note: `Start at the top-right corner, ${matrix[0][n - 1]}. Everything to its left is smaller and everything below it is bigger, so one comparison always rules out a whole row or column.`, view: view() });
    while (r < m && c >= 0) {
      const v = matrix[r][c];
      looked++;
      if (v === target) {
        steps.push({ line: ["loop", "found"], note: `matrix[${r}][${c}] = ${v}: found it. Return true.`, view: view({ hit: true }) });
        return steps;
      }
      if (v > target) {
        c--;
        steps.push({ line: ["loop", "found", "left"], note: `${v} > ${target}: everything below ${v} in column ${c + 1} is even bigger. Drop that column: move left.`, view: view() });
      } else {
        r++;
        steps.push({ line: ["loop", "found", "left", "down"], note: `${v} < ${target}: everything left of ${v} in row ${r - 1} is even smaller. Drop that row: move down.`, view: view() });
      }
    }
    steps.push({ line: ["loop", "return"], note: `Walked off the matrix: no row or column is left that could hold ${target}. Return false. ${looked} cell${looked === 1 ? "" : "s"} looked at; at most m + n − 1, so O(m + n).`, view: view() });
    return steps;
  },
});
