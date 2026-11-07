// Rounds: count each course's unfinished prerequisites, take every course that has none. Stuck with courses left = a cycle.
(function () {
DSAViz.register("0207-course-schedule/approach1", {
  inputs: [
    { name: "numCourses", type: "int", value: "5", min: 1, max: 8 },
    { name: "prerequisites", type: "int[][]", value: "[[1, 0], [2, 0], [3, 1], [3, 2], [4, 3]]", jagged: true, maxRows: 10, maxCols: 2, minValue: 0, maxValue: 7 },
  ],
  trace({ numCourses: n, prerequisites: pre }) {
    check(n, pre);
    const steps = [];
    const done = Array(n).fill(false);
    let left = n;
    let round = 0;
    const view = (o = {}) => [
      { type: "array", label: "prerequisites as b→a (take b, then a; dashed = b is done, so it no longer blocks a)", values: pre.map(arrow), wide: true, marks: Object.fromEntries(pre.map(([, b], k) => [k, done[b] ? "ghost" : ""]).filter(([, v]) => v)) },
      { type: "array", label: "need[c] this round (green = done, yellow = ready now, red = stuck)", values: o.need || Array(n).fill(""), compact: true, marks: Object.fromEntries([...Array(n).keys()].map((c) => [c, done[c] ? "match" : (o.ready || []).includes(c) ? "new" : o.stuck ? "cut" : ""]).filter(([, v]) => v)) },
      { type: "vars", items: [{ name: "round", value: round }, { name: "left", value: left }] },
    ];
    steps.push({ line: "init", note: `${n} courses, ${pre.length} prerequisites. Nothing done yet.`, view: view() });
    while (left) {
      round++;
      const need = Array(n).fill(0);
      pre.forEach(([a, b]) => { if (!done[b]) need[a]++; });
      const ready = [...Array(n).keys()].filter((c) => !done[c] && need[c] === 0);
      const shown = need.map((v, c) => (done[c] ? "✓" : v));
      if (!ready.length) {
        steps.push({ line: ["round", "count", "ready", "stuck"], note: `Round ${round}: scan all ${pre.length} pairs again. ${left} course${left > 1 ? "s are" : " is"} left, and each still waits on another one left: they form a cycle.`, view: view({ need: shown, stuck: true }) });
        steps.push({ line: "stuck", note: "Return false. No order can take them all.", view: view({ need: shown, stuck: true }) });
        return steps;
      }
      steps.push({ line: ["round", "count", "ready"], note: `Round ${round}: scan all ${pre.length} pairs and count unfinished prerequisites. Ready: ${ready.join(", ")}.`, view: view({ need: shown, ready }) });
      ready.forEach((c) => (done[c] = true));
      left -= ready.length;
      steps.push({ line: "take", note: `Take ${ready.join(", ")}. ${left} left.`, view: view({ need: need.map((v, c) => (done[c] ? "✓" : v)) }) });
    }
    steps.push({ line: "return", note: `Return true. ${round} round${round > 1 ? "s" : ""}, each scanning every pair: O(n·(n + p)) at worst.`, view: view() });
    return steps;
  },
});

function check(n, pre) {
  if (pre.some((p) => p.length !== 2)) throw new DSAViz.InputError("Each prerequisite is [a, b]: take b before a.");
  if (pre.some(([a, b]) => a < 0 || b < 0 || a >= n || b >= n)) throw new DSAViz.InputError(`Courses are numbered 0 to ${n - 1}.`);
  if (pre.some(([a, b]) => a === b)) throw new DSAViz.InputError("A course can't be its own prerequisite (a ≠ b).");
  if (new Set(pre.map((p) => p.join(","))).size !== pre.length) throw new DSAViz.InputError("Each pair appears once.");
}
const arrow = ([a, b]) => `${b}→${a}`;
const afterMap = (n, pre, marks = {}) => {
  const after = Array.from({ length: n }, () => []);
  pre.forEach(([a, b]) => after[b].push(a));
  return { type: "map", label: "after[b]: the courses that need b first", columns: ["course", "then"], entries: after.map((l, c) => [String(c), l.join(", ") || "none"]), marks };
};
})();
