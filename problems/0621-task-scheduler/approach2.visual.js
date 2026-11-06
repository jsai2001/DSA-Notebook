// Max-heap of ready counts plus a queue of tasks waiting out their n units.
DSAViz.register("0621-task-scheduler/approach2", {
  inputs: [
    { name: "tasks", type: "string", value: "AAABBC", maxLength: 12 },
    { name: "n", type: "int", value: "2", min: 0, max: 4 },
  ],
  trace({ tasks, n }) {
    if (!/^[A-Z]+$/.test(tasks)) throw new DSAViz.InputError("tasks: 1 or more capital letters, like AAABBC.");
    const counts = {};
    for (const t of tasks) counts[t] = (counts[t] || 0) + 1;
    // heap entries: [count, letter]; kept sorted biggest first (ties by letter) so the picture is easy to read
    let heap = Object.entries(counts).map(([k, c]) => [c, k]);
    const sortHeap = () => heap.sort((a, b) => b[0] - a[0] || (a[1] < b[1] ? -1 : 1));
    sortHeap();
    const waiting = []; // [count, letter, time it goes back]
    const timeline = [];
    const steps = [];
    let time = 0;
    const view = (o = {}) => {
      const tm = {};
      timeline.forEach((t, i) => (tm[i] = t === "idle" ? "ghost" : "visited"));
      if (timeline.length && o.ran !== undefined) tm[timeline.length - 1] = o.ran ? "new" : "ghost";
      return [
        { type: "array", label: "timeline", values: timeline.slice(), marks: tm, wide: true },
        { type: "array", label: "heap: ready tasks, most left first", values: heap.map(([c, k]) => `${k} ×${c}`), wide: true, marks: o.back ? { [heap.findIndex(([, k]) => k === o.back)]: "new" } : heap.length ? { 0: "active" } : {} },
        { type: "array", label: "waiting queue: count, back at time", values: waiting.map(([c, k, t]) => `${k} ×${c} @${t}`), wide: true, marks: waiting.length ? { 0: "compare" } : {} },
        { type: "vars", items: [{ name: "time", value: time }] },
      ];
    };
    steps.push({ line: "init", note: "Put each task's count in a max-heap. The waiting queue starts empty.", view: view() });
    while (heap.length || waiting.length) {
      time++;
      let ran = false;
      let note;
      if (heap.length) {
        const [c, k] = heap.shift();
        timeline.push(k);
        ran = true;
        note = `Time ${time}: run ${k}, the top of the heap.`;
        if (c - 1) {
          waiting.push([c - 1, k, time + n]);
          note += ` ${c - 1} left: it waits until the end of time ${time + n}.`;
        } else note += " That was its last copy.";
      } else {
        timeline.push("idle");
        note = `Time ${time}: the heap is empty, everything is waiting. Idle.`;
      }
      let back = null;
      if (waiting.length && waiting[0][2] === time) {
        const [c, k] = waiting.shift();
        heap.push([c, k]);
        sortHeap();
        back = k;
        note += ` ${k}'s wait is over: back into the heap.`;
      }
      steps.push({ line: ran ? ["tick", "run", "back"] : ["tick", "back"], note, view: view({ ran, back }) });
    }
    steps.push({ line: "return", note: `Heap and queue are both empty: return ${time}.`, view: view() });
    return steps;
  },
});
