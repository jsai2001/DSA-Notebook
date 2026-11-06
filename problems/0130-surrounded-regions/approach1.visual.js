// For every O, search (from scratch) whether it can reach the border; flip the ones that can't.
(function () {
DSAViz.register("0130-surrounded-regions/approach1", {
  inputs: [{ name: "board", label: "board (rows, comma-separated)", type: "string", value: "XXXXX, XOOXX, XXOXO, XOXOO, XOXXX", maxLength: 50, raw: true }],
  trace({ board }) {
    const b = parseBoard(board);
    const m = b.length;
    const n = b[0].length;
    const steps = [];
    const trapped = [];
    let searched = 0;
    const onBorder = (i, j) => i === 0 || i === m - 1 || j === 0 || j === n - 1;
    const view = (o = {}) => {
      const marks = {};
      trapped.forEach(([i, j]) => (marks[`${i},${j}`] = "compare"));
      (o.seen || []).forEach(([i, j]) => (marks[`${i},${j}`] = "window"));
      if (o.exit) marks[`${o.exit[0]},${o.exit[1]}`] = "match";
      if (o.at) marks[`${o.at[0]},${o.at[1]}`] = "active";
      return [
        {
          type: "grid",
          label: o.done ? "board after flipping" : "board (outlined = searched from this O, green = border reached, yellow = trapped)",
          rows: [...Array(m).keys()],
          cols: [...Array(n).keys()],
          corner: "r \\ c",
          cells: b.map((row) => [...row]),
          marks,
        },
        { type: "vars", items: [{ name: "trapped", value: trapped.length }, { name: "cells searched so far", value: searched, mark: o.counted ? "new" : "" }] },
      ];
    };
    steps.push({ line: "init", note: "Check every O on its own: can it reach the border by moving through other O's?", view: view() });
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (b[r][c] !== "O") continue;
        const seen = [[r, c]];
        const key = new Set([`${r},${c}`]);
        const stack = [[r, c]];
        let exit = null;
        while (stack.length) {
          const [i, j] = stack.pop();
          searched++;
          if (onBorder(i, j)) {
            exit = [i, j];
            break;
          }
          for (const [a, d] of [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]]) {
            if (b[a][d] === "O" && !key.has(`${a},${d}`)) {
              key.add(`${a},${d}`);
              seen.push([a, d]);
              stack.push([a, d]);
            }
          }
        }
        if (exit) {
          steps.push({
            line: ["loop", "search", "border"],
            note: exit[0] === r && exit[1] === c ? `(${r}, ${c}) is on the border itself: it stays O.` : `From (${r}, ${c}), the search reaches the border at (${exit[0]}, ${exit[1]}): it stays O.`,
            view: view({ at: [r, c], seen, exit, counted: true }),
          });
        } else {
          trapped.push([r, c]);
          steps.push({
            line: ["loop", "search", "trapped"],
            note: `From (${r}, ${c}), all ${seen.length} connected O${seen.length === 1 ? "" : "'s"} were searched and none is on the border: trapped.`,
            view: view({ at: [r, c], seen, counted: true }),
          });
        }
      }
    }
    trapped.forEach(([i, j]) => (b[i][j] = "X"));
    steps.push({
      line: "flip",
      note: trapped.length
        ? `Flip the ${trapped.length} trapped cell${trapped.length === 1 ? "" : "s"} to X. Done: ${searched} cells searched in all, because every O in a region searches that region again.`
        : `Nothing is trapped; the board stays the same. ${searched} cells searched in all.`,
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
