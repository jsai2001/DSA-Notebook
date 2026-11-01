// Sorted backtracking: each number once (recurse with i + 1), and skip a value already tried at this position.
DSAViz.register("0040-combination-sum-ii/approach2", {
  inputs: [
    { name: "candidates", type: "int[]", value: "[10, 1, 2, 7, 6, 1, 5]", minLength: 1, maxLength: 8, minValue: 1, maxValue: 50 },
    { name: "target", type: "int", value: "8", min: 1, max: 12 },
  ],
  trace({ candidates: raw, target }) {
    const cands = raw.slice().sort((a, b) => a - b);
    const steps = [];
    const result = [];
    const path = [];
    const fmt = (arr) => `[${arr.join(", ")}]`;
    const view = (start, i, remaining, opts = {}) => {
      const marks = {};
      cands.forEach((_, k) => {
        if (start !== undefined && k < start) marks[k] = "ghost";
        else if (opts.pruned !== undefined && k >= opts.pruned) marks[k] = "cut";
      });
      if (i !== undefined && i < cands.length && opts.pruned === undefined) marks[i] = opts.mark || "active";
      const pointers = {};
      if (start !== undefined && start < cands.length) pointers[i === start ? "start, i" : "start"] = start;
      if (i !== undefined && i !== start && i < cands.length) pointers.i = i;
      return [
        { type: "array", label: "candidates (sorted; faded = before start)", values: cands, marks, pointers },
        { type: "array", label: "path", values: path.slice(), marks: opts.done ? Object.fromEntries(path.map((_, k) => [k, "match"])) : opts.added ? { [path.length - 1]: "new" } : {} },
        { type: "vars", items: [{ name: "remaining", value: remaining, mark: remaining === 0 ? "match" : "" }] },
        { type: "array", label: `result (${result.length})`, values: result.map(fmt), wide: true, marks: opts.done ? { [result.length - 1]: "new" } : {} },
      ];
    };

    steps.push({ line: "sort", note: `Sort: ${fmt(cands)}. Equal values now sit side by side, and a too-big value means everything after it is too big.`, view: view(0, undefined, target) });
    steps.push({ line: "start", note: `backtrack(0, ${target}).`, view: view(0, undefined, target) });
    function backtrack(start, remaining) {
      if (remaining === 0) {
        result.push(path.slice());
        steps.push({ line: "done", note: `remaining = 0: ${fmt(path)} adds up to ${target}. Add a copy to result.`, view: view(start, undefined, 0, { done: true }) });
        return;
      }
      steps.push({ line: "call", note: `backtrack(${start}, ${remaining}): path ${fmt(path)}. Pick the next number from index ${start} on.`, view: view(start, undefined, remaining) });
      for (let i = start; i < cands.length; i++) {
        if (i > start && cands[i] === cands[i - 1]) {
          steps.push({
            line: "same",
            note: `cands[${i}] = ${cands[i]} equals the ${cands[i]} just tried in this position. Starting with it again would build the same combinations: skip.`,
            view: view(start, i, remaining, { mark: "visited" }),
          });
          continue;
        }
        if (cands[i] > remaining) {
          steps.push({ line: "prune", note: `${cands[i]} > ${remaining}: too big, and so is everything after it. Stop.`, view: view(start, i, remaining, { pruned: i }) });
          break;
        }
        path.push(cands[i]);
        steps.push({
          line: "choose",
          note: `Take cands[${i}] = ${cands[i]}: path = ${fmt(path)}, ${remaining - cands[i]} left. Recurse from i + 1 = ${i + 1}: this copy can't be used again${i + 1 < cands.length && cands[i + 1] === cands[i] ? `, but the next ${cands[i]} still can` : ""}.`,
          view: view(start, i, remaining - cands[i], { added: true }),
        });
        backtrack(i + 1, remaining - cands[i]);
        path.pop();
        steps.push({ line: "undo", note: `Back: remove ${cands[i]}, path = ${fmt(path)}.`, view: view(start, i, remaining, { mark: "visited" }) });
      }
    }
    backtrack(0, target);
    steps.push({
      line: "return",
      note: result.length
        ? `Return ${result.length}: ${result.map(fmt).join(", ")}. Each was built exactly once, so no set was needed.`
        : `Return []: no combination adds up to ${target}.`,
      view: view(undefined, undefined, target),
    });
    return steps;
  },
});
