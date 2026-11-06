// Sort once; the two heaviest are always the last two, and the new stone is inserted at its sorted place.
DSAViz.register("1046-last-stone-weight/approach2", {
  inputs: [{ name: "stones", type: "int[]", value: "[2, 7, 4, 1, 8, 1]", minLength: 1, maxLength: 12, minValue: 1, maxValue: 99 }],
  trace({ stones }) {
    const s = stones.slice().sort((a, b) => a - b);
    const steps = [];
    const view = (o = {}) => {
      const marks = {};
      (o.marks || []).forEach(([k, m]) => (marks[k] = m));
      return [
        s.length ? { type: "bars", label: "stones, always sorted", values: s.slice(), marks } : { type: "array", label: "stones: none left", values: [] },
        { type: "vars", items: o.y !== undefined ? [{ name: "y", value: o.y }, { name: "x", value: o.x }] : [{ name: "stones", value: s.length }] },
      ];
    };
    steps.push({ line: "init", note: `Sort once: [${s.join(", ")}]. From now on the list stays sorted.`, view: view() });
    while (s.length > 1) {
      steps.push({ line: "loop", note: `The two heaviest are the last two: ${s[s.length - 1]} and ${s[s.length - 2]}.`, view: view({ marks: [[s.length - 1, "compare"], [s.length - 2, "compare"]] }) });
      const y = s.pop();
      const x = s.pop();
      if (y === x) {
        steps.push({ line: ["take", "smash"], note: `Smash ${y} and ${x}: equal, both break.`, view: view({ y, x }) });
        continue;
      }
      const d = y - x;
      let at = s.length;
      while (at > 0 && s[at - 1] > d) at--; // the same place bisect.insort finds
      s.splice(at, 0, d);
      steps.push({
        line: ["take", "smash", "insert"],
        note: `Smash ${y} and ${x}: ${d} is left. Binary search says it goes at index ${at}${at < s.length - 1 ? `, so the ${s.length - 1 - at} stone${s.length - 1 - at === 1 ? "" : "s"} after it shift right` : ", at the end"}.`,
        view: view({ y, x, marks: [[at, "new"]] }),
      });
    }
    steps.push({ line: "return", note: s.length ? `Return ${s[0]}.` : "Nothing is left: return 0.", view: view({ marks: s.length ? [[0, "match"]] : [] }) });
    return steps;
  },
});
