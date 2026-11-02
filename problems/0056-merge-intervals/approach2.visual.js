// Sort by start, then each interval either extends the last merged one (it starts inside it) or begins a new one.
DSAViz.register("0056-merge-intervals/approach2", {
  inputs: [{ name: "intervals", type: "int[][]", value: "[[2, 6], [1, 3], [8, 9], [5, 7]]", maxRows: 6, maxCols: 2, minValue: 0, maxValue: 9 }],
  trace({ intervals }) {
    if (intervals.some((r) => r.length !== 2 || r[0] > r[1])) throw new DSAViz.InputError("Each interval must be [start, end] with start ≤ end, like [[1, 3], [2, 6]].");
    const top = Math.max(...intervals.map((r) => r[1]));
    const cols = [...Array(top + 1).keys()];
    const show = (r) => `[${r[0]},${r[1]}]`;
    // A timeline: one row per interval, a cell per number it covers.
    const timeline = (label, list, rowMark) => {
      const marks = {};
      list.forEach((iv, r) => cols.forEach((x) => (marks[`${r},${x}`] = x >= iv[0] && x <= iv[1] ? rowMark(r) : "ghost")));
      return { type: "grid", label, rows: list.map(show), cols, cells: list.map(() => cols.map(() => "")), marks, corner: "" };
    };
    const sorted = intervals.slice().sort((a, b) => a[0] - b[0]);
    const merged = [];
    const steps = [];
    const view = (i, o = {}) => [
      timeline("sorted by start (dark = current, grey = done)", sorted, (r) => (r === i ? "active" : r < (i ?? 0) || o.done ? "visited" : "window")),
      ...(merged.length
        ? [timeline("merged", merged, (r) => (r === merged.length - 1 && o.changed ? "new" : o.final ? "match" : "visited"))]
        : [{ type: "array", label: "merged", values: [], marks: {} }]),
      ...(merged.length && !o.final ? [{ type: "vars", items: [{ name: "last merged end", value: merged[merged.length - 1][1], mark: o.changed === "extend" ? "new" : "" }]}] : []),
    ];
    steps.push({
      line: "sort",
      note: `Sort by start: ${sorted.map(show).join(", ")}. Now anything that overlaps the last merged interval comes right after it, so only the last one needs checking.`,
      view: view(undefined),
    });
    sorted.forEach((iv, i) => {
      const last = merged[merged.length - 1];
      if (last && iv[0] <= last[1]) {
        const old = last[1];
        last[1] = Math.max(last[1], iv[1]);
        steps.push({
          line: ["each", "extend"],
          note:
            last[1] > old
              ? `${show(iv)} starts at ${iv[0]} ≤ ${old}, inside (or touching) the last merged interval. Extend it: end = max(${old}, ${iv[1]}) = ${last[1]}.`
              : `${show(iv)} starts at ${iv[0]} ≤ ${old} and ends at ${iv[1]} ≤ ${old}: it sits entirely inside. max keeps the end at ${old}; plain end = ${iv[1]} would shrink it.`,
          view: view(i, { changed: "extend" }),
        });
      } else {
        merged.push([iv[0], iv[1]]);
        steps.push({
          line: ["each", "extend", "new"],
          note: last
            ? `${show(iv)} starts at ${iv[0]} > ${last[1]}, after the last merged interval ends: a gap. Start a new merged interval ${show(iv)}.`
            : `merged is empty, so ${show(iv)} starts the first merged interval.`,
          view: view(i, { changed: "new" }),
        });
      }
    });
    steps.push({
      line: "return",
      note: `${intervals.length} interval${intervals.length === 1 ? "" : "s"} merged into ${merged.length}: ${merged.map(show).join(", ")}. Sorting is O(n log n); the pass after it is O(n).`,
      view: view(undefined, { done: true, final: true }),
    });
    return steps;
  },
});
