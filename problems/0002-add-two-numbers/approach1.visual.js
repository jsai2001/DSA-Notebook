// Three loops (both lists, then leftovers of l1, then of l2), writing each digit into a
// pre-made node, then cutting off the one extra empty node at the end.
DSAViz.register("0002-add-two-numbers/approach1", {
  inputs: [
    // 999 + 1 exercises loop 1, loop 2 and the final carry.
    { name: "l1", type: "int[]", value: "[9, 9, 9]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 9 },
    { name: "l2", type: "int[]", value: "[1]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 9 },
  ],

  trace({ l1, l2 }) {
    [["l1", l1], ["l2", l2]].forEach(([name, ds]) => {
      if (ds.length > 1 && ds[ds.length - 1] === 0) {
        throw new DSAViz.InputError(
          `${name} can't end in 0: the last node is the highest digit, so that would be a leading zero.`
        );
      }
    });

    const asNumber = (ds) => ds.slice().reverse().join("");
    const steps = [];
    // Output nodes. value null = empty placeholder node (val 0, no digit yet).
    const out = [{ value: null }];
    let o = 0; // output
    let prev = -1; // -1 = no real node yet
    let p = 0;
    let q = 0;
    let carry = 0;

    const listView = (name, ds, idx, active) => ({
      type: "list",
      label: `${name} = ${asNumber(ds)} (digits reversed)`,
      nodes: ds.map((d, k) => ({ value: d, mark: k < idx ? "visited" : k === idx && active ? "active" : "" })),
      pointers: { [name]: idx },
    });
    const view = (opts = {}) => {
      const pointers = opts.returning ? { head: 0 } : { head: 0, output: o };
      if (prev >= 0 && !opts.returning) pointers.prev = prev;
      const nodes = out.map((n, k) => ({
        value: n.value === null ? "·" : n.value,
        mark:
          opts.cut && k === out.length - 1
            ? "cut"
            : n.value === null
              ? "ghost"
              : opts.newNode === k
                ? "new"
                : "",
      }));
      return [
        listView("l1", l1, p, opts.active),
        listView("l2", l2, q, opts.active),
        { type: "list", label: "output (· = empty node, no digit yet)", nodes, pointers },
        {
          type: "vars",
          items: [{ name: "carry", value: carry, mark: carry ? "compare" : "" }, ...(opts.vars || [])],
        },
      ];
    };

    steps.push({
      line: "init",
      note: `Add ${asNumber(l1)} + ${asNumber(l2)}. Start with one empty node: head remembers the start, output is where the next digit goes.`,
      view: view(),
    });

    // One loop body: write a digit into output, then grow the list by one empty node.
    const body = (n, a, b, from) => {
      const result = (a ?? 0) + (b ?? 0) + carry;
      const terms = [a, b].filter((x) => x !== null).concat(carry);
      const digit = result % 10;
      const nextCarry = Math.floor(result / 10);
      out[o].value = digit;
      steps.push({
        line: `digit${n}`,
        note: `result = ${terms.join(" + ")} = ${result}. Write ${digit} into the output node; carry = ${nextCarry}.`,
        view: view({ active: true, newNode: o, vars: [{ name: "result", value: result, mark: "compare" }] }),
      });
      carry = nextCarry;
      prev = o;
      out.push({ value: null });
      o++;
      if (from.includes("l1")) p++;
      if (from.includes("l2")) q++;
      steps.push({
        line: `grow${n}`,
        note: `prev = this digit. Make an empty node for the next digit and move output to it, then move ${from.join(" and ")} forward.`,
        view: view({ vars: [{ name: "result", value: result }] }),
      });
    };

    // Loop 1: both lists have nodes.
    steps.push({
      line: "while1",
      note: "Loop 1 runs while both lists have nodes.",
      view: view({ active: true }),
    });
    while (p < l1.length && q < l2.length) body(1, l1[p], l2[q], ["l1", "l2"]);

    // Loop 2: leftovers of l1.
    steps.push({
      line: "while2",
      note:
        p < l1.length
          ? `l2 ran out. Loop 2 adds the rest of l1 with the carry.`
          : "l1 has no nodes left, so loop 2 doesn't run.",
      view: view({ active: true }),
    });
    while (p < l1.length) body(2, l1[p], null, ["l1"]);

    // Loop 3: leftovers of l2.
    steps.push({
      line: "while3",
      note:
        q < l2.length
          ? `l1 ran out. Loop 3 adds the rest of l2 with the carry.`
          : "l2 has no nodes left, so loop 3 doesn't run.",
      view: view({ active: true }),
    });
    while (q < l2.length) body(3, null, l2[q], ["l2"]);

    // Final carry.
    if (carry === 1) {
      steps.push({
        line: "carry",
        note: "A carry of 1 is left over (like 999 + 1), so it needs one more digit.",
        view: view(),
      });
      out[o].value = 1;
      steps.push({
        line: "carryval",
        note: "Write 1 into the empty node, set prev to it, and add another empty node after it.",
        view: view({ newNode: o }),
      });
      prev = o;
      out.push({ value: null });
      o++;
    } else {
      steps.push({ line: "carry", note: "carry is 0, so there's no extra digit.", view: view() });
    }

    // Trim the trailing empty node.
    steps.push({
      line: "trim",
      note: "The list always ends with one empty node. prev is the last real digit, so setting prev.next to null cuts it off.",
      view: view({ cut: true }),
    });
    out.pop();

    const answer = asNumber(out.map((n) => n.value));
    steps.push({
      line: "return",
      note: `Return head: [${out.map((n) => n.value).join(", ")}] = ${answer}. Check: ${asNumber(l1)} + ${asNumber(l2)} = ${Number(asNumber(l1)) + Number(asNumber(l2))}.`,
      view: view({ returning: true }),
    });
    return steps;
  },
});
