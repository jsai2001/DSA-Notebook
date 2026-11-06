// Only walk up from a run's first number (x - 1 not in the set): every number is walked once.
DSAViz.register("0128-longest-consecutive-sequence/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[10, 4, 20, 1, 3, 2, 4]", maxLength: 10, minValue: -99, maxValue: 99 }],
  trace({ nums }) {
    const present = new Set(nums);
    const items = [...present];
    const steps = [];
    let best = 0;
    let lookups = 0;
    const view = (o = {}) => {
      const marks = {};
      (o.walk || []).forEach((v) => (marks[String(v)] = "match"));
      if (o.x !== undefined && o.skip) marks[String(o.x)] = "compare";
      return [
        { type: "array", label: "nums", values: nums },
        { type: "set", label: "present (yellow = not a start, green = walked now)", items: items.map(String), marks },
        {
          type: "vars",
          items: [
            ...(o.x !== undefined ? [{ name: "x", value: o.x }] : []),
            ...(o.length !== undefined ? [{ name: "length", value: o.length }] : []),
            { name: "best", value: best, mark: o.better ? "match" : "" },
            { name: "set lookups", value: lookups, mark: o.counted ? "new" : "" },
          ],
        },
      ];
    };
    const repeats = nums.length - present.size;
    steps.push({
      line: "init",
      note: `Put the numbers in a set${repeats ? ` (${repeats} repeat${repeats === 1 ? "" : "s"} dropped)` : ""}. Loop over the set, not nums, so a repeated start is walked only once.`,
      view: view(),
    });
    for (const x of items) {
      lookups++;
      if (present.has(x - 1)) {
        steps.push({
          line: ["loop", "skip"],
          note: `${x - 1} is in the set, so ${x} isn't where a run starts. Skip it: that run is counted from its start.`,
          view: view({ x, skip: true, counted: true }),
        });
        continue;
      }
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
      steps.push({
        line: ["loop", "skip", "start", "walk", "best"],
        note:
          `${x - 1} isn't in the set: ${x} starts a run. ` +
          (length > 1 ? `Walk up: ${walk.slice(1).join(", ")}, then ${x + length} is missing. Length ${length}.` : `${x + 1} isn't there either. Length 1.`) +
          (better ? " New best." : ""),
        view: view({ x, walk, length, better, counted: true }),
      });
    }
    steps.push({
      line: "return",
      note: `Return ${best}. ${lookups} lookups for ${present.size} distinct number${present.size === 1 ? "" : "s"}: each is checked once as x - 1 and walked at most once, so O(n).`,
      view: view(),
    });
    return steps;
  },
});
