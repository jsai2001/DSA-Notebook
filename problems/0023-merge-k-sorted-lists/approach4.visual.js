// Divide and conquer, bottom-up: merge lists in pairs, then pairs of pairs, until one list is left.
DSAViz.register("0023-merge-k-sorted-lists/approach4", {
  inputs: [{ name: "lists", type: "int[][]", jagged: true, value: "[[1, 4, 5], [1, 3, 4], [2, 6], [0, 7]]", maxRows: 4, maxCols: 4, minValue: -99, maxValue: 99 }],
  trace({ lists }) {
    lists.forEach((l, i) => {
      for (let k = 1; k < l.length; k++) {
        if (l[k] < l[k - 1]) throw new DSAViz.InputError(`lists[${i}] must be sorted (non-decreasing), like [1, 4, 5].`);
      }
    });
    const steps = [];
    const fmt = (arr) => `[${arr.join(", ")}]`;
    const k = lists.length;
    if (!k) {
      steps.push({ line: "empty", note: "No lists at all (k = 0): return null. Without this check, lists[0] would be out of range.", view: [{ type: "vars", items: [{ name: "lists", value: "[]" }] }] });
      return steps;
    }
    const slots = lists.map((l, src) => l.map((value) => ({ value, src }))); // current list in each slot
    const into = lists.map(() => null); // slot i was merged into slot into[i]
    let work = 0;
    const mergeTwo = (a, b) => {
      const out = [];
      let i = 0;
      let j = 0;
      while (i < a.length && j < b.length) out.push(a[i].value <= b[j].value ? a[i++] : b[j++]);
      return out.concat(a.slice(i), b.slice(j));
    };
    // opts.a / opts.b: the pair being merged; opts.fresh: the slot that just received a merge
    const view = (step, opts = {}) => {
      const widgets = [];
      slots.forEach((s, i) => {
        if (into[i] !== null) {
          widgets.push({ type: "vars", items: [{ name: `lists[${i}]`, value: `already merged into lists[${into[i]}]`, mark: "ghost" }] });
          return;
        }
        const role = i === opts.a ? " (lists[i])" : i === opts.b ? " (lists[i + step])" : "";
        widgets.push({
          type: "list",
          label: `lists[${i}]${role}`,
          nodes: s.map((m) => ({ value: m.value, caption: `#${m.src}`, mark: i === opts.a ? "active" : i === opts.b ? "compare" : i === opts.fresh ? "new" : "" })),
        });
      });
      const items = [];
      if (step !== undefined) items.push({ name: "step", value: String(step) });
      items.push({ name: "work so far", value: `${work} node${work === 1 ? "" : "s"}` });
      widgets.push({ type: "vars", items });
      return widgets;
    };

    steps.push({
      line: "init",
      note: `step = 1: merge neighbours (0 with 1, 2 with 3, ...). Each round doubles step, so there are about log₂ ${k} rounds.`,
      view: view(1),
    });
    let step = 1;
    let round = 0;
    while (step < k) {
      round++;
      const live = slots.filter((_, i) => into[i] === null).length;
      steps.push({ line: "round", note: `Round ${round}, step = ${step}: ${live} lists left, merge them in pairs.`, view: view(step) });
      for (let i = 0; i + step < k; i += 2 * step) {
        steps.push({ line: "pair", note: `Pair lists[${i}] with lists[${i + step}].`, view: view(step, { a: i, b: i + step }) });
        const cost = slots[i].length + slots[i + step].length;
        work += cost;
        slots[i] = mergeTwo(slots[i], slots[i + step]);
        slots[i + step] = [];
        into[i + step] = i;
        steps.push({
          line: "pair",
          note: `lists[${i}] = mergeTwo(lists[${i}], lists[${i + step}]) → ${fmt(slots[i].map((m) => m.value))} (${cost} node${cost === 1 ? "" : "s"} to go through).`,
          view: view(step, { fresh: i }),
        });
      }
      step *= 2;
      steps.push({ line: "double", note: `step = ${step}. Every node took part in at most one merge this round.`, view: view(step) });
    }
    steps.push({
      line: "return",
      note: !slots[0].length
        ? "Return lists[0]. Every list was empty, so it's null."
        : `Return lists[0]: ${fmt(slots[0].map((m) => m.value))}. Each node was in at most ${round} merge${round === 1 ? "" : "s"} (one per round, about log₂ k rounds): O(N log k), with no extra memory.`,
      view: view(),
    });
    return steps;
  },
});
