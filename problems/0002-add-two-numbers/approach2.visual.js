// Single loop with a dummy head: add column by column while l1, l2 or carry is left.
DSAViz.register("0002-add-two-numbers/approach2", {
  inputs: [
    { name: "l1", type: "int[]", value: "[2, 4, 3]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 9 },
    { name: "l2", type: "int[]", value: "[5, 6, 4]", minLength: 1, maxLength: 8, minValue: 0, maxValue: 9 },
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
    const result = []; // digits appended after the dummy node
    let p = 0; // index of the l1 node (l1.length means null)
    let q = 0;
    let carry = 0;

    const listView = (name, ds, idx, active) => ({
      type: "list",
      label: `${name} = ${asNumber(ds)} (digits reversed)`,
      nodes: ds.map((d, k) => ({ value: d, mark: k < idx ? "visited" : k === idx && active ? "active" : "" })),
      pointers: { [name]: idx },
    });
    const view = (opts) => [
      listView("l1", l1, p, opts.active),
      listView("l2", l2, q, opts.active),
      {
        type: "list",
        label: "result",
        nodes: [
          { value: "0", mark: "ghost", caption: "dummy" },
          ...result.map((d, k) => ({ value: d, mark: opts.newNode && k === result.length - 1 ? "new" : "" })),
        ],
        pointers: opts.returning ? { "dummy.next": 1 } : { tail: result.length },
      },
      { type: "vars", items: [{ name: "carry", value: carry, mark: carry ? "compare" : "" }, ...(opts.vars || [])] },
    ];

    steps.push({
      line: "init",
      note: `Add ${asNumber(l1)} + ${asNumber(l2)}. Digits are stored ones-first, so walk both lists from the head like column addition. A dummy head means appending never needs a special case.`,
      view: view({}),
    });

    while (p < l1.length || q < l2.length || carry) {
      const left = [];
      if (p < l1.length) left.push("l1");
      if (q < l2.length) left.push("l2");
      steps.push({
        line: "loop",
        note: left.length
          ? `${left.join(" and ")} still ${left.length === 1 ? "has" : "have"} digits${carry ? `, and carry = ${carry}` : ""}, so keep going.`
          : `Both lists are done, but carry = ${carry} still needs its own digit, so loop once more.`,
        view: view({ active: true }),
      });

      const a = p < l1.length ? l1[p] : null;
      const b = q < l2.length ? l2[q] : null;
      const total = carry + (a ?? 0) + (b ?? 0);
      const parts = [`carry ${carry}`];
      parts.push(a === null ? "0 (l1 is done)" : String(a));
      parts.push(b === null ? "0 (l2 is done)" : String(b));
      steps.push({
        line: "add",
        note: `total = ${parts.join(" + ")} = ${total}. Then move l1 and l2 to their next nodes.`,
        view: view({ active: true, vars: [{ name: "total", value: total, mark: "compare" }] }),
      });

      const digit = total % 10;
      const nextCarry = Math.floor(total / 10);
      result.push(digit);
      if (a !== null) p++;
      if (b !== null) q++;
      carry = nextCarry;
      steps.push({
        line: "append",
        note:
          `Append ${total} % 10 = ${digit} and move tail to it. carry = ${total} // 10 = ${nextCarry}` +
          (nextCarry ? ", so 1 carries into the next column." : "."),
        view: view({ newNode: true, vars: [{ name: "total", value: total }] }),
      });
    }

    steps.push({
      line: "loop",
      note: "l1 and l2 are both done and carry is 0, so the loop stops.",
      view: view({}),
    });

    const answer = asNumber(result);
    steps.push({
      line: "return",
      note: `Return dummy.next, skipping the placeholder: [${result.join(", ")}] = ${answer}. Check: ${asNumber(l1)} + ${asNumber(l2)} = ${Number(asNumber(l1)) + Number(asNumber(l2))}.`,
      view: view({ returning: true }),
    });
    return steps;
  },
});
