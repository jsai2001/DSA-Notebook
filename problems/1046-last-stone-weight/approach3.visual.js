// Max-heap: the heaviest stone is always at the top. Pop two, push their difference back in.
DSAViz.register("1046-last-stone-weight/approach3", {
  inputs: [{ name: "stones", type: "int[]", value: "[2, 7, 4, 1, 8, 1]", minLength: 1, maxLength: 12, minValue: 1, maxValue: 99 }],
  trace({ stones }) {
    const heap = [];
    const steps = [];
    // A max-heap kept by hand, so the tree drawn is the real heap layout (children of i are 2i+1 and 2i+2).
    const up = (i) => {
      while (i > 0 && heap[(i - 1) >> 1] < heap[i]) {
        [heap[i], heap[(i - 1) >> 1]] = [heap[(i - 1) >> 1], heap[i]];
        i = (i - 1) >> 1;
      }
      return i; // where it ended up
    };
    const down = (i) => {
      for (;;) {
        let big = i;
        for (const c of [2 * i + 1, 2 * i + 2]) if (c < heap.length && heap[c] > heap[big]) big = c;
        if (big === i) return;
        [heap[i], heap[big]] = [heap[big], heap[i]];
        i = big;
      }
    };
    const push = (w) => {
      heap.push(w);
      const start = heap.length - 1;
      return { start, end: up(start) };
    };
    const pop = () => {
      const top = heap[0];
      const last = heap.pop();
      if (heap.length) {
        heap[0] = last;
        down(0);
      }
      return top;
    };
    const view = (o = {}) => {
      const m = {};
      if (heap.length) m[0] = o.topMark || "active";
      if (o.at !== undefined) m[o.at] = "new";
      return [
        heap.length
          ? { type: "tree", label: "max-heap (each stone is at least as heavy as the ones under it; the top is the heaviest)", values: heap.slice(), marks: m }
          : { type: "array", label: "max-heap: empty", values: [] },
        { type: "array", label: "the same heap as a list", values: heap.slice(), marks: heap.length ? { 0: "active" } : {} },
        { type: "vars", items: [...(o.y !== undefined ? [{ name: "y (heaviest)", value: o.y }, { name: "x (second)", value: o.x }] : []), { name: "stones left", value: heap.length }] },
      ];
    };
    stones.forEach(push);
    steps.push({ line: "init", note: `Put all ${stones.length} stones in a max-heap. The heaviest, ${heap[0]}, sits at the top.`, view: view() });
    while (heap.length > 1) {
      const y = pop();
      const x = pop();
      steps.push({ line: ["loop", "take"], note: `Pop the top twice: y = ${y}, then x = ${x} (the heap moved the next heaviest up each time).`, view: view({ y, x, topMark: "compare" }) });
      if (y !== x) {
        const { start, end } = push(y - x);
        const moved = start - end ? (end === 0 ? "It's the heaviest now, so it moves up to the top." : "It moves up past the lighter stones above it.") : "Nothing above it is lighter, so it stays at the bottom.";
        steps.push({ line: "smash", note: `${y} − ${x} = ${y - x}: push it back. ${moved}`, view: view({ y, x, at: end }) });
      } else steps.push({ line: "smash", note: `${y} and ${x} are equal: both break, nothing goes back.`, view: view({ y, x }) });
    }
    steps.push({
      line: "return",
      note: heap.length ? `One stone is left: return ${heap[0]}. Each pop and push is O(log n).` : "No stone is left: return 0.",
      view: view({ topMark: "match" }),
    });
    return steps;
  },
});
