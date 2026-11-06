// Simulate the clock: each unit, run the allowed task with the most copies left (or sit idle).
DSAViz.register("0621-task-scheduler/approach1", {
  inputs: [
    { name: "tasks", type: "string", value: "AAABBC", maxLength: 12 },
    { name: "n", type: "int", value: "2", min: 0, max: 4 },
  ],
  trace({ tasks, n }) {
    if (!/^[A-Z]+$/.test(tasks)) throw new DSAViz.InputError("tasks: 1 or more capital letters, like AAABBC.");
    const left = {};
    for (const t of tasks) left[t] = (left[t] || 0) + 1;
    const kinds = Object.keys(left).sort();
    const ready = Object.fromEntries(kinds.map((k) => [k, 0]));
    const timeline = [];
    const steps = [];
    let remaining = tasks.length;
    let time = 0;
    const view = (o = {}) => {
      const gm = {};
      kinds.forEach((k, j) => {
        if (left[k] === 0) gm[`0,${j}`] = "visited";
        else if (ready[k] > time) gm[`0,${j}`] = "ghost";
        if (o.pick === k) gm[`0,${j}`] = "new";
      });
      const tm = {};
      timeline.forEach((t, i) => (tm[i] = t === "idle" ? "ghost" : "visited"));
      if (timeline.length) tm[timeline.length - 1] = o.pick ? "new" : "ghost";
      return [
        { type: "array", label: "timeline (one cell per time unit)", values: timeline.slice(), marks: tm, wide: true },
        { type: "grid", label: `at time ${time}: copies left (faded = still waiting, yellow = picked)`, rows: ["left", "ready at"], cols: kinds, cells: [kinds.map((k) => left[k]), kinds.map((k) => (left[k] ? ready[k] : "–"))], marks: gm, corner: "" },
      ];
    };
    steps.push({ line: "init", note: `Count the tasks: ${kinds.map((k) => `${k} ×${left[k]}`).join(", ")}. Every task may run at time 0.`, view: view() });
    while (remaining) {
      const allowed = kinds.filter((k) => left[k] && ready[k] <= time);
      let pick = null;
      for (const k of allowed) if (pick === null || left[k] > left[pick]) pick = k;
      if (pick !== null) {
        left[pick]--;
        ready[pick] = time + n + 1;
        remaining--;
        timeline.push(pick);
        steps.push({
          line: ["tick", "pick", "run"],
          note: `Time ${time}: allowed ${allowed.join(", ")}. Run ${pick}${allowed.length > 1 ? ", it has the most left" : ""}. It may run again at ${time + n + 1}.`,
          view: view({ pick }),
        });
      } else {
        timeline.push("idle");
        steps.push({ line: ["tick", "pick", "idle"], note: `Time ${time}: every task left is still waiting. Idle.`, view: view() });
      }
      time++;
    }
    const idle = timeline.filter((t) => t === "idle").length;
    steps.push({ line: "return", note: `All done at time ${time}: return ${time} (${idle} idle unit${idle === 1 ? "" : "s"}). The loop went through every unit, idle ones too.`, view: view() });
    return steps;
  },
});
