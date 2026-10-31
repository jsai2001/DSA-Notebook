// Backtracking: pick one letter per digit, go deeper, and undo the pick before trying the next letter.
DSAViz.register("0017-letter-combinations-of-a-phone-number/approach2", {
  inputs: [{ name: "digits", type: "string", value: "23", maxLength: 3 }],
  trace({ digits }) {
    if (!/^[2-9]*$/.test(digits)) throw new DSAViz.InputError("digits can only use 2 to 9 (the keys that have letters).");
    const KEYS = { 2: "abc", 3: "def", 4: "ghi", 5: "jkl", 6: "mno", 7: "pqrs", 8: "tuv", 9: "wxyz" };
    const steps = [];
    const result = [];
    const path = [];
    const view = (i, opts = {}) => {
      const dmarks = {};
      for (let k = 0; k < digits.length; k++) if (k < path.length) dmarks[k] = "visited";
      if (i !== undefined && i < digits.length) dmarks[i] = "active";
      const letters = i !== undefined && i < digits.length ? KEYS[digits[i]].split("") : [];
      const lmarks = {};
      if (opts.ch !== undefined) lmarks[letters.indexOf(opts.ch)] = opts.undo ? "visited" : "active";
      return [
        { type: "array", label: "digits", values: [...digits], marks: dmarks, pointers: i !== undefined && i < digits.length ? { i } : {} },
        ...(letters.length ? [{ type: "array", label: `letters for ${digits[i]}`, values: letters, marks: lmarks }] : []),
        { type: "array", label: "path (letters picked so far)", values: path.slice(), marks: opts.done ? Object.fromEntries(path.map((_, k) => [k, "match"])) : {} },
        { type: "array", label: `result (${result.length})`, values: result.slice(), wide: true, marks: opts.done ? { [result.length - 1]: "new" } : {} },
      ];
    };
    if (!digits) {
      steps.push({ line: "empty", note: `No digits: return []. Without this check, backtrack(0) would add the empty path and return [""].`, view: view() });
      return steps;
    }
    steps.push({ line: ["init", "start"], note: `backtrack(i) picks a letter for digits[i]. path holds the letters picked so far; it grows on the way down and shrinks on the way back.`, view: view(0) });
    function backtrack(i) {
      steps.push({ line: "call", note: i < digits.length ? `backtrack(${i}): choose a letter for digit ${digits[i]}.` : `backtrack(${i}): every digit has a letter.`, view: view(i) });
      if (i === digits.length) {
        result.push(path.join(""));
        steps.push({ line: "done", note: `Path "${path.join("")}" is complete: add it to result.`, view: view(i, { done: true }) });
        return;
      }
      for (const ch of KEYS[digits[i]]) {
        path.push(ch);
        steps.push({ line: "choose", note: `Try '${ch}' for digit ${digits[i]}: path = "${path.join("")}". Go deeper.`, view: view(i, { ch }) });
        backtrack(i + 1);
        path.pop();
        steps.push({ line: "undo", note: `Back from '${ch}': remove it, so path = "${path.join("")}" and the next letter can take its place.`, view: view(i, { ch, undo: true }) });
      }
    }
    backtrack(0);
    steps.push({
      line: "return",
      note: `Return all ${result.length}. Only one path is kept in memory at a time (length ≤ n), besides the answer itself.`,
      view: view(),
    });
    return steps;
  },
});
