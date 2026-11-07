// Track the range [lo, hi] of how many "(" could be open: "(" +1, ")" -1, "*" widens it. Never let lo go below 0.
(function () {
DSAViz.register("0678-valid-parenthesis-string/approach3", {
  inputs: [{ name: "s", type: "string", value: "(*))", maxLength: 16, raw: true }],
  trace({ s: text }) {
    const s = parseS(text, 16);
    const steps = [];
    let lo = 0;
    let hi = 0;
    const view = (i, o = {}) => {
      const range = [];
      for (let k = Math.max(lo, 0); k <= hi; k++) range.push(k);
      return [
        { type: "array", label: "s", values: [...s], marks: Object.fromEntries([...s].map((_, k) => [k, k < (i ?? s.length) ? "visited" : k === i ? "active" : ""])), pointers: i !== undefined ? { i } : {} },
        { type: "array", label: 'possible numbers of open "(" right now (lo to hi)', values: range.map(String), compact: true, marks: o.zero && range[0] === 0 ? { 0: "match" } : {} },
        { type: "vars", items: [{ name: "lo", value: lo, mark: o.clamped ? "new" : lo < 0 ? "cut" : "" }, { name: "hi", value: hi, mark: hi < 0 ? "cut" : "" }] },
      ];
    };
    steps.push({ line: "init", note: 'Before anything, exactly 0 "(" are open: lo = hi = 0.', view: view(undefined) });
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      let line;
      let what;
      if (c === "(") { lo++; hi++; line = ["loop", "open"]; what = `"(": every count goes up by 1`; }
      else if (c === ")") { lo--; hi--; line = ["loop", "open", "close"]; what = `")": every count goes down by 1`; }
      else { lo--; hi++; line = ["loop", "open", "close", "star"]; what = `"*": it could be ")" (lo − 1) or "(" (hi + 1)`; }
      if (hi < 0) {
        steps.push({ line: [...line, "fail"], note: `${what}. hi = ${hi}: even with every "*" as "(", there are too many ")". Return false.`, view: view(i) });
        return steps;
      }
      const clamped = lo < 0;
      const before = lo;
      lo = Math.max(lo, 0);
      steps.push({ line: [...line, "fail", "clamp"], note: `${what}: lo = ${before}, hi = ${hi}.${clamped ? ' lo can\'t be negative: those choices would close a "(" that isn\'t there, so lo = 0.' : ""}`, view: view(i, { clamped }) });
    }
    steps.push({
      line: "return",
      note: lo === 0 ? `lo = 0: some way of reading the "*"s closes everything. Return true. One pass, two numbers: O(n) time, O(1) memory.` : `lo = ${lo}: at least ${lo} "(" can't be closed. Return false.`,
      view: view(undefined, { zero: true }),
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
