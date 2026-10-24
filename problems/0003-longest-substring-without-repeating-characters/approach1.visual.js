// Brute force: from every start j, extend i until the first repeated character.
DSAViz.register("0003-longest-substring-without-repeating-characters/approach1", {
  inputs: [{ name: "s", type: "string", value: "pwwkew", maxLength: 10, ascii: true }],

  trace({ s }) {
    const n = s.length;
    const show = (c) => (c === " " ? "␣" : c);
    const chars = Array.from(s, show);
    const steps = [];

    if (n === 0) {
      return [{ line: "empty", note: "The string is empty, so the answer is 0.", view: [{ type: "array", label: "s", values: [] }] }];
    }

    let best = 1;
    let bestRange = [0, 0];
    const view = (j, i, run, opts = {}) => {
      const marks = {};
      for (let k = j; k < j + run.length; k++) marks[k] = "window";
      if (i < n) marks[i] = opts.repeat ? "compare" : "active";
      const pointers = { j };
      if (i < n) pointers.i = i;
      return [
        { type: "array", label: "s", values: chars, pointers, marks },
        { type: "set", label: "hash (chars in this run)", items: run.map(show), marks: opts.setMarks || {} },
        {
          type: "vars",
          items: [
            { name: "run length", value: run.length },
            {
              name: "max_sub_len",
              value: `${best} ("${chars.slice(bestRange[0], bestRange[1] + 1).join("")}")`,
              mark: opts.newBest ? "match" : "",
            },
          ],
        },
      ];
    };

    steps.push({
      line: "init",
      note: `Allocate tracker, an n × n = ${n} × ${n} = ${n * n} cell table. Only one value per run is ever needed, so this is the O(n²) memory cost.`,
      view: [{ type: "array", label: "s", values: chars }],
    });

    let checks = 0;
    for (let j = 0; j < n; j++) {
      const run = [];
      steps.push({
        line: "outer",
        note: `Start a new run at j = ${j} with an empty hash.`,
        view: view(j, j, run),
      });
      let i = j;
      for (; i < n; i++) {
        checks++;
        const c = s[i];
        if (run.includes(c)) {
          steps.push({
            line: "repeat",
            note: `'${show(c)}' is already in this run, so stop. The run from j = ${j} has length ${run.length}.`,
            view: view(j, i, run, { repeat: true, setMarks: { [show(c)]: "compare" } }),
          });
          break;
        }
        run.push(c);
        const len = i - j + 1;
        const newBest = len > best;
        if (newBest) {
          best = len;
          bestRange = [j, i];
        }
        steps.push({
          line: "extend",
          note:
            `'${show(c)}' is new in this run: tracker[${i}][${j}] = ${len}.` +
            (newBest ? ` That's a new best, max_sub_len = ${len}.` : ""),
          view: view(j, i, run, { setMarks: { [show(c)]: "new" }, newBest }),
        });
      }
      if (i === n) {
        steps.push({
          line: "outer",
          note: `Reached the end of the string; the run from j = ${j} has length ${run.length}.`,
          view: view(j, n, run),
        });
      }
    }

    steps.push({
      line: "return",
      note: `Return ${best} ("${chars.slice(bestRange[0], bestRange[1] + 1).join("")}"). Every start re-scans its run from scratch: ${checks} character checks for n = ${n}.`,
      view: view(bestRange[0], n, Array.from(s.slice(bestRange[0], bestRange[1] + 1))),
    });
    return steps;
  },
});
