// Brute force: multiply by x, |n| times (after turning a negative n into 1/x).
DSAViz.register("0050-powx-n/approach1", {
  inputs: [
    { name: "x", type: "string", value: "2", maxLength: 9 },
    { name: "n", type: "int", value: "10", min: -12, max: 12 },
  ],
  trace({ x: xText, n }) {
    if (!/^-?\d{1,2}(\.\d{1,5})?$/.test(xText.trim())) throw new DSAViz.InputError("x must be a number between -100 and 100 with up to 5 decimals, like 2 or -1.5.");
    const x0 = Number(xText);
    if (x0 === 0 && n <= 0) throw new DSAViz.InputError("0 to a power of 0 or less isn't defined (the problem rules it out).");
    if (Math.abs(Math.pow(x0, n)) > 1e4) throw new DSAViz.InputError("x^n must be between -10⁴ and 10⁴, as in the problem.");
    const fmt = (v) => (v === 0 ? "0" : Number.isInteger(v) && Math.abs(v) < 1e15 ? String(v) : String(Number(v.toPrecision(7))));
    const steps = [];
    let x = x0;
    let N = n;
    let result = 1;
    const values = [];
    const view = (i, opts = {}) => [
      { type: "array", label: "result after each multiplication", values: values.map(fmt), wide: true, marks: opts.fresh ? { [values.length - 1]: "new" } : opts.final && values.length ? { [values.length - 1]: "match" } : {} },
      {
        type: "vars",
        items: [
          { name: "x", value: fmt(x) },
          { name: "n", value: N },
          ...(i !== undefined ? [{ name: "i", value: i }] : []),
          { name: "result", value: fmt(result), mark: opts.fresh ? "new" : opts.final ? "match" : "" },
          { name: "multiplications", value: values.length },
        ],
      },
    ];

    if (n < 0) {
      steps.push({ line: "flip", note: `n = ${n} is negative: x^${n} = (1/x)^${-n}. So x becomes 1/${fmt(x0)} = ${fmt(1 / x0)} and n becomes ${-n}.`, view: view() });
      x = 1 / x0;
      N = -n;
    }
    steps.push({ line: "init", note: N ? `Start with result = 1 and multiply by ${fmt(x)}, ${N} time${N === 1 ? "" : "s"}.` : "n = 0: the loop never runs, and anything to the power 0 is 1.", view: view() });
    for (let i = 0; i < N; i++) {
      result *= x;
      values.push(result);
      steps.push({ line: "loop", note: `Multiplication ${i + 1}: result = ${fmt(result)} (that's ${fmt(x)}^${i + 1}).`, view: view(i, { fresh: true }) });
    }
    steps.push({
      line: "return",
      note: `Return ${fmt(result)}. It took ${values.length} multiplication${values.length === 1 ? "" : "s"}, one per unit of |n|: for n = 2³¹ − 1 that's 2.1 billion, about 2.8 s in C++ for one call.`,
      view: view(undefined, { final: true }),
    });
    return steps;
  },
});
