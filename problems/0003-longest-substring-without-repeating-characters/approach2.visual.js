// Sliding window with a set: grow on the right, shrink from the left while there's a duplicate.
DSAViz.register("0003-longest-substring-without-repeating-characters/approach2", {
  inputs: [{ name: "s", type: "string", value: "abcabcbb", maxLength: 12, ascii: true }],

  trace({ s }) {
    const n = s.length;
    const show = (c) => (c === " " ? "␣" : c);
    const chars = Array.from(s, show);
    const steps = [];
    const window = []; // chars in s[left..right-1], in order
    let left = 0;
    let best = 0;
    let bestRange = null;

    const bestText = () => (bestRange ? `"${chars.slice(bestRange[0], bestRange[1] + 1).join("")}"` : '""');
    const view = (right, opts = {}) => {
      const marks = {};
      for (let k = left; k < Math.min(right + (opts.included ? 1 : 0), n); k++) marks[k] = "window";
      if (opts.leaving !== undefined) marks[opts.leaving] = "cut";
      if (right < n && !opts.included) marks[right] = opts.dup ? "compare" : "active";
      if (opts.final && bestRange) for (let k = bestRange[0]; k <= bestRange[1]; k++) marks[k] = "match";
      const pointers = opts.final ? {} : { left };
      if (right < n && !opts.final) pointers.right = right;
      return [
        { type: "array", label: "s", values: chars, pointers, marks },
        { type: "set", label: "window", items: window.map(show), marks: opts.setMarks || {} },
        {
          type: "vars",
          items: [{ name: "best", value: `${best} (${bestText()})`, mark: opts.newBest ? "match" : "" }],
        },
      ];
    };

    steps.push({
      line: "init",
      note: "Keep one window s[left..right] with no repeats, plus a set of its characters.",
      view: view(n === 0 ? 0 : -1),
    });

    for (let right = 0; right < n; right++) {
      const c = s[right];
      steps.push({
        line: "loop",
        note: `right = ${right}: next character is '${show(c)}'.`,
        view: view(right),
      });
      while (window.includes(c)) {
        steps.push({
          line: "dup",
          note: `'${show(c)}' is already in the window, so shrink it from the left.`,
          view: view(right, { dup: true, setMarks: { [show(c)]: "compare" } }),
        });
        const out = s[left];
        steps.push({
          line: "shrink",
          note: `Remove s[${left}] = '${show(out)}' and move left to ${left + 1}.`,
          view: view(right, { dup: true, leaving: left, setMarks: { [show(out)]: "cut" } }),
        });
        window.splice(window.indexOf(out), 1);
        left++;
      }
      window.push(c);
      const len = right - left + 1;
      const newBest = len > best;
      if (newBest) {
        best = len;
        bestRange = [left, right];
      }
      steps.push({
        line: "add",
        note:
          `Add '${show(c)}'. The window "${chars.slice(left, right + 1).join("")}" has length ${len}.` +
          (newBest ? " New best." : ` best stays ${best}.`),
        view: view(right, { included: true, setMarks: { [show(c)]: "new" }, newBest }),
      });
    }

    steps.push({
      line: "return",
      note:
        n === 0
          ? "The string is empty, so the answer is 0."
          : `Return ${best} (${bestText()}). Each character entered and left the window at most once, so it's O(n).`,
      view: view(n, { final: true }),
    });
    return steps;
  },
});
