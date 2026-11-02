// Write both trees as preorder lists with ∅ for every missing child, then find subRoot's list inside root's with KMP.
DSAViz.register("0572-subtree-of-another-tree/approach2", {
  inputs: [
    { name: "root", type: "tree", value: "[3, 4, 5, 1, 2]", maxLength: 7 },
    { name: "subRoot", type: "tree", value: "[4, 1, 2]", maxLength: 3 },
  ],
  trace({ root: rootValues, subRoot: subValues }) {
    const A = DSAViz.buildTree(rootValues);
    const B = DSAViz.buildTree(subValues);
    const NONE = "∅";
    // preorder tokens, plus the root node id behind each value token
    const walk = (T, id, out, ids) => {
      if (id < 0) {
        out.push(NONE);
        ids.push(-1);
        return;
      }
      out.push(T.nodes[id].val);
      ids.push(id);
      walk(T, T.nodes[id].left, out, ids);
      walk(T, T.nodes[id].right, out, ids);
    };
    const text = [];
    const textIds = [];
    walk(A, A.root, text, textIds);
    const pattern = [];
    walk(B, B.root, pattern, []);
    const fail = Array(pattern.length).fill(0);
    let k = 0;
    for (let i = 1; i < pattern.length; i++) {
      while (k && pattern[i] !== pattern[k]) k = fail[k - 1];
      if (pattern[i] === pattern[k]) k++;
      fail[i] = k;
    }
    const steps = [];
    let showTable = false;
    const view = (o = {}) => {
      const tm = {};
      for (let j = 0; j < (o.i ?? 0); j++) tm[j] = "visited";
      if (o.i !== undefined) {
        for (let j = o.i - (o.k || 0); j < o.i; j++) tm[j] = "match"; // the part already matched
        tm[o.i] = o.hit === false ? "cut" : "active";
      }
      if (o.found !== undefined) for (let j = o.found; j < o.found + pattern.length; j++) tm[j] = "match";
      const pm = {};
      for (let j = 0; j < (o.k ?? 0); j++) pm[j] = "match";
      if (o.i !== undefined && o.k !== undefined && o.k < pattern.length) pm[o.k] = o.hit === false ? "cut" : "compare";
      const am = {};
      if (o.found !== undefined) {
        // the matched tokens are exactly one subtree of root: colour its nodes
        for (let j = o.found; j < o.found + pattern.length; j++) if (textIds[j] >= 0) am[textIds[j]] = "match";
      }
      return [
        { type: "tree", label: "root", values: rootValues, marks: am },
        { type: "array", label: "text = preorder(root) (∅ = missing child)", values: text, marks: tm, pointers: o.i !== undefined && o.i < text.length ? { i: o.i } : {} },
        {
          type: "array",
          label: showTable ? "pattern = preorder(subRoot), fail[] underneath" : "pattern = preorder(subRoot)",
          values: pattern,
          sub: showTable ? fail : undefined,
          marks: pm,
          pointers: o.k !== undefined && o.k < pattern.length ? { k: o.k } : {},
        },
      ];
    };
    steps.push({
      line: "walk",
      note: `Write each tree in preorder, with ∅ for every missing child. The ∅s pin down the shape: [1, 2] and [1, null, 2] are both 1, 2 without them.`,
      view: view(),
    });
    showTable = true;
    steps.push({
      line: "table",
      note: `KMP's fail table: fail[j] is how long a start of pattern also ends pattern[0..j]. On a mismatch, k falls back to it instead of restarting.`,
      view: view(),
    });
    k = 0;
    for (let i = 0; i < text.length; i++) {
      const x = text[i];
      const backs = [];
      while (k && x !== pattern[k]) {
        backs.push(k);
        k = fail[k - 1];
      }
      const line = backs.length ? ["search", "back"] : "search";
      if (x === pattern[k]) {
        k++;
        if (k === pattern.length) {
          const start = i - pattern.length + 1;
          steps.push({
            line: ["search", "found"],
            note: `text[${i}] = ${x} matches: all ${pattern.length} tokens of pattern appear in a row, starting at text[${start}]. Those tokens are exactly the subtree under ${A.nodes[textIds[start]].val}. Return true.`,
            view: view({ found: start }),
          });
          return steps;
        }
        steps.push({
          line,
          note: `${backs.length ? `Mismatch, so k falls back (${backs.join(" → ")} → ${k - 1}). ` : ""}text[${i}] = ${x} = pattern[${k - 1}]: k = ${k} of ${pattern.length}.`,
          view: view({ i, k: k - 1, hit: true }),
        });
      } else {
        steps.push({
          line,
          note: `${backs.length ? `Mismatch, so k falls back (${backs.join(" → ")} → 0). ` : ""}text[${i}] = ${x} ≠ pattern[0] = ${pattern[0]}: k stays 0.`,
          view: view({ i, k: 0, hit: false }),
        });
      }
    }
    steps.push({
      line: "return",
      note: `The end of text, and pattern never matched all the way. Return false. Both lists have about 2 tokens per node, and KMP reads text once: O(m + n).`,
      view: view({ i: text.length, k }),
    });
    return steps;
  },
});
