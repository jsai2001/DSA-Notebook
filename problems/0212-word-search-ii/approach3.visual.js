// Same trie DFS, plus pruning: a branch whose words are all found is cut, so it's never walked again.
(function () {
DSAViz.register("0212-word-search-ii/approach3", {
  inputs: [
    { name: "board", type: "string", value: "oaan etae ihkr iflv", maxLength: 24 },
    { name: "words", type: "string", value: "oath pea eat rain", maxLength: 48 },
  ],
  trace({ board, words }) {
    return trieTrace(board, words, true);
  },
});

function parse(boardText, wordsText) {
  const rows = boardText.trim().split(/[\s,]+/).filter(Boolean);
  if (!rows.length || rows.some((r) => !/^[a-z]+$/.test(r))) throw new DSAViz.InputError("board: rows of lowercase letters separated by spaces, like oaan etae ihkr iflv.");
  if (rows.some((r) => r.length !== rows[0].length)) throw new DSAViz.InputError("board: every row needs the same number of letters.");
  if (rows.length > 4 || rows[0].length > 4) throw new DSAViz.InputError("board: at most 4 rows of 4 letters here, so the steps stay readable.");
  const words = wordsText.trim().split(/[\s,]+/).filter(Boolean);
  if (!words.length || words.some((w) => !/^[a-z]+$/.test(w))) throw new DSAViz.InputError("words: lowercase words separated by spaces, like oath pea eat rain.");
  if (words.length > 6 || words.some((w) => w.length > 6)) throw new DSAViz.InputError("words: at most 6 words of up to 6 letters here.");
  if (new Set(words).size !== words.length) throw new DSAViz.InputError("words: each word once (LeetCode's words are unique).");
  return { board: rows.map((r) => [...r]), words };
}
function boardView(board, path, label, o = {}) {
  const marks = {};
  path.forEach(([r, c]) => (marks[`${r},${c}`] = o.found ? "match" : "visited"));
  if (path.length && !o.found) { const [r, c] = path[path.length - 1]; marks[`${r},${c}`] = "active"; }
  if (o.bad) marks[`${o.bad[0]},${o.bad[1]}`] = "cut";
  return { type: "grid", label, rows: board.map((_, k) => k), cols: board[0].map((_, k) => k), corner: "r \\ c", cells: board.map((row) => row.slice()), marks };
}
// Trie DFS from every cell; prune = cut branches whose words are all found.
function trieTrace(boardText, wordsText, prune) {
  const { board, words } = parse(boardText, wordsText);
  const R = board.length, C = board[0].length;
  const steps = [];
  const MAX = 180;
  let hidden = 0;
  const root = { kids: new Map(), word: null };
  for (const w of words) { let n = root; for (const ch of w) { if (!n.kids.has(ch)) n.kids.set(ch, { kids: new Map(), word: null }); n = n.kids.get(ch); } n.word = w; }
  const res = [];
  const path = [];
  let calls = 0;
  const rowsOf = () => { const out = []; const go = (n, p) => { if (p) out.push([`"${p}"`, `${[...n.kids.keys()].join(", ") || "none"}${n.word ? `  ✓ ${n.word}` : ""}`]); for (const [ch, k] of n.kids) go(k, p + ch); }; out.push(["(root)", [...root.kids.keys()].join(", ") || "none"]); for (const [ch, k] of root.kids) go(k, ch); return out; };
  const view = (o = {}) => [
    boardView(board, path, "board (\"#\" = on the path, as in the code; dark = the path's last cell, green = a word found)", o),
    { type: "map", label: prune ? "trie (shrinks as branches are cut)" : "trie (✓ = a word ends here)", columns: ["node", "children"], entries: rowsOf(), marks: o.node ? { [o.node]: o.found ? "match" : "active" } : {} },
    { type: "array", label: "found", values: res.slice(), wide: true, marks: o.found ? { [res.length - 1]: "new" } : {} },
  ];
  const push = (s) => { if (steps.length < MAX) steps.push(s); else hidden++; };
  push({ line: "init", note: `Put all ${words.length} words in a trie. Then DFS from every cell, walking the board and the trie together.`, view: view() });
  const dfs = (r, c, node, prefix) => {
    calls++;
    const ch = board[r][c];
    if (ch === "#" || !node.kids.has(ch)) return;
    const next = node.kids.get(ch);
    path.push([r, c]);
    const p = prefix + ch;
    if (next.word) {
      res.push(next.word);
      push({ line: ["dfs", "step", "found"], note: `(${r}, ${c}) = '${ch}': the path spells "${p}", a word. Add it and clear it from the trie, so it's found once.`, view: view({ node: `"${p}"`, found: true }) });
      next.word = null;
    } else push({ line: ["dfs", "step"], note: `(${r}, ${c}) = '${ch}': "${p}" is in the trie. Keep going.`, view: view({ node: `"${p}"` }) });
    board[r][c] = "#";
    for (const [x, y] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) if (x >= 0 && x < R && y >= 0 && y < C) dfs(x, y, next, p);
    board[r][c] = ch;
    path.pop();
    if (prune && !next.word && next.kids.size === 0) {
      node.kids.delete(ch);
      push({ line: ["back", "prune"], note: `Back from "${p}": nothing is left below it, so cut it from the trie. No later path will walk it.`, view: view() });
    }
  };
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    dfs(r, c, root, "");
  }
  steps.push({ line: "return", note: `Return [${res.join(", ")}]. ${calls} DFS calls in total${hidden ? ` (${hidden} steps not shown)` : ""}.${prune ? " Cut branches are never walked again." : ""}`, view: view() });
  return steps;
}
})();
