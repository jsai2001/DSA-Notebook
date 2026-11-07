// Right to left: when day j isn't warmer, jump to day j's own answer instead of checking each day in between.
DSAViz.register("0739-daily-temperatures/approach2", {
  inputs: [{ name: "temperatures", type: "int[]", value: "[73, 74, 75, 71, 69, 72, 76, 73]", minLength: 1, maxLength: 10, minValue: 30, maxValue: 100 }],
  trace({ temperatures: t }) {
    const n = t.length;
    const ans = Array(n).fill(0);
    const steps = [];
    const view = (i, path, end) => [{ type: "array", label: "temperatures (dark = day i, yellow = days jumped through, green = the warmer day)", values: t, marks: i === undefined ? {} : { ...Object.fromEntries(path.map((j) => [j, "compare"])), [i]: "active", ...(end < n ? { [end]: "match" } : {}) }, pointers: i === undefined ? {} : { i } }, { type: "array", label: "ans (already solved to the right of i)", values: ans.slice(), marks: i !== undefined && end < n ? { [i]: "new" } : {} }];
    steps.push({ line: "init", note: n === 1 ? "One day: no later day, so its answer is 0." : `The last day always gets 0. Work from day ${n - 2} down to day 0.`, view: view() });
    for (let i = n - 2; i >= 0; i--) {
      let j = i + 1;
      const path = [];
      while (j < n && t[j] <= t[i]) { path.push(j); j = ans[j] ? j + ans[j] : n; }
      if (j < n) ans[i] = j - i;
      const hops = path.map((p) => `${p} (${t[p]}) → ${ans[p] ? `jump ${ans[p]} to day ${p + ans[p]}` : "no warmer day, give up"}`).join("; ");
      steps.push({ line: j < n ? ["day", "look", "jump", "found"] : ["day", "look", "jump"], note: `Day ${i} (${t[i]}): ${path.length ? `day ${hops}.` : ""} ${j < n ? `Day ${j} (${t[j]}) is warmer: wait ${j - i}.` : "No warmer day: 0."}`.trim(), view: view(i, path, j) });
    }
    steps.push({ line: "return", note: `Return [${ans.join(", ")}]. Each jump skips days already known to be no warmer: O(n) overall.`, view: view() });
    return steps;
  },
});
