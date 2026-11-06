// Sort, then scan: a step of +1 grows the run, a repeat changes nothing, anything else starts a new run.
DSAViz.register("0128-longest-consecutive-sequence/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]", maxLength: 10, minValue: -99, maxValue: 99 }],
  trace({ nums }) {
    const steps = [];
    if (!nums.length) {
      steps.push({ line: "init", note: "nums is empty: Return 0.", view: [{ type: "array", label: "nums", values: [] }] });
      return steps;
    }
    const a = [...nums].sort((x, y) => x - y);
    let best = 1;
    let cur = 1;
    let runStart = 0;
    let bestRange = [0, 0];
    const dups = new Set();
    const view = (i, o = {}) => {
      const marks = {};
      if (!o.final) for (let k = runStart; k <= i; k++) marks[k] = "window";
      dups.forEach((k) => (marks[k] = "ghost"));
      if (o.final) for (let k = bestRange[0]; k <= bestRange[1]; k++) if (!dups.has(k)) marks[k] = "match";
      if (o.mark) marks[i] = o.mark;
      return [
        {
          type: "array",
          label: "sorted (outlined = current run, dashed = repeat, green = longest run)",
          values: a,
          marks,
          pointers: o.final ? {} : { i },
        },
        { type: "vars", items: [{ name: "cur", value: cur, mark: o.curMark || "" }, { name: "best", value: best, mark: o.better ? "match" : "" }] },
      ];
    };
    steps.push({
      line: ["init", "sort"],
      note: `Sort: ${a.join(", ")}. Each run now sits side by side. The first number starts a run of 1.`,
      view: view(0),
    });
    for (let i = 1; i < a.length; i++) {
      if (a[i] === a[i - 1]) {
        dups.add(i);
        steps.push({ line: ["loop", "dup"], note: `${a[i]} again: a repeat doesn't break the run or grow it. Skip it.`, view: view(i, { mark: "ghost" }) });
        continue;
      }
      let line;
      let note;
      if (a[i] === a[i - 1] + 1) {
        cur++;
        line = ["loop", "dup", "extend", "best"];
        note = `${a[i]} = ${a[i - 1]} + 1: the run grows to ${cur}.`;
      } else {
        cur = 1;
        runStart = i;
        line = ["loop", "dup", "extend", "reset", "best"];
        note = `${a[i]} is more than ${a[i - 1]} + 1: a gap, so a new run starts here. cur = 1.`;
      }
      const better = cur > best;
      if (better) {
        best = cur;
        bestRange = [runStart, i];
      }
      steps.push({ line, note: note + (better ? " New best." : ""), view: view(i, { better, curMark: "new" }) });
    }
    steps.push({ line: "return", note: `Return ${best}. Sorting costs O(n log n); the scan is one pass.`, view: view(a.length - 1, { final: true }) });
    return steps;
  },
});
