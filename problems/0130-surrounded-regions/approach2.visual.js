// Start from the O's on the border and spread "safe"; every O that's still O at the end is trapped.
(function () {
DSAViz.register("0130-surrounded-regions/approach2", {
  inputs: [{ name: "board", label: "board (rows, comma-separated)", type: "string", value: "XXXXX, XOOXX, XXOXO, XOXOO, XOXXX", maxLength: 50, raw: true }],
  trace({ board }) {
    const b = parseBoard(board);
    const m = b.length;
    const n = b[0].length;
    const steps = [];
    const queue = [];
    const flipped = new Set();
    const view = (o = {}) => {
      const marks = {};
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (b[i][j] === "S") marks[`${i},${j}`] = "match";
      queue.forEach(([i, j]) => (marks[`${i},${j}`] = "new"));
      flipped.forEach((k) => (marks[k] = "compare"));
      if (o.at) marks[`${o.at[0]},${o.at[1]}`] = "active";
      return [
        {
          type: "grid",
          label: o.done ? "board after the last pass (yellow = flipped to X)" : "board (S = safe, green; yellow = in the queue)",
          rows: [...Array(m).keys()],
          cols: [...Array(n).keys()],
          corner: "r \\ c",
          cells: b.map((row) => [...row]),
          marks,
        },
        { type: "array", label: "queue (front → back)", values: queue.map(([i, j]) => `(${i}, ${j})`), wide: true, marks: queue.length ? { 0: "active" } : {} },
      ];
    };
    steps.push({ line: "init", note: "An O survives only if it connects to the border. So start at the border and mark everything reachable as safe (S).", view: view() });
    const seeds = [];
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if ((r === 0 || r === m - 1 || c === 0 || c === n - 1) && b[r][c] === "O") {
          b[r][c] = "S";
          queue.push([r, c]);
          seeds.push(`(${r}, ${c})`);
        }
      }
    }
    steps.push({
      line: "seed",
      note: seeds.length ? `The O's on the border are safe: ${seeds.join(", ")}. Mark them S and queue them.` : "No O on the border, so nothing is safe: every O will flip.",
      view: view(),
    });
    while (queue.length) {
      const [r, c] = queue.shift();
      const added = [];
      for (const [a, d] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) {
        if (a >= 0 && a < m && d >= 0 && d < n && b[a][d] === "O") {
          b[a][d] = "S";
          queue.push([a, d]);
          added.push(`(${a}, ${d})`);
        }
      }
      steps.push({
        line: ["pop", "spread"],
        note: added.length
          ? `Take (${r}, ${c}). Its O neighbor${added.length === 1 ? "" : "s"} ${added.join(", ")} ${added.length === 1 ? "is" : "are"} safe too: mark S when queued, so nothing is queued twice.`
          : `Take (${r}, ${c}). No O neighbors left to mark.`,
        view: view({ at: [r, c] }),
      });
    }
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (b[r][c] === "O") {
          b[r][c] = "X";
          flipped.add(`${r},${c}`);
        } else if (b[r][c] === "S") b[r][c] = "O";
      }
    }
    steps.push({
      line: "flip",
      note: `Last pass: every O still left was never reached from the border, so flip it to X (${flipped.size} cell${flipped.size === 1 ? "" : "s"}); turn S back into O. Each cell was handled a fixed number of times: O(m · n).`,
      view: view({ done: true }),
    });
    return steps;
  },
});

// Read the board: rows of X and O separated by commas, like "XXXX, XOOX".
function parseBoard(text) {
  const rows = text.split(",").map((r) => r.trim().toUpperCase()).filter(Boolean);
  if (!rows.length) throw new DSAViz.InputError("Type the rows separated by commas, like XXXX, XOOX, XXOX.");
  if (rows.length > 6) throw new DSAViz.InputError("Up to 6 rows here, so the steps stay readable.");
  if (rows.some((r) => !/^[XO]+$/.test(r))) throw new DSAViz.InputError("Use only the letters X and O.");
  if (rows.some((r) => r.length !== rows[0].length)) throw new DSAViz.InputError("Every row needs the same number of letters.");
  if (rows[0].length > 6) throw new DSAViz.InputError("Up to 6 columns here.");
  return rows.map((r) => [...r]);
}
})();
