// Union-Find: join neighboring O's into groups, and join border O's with one extra "border" node.
(function () {
DSAViz.register("0130-surrounded-regions/approach3", {
  inputs: [{ name: "board", label: "board (rows, comma-separated)", type: "string", value: "XXXXX, XOOXX, XXOXO, XOXOO, XOXXX", maxLength: 50, raw: true }],
  trace({ board }) {
    const b = parseBoard(board);
    const m = b.length;
    const n = b[0].length;
    const steps = [];
    const BORDER = m * n;
    const parent = [...Array(m * n + 1).keys()];
    const find = (x) => {
      while (parent[x] !== x) {
        parent[x] = parent[parent[x]];
        x = parent[x];
      }
      return x;
    };
    let unions = 0;
    const union = (a, d) => {
      const ra = find(a);
      const rd = find(d);
      if (ra !== rd) {
        parent[ra] = rd;
        unions++;
      }
    };
    const flipped = new Set();
    const view = (o = {}) => {
      const marks = {};
      const br = find(BORDER);
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (b[i][j] === "O" && find(i * n + j) === br) marks[`${i},${j}`] = "match";
      flipped.forEach((k) => (marks[k] = "compare"));
      (o.joined || []).forEach(([i, j]) => (marks[`${i},${j}`] = marks[`${i},${j}`] === "match" ? "match" : "window"));
      if (o.at) marks[`${o.at[0]},${o.at[1]}`] = "active";
      return [
        {
          type: "grid",
          label: o.done ? "board after flipping (yellow = flipped to X)" : "board (green = in the border's group, outlined = just joined)",
          rows: [...Array(m).keys()],
          cols: [...Array(n).keys()],
          corner: "r \\ c",
          cells: b.map((row) => [...row]),
          marks,
        },
        { type: "vars", items: [{ name: "groups joined", value: unions }] },
      ];
    };
    steps.push({
      line: "init",
      note: `Every cell starts as its own group (cell r · ${n} + c), plus one extra node, BORDER = ${BORDER}. Joining all border O's to BORDER means "connected to the border" = "in BORDER's group".`,
      view: view(),
    });
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (b[r][c] !== "O") continue;
        const parts = [];
        const joined = [];
        const line = ["loop"];
        if (r === 0 || r === m - 1 || c === 0 || c === n - 1) {
          union(r * n + c, BORDER);
          parts.push("it's on the border, so join it with BORDER");
          line.push("border");
        }
        if (r + 1 < m && b[r + 1][c] === "O") {
          union(r * n + c, (r + 1) * n + c);
          parts.push(`join with the O below, (${r + 1}, ${c})`);
          joined.push([r + 1, c]);
        }
        if (c + 1 < n && b[r][c + 1] === "O") {
          union(r * n + c, r * n + c + 1);
          parts.push(`join with the O to the right, (${r}, ${c + 1})`);
          joined.push([r, c + 1]);
        }
        if (joined.length) line.push("join");
        steps.push({
          line,
          note: `(${r}, ${c}) is O: ${parts.length ? parts.join("; ") : "no O below or to the right, and not on the border"}.`,
          view: view({ at: [r, c], joined }),
        });
      }
    }
    const br = find(BORDER);
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (b[r][c] === "O" && find(r * n + c) !== br) {
          b[r][c] = "X";
          flipped.add(`${r},${c}`);
        }
      }
    }
    steps.push({
      line: "flip",
      note: `Flip every O that isn't in BORDER's group (${flipped.size} cell${flipped.size === 1 ? "" : "s"}). With path halving, each find is close to O(1), so this is about O(m · n).`,
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
