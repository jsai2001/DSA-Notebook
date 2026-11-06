// Count the blocks: the most frequent task makes a frame of (most − 1) blocks of n + 1, plus a last block of the tied tasks.
DSAViz.register("0621-task-scheduler/approach3", {
  inputs: [
    { name: "tasks", type: "string", value: "AAABBC", maxLength: 12 },
    { name: "n", type: "int", value: "2", min: 0, max: 4 },
  ],
  trace({ tasks, n }) {
    if (!/^[A-Z]+$/.test(tasks)) throw new DSAViz.InputError("tasks: 1 or more capital letters, like AAABBC.");
    const counts = {};
    for (const t of tasks) counts[t] = (counts[t] || 0) + 1;
    const kinds = Object.keys(counts).sort((a, b) => counts[b] - counts[a] || (a < b ? -1 : 1));
    const most = counts[kinds[0]];
    const tiedKinds = kinds.filter((k) => counts[k] === most);
    const tied = tiedKinds.length;
    const frame = (most - 1) * (n + 1) + tied;
    const answer = Math.max(frame, tasks.length);
    const steps = [];
    // The frame as a grid: one row per block. The tied tasks take the first columns of every row;
    // the others fill the rest column by column, top to bottom, skipping the last row (it ends after the tied ones).
    const rest = kinds.filter((k) => counts[k] < most).flatMap((k) => Array(counts[k]).fill(k));
    const extra = Math.max(0, rest.length - (most - 1) * (n + 1 - tied));
    const width = Math.max(n + 1, tied + Math.ceil((rest.length) / Math.max(1, most - 1)));
    const grid = Array.from({ length: most }, () => Array(width).fill(""));
    for (let r = 0; r < most; r++) tiedKinds.forEach((k, c) => (grid[r][c] = k));
    let placed = 0;
    const order = [];
    for (let c = tied; c < width && placed < rest.length; c++) for (let r = 0; r < most - 1 && placed < rest.length; r++) order.push([r, c, rest[placed++]]);
    const view = (shown, o = {}) => {
      const cells = grid.map((row, r) =>
        row.map((v, c) => {
          if (c < tied) return o.frame ? v : "";
          const hit = order.slice(0, shown).find(([rr, cc]) => rr === r && cc === c);
          if (hit) return hit[2];
          if (!o.frame) return "";
          if (r === most - 1) return ""; // after the last block: not part of the schedule
          return c < n + 1 ? "idle" : "";
        })
      );
      const marks = {};
      grid.forEach((row, r) => row.forEach((_, c) => {
        if (c < tied && o.frame) marks[`${r},${c}`] = "match";
        else if (cells[r][c] === "idle") marks[`${r},${c}`] = "ghost";
        else if (r === most - 1 && c >= tied) marks[`${r},${c}`] = "visited";
      }));
      if (o.last !== undefined) marks[`${order[o.last][0]},${order[o.last][1]}`] = "new";
      return [
        { type: "grid", label: `the frame: ${most} block${most === 1 ? "" : "s"} (rows), read left to right, top to bottom (dashed = idle, grey = after the end)`, rows: grid.map((_, r) => `block ${r + 1}`), cols: Array.from({ length: width }, (_, c) => String(c)), cells, marks, corner: "" },
        { type: "vars", items: [{ name: "most", value: most }, { name: "tied", value: `${tied} (${tiedKinds.join(", ")})` }, ...(o.result ? [{ name: "frame", value: frame }, { name: "len(tasks)", value: tasks.length }, { name: "answer", value: answer, mark: "match" }] : [])] },
      ];
    };
    steps.push({
      line: "count",
      note: `Count: ${kinds.map((k) => `${k} ×${counts[k]}`).join(", ")}. The most is ${most}${tied > 1 ? `, shared by ${tied} tasks (${tiedKinds.join(", ")})` : ` (${kinds[0]})`}.`,
      view: view(0),
    });
    steps.push({
      line: "frame",
      note: `${tiedKinds.join(" ")} must be ${n + 1} units apart, so they need ${most - 1} full block${most - 1 === 1 ? "" : "s"} of ${n + 1}, then one last block of just ${tiedKinds.join(" ")}. frame = (${most} − 1) × (${n} + 1) + ${tied} = ${frame}.`,
      view: view(0, { frame: true }),
    });
    for (let i = 0; i < order.length; i++) {
      steps.push({
        line: "frame",
        note: `Put ${order[i][2]} in block ${order[i][0] + 1}${order[i][1] >= n + 1 ? " (the gaps are full: the block grows, which costs no idle)" : ", in a gap that would otherwise be idle"}.`,
        view: view(i + 1, { frame: true, last: i }),
      });
    }
    const idle = Math.max(0, frame - tasks.length);
    steps.push({
      line: "return",
      note: extra > 0 || tasks.length >= frame
        ? `The other tasks overflowed the gaps, so no unit is idle: return max(${frame}, ${tasks.length}) = ${answer}.`
        : `${idle} gap${idle === 1 ? " stays" : "s stay"} idle. Return max(${frame}, ${tasks.length}) = ${answer}.`,
      view: view(order.length, { frame: true, result: true }),
    });
    return steps;
  },
});
