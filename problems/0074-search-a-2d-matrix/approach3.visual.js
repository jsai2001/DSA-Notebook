// Read row by row, the matrix is one sorted list; binary search it, turning a position into (pos // n, pos % n).
DSAViz.register("0074-search-a-2d-matrix/approach3", {
  inputs: [
    { name: "matrix", type: "int[][]", value: "[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]", maxRows: 5, maxCols: 5, minValue: -99, maxValue: 99 },
    { name: "target", type: "int", value: "34", min: -99, max: 99 },
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
    let lo = 0;
    let hi = m * n - 1;
    let looked = 0;
    const view = (mid, o = {}) => {
      const gm = {};
      const fm = {};
      for (let k = 0; k < m * n; k++) {
        const key = `${Math.floor(k / n)},${k % n}`;
        const inside = k >= lo && k <= hi;
        gm[key] = inside ? "window" : "visited";
        fm[k] = inside ? "window" : "visited";
      }
      if (mid !== undefined) {
        gm[`${Math.floor(mid / n)},${mid % n}`] = o.hit ? "match" : "active";
        fm[mid] = o.hit ? "match" : "active";
      }
      const pointers = {};
      const add = (name, k) => {
        if (k < 0 || k >= m * n) return;
        const key = Object.keys(pointers).find((x) => pointers[x] === k);
        if (key) {
          delete pointers[key];
          pointers[`${key}, ${name}`] = k;
        } else pointers[name] = k;
      };
      if (lo <= hi) {
        add("lo", lo);
        if (mid !== undefined) add("mid", mid);
        add("hi", hi);
      }
      return [
        { type: "array", label: "the matrix read row by row (outlined = the range searched this step)", values: flat, compact: true, marks: fm, pointers },
        { type: "grid", label: "the same cells in the matrix", rows: idx(m), cols: idx(n), cells: matrix.map((x) => x.slice()), marks: gm },
        { type: "vars", items: [{ name: "lo", value: o.after ? o.after[0] : lo, mark: o.after && o.after[0] !== lo ? "new" : "" }, { name: "hi", value: o.after ? o.after[1] : hi, mark: o.after && o.after[1] !== hi ? "new" : "" }, { name: "cells looked at", value: looked }] },
      ];
    };
    steps.push({
      line: "init",
      note: `Each row starts above the previous row's end, so read row by row the ${m * n === 1 ? "single value is a sorted list" : `${m * n} values are one sorted list`}. Binary search positions 0 … ${m * n - 1}.`,
      view: view(undefined),
    });
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const r = Math.floor(mid / n);
      const c = mid % n;
      const v = matrix[r][c];
      looked++;
      if (v === target) {
        steps.push({ line: ["loop", "found"], note: `mid = ${mid} → row ${mid} ÷ ${n} = ${r}, column ${mid} mod ${n} = ${c}: matrix[${r}][${c}] = ${v}. Found it. Return true.`, view: view(mid, { hit: true }) });
        return steps;
      }
      const before = [lo, hi];
      if (v < target) lo = mid + 1;
      else hi = mid - 1;
      steps.push({
        line: v < target ? ["loop", "found", "right"] : ["loop", "found", "right", "left"],
        note: `mid = ${mid} → (${r}, ${c}) = ${v}. ${v < target ? `${v} < ${target}: the target is after it, lo = ${lo}.` : `${v} > ${target}: the target is before it, hi = ${hi}.`} ${hi - lo + 1 > 0 ? `${hi - lo + 1} position${hi - lo + 1 === 1 ? "" : "s"} left.` : ""}`.trim(),
        view: (() => {
          const now = [lo, hi];
          [lo, hi] = before;
          const w = view(mid, { after: now });
          [lo, hi] = now;
          return w;
        })(),
      });
    }
    steps.push({
      line: ["loop", "return"],
      note: `lo = ${lo} > hi = ${hi}: no positions left, so ${target} isn't in the matrix. Return false. ${looked} cell${looked === 1 ? "" : "s"} looked at for ${m * n}: O(log(m·n)).`,
      view: view(undefined),
    });
    return steps;
  },
});
