// Bottom-up with one row: going left to right, row[c] (the cell above) += row[c - 1] (the cell to the left).
DSAViz.register("0062-unique-paths/approach2", {
  inputs: [
    { name: "m", type: "int", value: "3", min: 1, max: 6 },
    { name: "n", type: "int", value: "7", min: 1, max: 7 },
  ],
  trace({ m, n }) {
    const done = Array.from({ length: m }, () => Array(n).fill(""));
    const row = Array(n).fill(1);
    done[0] = row.slice();
    const steps = [];
    const view = (r, c, o = {}) => {
      const marks = {};
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (done[i][j] !== "") marks[`${i},${j}`] = "visited";
      if (r !== undefined) {
        for (let j = 0; j < n; j++) marks[`${r},${j}`] = done[r][j] !== "" ? "window" : marks[`${r},${j}`];
        if (c !== undefined) {
          if (r > 0) marks[`${r - 1},${c}`] = "compare";
          if (c > 0) marks[`${r},${c - 1}`] = "compare";
          marks[`${r},${c}`] = "new";
        }
      }
      if (o.final) marks[`${m - 1},${n - 1}`] = "match";
      const am = {};
      if (c !== undefined) {
        am[c] = "new";
        if (c > 0) am[c - 1] = "compare";
      }
      if (o.final) am[n - 1] = "match";
      return [
        { type: "grid", label: "the grid (each cell: paths from the top-left corner)", rows: [...Array(m).keys()], cols: [...Array(n).keys()], cells: done.map((x) => x.slice()), marks },
        { type: "array", label: r !== undefined ? `row: the one array the code keeps (now row ${r})` : "row: the one array the code keeps", values: row.slice(), marks: am },
      ];
    };
    steps.push({ line: "init", note: `The top row is all 1s: you can only get there by moving right. The code keeps just one row of ${n === 1 ? "1 number" : `${n} numbers`} and rewrites it for each row below.`, view: view(0) });
    for (let r = 1; r < m; r++) {
      done[r][0] = 1;
      steps.push({ line: "row", note: `Row ${r}. Column 0 stays 1 (only straight down gets there), so row[0] needs no change.`, view: view(r) });
      for (let c = 1; c < n; c++) {
        const above = row[c];
        row[c] += row[c - 1];
        done[r][c] = row[c];
        steps.push({
          line: "cell",
          note: `(${r}, ${c}): row[${c}] still holds the cell above (${above}); row[${c - 1}] was just updated, so it's the cell to the left (${row[c - 1]}). row[${c}] = ${above} + ${row[c - 1]} = ${row[c]}.`,
          view: view(r, c),
        });
      }
    }
    steps.push({
      line: "answer",
      note: `row[${n - 1}] = ${row[n - 1]}: the paths to the bottom-right corner. O(m·n) time, and only O(n) space for the row.`,
      view: view(undefined, undefined, { final: true }),
    });
    return steps;
  },
});
