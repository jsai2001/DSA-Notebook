// Three phases in one pass: copy the intervals that end before the new one, absorb the ones that overlap it, copy the rest.
DSAViz.register("0057-insert-interval/approach2", {
  inputs: [
    { name: "intervals", type: "int[][]", jagged: true, value: "[[1, 2], [3, 4], [6, 7], [8, 9]]", maxRows: 6, maxCols: 2, minValue: 0, maxValue: 9 },
    { name: "newInterval", type: "int[]", value: "[4, 6]", minLength: 2, maxLength: 2, minValue: 0, maxValue: 9 },
  ],
  trace({ intervals, newInterval }) {
    if (intervals.some((r) => r.length !== 2 || r[0] > r[1])) throw new DSAViz.InputError("Each interval must be [start, end] with start ≤ end, like [[1, 2], [3, 5]].");
    if (intervals.some((r, k) => k > 0 && r[0] <= intervals[k - 1][1])) throw new DSAViz.InputError("intervals must be sorted and must not overlap or touch (the problem promises this), like [[1, 2], [3, 5]].");
    if (newInterval[0] > newInterval[1]) throw new DSAViz.InputError("newInterval must be [start, end] with start ≤ end, like [4, 6].");
    const show = (r) => `[${r[0]},${r[1]}]`;
    const n = intervals.length;
    const top = Math.max(newInterval[1], ...intervals.map((r) => r[1]));
    const cols = [...Array(top + 1).keys()];
    let [start, end] = newInterval;
    const state = intervals.map(() => ""); // "kept", "absorbed", or "" (not looked at yet)
    const result = [];
    const steps = [];
    const view = (i, o = {}) => {
      const rows = [...intervals, [start, end]];
      const marks = {};
      rows.forEach((iv, r) =>
        cols.forEach((x) => {
          const inside = x >= iv[0] && x <= iv[1];
          if (!inside) marks[`${r},${x}`] = "ghost";
          else if (r === n) marks[`${r},${x}`] = "match";
          else marks[`${r},${x}`] = r === i ? "active" : state[r] === "absorbed" ? "compare" : state[r] === "kept" ? "visited" : "window";
        })
      );
      const rm = {};
      if (o.fresh) rm[result.length - 1] = "new";
      if (o.final) result.forEach((_, k) => (rm[k] = "match"));
      return [
        { type: "grid", label: "intervals, then [start, end] in green (dark = current, grey = copied, yellow = absorbed)", rows: [...intervals.map(show), "new"], cols, cells: rows.map(() => cols.map(() => "")), marks, corner: "" },
        { type: "vars", items: [{ name: "[start, end]", value: show([start, end]), mark: o.grew ? "new" : "" }] },
        { type: "array", label: "result", values: result.map(show), wide: true, marks: rm },
      ];
    };
    steps.push({ line: "init", note: `The intervals are sorted and don't overlap, so they fall into three groups: before ${show(newInterval)}, overlapping it, and after it. One pass handles them in that order.`, view: view(undefined) });
    let i = 0;
    while (i < n && intervals[i][1] < start) {
      state[i] = "kept";
      result.push(intervals[i]);
      steps.push({ line: "before", note: `${show(intervals[i])} ends at ${intervals[i][1]} < ${start}, before the new interval starts. Copy it to result.`, view: view(i, { fresh: true }) });
      i++;
    }
    while (i < n && intervals[i][0] <= end) {
      const old = [start, end];
      start = Math.min(start, intervals[i][0]);
      end = Math.max(end, intervals[i][1]);
      state[i] = "absorbed";
      steps.push({
        line: "overlap",
        note: `${show(intervals[i])} starts at ${intervals[i][0]} ≤ ${old[1]} and ends at ${intervals[i][1]} ≥ ${old[0]}: they overlap${intervals[i][0] === old[1] || intervals[i][1] === old[0] ? " (touching counts)" : ""}. Absorb it: ${show(old)} becomes ${show([start, end])}.`,
        view: view(i, { grew: start !== old[0] || end !== old[1] }),
      });
      i++;
    }
    result.push([start, end]);
    steps.push({
      line: "place",
      note: i < n
        ? `${show(intervals[i])} starts at ${intervals[i][0]} > ${end}, so nothing else overlaps. Add the new interval ${show([start, end])}.`
        : `No intervals are left to check. Add the new interval ${show([start, end])}.`,
      view: view(undefined, { fresh: true }),
    });
    while (i < n) {
      state[i] = "kept";
      result.push(intervals[i]);
      steps.push({ line: "after", note: `${show(intervals[i])} starts after ${end}: copy it.`, view: view(i, { fresh: true }) });
      i++;
    }
    steps.push({ line: "return", note: `result is sorted and has no overlaps: ${result.map(show).join(", ")}. Each interval was looked at once: O(n) time.`, view: view(undefined, { final: true }) });
    return steps;
  },
});
