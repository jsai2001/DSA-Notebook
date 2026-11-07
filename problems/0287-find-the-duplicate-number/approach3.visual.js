// Read i -> nums[i] as a linked list. The repeated value has two links into it, so it's where the cycle begins (Floyd).
DSAViz.register("0287-find-the-duplicate-number/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 3, 4, 2, 2]", minLength: 2, maxLength: 10, minValue: 1, maxValue: 9 }],
  trace({ nums }) {
    const n = nums.length - 1;
    if (nums.some((x) => x > n)) throw new DSAViz.InputError(`With ${n + 1} values, each must be 1 to ${n}.`);
    const cnt = {}; nums.forEach((x) => (cnt[x] = (cnt[x] || 0) + 1));
    if (Object.values(cnt).filter((c) => c > 1).length !== 1) throw new DSAViz.InputError("Exactly one value must repeat (it may appear more than twice).");
    const steps = [];
    const path = [0];
    { let x = 0; const seen = new Set([0]); for (;;) { x = nums[x]; path.push(x); if (seen.has(x)) break; seen.add(x); } }
    const view = (s, f, phase) => [{ type: "array", label: "nums (index i links to nums[i]; yellow = slow, dark = fast)", values: nums, marks: s === f ? { [s]: "match" } : { [s]: "compare", [f]: "active" }, pointers: s === f ? { "slow = fast": s } : { slow: s, fast: f } }, { type: "array", label: "the links from index 0 (they end in a cycle)", values: path.map(String), wide: true }, { type: "vars", items: [{ name: "phase", value: phase }, { name: "slow", value: s }, { name: "fast", value: f }] }];
    let slow = 0, fast = 0;
    steps.push({ line: "init", note: `Values are 1..n, so no link goes back to index 0, and some index is reached twice: the path from 0 runs into a cycle: ${path.join(" → ")}.`, view: view(0, 0, 1) });
    do {
      slow = nums[slow]; fast = nums[nums[fast]];
      steps.push({ line: "meet", note: `Phase 1: slow moves 1 link to ${slow}, fast moves 2 links to ${fast}.${slow === fast ? " They meet inside the cycle." : ""}`, view: view(slow, fast, 1) });
    } while (slow !== fast);
    slow = 0;
    steps.push({ line: "entry", note: "Phase 2: put slow back at 0. Now both move 1 link per step.", view: view(slow, fast, 2) });
    while (slow !== fast) {
      slow = nums[slow]; fast = nums[fast];
      steps.push({ line: "entry", note: `slow → ${slow}, fast → ${fast}.${slow === fast ? " They meet at the start of the cycle." : ""}`, view: view(slow, fast, 2) });
    }
    steps.push({ line: "return", note: `Return ${slow}. Two indexes link to ${slow}, so it's the value that repeats. O(n) time, O(1) space, nums not changed.`, view: view(slow, fast, 2) });
    return steps;
  },
});
