// A plain stack; getMin looks at every value.
(function () {
DSAViz.register("0155-min-stack/approach1", {
  inputs: [{ name: "ops", label: "operations (comma-separated)", type: "string", value: "push -2, push 0, push -3, getMin, pop, top, getMin", maxLength: 120, raw: true }],
  trace({ ops: text }) {
    const ops = parseOps(text);
    const steps = [];
    const stack = [];
    const out = [];
    let scanned = 0;
    const view = (o = {}) => [{ type: "array", label: "stack (bottom → top)", values: stack.map(String), marks: o.marks || {} }, { type: "array", label: "returned so far (top, getMin)", values: out.map(String), compact: true, marks: o.res ? { [out.length - 1]: "new" } : {} }, { type: "vars", items: [{ name: "values scanned by getMin", value: scanned, mark: o.counted ? "new" : "" }] }];
    steps.push({ line: "init", note: "One ordinary stack. push, pop and top are O(1); getMin has to look at everything.", view: view() });
    for (const [op, v] of ops) {
      if (op === "push") { stack.push(v); steps.push({ line: "push", note: `push(${v}).`, view: view({ marks: { [stack.length - 1]: "new" } }) }); }
      else if (op === "pop") { const x = stack.pop(); steps.push({ line: "pop", note: `pop() removes ${x}.`, view: view() }); }
      else if (op === "top") { out.push(stack[stack.length - 1]); steps.push({ line: "top", note: `top() = ${out[out.length - 1]}.`, view: view({ res: true, marks: { [stack.length - 1]: "active" } }) }); }
      else {
        const m = Math.min(...stack);
        scanned += stack.length;
        out.push(m);
        const marks = {};
        stack.forEach((x, k) => (marks[k] = x === m && stack.indexOf(m) === k ? "match" : "visited"));
        steps.push({ line: "min", note: `getMin(): look at all ${stack.length} values. The smallest is ${m}.`, view: view({ res: true, counted: true, marks }) });
      }
    }
    steps.push({ line: "min", note: `Done: [${out.join(", ")}]. getMin is O(n): with n values on the stack, every call scans all of them.`, view: view() });
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
