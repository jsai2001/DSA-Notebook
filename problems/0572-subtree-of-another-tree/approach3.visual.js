// Number every subtree by (value, left number, right number): equal subtrees get equal numbers, so compare numbers instead of trees.
DSAViz.register("0572-subtree-of-another-tree/approach3", {
  inputs: [
    { name: "root", type: "tree", value: "[1, 2, 2, 3, null, 3, 4]", maxLength: 15 },
    { name: "subRoot", type: "tree", value: "[2, 3]", maxLength: 7 },
  ],
  trace({ root: rootValues, subRoot: subValues }) {
    const A = DSAViz.buildTree(rootValues);
    const B = DSAViz.buildTree(subValues);
    const ids = new Map(); // "val,l,r" -> number
    const capA = {};
    const capB = {};
    const steps = [];
    let target = null;
    const table = () => [...ids.entries()].map(([key, id]) => `#${id} = (${key})`);
    const view = (tree, current, o = {}) => {
      const am = {};
      const bm = {};
      Object.keys(capA).forEach((id) => (am[id] = "visited"));
      Object.keys(capB).forEach((id) => (bm[id] = "visited"));
      if (o.hits) o.hits.forEach((id) => (am[id] = "match"));
      if (o.whole) Object.keys(capB).forEach((id) => (bm[id] = "match"));
      if (current !== undefined) (tree === "A" ? am : bm)[current] = o.fresh ? "new" : "active";
      return [
        { type: "tree", label: "subRoot (caption = its number)", values: subValues, marks: bm, captions: { ...capB } },
        { type: "tree", label: "root", values: rootValues, marks: am, captions: { ...capA } },
        { type: "array", label: "ids: (value, left #, right #) → number (#0 = empty)", values: table(), wide: true, marks: o.fresh ? { [ids.size - 1]: "new" } : {} },
        ...(target !== null ? [{ type: "vars", items: [{ name: "target", value: `#${target}` }] }] : []),
      ];
    };
    steps.push({ line: "init", note: `Give every distinct subtree a number. Empty is #0. A node's number depends only on (its value, its left child's number, its right child's number).`, view: view() });
    const tag = (T, tree, caps, id, out) => {
      if (id < 0) return 0;
      const node = T.nodes[id];
      const l = tag(T, tree, caps, node.left, out);
      const r = tag(T, tree, caps, node.right, out);
      const key = `${node.val}, ${l}, ${r}`;
      const fresh = !ids.has(key);
      if (fresh) ids.set(key, ids.size + 1);
      const num = ids.get(key);
      caps[id] = `#${num}`;
      out.push([id, num]);
      steps.push({
        line: ["tag", "key"],
        note: fresh
          ? `${node.val}: key (${key}) is new, so it gets the next number, #${num}.`
          : `${node.val}: key (${key}) was seen before, so this subtree is equal to that one: #${num}.`,
        view: view(tree, id, { fresh }),
      });
      return num;
    };
    target = tag(B, "B", capB, B.root, []);
    steps.push({ line: "target", note: `subRoot as a whole is #${target}. Now number root's subtrees with the same table: any node that gets #${target} is an exact copy.`, view: view("B", undefined, { whole: true }) });
    const everywhere = [];
    tag(A, "A", capA, A.root, everywhere);
    const hits = everywhere.filter(([, num]) => num === target).map(([id]) => id);
    steps.push({
      line: ["scan", "return"],
      note: hits.length
        ? `${hits.length === 1 ? "One node" : `${hits.length} nodes`} of root got #${target} (${hits.map((id) => A.nodes[id].val).join(", ")}): a copy of subRoot. Return true.`
        : `No node of root got #${target}. Return false. Each node was numbered once, with a hash map lookup: O(m + n).`,
      view: view("A", undefined, { hits }),
    });
    return steps;
  },
});
