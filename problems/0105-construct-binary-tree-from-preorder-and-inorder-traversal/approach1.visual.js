// Recursion with slices: preorder[0] is the root; its index k in inorder splits both lists into a left part of k values and the rest.
DSAViz.register("0105-construct-binary-tree-from-preorder-and-inorder-traversal/approach1", {
  inputs: [
    { name: "preorder", type: "int[]", value: "[3, 9, 20, 15, 7]", minLength: 1, maxLength: 9 },
    { name: "inorder", type: "int[]", value: "[9, 3, 15, 20, 7]", minLength: 1, maxLength: 9 },
  ],
  trace({ preorder, inorder }) {
    const bad = "These two lists can't come from the same tree. Try the preorder and inorder of one real tree.";
    if (preorder.length !== inorder.length) throw new DSAViz.InputError("preorder and inorder need the same number of values.");
    if (new Set(preorder).size !== preorder.length) throw new DSAViz.InputError("The values must all be different.");
    const kids = new Map();
    let rootVal = null;
    let copied = 0; // values copied into slices so far
    const level = () => {
      if (rootVal === null) return { values: [], at: {} };
      const values = [], at = {}, q = [rootVal];
      while (q.length) {
        const v = q.shift();
        if (v === null) { values.push(null); continue; }
        at[v] = values.length;
        values.push(v);
        q.push(kids.get(v).left, kids.get(v).right);
      }
      while (values[values.length - 1] === null) values.pop();
      return { values, at };
    };
    const steps = [];
    const view = (pre, ino, o = {}) => {
      const { values, at } = level();
      const tm = {};
      if (o.cur !== undefined) tm[at[o.cur]] = "new";
      const pm = {}, im = {};
      if (o.k !== undefined) {
        pm[0] = "match";
        for (let i = 1; i <= o.k; i++) pm[i] = "compare";
        for (let i = 0; i < o.k; i++) im[i] = "compare";
        im[o.k] = "match";
      }
      return [
        values.length ? { type: "tree", label: "tree built so far (yellow = just added)", values, marks: tm } : { type: "array", label: "tree built so far: nothing yet", values: [] },
        { type: "array", label: "this call's preorder slice (green = root, orange = left part)", values: pre, marks: pm },
        { type: "array", label: "this call's inorder slice (orange = left part)", values: ino, marks: im, pointers: o.k !== undefined ? { k: o.k } : {} },
        { type: "vars", items: [{ name: "values copied into slices", value: copied }] },
      ];
    };
    steps.push({ line: "root", note: "preorder[0] is the root. Where it sits in inorder splits the rest into left and right.", view: view(preorder, inorder) });
    function build(pre, ino, parent, side) {
      if (!pre.length) return;
      const v = pre[0];
      const k = ino.indexOf(v);
      if (k < 0 || pre.length !== ino.length) throw new DSAViz.InputError(bad);
      kids.set(v, { left: null, right: null });
      if (parent === null) rootVal = v;
      else kids.get(parent)[side] = v;
      steps.push({
        line: ["root", "find", "left", "right"],
        note: `${v} is first in this preorder slice: the root${parent === null ? "" : ` (the ${side} child of ${parent})`}. Searching inorder finds it at index ${k}, so the left subtree has ${k} value${k === 1 ? "" : "s"}: preorder[1..${k}] and inorder[0..${k - 1}].`,
        view: view(pre, ino, { k, cur: v }),
      });
      copied += pre.length - 1 + ino.length - 1;
      build(pre.slice(1, k + 1), ino.slice(0, k), v, "left");
      build(pre.slice(k + 1), ino.slice(k + 1), v, "right");
    }
    build(preorder, inorder, null, null);
    const pre = [], ino = [];
    const walk = (v) => { if (v === null) return; pre.push(v); walk(kids.get(v).left); walk(kids.get(v).right); };
    const walkIn = (v) => { if (v === null) return; walkIn(kids.get(v).left); ino.push(v); walkIn(kids.get(v).right); };
    walk(rootVal);
    walkIn(rootVal);
    if (pre.join() !== preorder.join() || ino.join() !== inorder.join()) throw new DSAViz.InputError(bad);
    steps.push({ line: "return", note: `Return the root, ${rootVal}. ${copied} values were copied into new slices along the way, and every root was searched for in inorder: that's the O(n²) cost.`, view: view([], []) });
    return steps;
  },
});
