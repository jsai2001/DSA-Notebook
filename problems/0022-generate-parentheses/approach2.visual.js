// Backtracking: add '(' while some are left, add ')' only when it closes something, undo and try the other.
DSAViz.register("0022-generate-parentheses/approach2", {
  inputs: [{ name: "n", type: "int", value: "2", min: 1, max: 3 }],
  trace({ n }) {
    const steps = [];
    const result = [];
    const path = [];
    const view = (opened, closed, opts = {}) => {
      const marks = {};
      if (opts.done) path.forEach((_, k) => (marks[k] = "match"));
      else if (opts.added) marks[path.length - 1] = "new";
      const widgets = [
        { type: "array", label: `path (length ${path.length} of ${2 * n})`, values: path.slice(), marks },
      ];
      if (opened !== undefined) {
        widgets.push({
          type: "vars",
          items: [
            { name: "opened", value: `${opened} of ${n}` },
            { name: "closed", value: `${closed}` },
          ],
        });
      }
      widgets.push({
        type: "array",
        label: `result (${result.length})`,
        values: result.slice(),
        wide: true,
        marks: opts.done ? { [result.length - 1]: "new" } : {},
      });
      return widgets;
    };

    steps.push({
      line: ["init", "start"],
      note: `Build the string one bracket at a time. Two rules keep every path valid: '(' while opened < ${n}, and ')' only while closed < opened.`,
      view: view(0, 0),
    });
    function backtrack(opened, closed) {
      const p = `"${path.join("")}"`;
      if (path.length === 2 * n) {
        steps.push({ line: "call", note: `backtrack(${opened}, ${closed}): path ${p} has all ${n} pairs.`, view: view(opened, closed) });
        result.push(path.join(""));
        steps.push({ line: "done", note: `${p} is complete and valid by construction: add it to result.`, view: view(opened, closed, { done: true }) });
        return;
      }
      const canOpen = opened < n;
      const canClose = closed < opened;
      const options = [];
      options.push(canOpen ? `'(' is allowed (${opened} < ${n})` : `no '(' left (${opened} = ${n})`);
      options.push(canClose ? `')' is allowed (${closed} < ${opened})` : `')' isn't (nothing open to close)`);
      steps.push({ line: "call", note: `backtrack(${opened}, ${closed}), path ${path.length ? p : "empty"}: ${options.join(", ")}.`, view: view(opened, closed) });
      if (canOpen) {
        path.push("(");
        steps.push({ line: "open", note: `Add '(': path = "${path.join("")}". Go deeper.`, view: view(opened + 1, closed, { added: true }) });
        backtrack(opened + 1, closed);
        path.pop();
        steps.push({
          line: "undo-open",
          note: `Back: remove that '(' so path = ${path.length ? `"${path.join("")}"` : "empty"} again${canClose ? ", and try ')' here" : ""}.`,
          view: view(opened, closed),
        });
      }
      if (canClose) {
        path.push(")");
        steps.push({ line: "close", note: `Add ')': path = "${path.join("")}". Go deeper.`, view: view(opened, closed + 1, { added: true }) });
        backtrack(opened, closed + 1);
        path.pop();
        steps.push({ line: "undo-close", note: `Back: remove that ')' so path = "${path.join("")}" again. Both choices here are done.`, view: view(opened, closed) });
      }
    }
    backtrack(0, 0);
    steps.push({
      line: "return",
      note: `Return all ${result.length}. Nothing invalid was ever built, so there's nothing to throw away, and only one path (length ≤ ${2 * n}) is kept besides the answer.`,
      view: view(),
    });
    return steps;
  },
});
