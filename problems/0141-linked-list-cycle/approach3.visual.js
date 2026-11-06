// Floyd: slow moves 1 node, fast moves 2. In a cycle fast catches up with slow; otherwise it hits the end.
DSAViz.register("0141-linked-list-cycle/approach3", {
  inputs: [
    { name: "head", type: "int[]", value: "[3, 2, 0, -4]", minLength: 0, maxLength: 8, minValue: -99, maxValue: 99 },
    { name: "pos", label: "pos (index the tail links back to; -1 = no cycle)", type: "int", value: "1" },
  ],
  trace({ head, pos }) {
    const n = head.length;
    if (!Number.isInteger(pos) || pos < -1 || pos >= Math.max(n, 1) || (n === 0 && pos !== -1)) {
      throw new DSAViz.InputError(n ? `pos must be -1 (no cycle) or an index from 0 to ${n - 1}.` : "With an empty list, pos must be -1.");
    }
    const next = (i) => (i === null ? null : i + 1 < n ? i + 1 : pos >= 0 ? pos : null);
    const list = (pointers, marks = {}) => ({
      type: "list",
      label: pos >= 0 ? `head (under each node: its index; the tail links back to ${pos}, so the "null" end is never reached)` : "head (under each node: its index)",
      nodes: head.map((v, i) => ({ value: String(v), caption: i === n - 1 && pos >= 0 ? `${i} ↩ ${pos}` : String(i), mark: marks[i] || "" })),
      pointers: Object.fromEntries(Object.entries(pointers).map(([k, v]) => [k, v === null ? n : v])),
    });

    const steps = [];
    let moves = 0;
    let round = 0;
    const view = (slow, fast, o = {}) => {
      const marks = {};
      if (slow !== null) marks[slow] = o.found ? "match" : "window";
      if (fast !== null) marks[fast] = o.found ? "match" : "active";
      return [list({ slow, fast }, marks), { type: "vars", items: [{ name: "rounds", value: round }, { name: "pointer moves", value: moves }] }];
    };
    let slow = n ? 0 : null;
    let fast = slow;
    steps.push({ line: "init", note: n ? "slow and fast both start at the head." : "The list is empty: head is null.", view: view(slow, fast) });
    while (fast !== null && next(fast) !== null) {
      slow = next(slow);
      fast = next(next(fast));
      moves += 3;
      round++;
      if (slow === fast) {
        steps.push({ line: ["loop", "move", "found"], note: `slow → node ${slow}, fast → node ${fast}: they meet. fast can only catch slow by going around a cycle. Return true.`, view: view(slow, fast, { found: true }) });
        return steps;
      }
      steps.push({ line: ["loop", "move", "found"], note: `slow → node ${slow}, fast → ${fast === null ? "null" : `node ${fast}`}.${pos >= 0 ? " In the cycle, fast gains one node on slow each round." : ""}`, view: view(slow, fast) });
    }
    steps.push({ line: ["loop", "none"], note: `fast ${fast === null ? "is null" : "is on the last node"}: the list ends, so no cycle. Return false. ${moves} pointer moves, O(1) memory.`, view: view(slow, fast) });
    return steps;
  },
});
