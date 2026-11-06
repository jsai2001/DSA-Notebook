// List of points: try every stored point (repeats too) as the opposite corner, and scan the list for the other two.
DSAViz.register("2013-detect-squares/approach1", {
  inputs: [
    { name: "points", type: "int[][]", value: "[[1, 4], [4, 1], [1, 1], [4, 1]]", maxRows: 8, maxCols: 2, minValue: 0, maxValue: 6 },
    { name: "query", type: "int[]", value: "[4, 4]", minLength: 2, maxLength: 2, minValue: 0, maxValue: 6 },
  ],
  trace({ points, query }) {
    if (points.some((p) => p.length !== 2)) throw new DSAViz.InputError("points: each point is [x, y], like [[1, 4], [4, 1]].");
    const [qx, qy] = query;
    const B = Math.max(3, qx, qy, ...points.flat()); // board 0..B
    const cnt = {};
    const key = (x, y) => `${x},${y}`;
    const get = (x, y) => cnt[key(x, y)] || 0;
    const list = []; // as added, repeats included
    let total = 0;
    let querying = false;
    const steps = [];
    const pt = (x, y) => `(${x}, ${y})`;
    const view = (o = {}) => {
      const rows = [];
      for (let y = B; y >= 0; y--) rows.push(y);
      const cols = Array.from({ length: B + 1 }, (_, x) => x);
      const marks = {};
      const cells = rows.map((y, ri) =>
        cols.map((x) => {
          const c = get(x, y);
          if (c) marks[`${ri},${x}`] = "visited";
          if (querying && x === qx && y === qy) return c ? `Q +${c}` : "Q";
          return c ? (c > 1 ? `•×${c}` : "•") : "";
        })
      );
      const at = (x, y, m) => {
        if (x >= 0 && x <= B && y >= 0 && y <= B) marks[`${B - y},${x}`] = m;
      };
      (o.cut || []).forEach(([x, y]) => at(x, y, "cut"));
      (o.corners || []).forEach(([x, y]) => at(x, y, o.hit ? "match" : "compare"));
      if (o.added) at(o.added[0], o.added[1], "new");
      if (querying) at(qx, qy, "active");
      return [
        { type: "grid", label: querying ? "board (• = stored point, ×2 = added twice; Q = the query)" : "board (• = stored point, ×2 = added twice)", rows, cols, corner: "y \\ x", cells, marks },
        { type: "array", label: "points, as added", values: list.map(([x, y]) => pt(x, y)), wide: true, marks: o.listAt !== undefined ? { [o.listAt]: o.listMark || "active" } : {} },
        { type: "vars", items: [...(querying ? [{ name: "query", value: pt(qx, qy) }, { name: "total", value: total, mark: o.grew ? "new" : "" }] : [{ name: "points stored", value: list.length }])] },
      ];
    };
    steps.push({ line: "init", note: "Start empty. Add the points, then count the squares that have the query as one corner.", view: view() });
    for (const [x, y] of points) {
      list.push([x, y]);
      cnt[key(x, y)] = get(x, y) + 1;
      steps.push({ line: "add", note: `add(${pt(x, y)}).${get(x, y) > 1 ? ` That point now has ${get(x, y)} copies; each one can be a corner on its own.` : ""}`, view: view({ added: [x, y], listAt: list.length - 1, listMark: "new" }) });
    }
    querying = true;
    steps.push({ line: "count", note: `count(${pt(qx, qy)}): total = 0.`, view: view() });

    for (const [k, [px, py]] of list.entries()) {
      const n = 1;
      if (px === qx || Math.abs(px - qx) !== Math.abs(py - qy)) {
        steps.push({ line: "diag", note: `${pt(px, py)}: ${px === qx ? "same column as the query" : `x differs by ${Math.abs(px - qx)}, y by ${Math.abs(py - qy)}`}, so it can't be the opposite corner of a square.`, view: view({ cut: [[px, py]], listAt: k, listMark: "cut" }) });
        continue;
      }
      const a = list.filter(([x, y]) => x === qx && y === py).length, b = list.filter(([x, y]) => x === px && y === qy).length;
      const add = n * a * b;
      total += add;
      steps.push({
        line: ["corner", "sum"],
        note: `${pt(px, py)} is on a diagonal of the query (side ${Math.abs(px - qx)}). The other corners: ${pt(qx, py)} ×${a} and ${pt(px, qy)} ×${b}. ${n > 1 ? `${n} copies of it: ` : ""}${n > 1 ? `${n} × ` : ""}${a} × ${b} = ${add}${add ? "" : " (a corner is missing)"}. total = ${total}.`,
        view: view({ corners: [[px, py], [qx, py], [px, qy]], hit: add > 0, grew: add > 0, listAt: k }),
      });
    }
    steps.push({ line: "return", note: `Return ${total}.`, view: view() });
    return steps;
  },
});
