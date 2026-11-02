// Peel and turn: take the whole first row, then rotate what's left counter-clockwise so the next side is on top.
DSAViz.register("0054-spiral-matrix/approach3", {
  inputs: [{ name: "matrix", type: "int[][]", value: "[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]", maxRows: 5, maxCols: 5, minValue: -99, maxValue: 99 }],
  trace({ matrix }) {
    const m = matrix.length;
    const n = matrix[0].length;
    if (matrix.some((r) => r.length !== n)) throw new DSAViz.InputError("every row must have the same length, like [[1, 2], [3, 4]].");
    // Keep the original position of every value, so the original matrix can show what's been taken.
    let rest = matrix.map((row, i) => row.map((v, j) => ({ v, at: `${i},${j}` })));
    const taken = new Set();
    const result = [];
    const steps = [];
    let copied = 0;
    const view = (o = {}) => {
      const marks = {};
      taken.forEach((k) => (marks[k] = o.final ? "match" : "visited"));
      (o.row || []).forEach((k) => (marks[k] = "new"));
      const rm = {};
      for (let k = o.from ?? result.length; k < result.length; k++) rm[k] = "new";
      if (o.final) result.forEach((_, k) => (rm[k] = "match"));
      const widgets = [{ type: "grid", label: "original matrix (grey = taken)", rows: [...Array(m).keys()], cols: [...Array(n).keys()], cells: matrix.map((r) => r.slice()), marks }];
      if (rest.length) {
        const rmarks = {};
        if (o.top) rest[0].forEach((_, j) => (rmarks[`0,${j}`] = "active"));
        widgets.push({
          type: "grid",
          label: `matrix now: ${rest.length} × ${rest[0].length} (what's left, turned)`,
          rows: [...Array(rest.length).keys()],
          cols: [...Array(rest[0].length).keys()],
          cells: rest.map((r) => r.map((x) => x.v)),
          marks: rmarks,
        });
      }
      widgets.push({ type: "vars", items: [{ name: "values copied by the rotations", value: copied }] });
      widgets.push({ type: "array", label: `result (${result.length} of ${m * n})`, values: result.slice(), compact: true, marks: rm });
      return widgets;
    };
    steps.push({ line: "init", note: `Work on a copy, so the caller's matrix isn't changed. Its first row is always the next stretch of the spiral.`, view: view({ top: true }) });
    while (rest.length) {
      const first = rest.shift();
      const from = result.length;
      first.forEach((x) => {
        result.push(x.v);
        taken.add(x.at);
      });
      const row = first.map((x) => x.at);
      if (!rest.length) {
        steps.push({ line: "peel", note: `Take the first row: ${first.map((x) => x.v).join(", ")}. Nothing is left, so the loop ends.`, view: view({ row, from }) });
        break;
      }
      steps.push({ line: "peel", note: `Take the whole first row: ${first.map((x) => x.v).join(", ")}. ${rest.length} × ${rest[0].length} cells remain.`, view: view({ row, from }) });
      const rows = rest.length;
      const cols = rest[0].length;
      const turned = [];
      for (let i = 0; i < cols; i++) {
        turned.push([]);
        for (let j = 0; j < rows; j++) turned[i].push(rest[j][cols - 1 - i]);
      }
      rest = turned;
      copied += rows * cols;
      steps.push({
        line: "rotate",
        note: `Turn the rest a quarter counter-clockwise (${rows} × ${cols} becomes ${cols} × ${rows}). Its right column is now the first row, in top-to-bottom order: exactly the spiral's next side. That copied ${rows * cols} values.`,
        view: view({ top: true }),
      });
    }
    steps.push({
      line: "return",
      note: `Done. Short to write, but each turn copies everything that's left: ${copied} copies here on top of the ${m * n} values taken. About O(m·n·min(m, n)) time in total.`,
      view: view({ final: true }),
    });
    return steps;
  },
});
