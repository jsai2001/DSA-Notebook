// Copy only the letters and digits (lowercased), then compare the copy with its reverse.
DSAViz.register("0125-valid-palindrome/approach1", {
  inputs: [{ name: "s", type: "string", value: "Was it a cat I saw?", maxLength: 30, ascii: true }],
  trace({ s }) {
    const show = (c) => (c === " " ? "␣" : c);
    const chars = Array.from(s, show);
    const isAlnum = (c) => /[A-Za-z0-9]/.test(c);
    const steps = [];
    const sMarks = {};
    const cleaned = [];
    const view = (o = {}) => {
      const widgets = [
        { type: "array", label: "s (green = kept, grey = skipped)", values: chars, compact: true, marks: { ...sMarks, ...(o.at !== undefined ? { [o.at]: o.atMark || "active" } : {}) }, pointers: o.at !== undefined ? { c: o.at } : {} },
        { type: "array", label: "cleaned", values: [...cleaned], compact: true, marks: o.cMarks || (o.newAt !== undefined ? { [o.newAt]: "new" } : {}) },
      ];
      if (o.reversed) widgets.push({ type: "array", label: "cleaned reversed", values: o.reversed, compact: true, marks: o.cMarks });
      return widgets;
    };
    steps.push({ line: "init", note: "Start an empty copy. Only letters and digits go in, lowercased.", view: view() });
    for (let k = 0; k < s.length; k++) {
      const c = s[k];
      if (isAlnum(c)) {
        cleaned.push(c.toLowerCase());
        sMarks[k] = "match";
        steps.push({
          line: ["loop", "check", "keep"],
          note: `'${show(c)}' is a ${/[0-9]/.test(c) ? "digit" : "letter"}: add '${c.toLowerCase()}'.`,
          view: view({ at: k, newAt: cleaned.length - 1 }),
        });
      } else {
        sMarks[k] = "ghost";
        steps.push({ line: ["loop", "check"], note: `'${show(c)}' is not a letter or digit: skip it.`, view: view({ at: k, atMark: "ghost" }) });
      }
    }
    const word = cleaned.join("");
    steps.push({ line: "join", note: `The copy is "${word}" (${cleaned.length} characters). Now reverse it.`, view: view() });
    const reversed = [...cleaned].reverse();
    let diff = -1;
    for (let k = 0; k < cleaned.length; k++) if (cleaned[k] !== reversed[k]) { diff = k; break; }
    const cMarks = {};
    if (diff < 0) cleaned.forEach((_, k) => (cMarks[k] = "match"));
    else cMarks[diff] = "cut";
    steps.push({
      line: "compare",
      note:
        cleaned.length === 0
          ? "Return true: the copy is empty, and an empty string reads the same both ways."
          : diff < 0
            ? `Return true: "${word}" is the same backwards.`
            : `Return false: position ${diff} is '${cleaned[diff]}' forwards but '${reversed[diff]}' backwards.`,
      view: view({ reversed, cMarks }),
    });
    return steps;
  },
});
