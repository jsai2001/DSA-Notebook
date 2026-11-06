// Index map and bounds: the next preorder value is the root of inorder[lo..hi]; its inorder index splits left from right.
DSAViz.register("0105-construct-binary-tree-from-preorder-and-inorder-traversal/approach2", {
  inputs: [
    { name: "preorder", type: "int[]", value: "[3, 9, 20, 15, 7]", minLength: 1, maxLength: 9 },
    { name: "inorder", type: "int[]", value: "[9, 3, 15, 20, 7]", minLength: 1, maxLength: 9 },
  ],
  trace({ preorder, inorder }) {
    if (preorder.length !== inorder.length) throw new DSAViz.InputError("preorder and inorder need the same number of values.");
    if (new Set(preorder).size !== preorder.length) throw new DSAViz.InputError("The values must all be different.");
    const where = new Map(inorder.map((v, i) => [v, i]));
    if (!preorder.every((v) => where.has(v))) throw new DSAViz.InputError("preorder and inorder must hold the same values.");
    // the tree being built: value -> { left, right } (values are unique)
    const kids = new Map();
    let rootVal = null;
    const level = () => {
      // level order with nulls, so the tree widget can draw it; also value -> index there
      if (rootVal === null) return { values: [], at: {} };
      const values = [], at = {}, q = [rootVal];
      while (q.length) {
        const v = q.shift();
        if (v === null) { values.push(null); continue; }
        at[v] = values.length;
        values.push(v);
        const k = kids.get(v);
        q.push(k.left, k.right);
      }
      while (values[values.length - 1] === null) values.pop();
      return { values, at };
    };
    const steps = [];
    let next = 0;
    const view = (o = {}) => {
      const { values, at } = level();
      const tm = {};
      if (o.cur !== undefined && at[o.cur] !== undefined) tm[at[o.cur]] = "new";
      const im = {};
      if (o.lo !== undefined) for (let i = o.lo; i <= o.hi; i++) im[i] = "window";
      if (o.k !== undefined) {
        for (let i = o.lo; i < o.k; i++) im[i] = "compare";
        im[o.k] = "match";
      }
      const pm = {};
      for (let i = 0; i < next; i++) pm[i] = "visited";
      if (o.cur !== undefined) pm[next - 1] = "match";
      return [
        values.length ? { type: "tree", label: "tree built so far (yellow = just added)", values, marks: tm } : { type: "array", label: "tree built so far: nothing yet", values: [] },
        { type: "array", label: "preorder (faded = already used as a root)", values: preorder, marks: pm, pointers: next < preorder.length ? { next } : {} },
        { type: "array", label: "inorder (outlined = this subtree; orange = goes left)", values: inorder, marks: im, pointers: o.k !== undefined ? { k: o.k } : {} },
      ];
    };
    steps.push({ line: "init", note: "Map each value to its index in inorder. The whole inorder list is the whole tree; the first preorder value is its root.", view: view({ lo: 0, hi: inorder.length - 1 }) });
    function build(lo, hi, parent, side) {
      if (lo > hi) return null;
      const v = preorder[next++];
      kids.set(v, { left: null, right: null });
      if (parent === null) rootVal = v;
      else kids.get(parent)[side] = v;
      const k = where.get(v);
      if (k < lo || k > hi) throw new DSAViz.InputError("These two lists can't come from the same tree. Try the preorder and inorder of one real tree.");
      steps.push({
        line: ["call", "root", "find"],
        note: `inorder[${lo}..${hi}]: the next preorder value, ${v}, is its root${parent === null ? "" : ` (the ${side} child of ${parent})`}. It's at index ${k} in inorder: ${k - lo} value${k - lo === 1 ? "" : "s"} on its left, ${hi - k} on its right.`,
        view: view({ lo, hi, k, cur: v }),
      });
      build(lo, k - 1, v, "left");
      build(k + 1, hi, v, "right");
      return v;
    }
    build(0, inorder.length - 1, null, null);
    steps.push({ line: "return", note: `Every value placed: return the root, ${rootVal}. One map lookup per node: O(n).`, view: view() });
    // the lists must really come from one tree: walk the result and compare
    const pre = [], ino = [];
    const walk = (v) => { if (v === null) return; pre.push(v); walk(kids.get(v).left); walk(kids.get(v).right); };
    const walkIn = (v) => { if (v === null) return; walkIn(kids.get(v).left); ino.push(v); walkIn(kids.get(v).right); };
    walk(rootVal);
    walkIn(rootVal);
    if (pre.join() !== preorder.join() || ino.join() !== inorder.join()) throw new DSAViz.InputError("These two lists can't come from the same tree. Try the preorder and inorder of one real tree.");
    return steps;
  },
});
