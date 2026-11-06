// From every number, walk up x+1, x+2, ... in a set; keep the longest walk.
DSAViz.register("0128-longest-consecutive-sequence/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[5, 4, 3, 2, 1, 9]", maxLength: 10, minValue: -99, maxValue: 99 }],
  trace({ nums }) {
    const present = new Set(nums);
    const steps = [];
    let best = 0;
    let lookups = 0;
    const view = (k, o = {}) => {
      const setMarks = {};
      (o.walk || []).forEach((v) => (setMarks[String(v)] = "match"));
      return [
        { type: "array", label: "nums", values: nums, marks: k !== undefined ? { [k]: "active" } : {}, pointers: k !== undefined ? { x: k } : {} },
        { type: "set", label: "present (green = walked up from x)", items: [...present].map(String), marks: setMarks },
        {
          type: "vars",
          items: [
            ...(o.length !== undefined ? [{ name: "length", value: o.length }] : []),
            { name: "best", value: best, mark: o.better ? "match" : "" },
            { name: "set lookups", value: lookups, mark: o.counted ? "new" : "" },
          ],
        },
      ];
    };
    steps.push({ line: "init", note: `Put the numbers in a set, so "is x + 1 here?" is one O(1) lookup.`, view: view() });
    nums.forEach((x, k) => {
      const walk = [x];
      let length = 1;
      lookups++;
      while (present.has(x + length)) {
        walk.push(x + length);
        length++;
        lookups++;
      }
      const better = length > best;
      if (better) best = length;
      const missing = x + length;
      const wasted = !better && length > 1 && present.has(x - 1);
      steps.push({
        line: ["loop", "start", "walk", "best"],
        note:
          (length > 1
            ? `From ${x}: ${walk.slice(1).join(", ")} ${walk.length === 2 ? "is" : "are"} in the set, ${missing} isn't. Length ${length}.`
            : `From ${x}: ${missing} isn't in the set. Length 1.`) +
          (better ? " New best." : wasted ? ` Wasted work: ${x - 1} is in the set, so this run is also walked from a smaller start.` : ""),
        view: view(k, { walk, length, better, counted: true }),
      });
    });
    steps.push({
      line: "return",
      note: `Return ${best}. That took ${lookups} lookups for ${nums.length} numbers: a run of length m is walked again from each of its m numbers, so one long run costs O(n²).`,
      view: view(),
    });
    return steps;
  },
});
