// Sorted backtracking: try candidates from `start` on, reuse the same one, and stop the loop at the first one that's too big.
DSAViz.register("0039-combination-sum/approach2", {
  inputs: [
    { name: "candidates", type: "int[]", value: "[2, 3, 6, 7]", minLength: 1, maxLength: 4, minValue: 2, maxValue: 40 },
    { name: "target", type: "int", value: "7", min: 1, max: 10 },
  ],
  trace({ candidates: raw, target }) {
    if (new Set(raw).size !== raw.length) throw new DSAViz.InputError("The candidates must all be different.");
    const cands = raw.slice().sort((a, b) => a - b);
    const steps = [];
    const result = [];
    const path = [];
    const fmt = (arr) => `[${arr.join(", ")}]`;
    // i: candidate being looked at; start: first allowed index
    const view = (start, i, remaining, opts = {}) => {
      const marks = {};
      cands.forEach((c, k) => {
        if (start !== undefined && k < start) marks[k] = "ghost";
        else if (opts.pruned !== undefined && k >= opts.pruned) marks[k] = "cut";
      });
      if (i !== undefined && i < cands.length && opts.pruned === undefined) marks[i] = opts.undo ? "visited" : "active";
      const pointers = {};
      if (start !== undefined && start < cands.length) pointers.start = start;
      if (i !== undefined && i < cands.length) pointers[i === start ? "start, i" : "i"] = i;
      if (i === start) delete pointers.start;
      return [
        { type: "array", label: "candidates (sorted; faded = before start)", values: cands, marks, pointers },
        { type: "array", label: "path", values: path.slice(), marks: opts.done ? Object.fromEntries(path.map((_, k) => [k, "match"])) : opts.added ? { [path.length - 1]: "new" } : {} },
        { type: "vars", items: [{ name: "remaining", value: remaining === undefined ? target : remaining, mark: remaining === 0 ? "match" : "" }] },
        { type: "array", label: `result (${result.length})`, values: result.map(fmt), wide: true, marks: opts.done ? { [result.length - 1]: "new" } : {} },
      ];
    };

    steps.push({
      line: "sort",
      note: `Sort the candidates: ${fmt(cands)}. Then a candidate that's too big means every later one is too big as well.`,
      view: view(0, undefined, target),
    });
    steps.push({ line: "start", note: `backtrack(0, ${target}): any candidate may be used, and ${target} is left to make.`, view: view(0, undefined, target) });
    function backtrack(start, remaining) {
      if (remaining === 0) {
        result.push(path.slice());
        steps.push({ line: "done", note: `remaining = 0: ${fmt(path)} adds up to ${target}. Add a copy to result.`, view: view(start, undefined, 0, { done: true }) });
        return;
      }
      steps.push({
        line: "call",
        note: `backtrack(${start}, ${remaining}): path ${fmt(path)}, ${remaining} still to make. Try candidates from index ${start} (${cands[start]}) on.`,
        view: view(start, undefined, remaining),
      });
      for (let i = start; i < cands.length; i++) {
        if (cands[i] > remaining) {
          steps.push({
            line: "prune",
            note: `${cands[i]} > ${remaining}: too big, and so is everything after it. Stop the loop${i + 1 < cands.length ? ` (${cands.length - i - 1} more skipped without a look)` : ""}.`,
            view: view(start, i, remaining, { pruned: i }),
          });
          break;
        }
        path.push(cands[i]);
        steps.push({
          line: "choose",
          note: `Take ${cands[i]}: path = ${fmt(path)}, ${remaining - cands[i]} left. Recurse with start = ${i}, so ${cands[i]} can be taken again but smaller ones can't come back.`,
          view: view(start, i, remaining - cands[i], { added: true }),
        });
        backtrack(i, remaining - cands[i]);
        path.pop();
        steps.push({ line: "undo", note: `Back: remove ${cands[i]}, so path = ${fmt(path)} again. Next, try the candidate after it.`, view: view(start, i, remaining, { undo: true }) });
      }
    }
    backtrack(0, target);
    steps.push({
      line: "return",
      note: result.length
        ? `Return ${result.length} combination${result.length === 1 ? "" : "s"}: ${result.map(fmt).join(", ")}. Each is built once, in non-decreasing order, so there are no duplicates.`
        : `Return []: no combination of the candidates adds up to ${target}.`,
      view: view(undefined, undefined, target),
    });
    return steps;
  },
});
