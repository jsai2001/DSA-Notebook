// Count the cards; go through the different cards smallest first. All c copies of x left start c groups at once.
(function () {
DSAViz.register("0846-hand-of-straights/approach3", {
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
    const keys = [...count.keys()].sort((a, b) => a - b);
    const kview = (marks = {}, ptr) => ({ type: "array", label: "different cards, sorted; caption = copies left", values: keys, sub: keys.map((x) => `×${count.get(x)}`), marks, pointers: ptr === undefined ? {} : { x: ptr } });
    steps.push({ line: "init", note: `Count each card: ${keys.length} different cards.`, view: [kview()] });
    for (let i = 0; i < keys.length; i++) {
      const x = keys[i], c = count.get(x);
      if (!c) { steps.push({ line: "group", note: `${x}: no copies left (all used by earlier groups). Skip.`, view: [kview({ [i]: "visited" }, i)] }); continue; }
      const marks = { [i]: "active" };
      for (let y = x; y < x + g; y++) {
        const j = keys.indexOf(y);
        const have = count.get(y) || 0;
        if (have < c) {
          if (j >= 0) marks[j] = "cut";
          steps.push({ line: ["group", "take", "fail"], note: `${x} has ${c} cop${c > 1 ? "ies" : "y"} left, so ${c} group${c > 1 ? "s start" : " starts"} here and ${c > 1 ? "each" : "it"} needs ${y}. ${have ? `Only ${have} ${y} left` : `No ${y} left`}. Return false.`, view: [kview(marks, i)] });
          return steps;
        }
        count.set(y, have - c);
        if (j >= 0 && y !== x) marks[j] = "new";
      }
      steps.push({ line: ["group", "take"], note: `${x} had ${c} cop${c > 1 ? "ies" : "y"} left: start ${c} group${c > 1 ? "s" : ""} ${x}…${x + g - 1} at once. Take ${c} of each card from ${x} to ${x + g - 1}.`, view: [kview(marks, i)] });
    }
    steps.push({ line: "return", note: `Return true. Every card is used. O(n log n) for sorting the different cards; the rest is O(n) hash lookups.`, view: [kview(Object.fromEntries(keys.map((_, i) => [i, "match"])))] });
    return steps;
  },
});
})();
