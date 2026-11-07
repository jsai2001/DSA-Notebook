// Two stacks: all values, and the minimums. Push to mins only when the value is <= its top.
(function () {
DSAViz.register("0155-min-stack/approach3", {
  inputs: [{ name: "ops", label: "operations (comma-separated)", type: "string", value: "push 5, push 3, push 7, push 3, getMin, pop, getMin, pop, pop, getMin", maxLength: 120, raw: true }],
  trace({ ops: text }) {
    const ops = parseOps(text);
    const steps = [];
    const stack = [];
    const mins = [];
    const out = [];
    const view = (o = {}) => [
      { type: "array", label: "stack (bottom → top)", values: stack.map(String), marks: o.sm || {} },
      { type: "array", label: "mins (bottom → top; the top is the current minimum)", values: mins.map(String), marks: o.mm || {} },
      { type: "array", label: "returned so far (top, getMin)", values: out.map(String), compact: true, marks: o.res ? { [out.length - 1]: "new" } : {} },
    ];
    steps.push({ line: "init", note: "stack holds everything. mins holds a value only when it's a new minimum, or ties the current one.", view: view() });
    for (const [op, v] of ops) {
      if (op === "push") {
        stack.push(v);
        const goes = !mins.length || v <= mins[mins.length - 1];
        const prev = mins[mins.length - 1];
        if (goes) mins.push(v);
        steps.push({
          line: "push",
          note: `push(${v}). ${prev === undefined ? `mins is empty, so ${v} goes there too.` : goes ? `${v} ≤ ${prev}, so it goes on mins too${v === prev ? ": a tie is pushed again, so popping one copy still leaves the other" : ""}.` : `${v} > ${prev}: mins stays the same.`}`,
          view: view({ sm: { [stack.length - 1]: "new" }, mm: goes ? { [mins.length - 1]: "new" } : {} }),
        });
      } else if (op === "pop") {
        const x = stack.pop();
        const was = mins[mins.length - 1];
        const also = x === was;
        if (also) mins.pop();
        steps.push({ line: "pop", note: `pop() removes ${x}.${also ? ` It equals the top of mins, so pop mins too. The minimum is now ${mins.length ? mins[mins.length - 1] : "(empty stack)"}.` : ` It's not the minimum (${was}), so mins stays.`}`, view: view() });
      } else if (op === "top") {
        out.push(stack[stack.length - 1]);
        steps.push({ line: "top", note: `top() = ${out[out.length - 1]}.`, view: view({ res: true, sm: { [stack.length - 1]: "active" } }) });
      } else {
        out.push(mins[mins.length - 1]);
        steps.push({ line: "min", note: `getMin() = ${out[out.length - 1]}, the top of mins. O(1).`, view: view({ res: true, mm: { [mins.length - 1]: "match" } }) });
      }
    }
    steps.push({ line: "min", note: `Done: [${out.join(", ")}]. Every call is O(1). mins holds ${mins.length} value${mins.length === 1 ? "" : "s"} for ${stack.length} on the stack.`, view: view() });
    return steps;
  },
});

// Read "push -2, push 0, getMin, pop, top" and check pop/top/getMin never run on an empty stack.
function parseOps(text) {
  const parts = text.split(",").map((p) => p.trim()).filter(Boolean);
  if (!parts.length) throw new DSAViz.InputError("Type operations separated by commas, like push 3, push 1, getMin.");
  if (parts.length > 12) throw new DSAViz.InputError("Up to 12 operations here, so the steps stay readable.");
  let size = 0;
  return parts.map((p) => {
    const m = p.match(/^push\s+(-?\d{1,3})$/i);
    if (m) { size++; return ["push", +m[1]]; }
    const op = { pop: "pop", top: "top", getmin: "getMin" }[p.toLowerCase()];
    if (!op) throw new DSAViz.InputError(`"${p}": use push N (-999 to 999), pop, top or getMin.`);
    if (!size) throw new DSAViz.InputError(`"${p}" on an empty stack isn't allowed.`);
    if (op === "pop") size--;
    return [op];
  });
}
})();
