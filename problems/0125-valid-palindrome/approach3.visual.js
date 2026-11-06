// Two pointers on s itself: skip anything that isn't a letter or digit, compare lowercased.
DSAViz.register("0125-valid-palindrome/approach3", {
  inputs: [{ name: "s", type: "string", value: "A man, a plan, a canal: Panama", maxLength: 30, ascii: true }],
  trace({ s }) {
    const show = (c) => (c === " " ? "␣" : c);
    const chars = Array.from(s, show);
    const isAlnum = (c) => /[A-Za-z0-9]/.test(c);
    const steps = [];
    const marks = {};
    let i = 0;
    let j = s.length - 1;
    let compared = 0;
    const view = (o = {}) => [
      { type: "array", label: "s (grey = skipped, green = matched)", values: chars, compact: true, marks: { ...marks, ...(o.marks || {}) }, pointers: o.noPtr || !s.length ? {} : { i, j } },
      { type: "vars", items: [{ name: "pairs compared", value: compared }, { name: "extra memory", value: "none" }] },
    ];
    steps.push({ line: "init", note: `i starts at the front (0), j at the back (${j}). No copy of the string.`, view: view() });
    const list = (from, to) => Array.from(s.slice(from, to), (c) => `'${show(c)}'`).join(", ");
    while (i < j) {
      const i0 = i;
      while (i < j && !isAlnum(s[i])) marks[i++] = "ghost";
      if (i > i0) steps.push({ line: "skipleft", note: `Skip ${list(i0, i)} from the left: i = ${i}.`, view: view() });
      const j0 = j;
      while (i < j && !isAlnum(s[j])) marks[j--] = "ghost";
      if (j < j0) steps.push({ line: "skipright", note: `Skip ${list(j + 1, j0 + 1)} from the right: j = ${j}.`, view: view() });
      const a = s[i].toLowerCase();
      const b = s[j].toLowerCase();
      compared++;
      const same = a === b;
      const caseNote = s[i] !== s[j] && same ? " (case doesn't matter)" : "";
      steps.push({
        line: "compare",
        note:
          i === j
            ? `i and j met at s[${i}] = '${show(s[i])}': it equals itself.`
            : same
              ? `s[${i}] = '${show(s[i])}' and s[${j}] = '${show(s[j])}' match${caseNote}.`
              : `s[${i}] = '${show(s[i])}' lowercases to '${a}', s[${j}] = '${show(s[j])}' to '${b}'.`,
        view: view({ marks: { [i]: same ? "match" : "cut", [j]: same ? "match" : "cut" } }),
      });
      if (!same) {
        steps.push({ line: "false", note: `Return false: '${a}' ≠ '${b}'. Compared ${compared} pair${compared === 1 ? "" : "s"}.`, view: view({ marks: { [i]: "cut", [j]: "cut" } }) });
        return steps;
      }
      marks[i] = isAlnum(s[i]) ? "match" : "ghost";
      marks[j] = isAlnum(s[j]) ? "match" : "ghost";
      i++;
      j--;
      steps.push({ line: "move", note: `Move both inward: i = ${i}, j = ${j}.`, view: view() });
    }
    steps.push({
      line: "true",
      note: `Return true: i and j crossed with every pair matching (${compared} compared), and no extra memory used.`,
      view: view({ noPtr: true }),
    });
    return steps;
  },
});
