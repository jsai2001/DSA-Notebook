// BFS: indices come out of the queue in order of jumps used; `reached` makes sure each index is queued once.
DSAViz.register("0045-jump-game-ii/approach2", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, 3, 1, 1, 4]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 6 }],
  trace({ nums }) {
    const n = nums.length;
    let far = 0;
    for (let i = 0; i < n; i++) {
      if (i > far) throw new DSAViz.InputError(`The last index can't be reached (index ${i} is cut off). The problem guarantees it can; try [2, 3, 1, 1, 4].`);
      far = Math.max(far, i + nums[i]);
    }
    const steps = [];
    const dist = Array(n).fill("");
    dist[0] = 0;
    const queue = [0];
    const popped = new Set();
    let reached = 0;
    const view = (i, opts = {}) => {
      const marks = {};
      popped.forEach((k) => (marks[k] = "visited"));
      queue.forEach((k) => (marks[k] = "compare"));
      (opts.pushed || []).forEach((k) => (marks[k] = "new"));
      if (i !== undefined) marks[i] = opts.done ? "match" : "active";
      const pointers = {};
      if (i !== undefined) pointers.i = i;
      const r = Math.min(reached, n - 1);
      pointers[pointers.i === r ? "i, reached" : "reached"] = r;
      if (pointers["i, reached"] !== undefined) delete pointers.i;
      return [
        { type: "array", label: "nums (jumps used underneath; faded = done, orange = queued)", values: nums, sub: dist, marks, pointers },
        { type: "array", label: "queue (front on the left)", values: queue.slice(), marks: opts.pushed ? Object.fromEntries(queue.map((k, idx) => [idx, opts.pushed.includes(k) ? "new" : ""])) : {} },
      ];
    };

    steps.push({ line: "init", note: "Start with index 0 in the queue (0 jumps). reached = 0: the furthest index anyone has queued.", view: view() });
    while (queue.length) {
      const i = queue.shift();
      if (i === n - 1) {
        steps.push({ line: ["pop", "done"], note: `Pop index ${i}: it's the last index. BFS takes indices in order of jumps used, so ${dist[i]} is the fewest. Return ${dist[i]}.`, view: view(i, { done: true }) });
        return steps;
      }
      const top = Math.min(n - 1, i + nums[i]);
      const pushed = [];
      for (let j = reached + 1; j <= top; j++) {
        dist[j] = dist[i] + 1;
        queue.push(j);
        pushed.push(j);
      }
      reached = Math.max(reached, i + nums[i]);
      popped.add(i);
      steps.push({
        line: ["pop", "push"],
        note: pushed.length
          ? `Pop index ${i} (${dist[i]} jump${dist[i] === 1 ? "" : "s"}). It reaches up to ${top}; indices ${pushed[0]}..${pushed[pushed.length - 1]} haven't been queued, so they get ${dist[i] + 1}. reached = ${Math.min(reached, n - 1)}.`
          : `Pop index ${i}. It reaches up to ${top}, but everything up to ${Math.min(reached, n - 1)} is already queued: nothing new.`,
        view: view(i, { pushed }),
      });
    }
    return steps;
  },
});
