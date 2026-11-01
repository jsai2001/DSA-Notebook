// Ring by ring: each cell on a ring's top side starts a cycle of four cells that move one corner clockwise.
DSAViz.register("0048-rotate-image/approach3", {
  inputs: [{ name: "matrix", type: "int[][]", value: "[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]", maxRows: 5, maxCols: 5, minValue: -99, maxValue: 99 }],
  trace({ matrix }) {
    const n = matrix.length;
    if (matrix.some((r) => r.length !== n)) throw new DSAViz.InputError("matrix must be square (n × n), like [[1, 2], [3, 4]].");
    const m = matrix.map((r) => r.slice());
    const steps = [];
    const idx = [...Array(n).keys()];
    const view = (opts = {}) => {
      const marks = {};
      if (opts.ring !== undefined) {
        const a = opts.ring;
        const b = n - 1 - a;
        for (let k = a; k <= b; k++) for (const c of [`${a},${k}`, `${b},${k}`, `${k},${a}`, `${k},${b}`]) marks[c] = "window";
      }
      if (opts.done) opts.done.forEach((c) => (marks[c] = "match"));
      if (opts.four) opts.four.forEach((c, k) => (marks[c] = k === opts.hot ? "new" : "active"));
      if (opts.final) idx.forEach((i) => idx.forEach((j) => (marks[`${i},${j}`] = "match")));
      return [
        { type: "grid", label: "matrix (shaded = the ring being turned)", rows: idx, cols: idx, cells: m.map((r) => r.slice()), marks },
        ...(opts.top !== undefined ? [{ type: "vars", items: [{ name: "top (saved)", value: opts.top }] }] : []),
      ];
    };

    steps.push({ line: "layer", note: `Turn the matrix one ring at a time, from the outside in. There are ${Math.floor(n / 2)} ring${Math.floor(n / 2) === 1 ? "" : "s"}${n % 2 ? `; the centre cell of an odd n stays put` : ""}.`, view: view() });
    const done = [];
    for (let layer = 0; layer < Math.floor(n / 2); layer++) {
      const first = layer;
      const last = n - 1 - layer;
      steps.push({ line: "layer", note: `Ring ${layer}: rows and columns ${first} to ${last}. Its top side has ${last - first} cell${last - first === 1 ? "" : "s"} that start a cycle (the last corner belongs to the right side).`, view: view({ ring: layer, done }) });
      for (let k = 0; k < last - first; k++) {
        const T = `${first},${first + k}`;
        const L = `${last - k},${first}`;
        const B = `${last},${last - k}`;
        const R = `${first + k},${last}`;
        const four = [T, R, B, L];
        const top = m[first][first + k];
        steps.push({ line: "cycle", note: `Cycle of four: top (${first},${first + k}), right (${first + k},${last}), bottom (${last},${last - k}), left (${last - k},${first}). Save top = ${top}.`, view: view({ ring: layer, done, four, top }) });
        m[first][first + k] = m[last - k][first];
        m[last - k][first] = m[last][last - k];
        m[last][last - k] = m[first + k][last];
        m[first + k][last] = top;
        done.push(...four);
        steps.push({
          line: "move",
          note: `Left → top, bottom → left, right → bottom, saved top → right. All four moved one corner clockwise, with just one spare variable.`,
          view: view({ ring: layer, done, four, top }),
        });
      }
    }
    steps.push({ line: "move", note: `Done: every cell was moved exactly once. O(n²) time, O(1) extra space, in one pass.`, view: view({ final: true }) });
    return steps;
  },
});
