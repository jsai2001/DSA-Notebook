// Count where intervals start and end, then sweep the number line keeping track of how many are open.
DSAViz.register("0056-merge-intervals/approach3", {
  inputs: [{ name: "intervals", type: "int[][]", value: "[[1, 3], [2, 4], [4, 5], [7, 8]]", maxRows: 6, maxCols: 2, minValue: 0, maxValue: 9 }],
  trace({ intervals }) {
    if (intervals.some((r) => r.length !== 2 || r[0] > r[1])) throw new DSAViz.InputError("Each interval must be [start, end] with start ≤ end, like [[1, 3], [2, 6]].");
    const top = Math.max(...intervals.map((r) => r[1]));
    const cols = [...Array(top + 1).keys()];
    const show = (r) => `[${r[0]},${r[1]}]`;
    const starts = Array(top + 1).fill(0);
    const ends = Array(top + 1).fill(0);
    const merged = [];
    let active = 0;
    let begin = null;
    let counted = false;
    const steps = [];
    const view = (x, o = {}) => {
      const marks = {};
      intervals.forEach((iv, r) =>
        cols.forEach((c) => (marks[`${r},${c}`] = c >= iv[0] && c <= iv[1] ? (c === x ? "active" : x !== undefined && c < x ? "visited" : "window") : c === x ? "compare" : "ghost"))
      );
      // The two counter rows sit under the intervals, lined up with the same columns.
      const n = intervals.length;
      cols.forEach((c) => {
        const m = c === x ? "active" : o.counting && (starts[c] || ends[c]) ? "new" : x !== undefined && c < x ? "visited" : "";
        if (!m) return;
        marks[`${n},${c}`] = m;
        marks[`${n + 1},${c}`] = m;
      });
      const cells = intervals.map(() => cols.map(() => ""));
      cells.push(cols.map((c) => (counted ? starts[c] : 0)), cols.map((c) => (counted ? ends[c] : 0)));
      return [
        { type: "grid", label: "intervals on the number line, with the counters under them (column x = where the sweep is)", rows: [...intervals.map(show), "starts", "ends"], cols, cells, marks, corner: "" },
        {
          type: "vars",
          items: [
            { name: "active", value: active, mark: o.hot === "active" ? "new" : "" },
            { name: "begin", value: begin === null ? "-" : begin, mark: o.hot === "begin" ? "new" : "" },
          ],
        },
        { type: "array", label: "merged", values: merged.map(show), wide: true, marks: o.fresh ? { [merged.length - 1]: "new" } : o.final ? Object.fromEntries(merged.map((_, k) => [k, "match"])) : {} },
      ];
    };
    steps.push({ line: "init", note: `The largest end is ${top}, so make two counters for each number 0..${top}.`, view: view(undefined) });
    intervals.forEach(([s, e]) => {
      starts[s]++;
      ends[e]++;
    });
    counted = true;
    steps.push({ line: "count", note: `For each interval, add 1 to starts at its start and 1 to ends at its end. Nothing else about the intervals is needed now.`, view: view(undefined, { counting: true }) });
    steps.push({ line: "prep", note: `Sweep from 0 to ${top}. active counts the intervals that cover the current point; while it's above 0 we're inside a merged interval.`, view: view(undefined) });
    for (let x = 0; x <= top; x++) {
      const wasZero = active === 0;
      const opens = wasZero && starts[x] > 0;
      if (opens) begin = x;
      active += starts[x];
      active -= ends[x];
      const closes = active === 0 && ends[x] > 0;
      if (closes) merged.push([begin, x]);
      const lines = ["sweep"];
      if (opens) lines.unshift("begin");
      if (closes) lines.push("close");
      let note;
      if (!starts[x] && !ends[x]) note = active ? `x = ${x}: nothing starts or ends; still inside (active = ${active}).` : `x = ${x}: nothing starts or ends, and nothing is open: a gap.`;
      else {
        note = `x = ${x}: ${starts[x]} start${starts[x] === 1 ? "" : "s"}, ${ends[x]} end${ends[x] === 1 ? "" : "s"}. `;
        if (opens) note += `Nothing was open, so a merged interval begins here: begin = ${x}. `;
        note += `active = ${active}. `;
        if (closes) note += `It's back to 0 with an end here: close [${begin}, ${x}].`;
        else if (ends[x] && starts[x] && !wasZero) note += `An interval ends where another starts, but both are counted before the check, so active never hits 0: they join.`;
        else if (ends[x]) note += `Something is still open, so the merged interval carries on.`;
      }
      steps.push({ line: lines, note: note.trim(), view: view(x, { hot: opens ? "begin" : starts[x] || ends[x] ? "active" : "", fresh: closes }) });
    }
    steps.push({
      line: "return",
      note: `merged comes out already sorted: ${merged.map(show).join(", ")}. O(n + V) time and O(V) space, V = the largest end (at most 10⁴ here).`,
      view: view(undefined, { final: true }),
    });
    return steps;
  },
});
