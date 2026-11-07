// DFS right child first, carrying the depth: the first node reached at each depth is the rightmost.
DSAViz.register("0199-binary-tree-right-side-view/approach3", {
  inputs: [{ name: "root", type: "tree", value: "[1, 2, 3, 4, null, null, null, 5]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const res = [];
    const marks = {};
    const captions = {};
    const view = (o = {}) => {
      const m = { ...marks };
      if (o.at !== undefined) m[o.at] = o.first ? "match" : "active";
      return [
        { type: "tree", label: "tree (under each node: its depth; dark = this call, green = first at its depth, dashed = visited)", values, marks: m, captions: { ...captions } },
        { type: "array", label: "res[d] = first value seen at depth d", values: res.slice(), compact: true, marks: o.first ? { [res.length - 1]: "new" } : {} },
      ];
    };
    steps.push({ line: "init", note: "dfs(root, 0). Visit the right child before the left one.", view: view() });
    const dfs = (id, depth) => {
      if (id < 0) return;
      captions[id] = `depth ${depth}`;
      const first = depth === res.length;
      if (first) res.push(nodes[id].val);
      steps.push({
        line: first ? ["call", "first"] : ["call"],
        note: first ? `${nodes[id].val} is the first node reached at depth ${depth}. Since right goes first, nothing at this depth is further right: res[${depth}] = ${nodes[id].val}.` : `${nodes[id].val} at depth ${depth}: res already has a value for this depth (${res[depth]}), which is further right. Skip.`,
        view: view({ at: id, first }),
      });
      marks[id] = first ? "match" : "visited";
      dfs(nodes[id].right, depth + 1);
      dfs(nodes[id].left, depth + 1);
    };
    dfs(root, 0);
    steps.push({ line: "return", note: `Return [${res.join(", ")}]. Each node is visited once: O(n) time, O(height) for the calls.`, view: view() });
    return steps;
  },
});
