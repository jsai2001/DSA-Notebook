// No sorting: each new interval absorbs every merged interval it overlaps, and the rest are kept as they are.
DSAViz.register("0056-merge-intervals/approach1", {
  inputs: [{ name: "intervals", type: "int[][]", value: "[[2, 3], [6, 7], [1, 1], [3, 6]]", maxRows: 6, maxCols: 2, minValue: 0, maxValue: 9 }],
  trace({ intervals }) {
    if (intervals.some((r) => r.length !== 2 || r[0] > r[1])) throw new DSAViz.InputError("Each interval must be [start, end] with start ≤ end, like [[1, 3], [2, 6]].");
    const top = Math.max(...intervals.map((r) => r[1]));
    const cols = [...Array(top + 1).keys()];
    const show = (r) => `[${r[0]},${r[1]}]`;
    const timeline = (label, list, rowMark) => {
      const marks = {};
      list.forEach((iv, r) => cols.forEach((x) => (marks[`${r},${x}`] = x >= iv[0] && x <= iv[1] ? rowMark(r) : "ghost")));
      return { type: "grid", label, rows: list.map(show), cols, cells: list.map(() => cols.map(() => "")), marks, corner: "" };
    };
    let merged = [];
    const steps = [];
    let checks = 0;
    const view = (i, o = {}) => [
      timeline("intervals, in the order given (dark = current)", intervals, (r) => (r === i ? "active" : r < (i ?? (o.final ? intervals.length : 0)) ? "visited" : "window")),
      merged.length
        ? timeline(o.final ? "merged, sorted" : "merged so far (yellow = overlaps the current one)", merged, (r) => (o.hit && o.hit.has(r) ? "compare" : o.fresh === r ? "new" : o.final ? "match" : "visited"))
        : { type: "array", label: "merged so far", values: [], marks: {} },
      { type: "vars", items: [{ name: "[start, end]", value: o.cur ? show(o.cur) : "-", mark: o.grew ? "new" : "" }, { name: "overlap checks", value: checks }] },
    ];
    steps.push({ line: "init", note: "merged holds disjoint intervals, in no particular order. Each new interval swallows whatever it overlaps.", view: view(undefined) });
    intervals.forEach((iv, i) => {
      let [start, end] = iv;
      steps.push({ line: "each", note: merged.length ? `Next: ${show(iv)}. Compare it with all ${merged.length} merged interval${merged.length === 1 ? "" : "s"}.` : `Next: ${show(iv)}. merged is empty, so there is nothing to compare it with.`, view: view(i, { cur: [start, end] }) });
      const hit = new Set();
      const keep = [];
      merged.forEach((m, r) => {
        checks++;
        if (m[0] <= end && start <= m[1]) {
          hit.add(r);
          start = Math.min(start, m[0]);
          end = Math.max(end, m[1]);
        } else keep.push(m);
      });
      if (merged.length) {
        steps.push({
          line: hit.size ? ["check", "absorb"] : "check",
          note: hit.size
            ? `It overlaps ${[...hit].map((r) => show(merged[r])).join(", ")} (touching counts). Absorb ${hit.size === 1 ? "it" : "them"}: [start, end] grows to ${show([start, end])}.`
            : `No overlap with any of them: each one ends before ${start} or starts after ${end}.`,
          view: view(i, { cur: [start, end], hit, grew: hit.size > 0 }),
        });
      }
      merged = keep.concat([[start, end]]);
      steps.push({
        line: "add",
        note: hit.size
          ? `Drop the ${hit.size} absorbed interval${hit.size === 1 ? "" : "s"} and add ${show([start, end])}. merged is still disjoint.`
          : `Add ${show([start, end])} as it is.`,
        view: view(i, { fresh: merged.length - 1, cur: [start, end] }),
      });
    });
    merged.sort((a, b) => a[0] - b[0]);
    steps.push({
      line: "return",
      note: `${merged.length === 1 ? "Return the 1 merged interval" : `Sort the ${merged.length} merged intervals by start and return them`}. ${checks} overlap check${checks === 1 ? "" : "s"}: up to n per interval, so O(n²) in the worst case (all disjoint).`,
      view: view(undefined, { final: true }),
    });
    return steps;
  },
});
