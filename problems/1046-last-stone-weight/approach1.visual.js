// Sort every round, take the last two, put the difference back at the end.
DSAViz.register("1046-last-stone-weight/approach1", {
  inputs: [{ name: "stones", type: "int[]", value: "[2, 7, 4, 1, 8, 1]", minLength: 1, maxLength: 12, minValue: 1, maxValue: 99 }],
  trace({ stones }) {
    const s = stones.slice();
    const steps = [];
    let sorts = 0;
    const view = (o = {}) => {
      const marks = {};
      (o.marks || []).forEach(([k, m]) => (marks[k] = m));
      return [
        s.length ? { type: "bars", label: "stones", values: s.slice(), marks } : { type: "array", label: "stones: none left", values: [] },
        { type: "vars", items: [...(o.y !== undefined ? [{ name: "y", value: o.y }, { name: "x", value: o.x }] : []), { name: "sorts so far", value: sorts }] },
      ];
    };
    steps.push({ line: "init", note: "Each round: sort, smash the two heaviest (now the last two), repeat.", view: view() });
    while (s.length > 1) {
      s.sort((a, b) => a - b);
      sorts++;
      steps.push({ line: ["loop", "sort"], note: `Sort: [${s.join(", ")}]. The two heaviest are at the end.`, view: view({ marks: [[s.length - 1, "compare"], [s.length - 2, "compare"]] }) });
      const y = s.pop();
      const x = s.pop();
      if (y !== x) {
        s.push(y - x);
        steps.push({ line: ["take", "smash"], note: `Smash ${y} and ${x}: ${y - x} is left, added at the end (the next sort puts it in place).`, view: view({ y, x, marks: [[s.length - 1, "new"]] }) });
      } else steps.push({ line: ["take", "smash"], note: `Smash ${y} and ${x}: equal, both break.`, view: view({ y, x }) });
    }
    steps.push({ line: "return", note: `${s.length ? `Return ${s[0]}.` : "Nothing is left: return 0."} ${sorts} full sort${sorts === 1 ? "" : "s"}, one per round.`, view: view({ marks: s.length ? [[0, "match"]] : [] }) });
    return steps;
  },
});
