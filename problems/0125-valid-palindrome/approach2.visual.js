// Copy only the letters and digits (lowercased), then walk two pointers in from both ends.
DSAViz.register("0125-valid-palindrome/approach2", {
  inputs: [{ name: "s", type: "string", value: "race a car", maxLength: 30, ascii: true }],
  trace({ s }) {
    const show = (c) => (c === " " ? "␣" : c);
    const chars = Array.from(s, show);
    const isAlnum = (c) => /[A-Za-z0-9]/.test(c);
    const cleaned = Array.from(s).filter(isAlnum).map((c) => c.toLowerCase());
    const sMarks = {};
    Array.from(s).forEach((c, k) => {
      if (!isAlnum(c)) sMarks[k] = "ghost";
    });
    const steps = [];
    const marks = {};
    let i = 0;
    let j = cleaned.length - 1;
    const view = (o = {}) => {
      const m = { ...marks, ...(o.marks || {}) };
      const pointers = o.noPtr ? {} : { i, j };
      return [
        { type: "array", label: "s (grey = dropped)", values: chars, compact: true, marks: sMarks },
        { type: "array", label: "cleaned", values: cleaned, compact: true, marks: m, pointers: cleaned.length ? pointers : {} },
      ];
    };
    steps.push({
      line: "clean",
      note: `Keep the letters and digits, lowercased: "${cleaned.join("")}"${cleaned.length ? "" : " (empty)"}.`,
      view: view({ noPtr: true }),
    });
    steps.push({ line: "init", note: `i starts at the front (0), j at the back (${j}).`, view: view() });
    while (i < j) {
      const same = cleaned[i] === cleaned[j];
      steps.push({
        line: ["loop", "compare"],
        note: same ? `cleaned[${i}] = '${cleaned[i]}' and cleaned[${j}] = '${cleaned[j]}' match.` : `cleaned[${i}] = '${cleaned[i]}' but cleaned[${j}] = '${cleaned[j]}'.`,
        view: view({ marks: { [i]: same ? "match" : "cut", [j]: same ? "match" : "cut" } }),
      });
      if (!same) {
        steps.push({ line: "false", note: `Return false: '${cleaned[i]}' ≠ '${cleaned[j]}', so it doesn't read the same backwards.`, view: view({ marks: { [i]: "cut", [j]: "cut" } }) });
        return steps;
      }
      marks[i] = "match";
      marks[j] = "match";
      i++;
      j--;
      steps.push({ line: "move", note: `Move both inward: i = ${i}, j = ${j}.`, view: view() });
    }
    if (i === j) marks[i] = "match";
    steps.push({
      line: "true",
      note: cleaned.length === 0 ? "Return true: nothing to compare, and an empty string is a palindrome." : `Return true: every pair matched${i === j ? ` (the middle '${cleaned[i]}' pairs with itself)` : ""}.`,
      view: view({ noPtr: true }),
    });
    return steps;
  },
});
