// BFS one level at a time: the last node popped from each level is the one seen from the right.
DSAViz.register("0199-binary-tree-right-side-view/approach2", {
  inputs: [{ name: "root", type: "tree", value: "[1, 2, 3, 4, null, null, null, 5]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const res = [];
    const marks = {};
    let queue = [];
    const view = (o = {}) => {
      const m = { ...marks };
      if (o.at !== undefined) m[o.at] = o.last ? "match" : "active";
      return [
        { type: "tree", label: "tree (dark = popped now, green = rightmost of its level, dashed = done)", values, marks: m },
        { type: "array", label: "queue (front on the left)", values: queue.map((id) => nodes[id].val), compact: true },
        { type: "array", label: "res", values: res.slice(), compact: true, marks: o.last ? { [res.length - 1]: "new" } : {} },
        { type: "vars", items: [{ name: "k", value: o.k === undefined ? "-" : o.k }, { name: "size", value: o.size === undefined ? "-" : o.size }] },
      ];
    };
    if (root < 0) {
      steps.push({ line: "empty", note: "Return []. The tree is empty.", view: view() });
      return steps;
    }
    queue = [root];
    steps.push({ line: "init", note: "Put the root in the queue.", view: view() });
    while (queue.length) {
      const size = queue.length;
      steps.push({ line: "level", note: `The queue holds exactly one level: ${size} node${size > 1 ? "s" : ""}. Pop that many.`, view: view({ size }) });
      for (let k = 0; k < size; k++) {
        const id = queue.shift();
        const last = k === size - 1;
        if (last) res.push(nodes[id].val);
        const kids = [nodes[id].left, nodes[id].right].filter((c) => c >= 0);
        queue.push(...kids);
        steps.push({
          line: last ? ["pop", "last", "push"] : ["pop", "push"],
          note: `Pop ${nodes[id].val} (k = ${k} of ${size}).${last ? ` It's the last of its level: add ${nodes[id].val} to res.` : ""}${kids.length ? ` Push its children: ${kids.map((c) => nodes[c].val).join(", ")}.` : ""}`,
          view: view({ at: id, last, k, size }),
        });
        marks[id] = last ? "match" : "visited";
      }
    }
    steps.push({ line: "return", note: `Return [${res.join(", ")}]. Each node is popped once: O(n) time, O(width) for the queue.`, view: view() });
    return steps;
  },
});
