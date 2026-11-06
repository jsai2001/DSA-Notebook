// Write each tree as text (pre-order, "#" for a missing child), then compare the two texts.
DSAViz.register("0100-same-tree/approach1", {
  inputs: [
    { name: "p", type: "tree", value: "[1, 2]", maxLength: 11 },
    { name: "q", type: "tree", value: "[1, null, 2]", maxLength: 11 },
  ],
  trace({ p: pv, q: qv }) {
    const P = DSAViz.buildTree(pv);
    const Q = DSAViz.buildTree(qv);
    const steps = [];
    const out = { p: [], q: [] };
    const done = { p: {}, q: {} };
    const view = (which, at, o = {}) => {
      const tm = (k) => {
        const m = { ...done[k] };
        if (which === k && at >= 0) m[at] = "active";
        return m;
      };
      const diff = o.diff ?? -1;
      const sm = (k) => {
        const m = {};
        out[k].forEach((_, i) => (m[i] = o.final ? (i === diff ? "cut" : i < diff || diff < 0 ? "match" : "") : ""));
        if (!o.final && which === k && out[k].length) m[out[k].length - 1] = "new";
        return m;
      };
      return [
        { type: "tree", label: "p", values: pv, marks: tm("p") },
        { type: "array", label: "text of p", values: out.p.slice(), marks: sm("p") },
        { type: "tree", label: "q", values: qv, marks: tm("q") },
        { type: "array", label: "text of q", values: out.q.slice(), marks: sm("q") },
      ];
    };
    steps.push({ line: "init", note: 'Write each tree in pre-order (node, then left, then right), with "#" for every missing child.', view: view() });
    for (const [k, T] of [["p", P], ["q", Q]]) {
      const walk = (id, from) => {
        if (id < 0) {
          out[k].push("#");
          steps.push({ line: "write", note: `${k}: ${from} is missing: write "#". That's what keeps the shape in the text.`, view: view(k, -1) });
          return;
        }
        out[k].push(String(T.nodes[id].val));
        done[k][id] = "visited";
        steps.push({ line: "write", note: `${k}: write ${T.nodes[id].val}.`, view: view(k, id) });
        walk(T.nodes[id].left, `the left child of ${T.nodes[id].val}`);
        walk(T.nodes[id].right, `the right child of ${T.nodes[id].val}`);
      };
      walk(T.root, "the root");
    }
    const a = out.p, b = out.q;
    let diff = -1;
    for (let i = 0; i < Math.max(a.length, b.length); i++) if (a[i] !== b[i]) { diff = i; break; }
    steps.push({
      line: "compare",
      note: diff < 0 ? "The two texts are the same: return true." : `The texts first differ at position ${diff}: "${a[diff] ?? "(end)"}" vs "${b[diff] ?? "(end)"}". Return false.`,
      view: view(undefined, -1, { final: true, diff }),
    });
    return steps;
  },
});
