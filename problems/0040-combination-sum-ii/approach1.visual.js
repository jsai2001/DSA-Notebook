// Take or skip each number once, and let a set throw away combinations that come up more than once.
DSAViz.register("0040-combination-sum-ii/approach1", {
  inputs: [
    { name: "candidates", type: "int[]", value: "[2, 1, 2, 3]", minLength: 1, maxLength: 6, minValue: 1, maxValue: 50 },
    { name: "target", type: "int", value: "5", min: 1, max: 12 },
  ],
  trace({ candidates: raw, target }) {
    const cands = raw.slice().sort((a, b) => a - b);
    const steps = [];
    const found = [];
    const path = [];
    let calls = 0;
    let repeats = 0;
    const fmt = (arr) => `[${arr.join(", ")}]`;
    const view = (i, remaining, opts = {}) => {
      const marks = {};
      if (i !== undefined) cands.forEach((_, k) => k < i && (marks[k] = "ghost"));
      if (i !== undefined && i < cands.length) marks[i] = opts.mark || "active";
      const fmarks = {};
      if (opts.hit !== undefined) fmarks[opts.hit] = opts.repeat ? "cut" : "new";
      return [
        { type: "array", label: "candidates (sorted; faded = already decided)", values: cands, marks, pointers: i !== undefined && i < cands.length ? { i } : {} },
        { type: "array", label: "path", values: path.slice(), marks: opts.done ? Object.fromEntries(path.map((_, k) => [k, "match"])) : opts.added ? { [path.length - 1]: "new" } : {} },
        {
          type: "vars",
          items: [
            { name: "remaining", value: remaining, mark: remaining === 0 ? "match" : remaining < 0 ? "cut" : "" },
            { name: "calls", value: calls },
            { name: "repeats thrown away", value: repeats, mark: opts.repeat ? "cut" : "" },
          ],
        },
        { type: "array", label: `found (a set: ${found.length})`, values: found.slice(), wide: true, marks: fmarks },
      ];
    };

    steps.push({ line: "sort", note: `Sort: ${fmt(cands)}. Then the same combination always comes out in the same order, so the set can spot repeats.`, view: view(0, target) });
    steps.push({ line: "start", note: `dfs(0, ${target}): take or skip each number, once.`, view: view(0, target) });
    function dfs(i, remaining) {
      calls++;
      if (remaining === 0) {
        const key = fmt(path);
        const at = found.indexOf(key);
        if (at >= 0) {
          repeats++;
          steps.push({
            line: ["call", "done"],
            note: `${key} adds up to ${target}, but it's already in the set (built from a different copy of an equal number). Thrown away: wasted work.`,
            view: view(i, 0, { done: true, hit: at, repeat: true }),
          });
        } else {
          found.push(key);
          steps.push({ line: ["call", "done"], note: `${key} adds up to ${target}: add it to the set.`, view: view(i, 0, { done: true, hit: found.length - 1 }) });
        }
        return;
      }
      if (i === cands.length || remaining < 0) {
        steps.push({
          line: ["call", "dead"],
          note: remaining < 0 ? `Overshot: path ${fmt(path)} is past ${target}. Dead end.` : `No numbers left, still ${remaining} short. Dead end.`,
          view: view(i, remaining, { mark: "cut" }),
        });
        return;
      }
      path.push(cands[i]);
      steps.push({ line: ["call", "take"], note: `Take cands[${i}] = ${cands[i]}: path = ${fmt(path)}. Move on to i = ${i + 1}; this copy is used up.`, view: view(i, remaining - cands[i], { added: true }) });
      dfs(i + 1, remaining - cands[i]);
      path.pop();
      steps.push({ line: ["undo", "skip"], note: `Back: undo it, then skip cands[${i}] = ${cands[i]}.`, view: view(i + 1, remaining) });
      dfs(i + 1, remaining);
    }
    dfs(0, target);
    steps.push({
      line: "return",
      note: `${found.length ? `Return ${found.join(", ")}` : "Return []"}. ${calls} calls${repeats ? `, and ${repeats} combination${repeats === 1 ? " was" : "s were"} built twice and thrown away` : ""}. With many equal numbers this blows up: 22 ones with target 11 take 4.9 million calls.`,
      view: view(undefined, target),
    });
    return steps;
  },
});
