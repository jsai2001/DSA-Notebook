// Copy into a second grid: matrix[i][j] goes to rotated[j][n - 1 - i]; then copy the rows back.
DSAViz.register("0048-rotate-image/approach1", {
  inputs: [{ name: "matrix", type: "int[][]", value: "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]", maxRows: 5, maxCols: 5, minValue: -99, maxValue: 99 }],
  trace({ matrix }) {
    const n = matrix.length;
    if (matrix.some((r) => r.length !== n)) throw new DSAViz.InputError("matrix must be square (n × n), like [[1, 2], [3, 4]].");
    const m = matrix.map((r) => r.slice());
    const rotated = m.map((r) => r.map(() => ""));
    const steps = [];
    const idx = [...Array(n).keys()];
    const view = (opts = {}) => [
      { type: "grid", label: "matrix", rows: idx, cols: idx, cells: m.map((r) => r.slice()), marks: opts.src ? { [opts.src]: "active" } : opts.final ? Object.fromEntries(idx.flatMap((i) => idx.map((j) => [`${i},${j}`, "match"]))) : {} },
      { type: "grid", label: "rotated (extra n × n grid)", rows: idx, cols: idx, cells: rotated.map((r) => r.slice()), marks: opts.dst ? { [opts.dst]: "new" } : {} },
    ];

    steps.push({ line: "init", note: `Make a second ${n} × ${n} grid. Rotating clockwise, row i becomes column n − 1 − i: matrix[i][j] goes to rotated[j][${n - 1} − i].`, view: view() });
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        rotated[j][n - 1 - i] = m[i][j];
        steps.push({
          line: "copy",
          note: `matrix[${i}][${j}] = ${m[i][j]} → rotated[${j}][${n - 1 - i}].${j === n - 1 ? ` Row ${i} is now column ${n - 1 - i}.` : ""}`,
          view: view({ src: `${i},${j}`, dst: `${j},${n - 1 - i}` }),
        });
      }
    }
    rotated.forEach((r, i) => (m[i] = r.slice()));
    steps.push({
      line: "back",
      note: `Copy the rows back into matrix, since the answer must be in matrix itself. Simple, but it used a whole second grid: O(n²) extra space, which the problem doesn't allow.`,
      view: view({ final: true }),
    });
    return steps;
  },
});
