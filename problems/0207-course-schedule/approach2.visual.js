// DFS with three states: 1 = on the current path, 2 = finished. Reaching a course that's on the path means a cycle.
(function () {
DSAViz.register("0207-course-schedule/approach2", {
  inputs: [
    { name: "numCourses", type: "int", value: "5", min: 1, max: 8 },
    { name: "prerequisites", type: "int[][]", value: "[[1, 0], [2, 0], [3, 1], [3, 2], [4, 3]]", jagged: true, maxRows: 10, maxCols: 2, minValue: 0, maxValue: 7 },
  ],
  trace({ numCourses: n, prerequisites: pre }) {
    check(n, pre);
    const steps = [];
    const after = Array.from({ length: n }, () => []);
    pre.forEach(([a, b]) => after[b].push(a));
    const state = Array(n).fill(0);
    const path = [];
    const view = (o = {}) => {
      const marks = {};
      state.forEach((s, c) => { if (s === 1) marks[c] = "new"; if (s === 2) marks[c] = "match"; });
      if (o.at !== undefined) marks[o.at] = o.cycle ? "cut" : "active";
      return [
        afterMap(n, pre, o.at !== undefined ? { [String(o.at)]: o.cycle ? "cut" : "active" } : {}),
        { type: "array", label: "state[c] (0 = not visited, yellow 1 = on the current path, green 2 = finished)", values: state.slice(), compact: true, marks },
        { type: "array", label: "current path", values: path.slice(), compact: true },
      ];
    };
    steps.push({ line: "init", note: "Build after[b] from the pairs. Then start a DFS from every course.", view: view() });
    let found = false;
    const dfs = (c) => {
      if (state[c] === 1) {
        steps.push({ line: ["visit", "back"], note: `Course ${c} is already on the current path (${path.join(" → ")} → ${c}): a cycle.`, view: view({ at: c, cycle: true }) });
        return true;
      }
      if (state[c] === 2) {
        steps.push({ line: ["visit", "seen"], note: `Course ${c} is finished already: no cycle through it. Skip.`, view: view({ at: c }) });
        return false;
      }
      state[c] = 1;
      path.push(c);
      steps.push({ line: ["visit", "edge"], note: `Visit ${c}: mark it as on the path.${after[c].length ? ` Then follow ${after[c].join(", ")}.` : " Nothing needs it."}`, view: view({ at: c }) });
      for (const x of after[c]) if (dfs(x)) return true;
      state[c] = 2;
      path.pop();
      steps.push({ line: "finish", note: `Every path from ${c} is cycle-free: mark it finished.`, view: view({ at: c }) });
      return false;
    };
    for (let c = 0; c < n && !found; c++) if (state[c] === 0) found = dfs(c);
    steps.push({ line: "return", note: found ? "Return false. A cycle means no order works." : `Return true. No cycle: every course and pair is looked at once, O(n + p).`, view: view() });
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
