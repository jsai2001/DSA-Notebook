// Build level by level: start with [""], and for each digit extend every combination by each of its letters.
DSAViz.register("0017-letter-combinations-of-a-phone-number/approach1", {
  inputs: [{ name: "digits", type: "string", value: "23", maxLength: 3 }],
  trace({ digits }) {
    if (!/^[2-9]*$/.test(digits)) throw new DSAViz.InputError("digits can only use 2 to 9 (the keys that have letters).");
    const KEYS = { 2: "abc", 3: "def", 4: "ghi", 5: "jkl", 6: "mno", 7: "pqrs", 8: "tuv", 9: "wxyz" };
    const steps = [];
    const keypad = (k) => ({
      type: "map", label: "keypad", columns: ["digit", "letters"],
      entries: [...new Set(digits)].map((d) => [d, KEYS[d]]), marks: k !== undefined ? { [digits[k]]: "active" } : {},
    });
    const view = (k, combos, opts = {}) => [
      { type: "array", label: "digits", values: [...digits], marks: k !== undefined ? { [k]: "active" } : {}, pointers: k !== undefined ? { d: k } : {} },
      ...(digits ? [keypad(k)] : []),
      {
        type: "array", label: `combos (${combos.length})`, values: combos.map((c) => (c === "" ? '""' : c)), wide: true,
        marks: opts.fresh ? Object.fromEntries(combos.map((_, i) => [i, "new"])) : {},
      },
    ];
    if (!digits) {
      steps.push({ line: "empty", note: `No digits, so there's nothing to spell: return []. (Starting from [""] and skipping this check would wrongly return [""].)`, view: view(undefined, []) });
      return steps;
    }
    let combos = [""];
    steps.push({ line: "init", note: `Start with one empty combination, "", the only way to spell zero digits. Each digit multiplies the count by its number of letters.`, view: view(undefined, combos) });
    for (let k = 0; k < digits.length; k++) {
      const d = digits[k];
      steps.push({ line: "digit", note: `Digit ${d} has ${KEYS[d].length} letters: ${KEYS[d].split("").join(", ")}.`, view: view(k, combos) });
      const before = combos.length;
      combos = combos.flatMap((c) => KEYS[d].split("").map((ch) => c + ch));
      steps.push({
        line: "extend",
        note: `Add each of ${KEYS[d].split("").join(", ")} to each of the ${before} combination${before === 1 ? "" : "s"}: ${before} × ${KEYS[d].length} = ${combos.length}.`,
        view: view(k, combos, { fresh: true }),
      });
    }
    steps.push({
      line: "return",
      note: `Return all ${combos.length}. The output itself has up to 4ⁿ strings of length n, so no method can beat O(4ⁿ · n).`,
      view: view(undefined, combos),
    });
    return steps;
  },
});
