// Recursion: reverse everything after head, then hang head after its old next, and make head the tail.
DSAViz.register("0206-reverse-linked-list/approach2", {
  inputs: [{ name: "head", type: "int[]", value: "[1, 2, 3, 4, 5]", minLength: 0, maxLength: 8, minValue: -5000, maxValue: 5000 }],
  trace({ head: vals }) {
    const n = vals.length;
    const nxt = vals.map((_, i) => (i + 1 < n ? i + 1 : -1)); // the real links, by node index
    const steps = [];
    const open = [];
    const walk = (s) => { const out = []; for (let p = s; p !== -1 && out.length <= n; p = nxt[p]) out.push(p); return out; };
    const chain = (label, s, marks = {}) => ({ type: "list", label, nodes: s === -1 ? [] : walk(s).map((i) => ({ value: String(vals[i]), caption: `node ${i}`, mark: marks[i] || "" })) });
    const view = (o = {}) => [
      chain("from the old head (node 0), following the links", n ? 0 : -1, o.marks),
      ...(o.newHead !== undefined ? [chain("from the new head, following the links", o.newHead, o.marks)] : []),
      { type: "array", label: "open calls reverseList(node), outermost first", values: open.map((i) => `node ${i}`), wide: true },
    ];
    if (!n) {
      steps.push({ line: "base", note: "Return []. head is None: nothing to reverse.", view: view() });
      return steps;
    }
    const rev = (h) => {
      open.push(h);
      if (nxt[h] === -1) {
        steps.push({ line: "base", note: `reverseList(node ${h}): one node left, already reversed. It's the new head; return it.`, view: view({ marks: { [h]: "match" }, newHead: h }) });
        open.pop();
        return h;
      }
      steps.push({ line: "call", note: `reverseList(node ${h}): first reverse everything after it, starting at node ${nxt[h]}.`, view: view({ marks: { [h]: "active" } }) });
      const nh = rev(nxt[h]);
      const after = nxt[h];
      nxt[after] = h;
      nxt[h] = -1;
      steps.push({ line: "link", note: `Back in reverseList(node ${h}): node ${after} is now the tail of the reversed part. Set node ${after}.next = node ${h}, and node ${h}.next = None.`, view: view({ marks: { [h]: "new", [after]: "active" }, newHead: nh }) });
      open.pop();
      return nh;
    };
    const nh = rev(0);
    steps.push({ line: "return", note: `Return [${walk(nh).map((i) => vals[i]).join(", ")}]. Every call passes the same new head up. O(n) time, O(n) call stack.`, view: view({ newHead: nh }) });
    return steps;
  },
});
