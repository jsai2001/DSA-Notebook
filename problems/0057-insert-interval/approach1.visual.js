// Put the new interval in with the others, sort by start, and merge exactly as in Merge Intervals (56).
DSAViz.register("0057-insert-interval/approach1", {
  inputs: [
    { name: "intervals", type: "int[][]", jagged: true, value: "[[1, 3], [6, 9]]", maxRows: 6, maxCols: 2, minValue: 0, maxValue: 9 },
    { name: "newInterval", type: "int[]", value: "[2, 5]", minLength: 2, maxLength: 2, minValue: 0, maxValue: 9 },
  ],
  trace({ intervals, newInterval }) {
    if (intervals.some((r) => r.length !== 2 || r[0] > r[1])) throw new DSAViz.InputError("Each interval must be [start, end] with start ≤ end, like [[1, 2], [3, 5]].");
    if (intervals.some((r, k) => k > 0 && r[0] <= intervals[k - 1][1])) throw new DSAViz.InputError("intervals must be sorted and must not overlap or touch (the problem promises this), like [[1, 2], [3, 5]].");
    if (newInterval[0] > newInterval[1]) throw new DSAViz.InputError("newInterval must be [start, end] with start ≤ end, like [4, 6].");
    const show = (r) => `[${r[0]},${r[1]}]`;
    const all = [...intervals.map((r) => ({ r, isNew: false })), { r: newInterval, isNew: true }];
    const sorted = all.slice().sort((a, b) => a.r[0] - b.r[0] || a.r[1] - b.r[1]);
    const top = Math.max(...all.map((x) => x.r[1]));
    const cols = [...Array(top + 1).keys()];
    const timeline = (label, list, names, rowMark) => {
      const marks = {};
      list.forEach((iv, r) => cols.forEach((x) => (marks[`${r},${x}`] = x >= iv[0] && x <= iv[1] ? rowMark(r) : "ghost")));
      return { type: "grid", label, rows: names, cols, cells: list.map(() => cols.map(() => "")), marks, corner: "" };
    };
    const merged = [];
    const steps = [];
    const view = (i, o = {}) => [
      timeline(
        "everything, sorted by start (dark = current, grey = done)",
        sorted.map((x) => x.r),
        sorted.map((x) => (x.isNew ? `new ${show(x.r)}` : show(x.r))),
        (r) => (r === i ? "active" : r < (i ?? (o.final ? sorted.length : 0)) ? "visited" : sorted[r].isNew ? "compare" : "window")
      ),
      merged.length
        ? timeline("merged", merged, merged.map(show), (r) => (r === merged.length - 1 && o.changed ? "new" : o.final ? "match" : "visited"))
        : { type: "array", label: "merged", values: [], marks: {} },
    ];
    steps.push({
      line: "sort",
      note: `Add ${show(newInterval)} (yellow) to the list and sort by start: ${sorted.map((x) => show(x.r)).join(", ")}. The sort doesn't use the fact that the list was already sorted.`,
      view: view(undefined),
    });
    sorted.forEach(({ r: iv }, i) => {
      const last = merged[merged.length - 1];
      if (last && iv[0] <= last[1]) {
        const old = last[1];
        last[1] = Math.max(last[1], iv[1]);
        steps.push({ line: ["each", "extend"], note: `${show(iv)} starts at ${iv[0]} ≤ ${old}: it overlaps the last merged interval. end = max(${old}, ${iv[1]}) = ${last[1]}.`, view: view(i, { changed: true }) });
      } else {
        merged.push([iv[0], iv[1]]);
        steps.push({
          line: ["each", "extend", "new"],
          note: last ? `${show(iv)} starts at ${iv[0]} > ${last[1]}: a gap. Start a new merged interval.` : `merged is empty: ${show(iv)} starts it.`,
          view: view(i, { changed: true }),
        });
      }
    });
    steps.push({ line: "return", note: `Result: ${merged.map(show).join(", ")}. Correct, but the sort makes it O(n log n) when the input was sorted to begin with.`, view: view(undefined, { final: true }) });
    return steps;
  },
});
