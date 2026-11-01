// Take or skip: at each step, either take candidates[i] (and stay at i) or skip it for good (move to i + 1).
DSAViz.register("0039-combination-sum/approach1", {
  inputs: [
    { name: "candidates", type: "int[]", value: "[2, 3, 5]", minLength: 1, maxLength: 4, minValue: 2, maxValue: 40 },
    { name: "target", type: "int", value: "5", min: 1, max: 10 },
  ],
  trace({ candidates: cands, target }) {
    if (new Set(cands).size !== cands.length) throw new DSAViz.InputError("The candidates must all be different.");
    const steps = [];
    const result = [];
    const path = [];
    let calls = 0;
    const fmt = (arr) => `[${arr.join(", ")}]`;
    const view = (i, remaining, opts = {}) => {
      const marks = {};
      cands.forEach((_, k) => {
        if (i !== undefined && k < i) marks[k] = "ghost";
      });
      if (i !== undefined && i < cands.length) marks[i] = opts.mark || "active";
      return [
        { type: "array", label: "candidates (faded = skipped for good on this branch)", values: cands, marks, pointers: i !== undefined && i < cands.length ? { i } : {} },
        { type: "array", label: "path", values: path.slice(), marks: opts.done ? Object.fromEntries(path.map((_, k) => [k, "match"])) : opts.added ? { [path.length - 1]: "new" } : {} },
        {
          type: "vars",
          items: [
            { name: "remaining", value: remaining, mark: remaining === 0 ? "match" : remaining < 0 ? "cut" : "" },
            { name: "calls so far", value: calls },
          ],
        },
        { type: "array", label: `result (${result.length})`, values: result.map(fmt), wide: true, marks: opts.done ? { [result.length - 1]: "new" } : {} },
      ];
    };

    steps.push({ line: "start", note: `dfs(0, ${target}): for each candidate in turn, either take it (maybe again) or skip it forever.`, view: view(0, target) });
    function dfs(i, remaining) {
      calls++;
      if (remaining === 0) {
        result.push(path.slice());
        steps.push({ line: ["call", "done"], note: `dfs(${i}, 0): ${fmt(path)} adds up to ${target}. Add a copy to result.`, view: view(i, 0, { done: true }) });
        return;
      }
      if (i === cands.length || remaining < 0) {
        steps.push({
          line: ["call", "dead"],
          note: remaining < 0 ? `dfs(${i}, ${remaining}): overshot ${target} (path ${fmt(path)}). Dead end.` : `dfs(${i}, ${remaining}): no candidates left, but ${remaining} is still missing. Dead end.`,
          view: view(i, remaining, { mark: "cut" }),
        });
        return;
      }
      path.push(cands[i]);
      steps.push({
        line: ["call", "take"],
        note: `dfs(${i}, ${remaining}): take ${cands[i]}, path = ${fmt(path)}. Stay at i = ${i}, so it can be taken again.`,
        view: view(i, remaining - cands[i], { added: true }),
      });
      dfs(i, remaining - cands[i]);
      path.pop();
      steps.push({
        line: ["undo", "skip"],
        note: `Back at dfs(${i}, ${remaining}): undo the take, then skip ${cands[i]} for good: dfs(${i + 1}, ${remaining}).`,
        view: view(i + 1, remaining),
      });
      dfs(i + 1, remaining);
    }
    dfs(0, target);
    steps.push({
      line: "return",
      note: `${result.length ? `Return ${result.map(fmt).join(", ")}` : "Return []"}. That took ${calls} calls: it only notices an overshoot after making the call, which the sorted loop in Approach 2 avoids.`,
      view: view(undefined, target),
    });
    return steps;
  },
});
