// Build a table pal[i][j] once, then backtrack with O(1) palindrome lookups.
(function () {
DSAViz.register("0131-palindrome-partitioning/approach2", {
  inputs: [{ name: "s", type: "string", value: "aab", maxLength: 6 }],
  trace({ s }) {
    const w = parseWord(s);
    const n = w.length;
    const steps = [];
    const result = [];
    const path = [];
    const COUNTER = "table lookups";
    let counter = 0;
    const pal = Array.from({ length: n }, () => Array(n).fill(false));
    for (let i = n - 1; i >= 0; i--) for (let j = i; j < n; j++) pal[i][j] = w[i] === w[j] && (j - i < 2 || pal[i + 1][j - 1]);

    const view = (o = {}) => {
      const marks = {};
      let k = 0;
      path.forEach((p) => {
        for (let t = 0; t < p.length; t++) marks[k + t] = "visited";
        k += p.length;
      });
      if (o.range) for (let t = o.range[0]; t <= o.range[1]; t++) marks[t] = o.ok ? "match" : "cut";
      return [
        { type: "array", label: "s (dashed = already in path; piece being checked: green = palindrome, red = not)", values: [...w], marks, pointers: o.range ? { start: o.range[0], end: o.range[1] } : {} },
        { type: "array", label: "path (pieces chosen so far)", values: [...path], wide: true },
        { type: "array", label: "result", values: result.map((p) => p.join(" | ")), wide: true, marks: o.added ? { [result.length - 1]: "new" } : {} },
        { type: "vars", items: [{ name: COUNTER, value: counter, mark: o.counted ? "new" : "" }] },
      ];
    };

    let undo = null;
    const run = (start) => {
      if (start === w.length) {
        result.push([...path]);
        steps.push({ line: "done", note: `start = ${w.length}: every letter is in a piece. Add a copy of path: ${path.join(" | ")}.`, view: view({ added: true }) });
        return;
      }
      for (let end = start; end < w.length; end++) {
        const piece = w.slice(start, end + 1);
        const ok = piece === [...piece].reverse().join("");
        counter++;
        const back = undo ? `Back from "${undo}": undo (remove it). ` : "";
        const line = undo ? ["undo", "try"] : ["try"];
        undo = null;
        if (!ok) {
          steps.push({ line, note: `${back}"${piece}" = s[${start}..${end}]: not a palindrome, skip it. (one table lookup)`, view: view({ range: [start, end], ok, counted: true }) });
          continue;
        }
        steps.push({ line: [...line, "choose"], note: `${back}"${piece}" = s[${start}..${end}] is a palindrome: add it to path and split the rest, s[${end + 1}..]. (one table lookup)`, view: view({ range: [start, end], ok, counted: true }) });
        path.push(piece);
        run(end + 1);
        path.pop();
        undo = piece;
      }
    };

    const cells = pal.map((row, i) => row.map((v, j) => (j < i ? "" : v ? "✓" : "·")));
    const tmarks = {};
    pal.forEach((row, i) => row.forEach((v, j) => j >= i && (tmarks[`${i},${j}`] = v ? "match" : "ghost")));
    steps.push({
      line: "table",
      note: `First fill pal[i][j] = "is s[i..j] a palindrome?", from the end of s backwards: s[i] == s[j] and the inside s[i+1..j-1] is one too. ${n * (n + 1) / 2} entries, each O(1).`,
      view: [
        { type: "array", label: "s", values: [...w] },
        { type: "grid", label: "pal[i][j] (✓ = palindrome)", rows: [...Array(n).keys()], cols: [...Array(n).keys()], corner: "i \\ j", cells, marks: tmarks },
      ],
    });
    steps.push({ line: "init", note: "Now the same backtracking as Approach 1, but every palindrome check is one table lookup.", view: view() });
    run(0);
    steps.push({ line: "return", note: `Return ${result.length} way${result.length === 1 ? "" : "s"}, after ${counter} O(1) lookup${counter === 1 ? "" : "s"}.`, view: view() });
    return steps;
  },
});

function parseWord(s) {
  const w = s.trim();
  if (!/^[a-z]{1,6}$/.test(w)) throw new DSAViz.InputError("s: 1 to 6 lowercase letters, like aab (longer words have too many splits to step through).");
  return w;
}
})();
