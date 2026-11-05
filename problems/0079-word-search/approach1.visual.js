// DFS with a seen grid: mark each cell on the path, try its 4 neighbours, unmark on the way back.
(() => {
  const SEEN = true; // a separate seen grid
  const PRUNE = false; // no checks before the search
DSAViz.register("0079-word-search/approach1", {
  inputs: [
    { name: "board", type: "string", value: "ABCE SFCS ADEE", maxLength: 30 },
    { name: "word", type: "string", value: "ABCCED", maxLength: 8 },
  ],
  trace({ board: text, word }) {
    const rows = text.trim().split(/[\s,]+/).filter(Boolean);
    if (!rows.length || rows.some((r) => !/^[A-Za-z]+$/.test(r))) throw new DSAViz.InputError("board: rows of letters separated by spaces, like ABCE SFCS ADEE.");
    if (rows.some((r) => r.length !== rows[0].length)) throw new DSAViz.InputError("board: every row needs the same number of letters.");
    if (rows.length > 4 || rows[0].length > 5) throw new DSAViz.InputError("board: at most 4 rows of 5 letters here (kept small so the steps stay readable).");
    if (!/^[A-Za-z]+$/.test(word)) throw new DSAViz.InputError("word must be 1 or more letters (A–Z, a–z).");
    const board = rows.map((r) => [...r]);
    const R = board.length;
    const C = board[0].length;
    const steps = [];
    const MAX = 400;
    const seen = board.map((row) => row.map(() => false));
    const path = [];
    let w = word;
    let note0 = "";
    const view = (o = {}) => {
      const marks = {};
      path.forEach(([r, c]) => (marks[`${r},${c}`] = o.found ? "match" : "visited"));
      if (o.at) marks[`${o.at[0]},${o.at[1]}`] = o.bad ? "cut" : "active";
      const cells = board.map((row, r) => row.map((ch, c) => (!SEEN && path.some(([pr, pc]) => pr === r && pc === c) ? "#" : ch)));
      const wm = {};
      for (let i = 0; i < (o.k ?? 0); i++) wm[i] = "match";
      if (o.k !== undefined && o.k < w.length && !o.found) wm[o.k] = o.bad ? "cut" : "active";
      if (o.found) [...w].forEach((_, i) => (wm[i] = "match"));
      const out = [
        { type: "grid", label: SEEN ? "board (grey = on the path)" : 'board ("#" = on the path, restored on the way back)', rows: Array.from({ length: R }, (_, k) => k), cols: Array.from({ length: C }, (_, k) => k), corner: "r \\ c", cells, marks },
      ];
      if (SEEN) out.push({ type: "grid", label: "seen", rows: Array.from({ length: R }, (_, k) => k), cols: Array.from({ length: C }, (_, k) => k), corner: "r \\ c", cells: seen.map((row) => row.map((s) => (s ? "✓" : ""))), marks: Object.fromEntries(path.map(([r, c]) => [`${r},${c}`, "visited"])) });
      out.push({ type: "array", label: w === word ? "word" : "word, reversed", values: [...w], marks: wm, pointers: o.k !== undefined && o.k < w.length && !o.found ? { k: o.k } : {} });
      out.push({ type: "vars", items: [{ name: "path", value: path.length ? path.map(([r, c]) => `(${r},${c})`).join(" → ") : "empty" }] });
      return out;
    };
    const push = (s) => {
      steps.push(s);
      if (steps.length > MAX) throw new DSAViz.InputError(`This input takes more than ${MAX} steps to show. Try a smaller board or a shorter word.`);
    };
    push({ line: "init", note: `${R} × ${C} board. Try each cell as the start of "${word}", and follow neighbours letter by letter.`, view: view() });
    if (PRUNE) {
      const have = {};
      board.flat().forEach((ch) => (have[ch] = (have[ch] || 0) + 1));
      const need = {};
      [...word].forEach((ch) => (need[ch] = (need[ch] || 0) + 1));
      const short = Object.keys(need).find((ch) => (have[ch] || 0) < need[ch]);
      if (short) {
        push({ line: "count", note: `The word needs ${need[short]} "${short}" but the board has ${have[short] || 0}. No path can spell it: return false without searching.`, view: view() });
        return steps;
      }
      push({ line: "count", note: `The board has enough of every letter (${Object.keys(need).map((ch) => `${ch}: ${have[ch]} ≥ ${need[ch]}`).join(", ")}). Search.`, view: view() });
      const a = have[word[0]], b = have[word[word.length - 1]];
      if (a > b) {
        w = [...word].reverse().join("");
        push({ line: "flip", note: `"${word[0]}" is on ${a} cells but "${word[word.length - 1]}" on only ${b}: search for the reverse, "${w}". Same answer, fewer starts.`, view: view() });
      } else note0 = word.length > 1 ? ` ("${word[0]}" is on ${a} cell${a === 1 ? "" : "s"}, "${word[word.length - 1]}" on ${b}: keep the word as it is.)` : "";
    }
    function dfs(r, c, k) {
      if (k === w.length) return true;
      if (r < 0 || r >= R || c < 0 || c >= C) return false; // off the board: not drawn, there's nothing to show
      const used = path.some(([pr, pc]) => pr === r && pc === c);
      if (used || board[r][c] !== w[k]) {
        if (k > 0) push({ line: ["call", "fail"], note: used ? `(${r},${c}) is already on the path${SEEN ? "" : ' ("#")'}: can't use it again.` : `(${r},${c}) is "${board[r][c]}", not "${w[k]}".`, view: view({ at: [r, c], k, bad: true }) });
        return false;
      }
      path.push([r, c]);
      seen[r][c] = true;
      if (k + 1 === w.length) {
        push({ line: ["call", "take", "found"], note: `(${r},${c}) is "${w[k]}", the last letter: the whole word is spelled.`, view: view({ at: [r, c], k: k + 1, found: true }) });
        return true;
      }
      push({ line: ["call", "take"], note: `(${r},${c}) is "${w[k]}" (letter ${k + 1} of ${w.length}). ${SEEN ? "Mark it seen" : 'Mark it "#"'} and look at its neighbours for "${w[k + 1]}".`, view: view({ at: [r, c], k: k + 1 }) });
      const found = dfs(r + 1, c, k + 1) || dfs(r - 1, c, k + 1) || dfs(r, c + 1, k + 1) || dfs(r, c - 1, k + 1);
      if (found) return true;
      path.pop();
      seen[r][c] = false;
      push({ line: "undo", note: `No neighbour of (${r},${c}) continues the word. ${SEEN ? "Unmark it" : `Put "${board[r][c]}" back`} so other paths can use it, and back up.`, view: view({ at: [r, c], k, bad: true }) });
      return false;
    }
    for (let r = 0; r < R; r++)
      for (let c = 0; c < C; c++) {
        if (board[r][c] !== w[0]) continue;
        push({ line: "start", note: `Start at (${r},${c}), which is "${w[0]}".${note0}`, view: view({ at: [r, c], k: 0 }) });
        note0 = "";
        if (dfs(r, c, 0)) {
          push({ line: "return", note: `Found: ${path.map(([pr, pc]) => `(${pr},${pc})`).join(" → ")} spells "${w}"${w === word ? "" : `, so walked backwards it spells "${word}"`}. Return true.`, view: view({ found: true, k: w.length }) });
          return steps;
        }
      }
    const starts = board.flat().filter((ch) => ch === w[0]).length;
    push({ line: "return", note: starts ? `No start worked. Return false.` : `No cell holds "${w[0]}", so no path can even start. Return false.`, view: view() });
    return steps;
  },
});
})();
