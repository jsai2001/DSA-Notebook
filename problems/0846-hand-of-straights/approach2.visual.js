// Count the cards; a min-heap gives the smallest card left, which must start the next group.
(function () {
DSAViz.register("0846-hand-of-straights/approach2", {
  inputs: [
    { name: "hand", type: "int[]", value: "[1, 2, 3, 6, 2, 3, 4, 7, 8]", minLength: 1, maxLength: 12, minValue: 0, maxValue: 99 },
    { name: "groupSize", type: "int", value: "3", min: 1, max: 12 },
  ],
  trace({ hand, groupSize: g }) {
    const steps = [];
    if (hand.length % g) {
      steps.push({ line: "init", note: `${hand.length} cards don't split into groups of ${g}. Return false.`, view: [{ type: "array", label: "hand", values: hand }] });
      return steps;
    }
    const count = new Map();
    for (const x of hand) count.set(x, (count.get(x) || 0) + 1);
    const heap = [...count.keys()].sort((a, b) => a - b); // a sorted array is a valid min-heap; popping keeps it sorted
    const cview = (marks = {}) => ({ type: "map", label: "copies left", columns: ["card", "copies"], entries: [...count.keys()].sort((a, b) => a - b).map((x) => [x, count.get(x)]), marks });
    const hview = (marks = {}) => ({ type: "tree", label: "min-heap of cards still left", values: [...heap], marks });
    steps.push({ line: "init", note: `Count each card. Put the ${heap.length} different cards in a min-heap.`, view: [cview(), hview()] });
    while (heap.length) {
      const s = heap[0];
      steps.push({ line: "group", note: `Heap top: ${s}, the smallest card left. It must start a group: ${Array.from({ length: g }, (_, i) => s + i).join(", ")}.`, view: [cview({ [s]: "active" }), hview({ 0: "active" })] });
      for (let x = s; x < s + g; x++) {
        if (!count.get(x)) {
          steps.push({ line: "fail", note: `No ${x} left. Return false.`, view: [cview(), hview()] });
          return steps;
        }
        count.set(x, count.get(x) - 1);
        if (count.get(x) === 0) {
          if (x !== heap[0]) {
            steps.push({ line: ["take", "pop", "fail"], note: `Take ${x}; that was its last copy. But ${heap[0]} is still left and smaller, and every group starting at ${heap[0]} needs ${x}. Return false.`, view: [cview({ [x]: "cut", [heap[0]]: "cut" }), hview({ 0: "cut" })] });
            return steps;
          }
          heap.shift();
          steps.push({ line: ["take", "pop"], note: `Take ${x}; that was its last copy, and it's the heap top. Pop it.`, view: [cview({ [x]: "visited" }), hview()] });
        } else steps.push({ line: "take", note: `Take ${x}: ${count.get(x)} left.`, view: [cview({ [x]: "new" }), hview()] });
      }
    }
    steps.push({ line: "return", note: "Return true. The heap emptied with every group complete. O(n log n).", view: [cview(), hview()] });
    return steps;
  },
});
})();
