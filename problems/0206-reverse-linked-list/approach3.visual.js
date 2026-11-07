// Walk the list once, turning each link around. prev is the reversed part, cur is the rest.
DSAViz.register("0206-reverse-linked-list/approach3", {
  inputs: [{ name: "head", type: "int[]", value: "[1, 2, 3, 4, 5]", minLength: 0, maxLength: 8, minValue: -5000, maxValue: 5000 }],
  trace({ head: vals }) {
    const n = vals.length;
    const nxt = vals.map((_, i) => (i + 1 < n ? i + 1 : -1));
    const steps = [];
    let prev = -1;
    let cur = n ? 0 : -1;
    const walk = (s) => { const out = []; for (let p = s; p !== -1 && out.length <= n; p = nxt[p]) out.push(p); return out; };
    const chain = (label, s, mark, extra = {}) => ({ type: "list", label, nodes: s === -1 ? [] : walk(s).map((i) => ({ value: String(vals[i]), caption: `node ${i}`, mark: extra[i] || mark })) });
    const view = (o = {}) => [
      chain("prev: the reversed part so far (yellow = just flipped)", prev, "match", o.pm || {}),
      chain("cur: the rest, not reversed yet (dark = cur)", cur, "", o.cm || {}),
      { type: "vars", items: [{ name: "nxt", value: o.nxt === undefined ? "-" : o.nxt === -1 ? "None" : `node ${o.nxt}` }] },
    ];
    steps.push({ line: "init", note: "prev = None (nothing reversed yet), cur = head.", view: view() });
    while (cur !== -1) {
      const save = nxt[cur];
      steps.push({ line: ["loop", "save"], note: `Save nxt = cur.next${save === -1 ? " (None)" : ` (node ${save})`} before the link is changed.`, view: view({ nxt: save, cm: { [cur]: "active" } }) });
      nxt[cur] = prev;
      const was = cur;
      [prev, cur] = [cur, save];
      steps.push({ line: ["flip", "step"], note: `node ${was}.next = prev: its link now points back. Move on: prev = node ${was}, cur = ${cur === -1 ? "None" : `node ${cur}`}.`, view: view({ nxt: save, pm: { [was]: "new" } }) });
    }
    steps.push({ line: "return", note: `Return [${walk(prev).map((i) => vals[i]).join(", ")}]. One pass, three pointers: O(n) time, O(1) space.`, view: view() });
    return steps;
  },
});
