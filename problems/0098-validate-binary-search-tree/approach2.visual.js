// In-order walk with a stack: a BST's values come out sorted, so each one must be bigger than the one before.
DSAViz.register("0098-validate-binary-search-tree/approach2", {
  inputs: [{ name: "root", type: "tree", value: "[5, 4, 6, null, null, 3, 7]", maxLength: 15 }],
  trace({ root: values }) {
    const { root, nodes } = DSAViz.buildTree(values);
    const steps = [];
    const marks = {};
    const order = []; // values visited so far, in order
    const stack = [];
    let prev = null;
    const view = (cur, o = {}) => {
      const m = { ...marks };
      stack.forEach((id) => (m[id] = m[id] || "new"));
      if (cur !== undefined) m[cur] = o.mark || "active";
      const om = {};
      if (o.compare) {
        om[order.length - 1] = o.bad ? "cut" : "match";
        if (order.length > 1) om[order.length - 2] = "compare";
      }
      return [
        { type: "tree", label: "tree (yellow = on the stack, faded = visited)", values, marks: m },
        { type: "array", label: "stack (bottom → top)", values: stack.map((id) => nodes[id].val), marks: stack.length ? { [stack.length - 1]: "active" } : {} },
        { type: "array", label: "values in order (must go up)", values: order.slice(), marks: om },
        { type: "vars", items: [{ name: "prev", value: prev === null ? "none yet" : prev }] },
      ];
    };
    steps.push({ line: "init", note: "Walk the tree in order: left subtree, then the node, then the right subtree. In a BST that visits the values smallest first.", view: view() });
    let node = root;
    while (stack.length || node >= 0) {
      const pushed = [];
      while (node >= 0) {
        stack.push(node);
        pushed.push(nodes[node].val);
        node = nodes[node].left;
      }
      if (pushed.length) steps.push({ line: ["loop", "left"], note: `Go left as far as possible, pushing ${pushed.join(", ")}.`, view: view() });
      node = stack.pop();
      const v = nodes[node].val;
      order.push(v);
      const bad = prev !== null && v <= prev;
      if (bad) {
        marks[node] = "cut";
        steps.push({ line: ["visit", "check", "bad"], note: `Pop ${v}. It comes right after ${prev} in order but isn't bigger (${v} ≤ ${prev}). Not a BST: return false.`, view: view(node, { mark: "cut", compare: true, bad: true }) });
        steps.push({ line: "bad", note: "Return false, without visiting the rest.", view: view() });
        return steps;
      }
      steps.push({ line: ["visit", "check"], note: prev === null ? `Pop ${v}: the smallest value, nothing to compare with yet.` : `Pop ${v}: bigger than ${prev}, the one before it. Still in order.`, view: view(node, { mark: "visited", compare: true }) });
      marks[node] = "visited";
      prev = v;
      const right = nodes[node].right;
      steps.push({ line: "right", note: right >= 0 ? `Now ${v}'s right subtree, starting at ${nodes[right].val}.` : `${v} has no right child: go back to the stack.`, view: view() });
      node = right;
    }
    steps.push({ line: "return", note: `Every value was bigger than the one before (${order.join(" < ")}): return true.`, view: view() });
    return steps;
  },
});
