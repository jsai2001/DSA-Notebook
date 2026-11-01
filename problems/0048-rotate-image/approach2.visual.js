// Transpose (swap across the main diagonal), then reverse every row: together that's a clockwise turn.
DSAViz.register("0048-rotate-image/approach2", {
  inputs: [{ name: "matrix", type: "int[][]", value: "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]", maxRows: 5, maxCols: 5, minValue: -99, maxValue: 99 }],
  trace({ matrix }) {
    const n = matrix.length;
    if (matrix.some((r) => r.length !== n)) throw new DSAViz.InputError("matrix must be square (n × n), like [[1, 2], [3, 4]].");
    const m = matrix.map((r) => r.slice());
    const steps = [];
    const idx = [...Array(n).keys()];
    const view = (opts = {}) => {
      const marks = {};
      if (opts.diag) idx.forEach((k) => (marks[`${k},${k}`] = "visited"));
      (opts.cells || []).forEach((c) => (marks[c] = opts.mark || "new"));
      if (opts.final) idx.forEach((i) => idx.forEach((j) => (marks[`${i},${j}`] = "match")));
      return [{ type: "grid", label: opts.label || "matrix", rows: idx, cols: idx, cells: m.map((r) => r.slice()), marks }];
    };

    steps.push({ line: "transpose", note: "Step 1, transpose: swap matrix[i][j] with matrix[j][i] above the main diagonal (grey). The diagonal stays where it is.", view: view({ diag: true }) });
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        [m[i][j], m[j][i]] = [m[j][i], m[i][j]];
        steps.push({ line: "transpose", note: `Swap matrix[${i}][${j}] and matrix[${j}][${i}] (${m[j][i]} ↔ ${m[i][j]}).`, view: view({ diag: true, cells: [`${i},${j}`, `${j},${i}`] }) });
      }
    }
    steps.push({ line: "transpose", note: "Transposed: rows became columns. Only pairs above the diagonal were swapped; looping over every j would swap each pair twice and undo it.", view: view({ label: "matrix (transposed)", diag: true }) });
    for (let i = 0; i < n; i++) {
      m[i].reverse();
      steps.push({
        line: "reverse",
        note: `Step 2: reverse row ${i}: [${m[i].join(", ")}].`,
        view: view({ cells: idx.map((j) => `${i},${j}`) }),
      });
    }
    steps.push({ line: "reverse", note: "Done: that's the matrix turned 90° clockwise, in place. Each cell moved twice; O(n²) time, O(1) extra space.", view: view({ final: true }) });
    return steps;
  },
});
