// Each entry stores its value and the smallest value at or below it, so getMin reads the top.
(function () {
DSAViz.register("0155-min-stack/approach2", {
  inputs: [{ name: "ops", label: "operations (comma-separated)", type: "string", value: "push -2, push 0, push -3, getMin, pop, top, getMin", maxLength: 120, raw: true }],
  trace({ ops: text }) {
    const ops = parseOps(text);
    const steps = [];
    const stack = [];
    const out = [];
    const view = (o = {}) => [{ type: "array", label: "stack (bottom → top); each entry: value | min at or below", values: stack.map(([v, m]) => `${v} | ${m}`), wide: true, marks: o.marks || {} }, { type: "array", label: "returned so far (top, getMin)", values: out.map(String), compact: true, marks: o.res ? { [out.length - 1]: "new" } : {} }];
    steps.push({ line: "init", note: "Each entry remembers the minimum of itself and everything below it. That never changes later, because only the top is ever removed.", view: view() });
    for (const [op, v] of ops) {
      const top = stack[stack.length - 1];
      if (op === "push") {
        const low = top ? Math.min(v, top[1]) : v;
        stack.push([v, low]);
        steps.push({ line: "push", note: top ? `push(${v}): min(${v}, ${top[1]}) = ${low}. Store ${v} | ${low}.` : `push(${v}): the first entry, so its own minimum: ${v} | ${v}.`, view: view({ marks: { [stack.length - 1]: "new" } }) });
      } else if (op === "pop") {
        stack.pop();
        steps.push({ line: "pop", note: `pop() removes ${top[0]} | ${top[1]}. The entry below already knows its own minimum.`, view: view() });
      } else if (op === "top") {
        out.push(top[0]);
        steps.push({ line: "top", note: `top() = ${top[0]}.`, view: view({ res: true, marks: { [stack.length - 1]: "active" } }) });
      } else {
        out.push(top[1]);
        steps.push({ line: "min", note: `getMin() = ${top[1]}, read straight from the top entry. O(1).`, view: view({ res: true, marks: { [stack.length - 1]: "match" } }) });
      }
    }
    steps.push({ line: "min", note: `Done: [${out.join(", ")}]. Every call is O(1); the cost is storing two numbers per entry.`, view: view() });
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
