// Backtracking: pick a palindrome for the next piece, split the rest, then undo and try a longer piece.
(function () {
DSAViz.register("0131-palindrome-partitioning/approach1", {
  inputs: [{ name: "s", type: "string", value: "aab", maxLength: 6 }],
  trace({ s }) {
    const w = parseWord(s);
    const steps = [];
    const result = [];
    const path = [];
    const COUNTER = "letter pairs compared";
    let counter = 0;

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
        let pairs = 0; for (let lo = start, hi = end; lo < hi; lo++, hi--) { pairs++; if (w[lo] !== w[hi]) break; } counter += pairs;
        const back = undo ? `Back from "${undo}": undo (remove it). ` : "";
        const line = undo ? ["undo", "try"] : ["try"];
        undo = null;
        if (!ok) {
          steps.push({ line, note: `${back}"${piece}" = s[${start}..${end}]: not a palindrome, skip it.${pairs ? ` (two pointers: ${pairs} pair${pairs === 1 ? "" : "s"} compared)` : ""}`, view: view({ range: [start, end], ok, counted: true }) });
          continue;
        }
        steps.push({ line: [...line, "choose"], note: `${back}"${piece}" = s[${start}..${end}] is a palindrome: add it to path and split the rest, s[${end + 1}..].${pairs ? ` (two pointers: ${pairs} pair${pairs === 1 ? "" : "s"} compared)` : ""}`, view: view({ range: [start, end], ok, counted: true }) });
        path.push(piece);
        run(end + 1);
        path.pop();
        undo = piece;
      }
    };

    steps.push({ line: "init", note: `Build the split one piece at a time, left to right. Each piece must be a palindrome.`, view: view() });
    run(0);
    steps.push({
      line: "return",
      note: `Return ${result.length} way${result.length === 1 ? "" : "s"}. The palindrome checks compared ${counter} letter pair${counter === 1 ? "" : "s"}, and the same piece is checked again every time it comes up.`,
      view: view(),
    });
    return steps;
  },
});

function parseWord(s) {
  const w = s.trim();
  if (!/^[a-z]{1,6}$/.test(w)) throw new DSAViz.InputError("s: 1 to 6 lowercase letters, like aab (longer words have too many splits to step through).");
  return w;
}
})();
