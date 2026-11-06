// One pass with a stack: each new preorder value is the top's left child, unless inorder says the top's left side is done.
DSAViz.register("0105-construct-binary-tree-from-preorder-and-inorder-traversal/approach3", {
  inputs: [
    { name: "preorder", type: "int[]", value: "[3, 9, 20, 15, 7]", minLength: 1, maxLength: 9 },
    { name: "inorder", type: "int[]", value: "[9, 3, 15, 20, 7]", minLength: 1, maxLength: 9 },
  ],
  trace({ preorder, inorder }) {
    const bad = "These two lists can't come from the same tree. Try the preorder and inorder of one real tree.";
    if (preorder.length !== inorder.length) throw new DSAViz.InputError("preorder and inorder need the same number of values.");
    if (new Set(preorder).size !== preorder.length) throw new DSAViz.InputError("The values must all be different.");
    if ([...preorder].sort((a, b) => a - b).join() !== [...inorder].sort((a, b) => a - b).join()) throw new DSAViz.InputError("preorder and inorder must hold the same values.");
    const kids = new Map();
    const rootVal = preorder[0];
    kids.set(rootVal, { left: null, right: null });
    const level = () => {
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
    const stack = [rootVal];
    let j = 0;
    let i = 1;
    const view = (o = {}) => {
      const { values, at } = level();
      const tm = {};
      stack.forEach((v) => (tm[at[v]] = "compare"));
      if (o.cur !== undefined) tm[at[o.cur]] = "new";
      const pm = {};
      for (let k = 0; k < i; k++) pm[k] = "visited";
      const im = {};
      for (let k = 0; k < j; k++) im[k] = "visited";
      return [
        { type: "tree", label: "tree built so far (orange = on the stack, still waiting for a right child; yellow = just added)", values, marks: tm },
        { type: "array", label: "preorder", values: preorder, marks: pm, pointers: i < preorder.length ? { i } : {} },
        { type: "array", label: "inorder (faded = reached)", values: inorder, marks: im, pointers: j < inorder.length ? { j } : {} },
        { type: "array", label: "stack (bottom → top)", values: stack.slice(), marks: stack.length ? { [stack.length - 1]: "active" } : {} },
      ];
    };
    steps.push({ line: "init", note: `The root is ${rootVal}. Push it; j points at inorder[0] = ${inorder[0]}.`, view: view() });
    for (; i < preorder.length; ) {
      const v = preorder[i];
      const top = stack[stack.length - 1];
      kids.set(v, { left: null, right: null });
      if (top !== inorder[j]) {
        kids.get(top).left = v;
        i++;
        stack.push(v);
        steps.push({ line: ["loop", "left", "push"], note: `${v}: the top, ${top}, isn't inorder[${j}] = ${inorder[j]} yet, so its left side isn't finished. ${v} is ${top}'s left child. Push it.`, view: view({ cur: v }) });
      } else {
        const popped = [];
        let parent = null;
        while (stack.length && stack[stack.length - 1] === inorder[j]) {
          parent = stack.pop();
          popped.push(parent);
          j++;
        }
        if (parent === null) throw new DSAViz.InputError(bad);
        kids.get(parent).right = v;
        i++;
        stack.push(v);
        steps.push({
          line: ["loop", "climb", "right", "push"],
          note: `${v}: the top matches inorder, so pop while it does: ${popped.join(", ")}. Inorder has reached ${parent}, so everything left of it is built: ${v} is ${parent}'s right child. Push it.`,
          view: view({ cur: v }),
        });
      }
    }
    const pre = [], ino = [];
    const walk = (v) => { if (v === null) return; pre.push(v); walk(kids.get(v).left); walk(kids.get(v).right); };
    const walkIn = (v) => { if (v === null) return; walkIn(kids.get(v).left); ino.push(v); walkIn(kids.get(v).right); };
    walk(rootVal);
    walkIn(rootVal);
    if (pre.join() !== preorder.join() || ino.join() !== inorder.join()) throw new DSAViz.InputError(bad);
    steps.push({ line: "return", note: `All of preorder placed: return the root, ${rootVal}. Each node was pushed and popped at most once: O(n).`, view: view() });
    return steps;
  },
});
