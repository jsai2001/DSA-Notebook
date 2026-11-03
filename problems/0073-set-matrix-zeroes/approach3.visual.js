// Row 0 and column 0 hold the flags. matrix[0][0] flags row 0; col0_zero flags column 0. Fill the inside first, then row 0, then column 0.
DSAViz.register("0073-set-matrix-zeroes/approach3", {
  inputs: [{ name: "matrix", type: "int[][]", value: "[[1, 1, 1, 1], [1, 0, 1, 1], [1, 1, 1, 0], [0, 1, 1, 1]]", maxRows: 5, maxCols: 5, minValue: -99, maxValue: 99 }],
  trace({ matrix }) {
    const m = matrix.length;
    const n = matrix[0].length;
    if (matrix.some((r) => r.length !== n)) throw new DSAViz.InputError("every row must have the same length, like [[1, 0], [3, 4]].");
    const mat = matrix.map((r) => r.slice());
    const idx = (k) => [...Array(k).keys()];
    let col0 = false;
    const steps = [];
    const view = (o = {}) => {
      const marks = {};
      for (let j = 0; j < n; j++) marks[`0,${j}`] = "window"; // the flag row
      for (let i = 0; i < m; i++) marks[`${i},0`] = "window"; // the flag column
      (o.found || []).forEach(([i, j]) => (marks[`${i},${j}`] = "active"));
      (o.flags || []).forEach(([i, j]) => (marks[`${i},${j}`] = "compare"));
      (o.changed || []).forEach(([i, j]) => (marks[`${i},${j}`] = "new"));
      if (o.final) for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) marks[`${i},${j}`] = mat[i][j] === 0 ? "match" : "";
      return [
        { type: "grid", label: "matrix (outlined: row 0 and column 0, used as the flags)", rows: idx(m), cols: idx(n), cells: mat.map((r) => r.slice()), marks },
        { type: "vars", items: [{ name: "col0_zero", value: col0 ? "True" : "False", mark: o.col0 ? "new" : "" }] },
      ];
    };
    steps.push({
      line: "init",
      note: `No extra arrays: write the flags into row 0 and column 0 themselves. matrix[0][0] can only be one flag, so it's row 0's, and column 0 gets the extra variable col0_zero.`,
      view: view(),
    });
    for (let i = 0; i < m; i++) {
      const found = [];
      const flags = [];
      let hit0 = false;
      if (mat[i][0] === 0) {
        col0 = true;
        hit0 = true;
        found.push([i, 0]);
      }
      for (let j = 1; j < n; j++) if (mat[i][j] === 0) {
        found.push([i, j]);
        mat[i][0] = 0;
        mat[0][j] = 0;
        flags.push([i, 0], [0, j]);
      }
      const inner = found.filter(([, j]) => j > 0).map(([, j]) => j);
      let note = `Row ${i}: `;
      if (!found.length) note += `no zeros.`;
      else {
        if (hit0) note += `column 0 has a 0, so col0_zero = True. `;
        if (inner.length) note += `zero${inner.length === 1 ? "" : "s"} at column${inner.length === 1 ? "" : "s"} ${inner.join(", ")}: write 0 into matrix[${i}][0] (flag row ${i}) and matrix[0][${inner.join("], matrix[0][")}] (flag ${inner.length === 1 ? "that column" : "those columns"}).`;
      }
      steps.push({ line: "mark", note: note.trim(), view: view({ found, flags, col0: hit0 }) });
    }
    for (let i = 1; i < m && n > 1; i++) {
      const changed = [];
      for (let j = 1; j < n; j++) if ((mat[i][0] === 0 || mat[0][j] === 0) && mat[i][j] !== 0) {
        mat[i][j] = 0;
        changed.push([i, j]);
      }
      steps.push({
        line: "fill",
        note: `Inside, row ${i}: a cell becomes 0 if its row flag matrix[${i}][0] or its column flag matrix[0][j] is 0. ${changed.length ? `${changed.length} cell${changed.length === 1 ? "" : "s"} changed.` : "Nothing changes."}`,
        view: view({ changed }),
      });
    }
    if (m === 1 || n === 1) steps.push({ line: "fill", note: `Only one ${m === 1 ? "row" : "column"}, so there's no inside to fill: everything is in the flag row or column.`, view: view() });
    const r0 = mat[0][0] === 0;
    const c1 = [];
    if (r0) for (let j = 0; j < n; j++) if (mat[0][j] !== 0) {
      mat[0][j] = 0;
      c1.push([0, j]);
    }
    steps.push({
      line: "row0",
      note: r0 ? `matrix[0][0] is 0: row 0 had a zero, so all of row 0 becomes 0. This comes after the inside, which still needed the column flags in row 0.` : `matrix[0][0] isn't 0: row 0 had no zero, so it stays. Any 0 written into it as a column flag is right anyway: that whole column is zero.`,
      view: view({ changed: c1 }),
    });
    const c2 = [];
    if (col0) for (let i = 0; i < m; i++) if (mat[i][0] !== 0) {
      mat[i][0] = 0;
      c2.push([i, 0]);
    }
    steps.push({
      line: "col0",
      note: col0 ? `col0_zero is True: column 0 had a zero, so all of column 0 becomes 0. Last, because the inside and row 0 read its flags.` : `col0_zero is False: column 0 keeps its values.`,
      view: view({ changed: c2, col0 }),
    });
    steps.push({ line: "col0", note: `Done. Two passes over the matrix and O(1) extra space: the flags live inside the matrix.`, view: view({ final: true }) });
    return steps;
  },
});
