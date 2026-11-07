// For each day, look ahead one day at a time until a warmer one.
DSAViz.register("0739-daily-temperatures/approach1", {
  inputs: [{ name: "temperatures", type: "int[]", value: "[73, 74, 75, 71, 69, 72, 76, 73]", minLength: 1, maxLength: 10, minValue: 30, maxValue: 100 }],
  trace({ temperatures: t }) {
    const n = t.length;
    const ans = Array(n).fill(0);
    const steps = [];
    let looks = 0;
    const view = (i, j, hit) => [{ type: "array", label: "temperatures (dark = day i, yellow = days looked at, green = the first warmer day)", values: t, marks: i === undefined ? {} : { ...Object.fromEntries(Array.from({ length: j - i - 1 }, (_, k) => [i + 1 + k, "compare"])), [i]: "active", ...(hit ? { [j]: "match" } : j < n ? { [j]: "compare" } : {}) }, pointers: i === undefined ? {} : j < n ? { i, j } : { i } }, { type: "array", label: "ans", values: ans.slice(), marks: i !== undefined && hit ? { [i]: "new" } : {} }, { type: "vars", items: [{ name: "days looked at", value: looks }] }];
    steps.push({ line: "init", note: "ans starts as all 0s: a day with no warmer day later keeps 0.", view: view() });
    for (let i = 0; i < n; i++) {
      let j = i + 1;
      while (j < n && t[j] <= t[i]) { j++; looks++; }
      if (j < n) { looks++; ans[i] = j - i; }
      steps.push({ line: j < n ? ["day", "look", "found"] : ["day", "look"], note: j < n ? `Day ${i} (${t[i]}): look ahead. Day ${j} (${t[j]}) is the first warmer one: wait ${j - i}.` : `Day ${i} (${t[i]}): no later day is warmer. ans stays 0.`, view: view(i, j, j < n) });
    }
    steps.push({ line: "return", note: `Return [${ans.join(", ")}]. ${looks} days looked at in total: O(n²) at worst, when the temperatures keep falling.`, view: view() });
    return steps;
  },
});
