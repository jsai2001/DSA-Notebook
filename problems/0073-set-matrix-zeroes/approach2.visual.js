// Two passes: first only remember which rows and columns have a zero, then zero every cell in them.
DSAViz.register("0073-set-matrix-zeroes/approach2", {
  inputs: [{ name: "matrix", type: "int[][]", value: "[[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]", maxRows: 5, maxCols: 5, minValue: -99, maxValue: 99 }],
  trace({ matrix }) {
    const m = matrix.length;
    const n = matrix[0].length;
    if (matrix.some((r) => r.length !== n)) throw new DSAViz.InputError("every row must have the same length, like [[1, 0], [3, 4]].");
    const mat = matrix.map((r) => r.slice());
    const zr = Array(m).fill(false);
    const zc = Array(n).fill(false);
    const idx = (k) => [...Array(k).keys()];
    const steps = [];
    const show = (b) => (b ? "T" : "F");
    const view = (o = {}) => {
      const marks = {};
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) {
        if (o.pass === 2 && (zr[i] || zc[j]) && i <= (o.row ?? m)) marks[`${i},${j}`] = i === o.row ? "new" : "visited";
      }
      (o.found || []).forEach(([i, j]) => (marks[`${i},${j}`] = "active"));
      if (o.final) for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) marks[`${i},${j}`] = mat[i][j] === 0 ? "match" : "";
      const rm = {};
      const cm = {};
      zr.forEach((b, i) => b && (rm[i] = o.pass === 2 && i === o.row ? "new" : "match"));
      zc.forEach((b, j) => b && (cm[j] = "match"));
      return [
        { type: "grid", label: "matrix", rows: idx(m), cols: idx(n), cells: mat.map((r) => r.slice()), marks },
        { type: "array", label: "zero_rows (T = row has a zero)", values: zr.map(show), compact: true, marks: rm },
        { type: "array", label: "zero_cols (T = column has a zero)", values: zc.map(show), compact: true, marks: cm },
      ];
    };
    steps.push({ line: "init", note: `Two lists of flags, one per row and one per column. The first pass only reads; nothing is changed until all zeros are known.`, view: view() });
    for (let i = 0; i < m; i++) {
      const found = [];
      for (let j = 0; j < n; j++) if (mat[i][j] === 0) {
        zr[i] = zc[j] = true;
        found.push([i, j]);
      }
      steps.push({
        line: "mark",
        note: found.length ? `Row ${i}: zero${found.length === 1 ? "" : "s"} at column${found.length === 1 ? "" : "s"} ${found.map(([, j]) => j).join(", ")}. Flag row ${i} and ${found.length === 1 ? "that column" : "those columns"}.` : `Row ${i}: no zeros.`,
        view: view({ found }),
      });
    }
    for (let i = 0; i < m; i++) {
      let changed = 0;
      for (let j = 0; j < n; j++) if ((zr[i] || zc[j]) && mat[i][j] !== 0) {
        mat[i][j] = 0;
        changed++;
      }
      steps.push({
        line: "fill",
        note: zr[i] ? `Row ${i} is flagged: every cell becomes 0.` : changed ? `Row ${i} isn't flagged, but the flagged columns cross it: ${changed === 1 ? "1 cell becomes" : `${changed} cells become`} 0.` : `Row ${i}: nothing to change.`,
        view: view({ pass: 2, row: i }),
      });
    }
    steps.push({ line: "fill", note: `Done. Two passes over the matrix: O(m·n) time, O(m + n) extra space for the flags.`, view: view({ final: true }) });
    return steps;
  },
});
