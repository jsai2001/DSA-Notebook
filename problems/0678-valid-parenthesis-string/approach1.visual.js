// Try every meaning of each "*" ("(", ")" or nothing), stopping a path as soon as a ")" has nothing to close.
(function () {
DSAViz.register("0678-valid-parenthesis-string/approach1", {
  inputs: [{ name: "s", type: "string", value: "(*))", maxLength: 10, raw: true }],
  trace({ s: text }) {
    const s = parseS(text, 10);
    const steps = [];
    const LIMIT = 150;
    let wanted = 0;
    let calls = 0;
    const path = [];
    const push = (st) => { wanted++; if (steps.length < LIMIT) steps.push(st); };
    const view = (i, open, o = {}) => [
      { type: "array", label: "s", values: [...s], marks: Object.fromEntries([...s].map((_, k) => [k, k < i ? "visited" : k === i ? "active" : ""])), pointers: i < s.length ? { i } : {} },
      { type: "array", label: "choices on this path (what each character became)", values: [...path], compact: true, marks: o.last ? { [path.length - 1]: "new" } : {} },
      { type: "vars", items: [{ name: "open", value: open, mark: open < 0 ? "cut" : "" }, { name: "calls", value: calls }] },
    ];
    push({ line: "init", note: 'ok(i, open): can s[i:] be finished with `open` "(" still waiting? A "*" branches three ways.', view: view(0, 0) });
    const ok = (i, open) => {
      calls++;
      if (open < 0) { push({ line: "dead", note: `open = ${open}: a ")" had nothing to close. This path fails.`, view: view(i, open) }); return false; }
      if (i === s.length) {
        push({ line: "end", note: open === 0 ? `End of s with open = 0: everything closed. Valid: ${path.join("")}.` : `End of s with ${open} "(" never closed. This path fails.`, view: view(i, open) });
        return open === 0;
      }
      const c = s[i];
      if (c !== "*") {
        path.push(c);
        push({ line: "try", note: `s[${i}] = "${c}": open becomes ${open + (c === "(" ? 1 : -1)}.`, view: view(i, open, { last: true }) });
        const r = ok(i + 1, open + (c === "(" ? 1 : -1));
        path.pop();
        return r;
      }
      for (const [as, d] of [["(", 1], [")", -1], ["·", 0]]) {
        path.push(as);
        push({ line: ["try", "star"], note: `s[${i}] = "*": try it as ${as === "·" ? "nothing" : `"${as}"`}.`, view: view(i, open, { last: true }) });
        const r = ok(i + 1, open + d);
        path.pop();
        if (r) return true;
      }
      return false;
    };
    const r = ok(0, 0);
    steps.push({ line: "init", note: `Return ${r}. ${calls} calls${wanted > LIMIT ? ` (only the first ${LIMIT} of ${wanted} steps are shown)` : ""}. Each "*" can triple the work: O(3^k) for k stars.`, view: view(s.length, 0) });
    return steps;
  },
});

function parseS(text, maxLen) {
  const s = text.trim();
  if (!s.length || s.length > maxLen || !/^[()*]+$/.test(s)) throw new DSAViz.InputError(`s: 1 to ${maxLen} characters, each ( or ) or *.`);
  return s;
}
})();
