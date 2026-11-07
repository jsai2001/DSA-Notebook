// Kahn's algorithm: the order courses leave the queue is a valid schedule.
(function () {
DSAViz.register("0210-course-schedule-ii/approach3", {
  inputs: [
    { name: "numCourses", type: "int", value: "5", min: 1, max: 8 },
    { name: "prerequisites", type: "int[][]", value: "[[1, 0], [2, 0], [3, 1], [3, 2], [4, 3]]", jagged: true, maxRows: 10, maxCols: 2, minValue: 0, maxValue: 7 },
  ],
  trace({ numCourses: n, prerequisites: pre }) {
    check(n, pre);
    const steps = [];
    const after = Array.from({ length: n }, () => []);
    const need = Array(n).fill(0);
    pre.forEach(([a, b]) => { after[b].push(a); need[a]++; });
    const queue = [];
    const taken = [];
    const view = (o = {}) => {
      const marks = {};
      taken.forEach((c) => (marks[c] = "match"));
      (o.freed || []).forEach((c) => (marks[c] = "new"));
      if (o.at !== undefined) marks[o.at] = "active";
      if (o.stuck) for (let c = 0; c < n; c++) if (!taken.includes(c)) marks[c] = "cut";
      return [
        afterMap(n, pre),
        { type: "array", label: "need[c]: prerequisites not taken yet (dark = taken now, green = taken, yellow = just reached 0, red = never reached 0)", values: need.slice(), compact: true, marks },
        { type: "array", label: "queue (can take now)", values: queue.slice(), compact: true },
        { type: "array", label: "order", values: taken.slice(), compact: true, marks: o.at !== undefined ? { [taken.length - 1]: "new" } : {} },
      ];
    };
    for (let c = 0; c < n; c++) if (need[c] === 0) queue.push(c);
    steps.push({ line: ["init", "start"], note: `Count each course's prerequisites. Courses with none go in the queue: ${queue.join(", ") || "none"}.`, view: view({ freed: queue.slice() }) });
    while (queue.length) {
      const c = queue.shift();
      taken.push(c);
      const freed = [];
      for (const x of after[c]) { need[x]--; if (need[x] === 0) { queue.push(x); freed.push(x); } }
      steps.push({ line: ["take", "free"], note: `Take ${c}: add it to the order.${after[c].length ? ` Lower need for ${after[c].join(", ")}.` : ""}${freed.length ? ` ${freed.join(", ")} reached 0: queue ${freed.length > 1 ? "them" : "it"}.` : ""}`, view: view({ at: c, freed }) });
    }
    const ok = taken.length === n;
    steps.push({ line: "return", note: ok ? `Return [${taken.join(", ")}]. Every course was queued only after all its prerequisites. O(n + p).` : `Return []. Only ${taken.length} of ${n} could be taken: the rest wait on each other in a cycle.`, view: view({ stuck: !ok }) });
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
