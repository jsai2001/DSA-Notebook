// Build every level, left to right, then take the last value of each one.
DSAViz.register("0199-binary-tree-right-side-view/approach1", {
  inputs: [{ name: "root", type: "tree", value: "[1, 2, 3, 4, null, null, null, 5]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const levels = [];
    const picked = {};
    const view = (o = {}) => {
      const m = { ...picked };
      (o.level || []).forEach((id) => (m[id] = m[id] || "new"));
      return [
        { type: "tree", label: "tree (yellow = this level, green = rightmost of its level)", values, marks: m },
        { type: "array", label: "levels (each level's values, left to right)", values: levels.map((l) => `[${l.join(", ")}]`), wide: true, marks: o.level ? { [levels.length - 1]: "new" } : {} },
      ];
    };
    if (root < 0) {
      steps.push({ line: ["init", "level", "return"], note: "Return []. The tree is empty: no levels.", view: view() });
      return steps;
    }
    let level = [root];
    steps.push({ line: "init", note: "Start with the root as level 0.", view: view() });
    while (level.length) {
      levels.push(level.map((id) => nodes[id].val));
      steps.push({ line: "level", note: `Level ${levels.length - 1}: [${levels[levels.length - 1].join(", ")}]. Store all of it.`, view: view({ level }) });
      level = level.flatMap((id) => [nodes[id].left, nodes[id].right].filter((c) => c >= 0));
      steps.push({ line: "next", note: level.length ? `Their children, left to right, make the next level: ${level.map((id) => nodes[id].val).join(", ")}.` : "No children: that was the last level.", view: view({ level }) });
    }
    const res = levels.map((l) => l[l.length - 1]);
    let cur = [root];
    while (cur.length) { picked[cur[cur.length - 1]] = "match"; cur = cur.flatMap((id) => [nodes[id].left, nodes[id].right].filter((c) => c >= 0)); }
    steps.push({ line: "return", note: `Return [${res.join(", ")}]. That's the last value of each level. O(n) time, but every value is stored: O(n) space.`, view: view() });
    return steps;
  },
});
