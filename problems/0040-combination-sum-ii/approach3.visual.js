// Group equal numbers: for each distinct value, choose how many of its copies to use (0, 1, ... up to what exists and fits).
DSAViz.register("0040-combination-sum-ii/approach3", {
  inputs: [
    { name: "candidates", type: "int[]", value: "[2, 5, 2, 1, 2]", minLength: 1, maxLength: 8, minValue: 1, maxValue: 50 },
    { name: "target", type: "int", value: "5", min: 1, max: 12 },
  ],
  trace({ candidates: raw, target }) {
    const tally = new Map();
    raw.forEach((v) => tally.set(v, (tally.get(v) || 0) + 1));
    const counts = [...tally.entries()].sort((a, b) => a[0] - b[0]);
    const steps = [];
    const result = [];
    const path = [];
    const fmt = (arr) => `[${arr.join(", ")}]`;
    const view = (k, remaining, opts = {}) => {
      const marks = {};
      if (k !== undefined) counts.forEach((_, j) => j < k && (marks[j] = "ghost"));
      if (k !== undefined && k < counts.length) marks[k] = opts.mark || "active";
      const items = [{ name: "remaining", value: remaining, mark: remaining === 0 ? "match" : "" }];
      if (opts.used !== undefined) items.push({ name: `copies of ${counts[k][0]}`, value: `${opts.used} of ${opts.most}` });
      return [
        { type: "array", label: "distinct values × how many times each appears", values: counts.map(([v, c]) => `${v} ×${c}`), wide: true, marks, pointers: k !== undefined && k < counts.length ? { k } : {} },
        { type: "array", label: "path", values: path.slice(), marks: opts.done ? Object.fromEntries(path.map((_, j) => [j, "match"])) : opts.added ? { [path.length - 1]: "new" } : {} },
        { type: "vars", items },
        { type: "array", label: `result (${result.length})`, values: result.map(fmt), wide: true, marks: opts.done ? { [result.length - 1]: "new" } : {} },
      ];
    };

    steps.push({
      line: "count",
      note: `Count each value: ${counts.map(([v, c]) => `${v} ×${c}`).join(", ")}. Equal numbers are now one choice, "how many?", so duplicates can't arise.`,
      view: view(0, target),
    });
    steps.push({ line: "start", note: `backtrack(0, ${target}): start with the smallest value.`, view: view(0, target) });
    function backtrack(k, remaining) {
      if (remaining === 0) {
        result.push(path.slice());
        steps.push({ line: ["call", "done"], note: `remaining = 0: ${fmt(path)} adds up to ${target}. Add it.`, view: view(k, 0, { done: true }) });
        return;
      }
      if (k === counts.length || counts[k][0] > remaining) {
        steps.push({
          line: ["call", "dead"],
          note: k === counts.length ? `No values left, still ${remaining} short. Dead end.` : `${counts[k][0]} > ${remaining}: this value and every bigger one are too big. Dead end.`,
          view: view(k, remaining, { mark: "cut" }),
        });
        return;
      }
      const [value, count] = counts[k];
      const most = Math.min(count, Math.floor(remaining / value));
      steps.push({
        line: ["call", "none"],
        note: `Value ${value}: there are ${count}, and ${Math.floor(remaining / value)} would fit in ${remaining}, so use 0 to ${most}. First, use none.`,
        view: view(k, remaining, { used: 0, most }),
      });
      backtrack(k + 1, remaining);
      for (let used = 1; used <= most; used++) {
        path.push(value);
        steps.push({
          line: "copies",
          note: `Use ${used} cop${used === 1 ? "y" : "ies"} of ${value}: path = ${fmt(path)}, ${remaining - used * value} left. Go on to the next value.`,
          view: view(k, remaining - used * value, { used, most, added: true }),
        });
        backtrack(k + 1, remaining - used * value);
      }
      path.splice(path.length - most, most);
      steps.push({
        line: "undo",
        note: most ? `Done with ${value}: take its ${most} cop${most === 1 ? "y" : "ies"} off the path, path = ${fmt(path)}.` : `Done with ${value}: no copies fit, so there's nothing to take off.`,
        view: view(k, remaining),
      });
    }
    backtrack(0, target);
    steps.push({
      line: "return",
      note: result.length ? `Return ${result.length}: ${result.map(fmt).join(", ")}.` : `Return []: no combination adds up to ${target}.`,
      view: view(undefined, target),
    });
    return steps;
  },
});
