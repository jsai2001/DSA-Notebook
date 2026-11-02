// Four boundaries close in: take the top row, right column, bottom row, left column, shrinking the rectangle each time.
DSAViz.register("0054-spiral-matrix/approach2", {
  inputs: [{ name: "matrix", type: "int[][]", value: "[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]", maxRows: 5, maxCols: 5, minValue: -99, maxValue: 99 }],
  trace({ matrix }) {
    const m = matrix.length;
    const n = matrix[0].length;
    if (matrix.some((r) => r.length !== n)) throw new DSAViz.InputError("every row must have the same length, like [[1, 2], [3, 4]].");
    let top = 0;
    let bottom = m - 1;
    let left = 0;
    let right = n - 1;
    const taken = new Set();
    const result = [];
    const steps = [];
    const view = (o = {}) => {
      const marks = {};
      for (let i = top; i <= bottom; i++) for (let j = left; j <= right; j++) marks[`${i},${j}`] = "window";
      taken.forEach((k) => (marks[k] = o.final ? "match" : "visited"));
      (o.side || []).forEach((k) => (marks[k] = "new"));
      const rm = {};
      for (let k = o.from ?? result.length; k < result.length; k++) rm[k] = "new";
      if (o.final) result.forEach((_, k) => (rm[k] = "match"));
      const hot = o.hot || [];
      return [
        { type: "grid", label: "matrix (outlined = rows top..bottom, columns left..right: not taken yet; grey = taken)", rows: [...Array(m).keys()], cols: [...Array(n).keys()], cells: matrix.map((r) => r.slice()), marks },
        {
          type: "vars",
          items: [
            { name: "top", value: top, mark: hot.includes("top") ? "new" : "" },
            { name: "bottom", value: bottom, mark: hot.includes("bottom") ? "new" : "" },
            { name: "left", value: left, mark: hot.includes("left") ? "new" : "" },
            { name: "right", value: right, mark: hot.includes("right") ? "new" : "" },
          ],
        },
        { type: "array", label: `result (${result.length} of ${m * n})`, values: result.slice(), compact: true, marks: rm },
      ];
    };
    // Take the cells in order and record them, returning their keys for highlighting.
    const take = (cells) => {
      cells.forEach(([i, j]) => {
        result.push(matrix[i][j]);
        taken.add(`${i},${j}`);
      });
      return cells.map(([i, j]) => `${i},${j}`);
    };
    const range = (a, b, step) => {
      const out = [];
      for (let x = a; step > 0 ? x <= b : x >= b; x += step) out.push(x);
      return out;
    };
    steps.push({ line: "init", note: `The outlined rectangle is what's not taken yet: rows ${top}..${bottom}, columns ${left}..${right}. Each side we take moves one boundary inward.`, view: view() });
    while (top <= bottom && left <= right) {
      steps.push({ line: "ring", note: `top ≤ bottom (${top} ≤ ${bottom}) and left ≤ right (${left} ≤ ${right}): cells remain, so walk another ring.`, view: view() });
      let from = result.length;
      let side = take(range(left, right, 1).map((j) => [top, j]));
      top++;
      steps.push({ line: "top", note: `Top row ${top - 1}, left to right: ${side.length} cell${side.length === 1 ? "" : "s"}. That row is done, so top becomes ${top}.`, view: view({ side, from, hot: ["top"] }) });
      from = result.length;
      side = take(range(top, bottom, 1).map((i) => [i, right]));
      right--;
      steps.push({
        line: "right",
        note: side.length
          ? `Right column ${right + 1}, rows ${top}..${bottom}: ${side.length} cell${side.length === 1 ? "" : "s"}. right becomes ${right}.`
          : `Right column: rows ${top}..${bottom} is empty (no rows left), so nothing is taken. right becomes ${right}.`,
        view: view({ side, from, hot: ["right"] }),
      });
      if (top <= bottom) {
        from = result.length;
        side = take(range(right, left, -1).map((j) => [bottom, j]));
        bottom--;
        steps.push({
          line: "bottom",
          note: `top ≤ bottom (${top} ≤ ${bottom + 1}), so a row remains. Bottom row ${bottom + 1}, right to left: ${side.length} cell${side.length === 1 ? "" : "s"}. bottom becomes ${bottom}.`,
          view: view({ side, from, hot: ["bottom"] }),
        });
      } else {
        steps.push({ line: "bottom", note: `top > bottom (${top} > ${bottom}): the only row left was the top row, already taken. Skip the bottom row, or it would be read again backwards.`, view: view() });
      }
      if (left <= right) {
        from = result.length;
        side = take(range(bottom, top, -1).map((i) => [i, left]));
        left++;
        steps.push({
          line: "left",
          note: side.length
            ? `left ≤ right (${left - 1} ≤ ${right}), so a column remains. Left column ${left - 1}, bottom to top: ${side.length} cell${side.length === 1 ? "" : "s"}. left becomes ${left}.`
            : `left ≤ right (${left - 1} ≤ ${right}), but rows ${top}..${bottom} is empty, so nothing is taken. left becomes ${left}.`,
          view: view({ side, from, hot: ["left"] }),
        });
      } else {
        steps.push({ line: "left", note: `left > right (${left} > ${right}): the only column left was the right column, already taken. Skip the left column, or it would be read again upwards.`, view: view() });
      }
    }
    steps.push({ line: "return", note: `The rectangle is empty (top > bottom or left > right). Every cell was read once: O(m·n) time and O(1) extra space besides the answer.`, view: view({ final: true }) });
    return steps;
  },
});
