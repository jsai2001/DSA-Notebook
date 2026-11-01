// Sum each column of digit products first (no carrying), then carry once from the ones place up.
DSAViz.register("0043-multiply-strings/approach3", {
  inputs: [
    { name: "num1", type: "string", value: "99", maxLength: 4 },
    { name: "num2", type: "string", value: "99", maxLength: 4 },
  ],
  trace({ num1, num2 }) {
    for (const [name, s] of [["num1", num1], ["num2", num2]]) {
      if (!/^(0|[1-9]\d*)$/.test(s)) throw new DSAViz.InputError(`${name} must be a whole number without leading zeros, like 123.`);
    }
    const a = [...num1].reverse().map(Number);
    const b = [...num2].reverse().map(Number);
    const steps = [];
    const col = Array(a.length + b.length).fill(0);
    const place = (k) => (k === 0 ? "ones" : k === 1 ? "tens" : k === 2 ? "hundreds" : `10^${k}`);
    const view = (opts = {}) => {
      const cmarks = {};
      if (opts.k !== undefined) cmarks[opts.k] = opts.mark || "active";
      if (opts.done !== undefined) for (let k = 0; k < opts.done; k++) cmarks[k] = cmarks[k] || "match";
      return [
        { type: "array", label: "num1 digits, ones first", values: a, marks: opts.i !== undefined ? { [opts.i]: "active" } : {} },
        { type: "array", label: "num2 digits, ones first", values: b, marks: opts.j !== undefined ? { [opts.j]: "active" } : {} },
        { type: "array", label: "col[k]: total for place k (0 = ones)", values: col.slice(), marks: cmarks, wide: true },
        ...(opts.carry !== undefined ? [{ type: "vars", items: [{ name: "carry", value: opts.carry }] }] : []),
      ];
    };

    if (num1 === "0" || num2 === "0") {
      steps.push({ line: "zero", note: `One of them is 0, so return "0".`, view: view() });
      return steps;
    }
    steps.push({ line: "init", note: "Reverse both numbers so index = place (0 = ones). A digit in place i times a digit in place j lands in place i + j.", view: view() });
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        col[i + j] += a[i] * b[j];
        steps.push({
          line: "sum",
          note: `${a[i]} (place ${i}) × ${b[j]} (place ${j}) = ${a[i] * b[j]}, added to col[${i + j}] (the ${place(i + j)} place): now ${col[i + j]}. No carrying yet.`,
          view: view({ i, j, k: i + j, mark: "new" }),
        });
      }
    }
    let carry = 0;
    steps.push({ line: "carry", note: "Every column is summed. Now one pass from the ones place up turns each column into a single digit.", view: view({ carry: 0 }) });
    for (let k = 0; k < col.length; k++) {
      const v = col[k] + carry;
      col[k] = v % 10;
      carry = Math.floor(v / 10);
      steps.push({ line: "carry", note: `Place ${k}: ${v} → keep ${col[k]}, carry ${carry} into place ${k + 1}.`, view: view({ k, carry, done: k + 1 }) });
    }
    let top = col.length - 1;
    while (col[top] === 0) top--;
    const result = col.slice(0, top + 1).reverse().join("");
    steps.push({
      line: top < col.length - 1 ? ["trim", "return"] : "return",
      note: `${top < col.length - 1 ? "The top place is 0, so drop it. " : ""}Read the places from the top down: "${result}". Same O(m · n) as Approach 2, but only m + n carries instead of one per product.`,
      view: view({ done: col.length }),
    });
    return steps;
  },
});
