// Two stacks of indexes: unmatched "(" and unused "*". A ")" uses a "(" first; leftovers pair "(" with a later "*".
(function () {
DSAViz.register("0678-valid-parenthesis-string/approach2", {
  inputs: [{ name: "s", type: "string", value: "(*(*)*(", maxLength: 16, raw: true }],
  trace({ s: text }) {
    const s = parseS(text, 16);
    const steps = [];
    const opens = [];
    const stars = [];
    const used = {};
    const view = (i, o = {}) => {
      const marks = { ...used };
      if (i !== undefined) marks[i] = "active";
      (o.pairs || []).forEach((k) => (marks[k] = "match"));
      (o.bad || []).forEach((k) => (marks[k] = "cut"));
      return [
        { type: "array", label: "s (green = matched)", values: [...s], marks, pointers: i !== undefined ? { i } : {} },
        { type: "array", label: 'opens: indexes of unmatched "("', values: opens.map(String), compact: true },
        { type: "array", label: 'stars: indexes of unused "*"', values: stars.map(String), compact: true },
      ];
    };
    steps.push({ line: "init", note: 'Keep the indexes of every "(" not matched yet, and of every "*" not used yet.', view: view() });
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (c === "(") { opens.push(i); steps.push({ line: ["loop", "open"], note: `"(" at ${i}: push ${i} onto opens.`, view: view(i) }); continue; }
      if (c === "*") { stars.push(i); steps.push({ line: ["loop", "open", "star"], note: `"*" at ${i}: push ${i} onto stars, to decide later.`, view: view(i) }); continue; }
      if (opens.length) { const k = opens.pop(); used[k] = "match"; used[i] = "match"; steps.push({ line: ["loop", "open", "star", "close"], note: `")" at ${i}: close the "(" at ${k}, the nearest one.`, view: view(i) }); continue; }
      if (stars.length) { const k = stars.pop(); used[k] = "match"; used[i] = "match"; steps.push({ line: ["loop", "open", "star", "close"], note: `")" at ${i}: no "(" left, so the "*" at ${k} acts as "(".`, view: view(i) }); continue; }
      steps.push({ line: ["loop", "open", "star", "close"], note: `")" at ${i} with no "(" and no "*" before it. Return false.`, view: view(i, { bad: [i] }) });
      return steps;
    }
    while (opens.length && stars.length) {
      const o = opens.pop();
      const t = stars.pop();
      if (o > t) {
        steps.push({ line: "pair", note: `The last "(" is at ${o}, but the last "*" is at ${t}, before it: a "*" can't close a "(" that comes later. Return false.`, view: view(undefined, { bad: [o, t] }) });
        return steps;
      }
      used[o] = "match";
      used[t] = "match";
      steps.push({ line: "pair", note: `Leftover "(" at ${o} pairs with the "*" at ${t}, which comes after it and acts as ")".`, view: view(undefined, { pairs: [o, t] }) });
    }
    steps.push({
      line: "return",
      note: opens.length ? `${opens.length} "(" left with no "*" to close ${opens.length === 1 ? "it" : "them"}. Return false.` : `No "(" left over; any remaining "*" is just empty. Return true. O(n).`,
      view: view(undefined, { bad: opens }),
    });
    return steps;
  },
});

function parseS(text, maxLen) {
  const s = text.trim();
  if (!s.length || s.length > maxLen || !/^[()*]+$/.test(s)) throw new DSAViz.InputError(`s: 1 to ${maxLen} characters, each ( or ) or *.`);
  return s;
}
})();
