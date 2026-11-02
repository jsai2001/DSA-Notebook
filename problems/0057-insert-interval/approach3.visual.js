// Binary search finds where the overlapping block begins (left) and ends (right); the answer is before + merged + after.
DSAViz.register("0057-insert-interval/approach3", {
  inputs: [
    { name: "intervals", type: "int[][]", jagged: true, value: "[[1, 2], [3, 5], [6, 7], [8, 9]]", maxRows: 6, maxCols: 2, minValue: 0, maxValue: 9 },
    { name: "newInterval", type: "int[]", value: "[4, 6]", minLength: 2, maxLength: 2, minValue: 0, maxValue: 9 },
  ],
  trace({ intervals, newInterval }) {
    if (intervals.some((r) => r.length !== 2 || r[0] > r[1])) throw new DSAViz.InputError("Each interval must be [start, end] with start ≤ end, like [[1, 2], [3, 5]].");
    if (intervals.some((r, k) => k > 0 && r[0] <= intervals[k - 1][1])) throw new DSAViz.InputError("intervals must be sorted and must not overlap or touch (the problem promises this), like [[1, 2], [3, 5]].");
    if (newInterval[0] > newInterval[1]) throw new DSAViz.InputError("newInterval must be [start, end] with start ≤ end, like [4, 6].");
    const show = (r) => `[${r[0]},${r[1]}]`;
    const n = intervals.length;
    let [start, end] = newInterval;
    const steps = [];
    let lo = 0;
    let hi = n;
    let left = null;
    let right = null;
    let mid = null;
    let looks = 0;
    let result = null;
    const view = (o = {}) => {
      const marks = {};
      for (let k = 0; k < n; k++) {
        if (left !== null && right !== null) marks[k] = k >= left && k < right ? "compare" : "visited";
        else if (k < lo || k >= hi) marks[k] = "visited";
        else marks[k] = "window";
      }
      if (o.mid !== undefined) marks[o.mid] = "active";
      const pointers = {};
      const add = (name, idx) => {
        if (idx === null || idx === undefined || idx >= n) return;
        const key = Object.keys(pointers).find((k) => pointers[k] === idx);
        if (key) {
          delete pointers[key];
          pointers[`${key}, ${name}`] = idx;
        } else pointers[name] = idx;
      };
      if (o.search) {
        add("lo", lo);
        add("mid", o.mid);
      } else {
        add("left", left);
        if (right !== null && right - 1 >= (left ?? 0)) add("right − 1", right - 1);
      }
      const items = [];
      if (o.search) items.push({ name: "lo", value: lo }, { name: "hi", value: hi });
      if (left !== null) items.push({ name: "left", value: left, mark: o.hot === "left" ? "new" : "" });
      if (right !== null) items.push({ name: "right", value: right, mark: o.hot === "right" ? "new" : "" });
      items.push({ name: "[start, end]", value: show([start, end]), mark: o.hot === "merge" ? "new" : "" }, { name: "intervals looked at", value: looks });
      const widgets = [
        { type: "array", label: n ? "intervals (outlined = still being searched, yellow = overlaps)" : "intervals (empty)", values: intervals.map(show), wide: true, marks, pointers },
        { type: "vars", items },
      ];
      if (result) widgets.push({ type: "array", label: "result = before + [start, end] + after", values: result.map(show), wide: true, marks: Object.fromEntries(result.map((_, k) => [k, k === left ? "new" : "match"])) });
      return widgets;
    };
    steps.push({ line: "init", note: `The intervals are sorted with no overlaps, so the ones that overlap ${show(newInterval)} form one block. Binary search finds where it begins and ends.`, view: view({ search: true }) });
    while (lo < hi) {
      mid = (lo + hi) >> 1;
      looks++;
      const goRight = intervals[mid][1] < start;
      steps.push({
        line: "left",
        note: goRight
          ? `left search: ${show(intervals[mid])} ends at ${intervals[mid][1]} < ${start}, entirely before the new interval. left is after it: lo = ${mid + 1}.`
          : `left search: ${show(intervals[mid])} ends at ${intervals[mid][1]} ≥ ${start}. It could be the first one that reaches start: hi = ${mid}.`,
        view: view({ search: true, mid }),
      });
      if (goRight) lo = mid + 1;
      else hi = mid;
    }
    left = lo;
    steps.push({
      line: "left",
      note: !n
        ? `intervals is empty, so both searches end at once: left = 0.`
        : left < n
          ? `left = ${left}: ${show(intervals[left])} is the first interval that ends at or after ${start}.`
          : `left = ${n}: every interval ends before ${start}.`,
      view: view({ hot: "left" }),
    });
    hi = n;
    while (lo < hi) {
      mid = (lo + hi) >> 1;
      looks++;
      const goRight = intervals[mid][0] <= end;
      steps.push({
        line: "right",
        note: goRight
          ? `right search, from left: ${show(intervals[mid])} starts at ${intervals[mid][0]} ≤ ${end}, so it overlaps. right is after it: lo = ${mid + 1}.`
          : `right search, from left: ${show(intervals[mid])} starts at ${intervals[mid][0]} > ${end}, after the new interval. hi = ${mid}.`,
        view: view({ search: true, mid }),
      });
      if (goRight) lo = mid + 1;
      else hi = mid;
    }
    right = lo;
    steps.push({
      line: "right",
      note:
        right > left
          ? `right = ${right}. intervals[${left}..${right - 1}] overlap the new interval: ${intervals.slice(left, right).map(show).join(", ")}.`
          : `right = ${right} = left: nothing overlaps. The new interval goes in between, at index ${left}.`,
      view: view({ hot: "right" }),
    });
    if (left < right) {
      const old = [start, end];
      start = Math.min(start, intervals[left][0]);
      end = Math.max(end, intervals[right - 1][1]);
      steps.push({
        line: "merge",
        note: `Only the ends of the block matter: start = min(${old[0]}, ${intervals[left][0]}) = ${start}, end = max(${old[1]}, ${intervals[right - 1][1]}) = ${end}.`,
        view: view({ hot: "merge" }),
      });
    } else {
      steps.push({ line: "merge", note: `left == right, so there's nothing to merge: [start, end] stays ${show([start, end])}.`, view: view() });
    }
    result = [...intervals.slice(0, left), [start, end], ...intervals.slice(right)];
    steps.push({
      line: "build",
      note: `Copy ${left ? `intervals[0..${left - 1}]` : "nothing before it"}, then ${show([start, end])}, then ${right < n ? `intervals[${right}..${n - 1}]` : "nothing after it"}. The searches looked at ${looks} interval${looks === 1 ? "" : "s"} (O(log n)), but building the answer still copies all of them: O(n) overall.`,
      view: view(),
    });
    return steps;
  },
});
