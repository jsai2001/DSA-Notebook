// Sliding window with last-seen index: jump left straight past the previous copy.
DSAViz.register("0003-longest-substring-without-repeating-characters/approach3", {
  // "tmmzuxt" shows why the last[ch] >= left check matters (the second 't').
  inputs: [{ name: "s", type: "string", value: "tmmzuxt", maxLength: 12, ascii: true }],

  trace({ s }) {
    const n = s.length;
    const show = (c) => (c === " " ? "␣" : c);
    const chars = Array.from(s, show);
    const steps = [];
    const last = new Map(); // char -> last index, in first-seen order
    let left = 0;
    let best = 0;
    let bestRange = null;

    const bestText = () => (bestRange ? `"${chars.slice(bestRange[0], bestRange[1] + 1).join("")}"` : '""');
    const view = (right, opts = {}) => {
      const marks = {};
      const end = opts.included ? right : right - 1;
      for (let k = left; k <= Math.min(end, n - 1); k++) marks[k] = "window";
      if (opts.prev !== undefined) marks[opts.prev] = opts.stale ? "visited" : "compare";
      if (right < n && !opts.included && !opts.final) marks[right] = "active";
      if (opts.final && bestRange) for (let k = bestRange[0]; k <= bestRange[1]; k++) marks[k] = "match";
      const pointers = opts.final ? {} : { left };
      if (right < n && !opts.final) pointers.right = right;
      return [
        { type: "array", label: "s", values: chars, pointers, marks },
        {
          type: "map",
          label: "last {char: last index}",
          columns: ["char", "index"],
          entries: Array.from(last.entries()).map(([c, i]) => [show(c), i]),
          marks: opts.mapMarks || {},
        },
        {
          type: "vars",
          items: [
            { name: "left", value: left, mark: opts.jumped ? "new" : "" },
            { name: "best", value: `${best} (${bestText()})`, mark: opts.newBest ? "match" : "" },
          ],
        },
      ];
    };

    steps.push({
      line: "init",
      note: "Remember the last index of every character. The window is s[left..right].",
      view: view(-1),
    });

    for (let right = 0; right < n; right++) {
      const c = s[right];
      const k = show(c);
      steps.push({
        line: "loop",
        note: `right = ${right}: next character is '${k}'.`,
        view: view(right),
      });

      if (last.has(c)) {
        const prev = last.get(c);
        if (prev >= left) {
          steps.push({
            line: "check",
            note: `'${k}' was last seen at ${prev}, which is inside the window (>= left = ${left}).`,
            view: view(right, { prev, mapMarks: { [k]: "match" } }),
          });
          left = prev + 1;
          steps.push({
            line: "jump",
            note: `Jump left straight to ${prev} + 1 = ${left}, past the old '${k}'. No step-by-step shrinking.`,
            view: view(right, { jumped: true }),
          });
        } else {
          steps.push({
            line: "check",
            note: `'${k}' was last seen at ${prev}, but that's before left = ${left}, so it's stale. Don't move left (moving it back would break the window).`,
            view: view(right, { prev, stale: true, mapMarks: { [k]: "new" } }),
          });
        }
      } else {
        steps.push({
          line: "check",
          note: `'${k}' hasn't been seen before, so the window can just grow.`,
          view: view(right),
        });
      }

      last.set(c, right);
      const len = right - left + 1;
      const newBest = len > best;
      if (newBest) {
        best = len;
        bestRange = [left, right];
      }
      steps.push({
        line: "record",
        note:
          `Record last['${k}'] = ${right}. Window "${chars.slice(left, right + 1).join("")}" has length ${len}.` +
          (newBest ? " New best." : ` best stays ${best}.`),
        view: view(right, { included: true, mapMarks: { [k]: "new" }, newBest }),
      });
    }

    steps.push({
      line: "return",
      note:
        n === 0
          ? "The string is empty, so the answer is 0."
          : `Return ${best} (${bestText()}). One pass with O(1) work per character.`,
      view: view(n, { final: true }),
    });
    return steps;
  },
});
