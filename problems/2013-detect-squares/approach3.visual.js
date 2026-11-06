// By column: a stored point above or below the query fixes the side; check the square on the right and on the left.
DSAViz.register("2013-detect-squares/approach3", {
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

    const ys = [...new Set(points.filter(([x]) => x === qx).map(([, y]) => y))]; // distinct y's in the query's column, in the order added
    if (!ys.length) steps.push({ line: "side", note: `No stored point in column x = ${qx}, so no square can have a side going up or down from the query.`, view: view() });
    for (const y2 of ys) {
      if (y2 === qy) {
        steps.push({ line: "side", note: `${pt(qx, y2)} is the query's own spot: side 0, not a square. Skip.`, view: view({ cut: [[qx, y2]] }) });
        continue;
      }
      const d = y2 - qy;
      steps.push({ line: "side", note: `${pt(qx, y2)} (×${get(qx, y2)}) is straight ${d > 0 ? "above" : "below"} the query: side ${Math.abs(d)}. The square is to the right (x = ${qx + Math.abs(d)}) or to the left (x = ${qx - Math.abs(d)}).`, view: view({ corners: [[qx, y2]] }) });
      for (const x2 of [qx + d, qx - d]) {
        const a = get(qx, y2), b = get(x2, qy), c = get(x2, y2);
        const add = a * b * c;
        total += add;
        steps.push({
          line: ["corner", "sum"],
          note: `${x2 > qx ? "Right" : "Left"} square: ${pt(x2, qy)} ×${b}, ${pt(x2, y2)} ×${c}${x2 < 0 || x2 > 6 ? " (off the board)" : ""}. ${a} × ${b} × ${c} = ${add}. total = ${total}.`,
          view: view({ corners: [[qx, y2], [x2, qy], [x2, y2]], hit: add > 0, grew: add > 0 }),
        });
      }
    }
    steps.push({ line: "return", note: `Return ${total}.`, view: view() });
    return steps;
  },
});
