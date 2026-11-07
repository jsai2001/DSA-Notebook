// One stack: push numbers; an operator pops two (the top is the right one) and pushes the result.
(function () {
DSAViz.register("0150-evaluate-reverse-polish-notation/approach3", {
  inputs: [{ name: "tokens", label: "tokens (separated by spaces)", type: "string", value: "10 6 9 3 + -11 * / * 17 + 5 +", maxLength: 80, raw: true }],
  trace({ tokens: text }) {
    const t = parseTokens(text);
    const steps = [];
    const stack = [];
    const view = (k, o = {}) => [
      { type: "array", label: "tokens", values: t, marks: k !== undefined ? { [k]: "active" } : {}, pointers: k !== undefined ? { t: k } : {} },
      { type: "array", label: "stack (bottom → top)", values: stack.map(String), marks: o.top ? { [stack.length - 1]: o.top } : {} },
    ];
    steps.push({ line: "init", note: "Go left to right with one stack of numbers.", view: view() });
    t.forEach((x, k) => {
      if (!isOp(x)) {
        stack.push(+x);
        steps.push({ line: ["loop", "push"], note: `${x} is a number: push it.`, view: view(k, { top: "new" }) });
        return;
      }
      const b = stack.pop();
      const a = stack.pop();
      const r = calc(a, b, x);
      stack.push(r);
      steps.push({
        line: ["loop", "push", "pop", "apply"],
        note: `"${x}": pop ${b} (the top, so the right operand), then ${a}. Push ${a} ${x} ${b} = ${r}${x === "/" && a % b !== 0 ? `, rounded toward zero (floor division would give ${Math.floor(a / b)})` : ""}.`,
        view: view(k, { top: "new" }),
      });
    });
    steps.push({ line: "return", note: `One number left. Return ${stack[0]}. Each token is handled once: O(n).`, view: view(undefined, { top: "match" }) });
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
