// Stack: push each opener; each closer must match the top of the stack. Valid if the stack ends empty.
DSAViz.register("0020-valid-parentheses/approach2", {
  inputs: [{ name: "s", type: "string", value: "{[()]}", maxLength: 14 }],
  trace({ s }) {
    if (!s.length || !/^[()[\]{}]+$/.test(s)) throw new DSAViz.InputError("s needs 1 to 14 characters, all from ( ) [ ] { }.");
    const opener = { ")": "(", "]": "[", "}": "{" };
    const steps = [];
    const stack = [];
    const view = (i, opts = {}) => {
      const marks = {};
      for (let k = 0; k < (i === undefined ? s.length : i); k++) marks[k] = "visited";
      if (i !== undefined && i < s.length) marks[i] = opts.bad ? "compare" : opts.good ? "match" : "active";
      const smarks = {};
      if (stack.length) smarks[stack.length - 1] = opts.bad ? "compare" : opts.good ? "match" : opts.pushed ? "new" : "";
      return [
        { type: "array", label: "s", values: [...s], marks, pointers: i !== undefined && i < s.length ? { i } : {}, compact: s.length > 10 },
        { type: "array", label: "stack (bottom → top): openers waiting to be closed", values: stack.slice(), marks: smarks },
      ];
    };
    if (s.length % 2) {
      steps.push({ line: "odd", note: `Length ${s.length} is odd: brackets come in pairs, so return false right away.`, view: view() });
      return steps;
    }
    steps.push({ line: "init", note: `Even length, so it could be valid. Go left to right; the stack holds the brackets that are still open, most recent on top.`, view: view(0) });
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (!(ch in opener)) {
        stack.push(ch);
        steps.push({ line: ["loop", "open"], note: `'${ch}' opens: push it and wait for its closer.`, view: view(i, { pushed: true }) });
        continue;
      }
      if (!stack.length) {
        steps.push({ line: ["loop", "close", "mismatch"], note: `'${ch}' closes, but nothing is open: return false.`, view: view(i, { bad: true }) });
        return steps;
      }
      const top = stack[stack.length - 1];
      if (top !== opener[ch]) {
        steps.push({ line: ["loop", "close", "mismatch"], note: `'${ch}' needs '${opener[ch]}' on top, but the most recent open bracket is '${top}': return false.`, view: view(i, { bad: true }) });
        return steps;
      }
      steps.push({ line: ["loop", "close", "match"], note: `'${ch}' matches '${top}' on top: pop it.`, view: view(i, { good: true }) });
      stack.pop();
    }
    steps.push({
      line: "return",
      note: stack.length
        ? `The end, but ${stack.length} bracket${stack.length === 1 ? " is" : "s are"} still open (${stack.join(" ")}): return false.`
        : `The end, and the stack is empty: every bracket was closed in the right order. Return true. One pass: O(n).`,
      view: view(undefined),
    });
    return steps;
  },
});
