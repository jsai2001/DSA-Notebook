// Sort; the smallest card left must start a group, so remove start, start + 1, ... from the list.
(function () {
DSAViz.register("0846-hand-of-straights/approach1", {
  inputs: [
    { name: "hand", type: "int[]", value: "[1, 2, 3, 6, 2, 3, 4, 7, 8]", minLength: 1, maxLength: 12, minValue: 0, maxValue: 99 },
    { name: "groupSize", type: "int", value: "3", min: 1, max: 12 },
  ],
  trace({ hand, groupSize: g }) {
    const steps = [];
    const groups = [];
    const gview = () => ({ type: "array", label: "groups made", values: groups.length ? groups.map((x) => x.join(" ")) : ["—"], wide: true, marks: groups.length ? { [groups.length - 1]: "new" } : { 0: "ghost" } });
    if (hand.length % g) {
      steps.push({ line: "init", note: `${hand.length} cards don't split into groups of ${g}. Return false.`, view: [{ type: "array", label: "hand", values: hand }] });
      return steps;
    }
    const h = [...hand].sort((a, b) => a - b);
    const hview = (marks = {}) => ({ type: "array", label: "cards left, sorted", values: h.length ? [...h] : ["—"], marks: h.length ? marks : { 0: "ghost" } });
    steps.push({ line: "init", note: `Sort the ${hand.length} cards.`, view: [hview(), gview()] });
    while (h.length) {
      const s = h[0];
      steps.push({ line: "group", note: `The smallest card left is ${s}. Nothing smaller is left to go before it, so it must start a group: ${Array.from({ length: g }, (_, i) => s + i).join(", ")}.`, view: [hview({ 0: "active" }), gview()] });
      const got = [];
      for (let x = s; x < s + g; x++) {
        const i = h.indexOf(x);
        if (i < 0) {
          steps.push({ line: "fail", note: `No ${x} left, so ${s} can't start a full group. Return false.`, view: [hview(), { type: "array", label: "this group so far", values: got.length ? [...got, `${x}?`] : [`${x}?`], marks: { [got.length]: "cut" } }, gview()] });
          return steps;
        }
        h.splice(i, 1);
        got.push(x);
      }
      groups.push(got);
      steps.push({ line: "take", note: `Found and removed ${got.join(", ")}. Each removal searches the list: O(n).`, view: [hview(), gview()] });
    }
    steps.push({ line: "return", note: `Return true. Every card is in a group. O(n²) from the list removals.`, view: [gview()] });
    return steps;
  },
});
})();
