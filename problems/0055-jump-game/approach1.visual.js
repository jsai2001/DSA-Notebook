// Right to left: good[i] is true if some index i can jump to is good. The last index is good by definition.
DSAViz.register("0055-jump-game/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, 3, 1, 1, 4]", minLength: 1, maxLength: 10, minValue: 0, maxValue: 6 }],
  trace({ nums }) {
    const n = nums.length;
    const good = Array(n).fill(null); // null = not worked out yet
    good[n - 1] = true;
    const steps = [];
    let checks = 0;
    const view = (i, opts = {}) => {
      const marks = {};
      for (let k = 0; k < n; k++) if (good[k] !== null && k !== i) marks[k] = good[k] ? "visited" : "cut";
      (opts.range || []).forEach((k) => (marks[k] = "window"));
      (opts.scanned || []).forEach((k) => (marks[k] = "compare"));
      if (opts.hit !== undefined) marks[opts.hit] = "match";
      if (i !== undefined) marks[i] = opts.final ? (good[0] ? "match" : "cut") : "active";
      return [
        {
          type: "array",
          label: "nums (good[i] underneath: ✓ reaches the end, ✗ doesn't)",
          values: nums,
          sub: good.map((g) => (g === null ? "" : g ? "✓" : "✗")),
          marks,
          pointers: i !== undefined ? { i } : {},
        },
        { type: "vars", items: [{ name: "good[j] checks so far", value: checks }] },
      ];
    };
    steps.push({ line: "init", note: `good[${n - 1}] = ✓: standing on the last index already counts. Work right to left, so when we look at i, every good[j] after it is known.`, view: view(undefined) });
    for (let i = n - 2; i >= 0; i--) {
      const last = Math.min(n - 1, i + nums[i]);
      const range = [];
      for (let j = i + 1; j <= last; j++) range.push(j);
      steps.push({
        line: "from",
        note: range.length
          ? `Index ${i}: nums[${i}] = ${nums[i]}, so it can land on ${range.length === 1 ? `index ${range[0]}` : `indices ${range[0]}..${last}`}${i + nums[i] > n - 1 ? ` (the jump can't go past the end)` : ""}.`
          : `Index ${i}: nums[${i}] = 0, so it can't jump anywhere.`,
        view: view(i, { range }),
      });
      const scanned = [];
      let hit;
      for (const j of range) {
        checks++;
        if (good[j]) {
          hit = j;
          break;
        }
        scanned.push(j);
      }
      good[i] = hit !== undefined;
      steps.push({
        line: hit !== undefined ? ["check", "found"] : "check",
        note:
          hit !== undefined
            ? `good[${hit}] is ✓${scanned.length ? ` (after ${scanned.length} ✗)` : ""}: jump there and carry on to the end. good[${i}] = ✓; one good landing spot is enough, so stop looking.`
            : range.length
              ? `${range.length === 1 ? `Index ${range[0]} isn't good` : `None of ${range.join(", ")} is good`}, so every jump from ${i} is a dead end. good[${i}] = ✗.`
              : `No jumps at all: good[${i}] = ✗.`,
        view: view(i, { range: range.filter((j) => j !== hit && !scanned.includes(j)), scanned, hit }),
      });
    }
    steps.push({
      line: "return",
      note: `Return good[0] = ${good[0] ? "true" : "false"}. That took ${checks} check${checks === 1 ? "" : "s"}: up to nums[i] per index, so O(n · k) time in the worst case, plus O(n) for good.`,
      view: view(0, { final: true }),
    });
    return steps;
  },
});
