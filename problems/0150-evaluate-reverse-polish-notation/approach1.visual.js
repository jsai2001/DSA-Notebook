// Find the first operator, combine it with the two numbers before it, and repeat until one number is left.
(function () {
DSAViz.register("0150-evaluate-reverse-polish-notation/approach1", {
  inputs: [{ name: "tokens", label: "tokens (separated by spaces)", type: "string", value: "10 6 9 3 + -11 * / * 17 + 5 +", maxLength: 80, raw: true }],
  trace({ tokens: text }) {
    const items = parseTokens(text).map((x) => (isOp(x) ? x : +x));
    const steps = [];
    let scanned = 0;
    const view = (o = {}) => [{ type: "array", label: "items (the expression so far)", values: items.map(String), marks: o.marks || {}, pointers: o.i !== undefined ? { i: o.i } : {} }, { type: "vars", items: [{ name: "items scanned so far", value: scanned, mark: o.counted ? "new" : "" }] }];
    steps.push({ line: "init", note: "Keep the expression as a list. Each operator works on the two numbers right before it.", view: view() });
    while (items.length > 1) {
      const i = items.findIndex((x) => typeof x === "string");
      scanned += i + 1;
      const [a, b, op] = items.slice(i - 2, i + 1);
      const r = calc(a, b, op);
      steps.push({
        line: ["find", "apply"],
        note: `Scan from the start: the first operator is "${op}" at ${i}. ${a} ${op} ${b} = ${r}${op === "/" && a % b !== 0 ? " (rounded toward zero)" : ""}.`,
        view: view({ i, counted: true, marks: { [i - 2]: "window", [i - 1]: "window", [i]: "active" } }),
      });
      items.splice(i - 2, 3, r);
      steps.push({ line: "replace", note: `Replace those three items with ${r}.`, view: view({ marks: { [i - 2]: "new" } }) });
    }
    steps.push({ line: "return", note: `One number left. Return ${items[0]}. ${scanned} items scanned: every operator rescans from the start, so this is O(n²).`, view: view({ marks: { 0: "match" } }) });
    return steps;
  },
});

const isOp = (t) => t === "+" || t === "-" || t === "*" || t === "/";
const calc = (a, b, op) => (op === "+" ? a + b : op === "-" ? a - b : op === "*" ? a * b : Math.trunc(a / b));
// Read tokens separated by spaces or commas; check it's a valid expression with no division by zero.
function parseTokens(text) {
  const t = text.split(/[\s,]+/).filter(Boolean);
  if (!t.length) throw new DSAViz.InputError("Type the tokens separated by spaces, like 2 1 + 3 *.");
  if (t.length > 15) throw new DSAViz.InputError("Up to 15 tokens here, so the steps stay readable.");
  const st = [];
  for (const x of t) {
    if (isOp(x)) {
      if (st.length < 2) throw new DSAViz.InputError(`"${x}" needs two numbers before it.`);
      const b = st.pop(), a = st.pop();
      if (x === "/" && b === 0) throw new DSAViz.InputError("That divides by zero.");
      st.push(calc(a, b, x));
    } else if (/^-?\d{1,3}$/.test(x) && Math.abs(+x) <= 200) st.push(+x);
    else throw new DSAViz.InputError(`"${x}": use whole numbers from -200 to 200, or + - * /.`);
  }
  if (st.length !== 1) throw new DSAViz.InputError(`That leaves ${st.length} numbers: every number but one needs an operator.`);
  return t;
}
})();
