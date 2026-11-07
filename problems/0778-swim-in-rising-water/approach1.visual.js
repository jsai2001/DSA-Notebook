// Binary search the time t: for each guess, flood from (0, 0) through cells <= t and see if the far corner is reached.
(function () {
DSAViz.register("0778-swim-in-rising-water/approach1", {
  inputs: [{ name: "grid", type: "int[][]", value: "[[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]", maxRows: 5, maxCols: 5, minValue: 0, maxValue: 24 }],
  trace({ grid }) {
    const n = check(grid);
    let lo = grid[0][0], hi = n * n - 1;
    const steps = [{ line: "init", note: `The answer is between grid[0][0] = ${lo} and n·n − 1 = ${hi}.`, view: [gv(grid, {}, "grid (heights)"), { type: "vars", items: [{ name: "lo", value: lo }, { name: "hi", value: hi }] }] }];
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      const seen = flood(grid, mid);
      const ok = seen.has(`${n - 1},${n - 1}`);
      const marks = {};
      grid.forEach((r, i) => r.forEach((v, j) => { if (seen.has(`${i},${j}`)) marks[`${i},${j}`] = "match"; else if (v <= mid) marks[`${i},${j}`] = "compare"; }));
      if (!ok) marks[`${n - 1},${n - 1}`] = "cut";
      steps.push({ line: ["search", "test", ok ? "yes" : "no"], note: `Try t = ${mid}: flood from (0, 0) through cells ≤ ${mid}. ${ok ? `The far corner is reached: t = ${mid} works, so hi = ${mid}.` : `The far corner isn't reached: too early, so lo = ${mid + 1}.`}`, view: [gv(grid, marks, `cells at time ${mid} (green = reached, yellow = under water but cut off, red = the corner, not reached)`), { type: "vars", items: [{ name: "lo", value: ok ? lo : mid + 1 }, { name: "hi", value: ok ? mid : hi }, { name: "t", value: mid, mark: ok ? "match" : "cut" }] }] });
      if (ok) hi = mid; else lo = mid + 1;
    }
    steps.push({ line: "return", note: `Return ${lo}. lo = hi: the smallest time that works. log₂(n²) floods of O(n²) each: O(n² log n).`, view: [gv(grid, Object.fromEntries([...flood(grid, lo)].map((k) => [k, "match"])), `cells reached at time ${lo}`)] });
    return steps;
  },
});

function check(grid) {
  const n = grid.length;
  if (grid.some((r) => r.length !== n)) throw new DSAViz.InputError("The grid must be square (n × n).");
  const flat = grid.flat();
  if (new Set(flat).size !== n * n || flat.some((v) => v < 0 || v >= n * n)) throw new DSAViz.InputError(`The heights must be 0 to ${n * n - 1}, each exactly once.`);
  return n;
}
const gv = (grid, marks, label) => ({ type: "grid", label, rows: grid.map((_, k) => k), cols: grid[0].map((_, k) => k), corner: "r \\ c", cells: grid.map((r) => r.map(String)), marks });
const flood = (grid, t) => {
  const n = grid.length, seen = new Set();
  if (grid[0][0] > t) return seen;
  const st = [[0, 0]]; seen.add("0,0");
  while (st.length) { const [r, c] = st.pop(); for (const [x, y] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) if (x >= 0 && y >= 0 && x < n && y < n && !seen.has(`${x},${y}`) && grid[x][y] <= t) { seen.add(`${x},${y}`); st.push([x, y]); } }
  return seen;
};
})();
