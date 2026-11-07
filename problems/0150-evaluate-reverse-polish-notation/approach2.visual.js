// Read from the end: an operator first evaluates its right operand, then its left (recursion).
(function () {
DSAViz.register("0150-evaluate-reverse-polish-notation/approach2", {
  inputs: [{ name: "tokens", label: "tokens (separated by spaces)", type: "string", value: "10 6 9 3 + -11 * / * 17 + 5 +", maxLength: 80, raw: true }],
  trace({ tokens: text }) {
    const t = parseTokens(text);
    const steps = [];
    const frames = []; // pending operators: { op, b }
    let pos = t.length - 1;
    let deepest = 0;
    const done = new Set();
    const view = (o = {}) => {
      const marks = {};
      done.forEach((k) => (marks[k] = "visited"));
      if (o.k !== undefined) marks[o.k] = o.mark || "active";
      return [
        { type: "array", label: "tokens (read from the right; dashed = already used)", values: t, marks, pointers: pos >= 0 ? { pos } : {} },
        { type: "array", label: "calls still open (bottom → top)", values: frames.map((f) => (f.b === undefined ? `${f.op} (needs right)` : `${f.op} (right = ${f.b}, needs left)`)), wide: true, marks: frames.length ? { [frames.length - 1]: "active" } : {} },
        { type: "vars", items: [{ name: "most operators open at once", value: deepest }] },
      ];
    };
    steps.push({ line: "init", note: "The last token is the final operation. Read backwards: an operator's right operand comes right before it.", view: view() });
    const ev = () => {
      const k = pos--;
      const x = t[k];
      if (!isOp(x)) {
        done.add(k);
        steps.push({ line: ["read", "num"], note: `Token ${k} is the number ${x}: return it.`, view: view({ k, mark: "match" }) });
        return +x;
      }
      frames.push({ op: x });
      deepest = Math.max(deepest, frames.length);
      steps.push({ line: ["read", "num", "right"], note: `Token ${k} is "${x}". Evaluate its right operand first (the tokens just before it).`, view: view({ k }) });
      const b = ev();
      frames[frames.length - 1].b = b;
      steps.push({ line: "left", note: `"${x}" at ${k} got right = ${b}. Now its left operand.`, view: view({ k }) });
      const a = ev();
      frames.pop();
      done.add(k);
      const r = calc(a, b, x);
      steps.push({ line: "apply", note: `"${x}" at ${k}: ${a} ${x} ${b} = ${r}${x === "/" && a % b !== 0 ? " (rounded toward zero)" : ""}.`, view: view({ k, mark: "new" }) });
      return r;
    };
    const r = ev();
    steps.push({ line: "init", note: `Return ${r}. O(n), but the calls nested ${deepest} operators deep; a long chain nests about n / 2 deep.`, view: view() });
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
