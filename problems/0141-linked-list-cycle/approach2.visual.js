// Brent: runner walks ahead in rounds of 1, 2, 4, 8, ... steps; after each round, anchor jumps to runner.
DSAViz.register("0141-linked-list-cycle/approach2", {
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
    const view = (anchor, runner, power, done, o = {}) => {
      const marks = {};
      if (anchor !== null) marks[anchor] = "window";
      if (runner !== null) marks[runner] = o.found ? "match" : "active";
      return [
        list({ anchor, runner }, marks),
        { type: "vars", items: [{ name: "power (round length)", value: power, mark: o.jumped ? "new" : "" }, { name: "steps this round", value: done }, { name: "pointer moves", value: moves }] },
      ];
    };
    if (!n) {
      steps.push({ line: "init", note: "The list is empty: no cycle. Return false.", view: [list({})] });
      return steps;
    }
    let anchor = 0;
    let runner = next(0);
    let power = 1;
    let done = 1;
    moves = 1;
    steps.push({ line: "init", note: "anchor stays put; runner walks ahead. If runner ever lands on anchor, runner went around a cycle.", view: view(anchor, runner, power, done) });
    while (runner !== null) {
      if (runner === anchor) {
        steps.push({ line: ["step", "found"], note: `runner is back at anchor (node ${anchor}): there's a cycle. Return true. ${moves} pointer moves.`, view: view(anchor, runner, power, done, { found: true }) });
        return steps;
      }
      let jumped = false;
      if (done === power) {
        anchor = runner;
        power *= 2;
        done = 0;
        jumped = true;
      }
      runner = next(runner);
      done++;
      moves++;
      steps.push({
        line: jumped ? ["step", "jump", "step"] : "step",
        note: jumped
          ? `Round used up: anchor jumps to node ${anchor}, the next round is ${power} steps. runner moves to ${runner === null ? "null" : `node ${runner}`}.`
          : `runner moves to ${runner === null ? "null" : `node ${runner}`} (${done} of ${power} this round).`,
        view: view(anchor, runner, power, done, { jumped }),
      });
    }
    steps.push({ line: "none", note: `runner fell off the end: no cycle. Return false. ${moves} pointer moves, O(1) memory.`, view: view(anchor, null, power, done) });
    return steps;
  },
});
