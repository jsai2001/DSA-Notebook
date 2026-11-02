// Recursive halving: x^n = (x^(n/2))², times one more x when n is odd. The half is computed once.
DSAViz.register("0050-powx-n/approach2", {
  inputs: [
    { name: "x", type: "string", value: "2", maxLength: 9 },
    { name: "n", type: "int", value: "13", min: -2147483648, max: 2147483647 },
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
    const stack = []; // exponents of the calls still waiting
    const returned = {}; // exponent -> value, once known
    let calls = 0;
    const chain = [];
    for (let k = N < 0 ? -N : N; ; k = Math.floor(k / 2)) {
      chain.push(k);
      if (k === 0) break;
    }
    const view = (k, opts = {}) => {
      const cmarks = {};
      chain.forEach((e, idx) => {
        if (returned[e] !== undefined) cmarks[idx] = "match";
        else if (stack.includes(e)) cmarks[idx] = "compare";
      });
      if (k !== undefined) cmarks[chain.indexOf(k)] = opts.mark || "active";
      return [
        { type: "array", label: "exponents on the way down: n, n / 2, n / 4, … (value underneath once returned)", values: chain, sub: chain.map((e) => (returned[e] !== undefined ? fmt(returned[e]) : "")), marks: cmarks, wide: true },
        { type: "array", label: "call stack: power(x, k), newest on the right", values: stack.map((e) => `k = ${e}`), wide: true, marks: stack.length ? { [stack.length - 1]: "active" } : {} },
        { type: "vars", items: [{ name: "x", value: fmt(x) }, ...(opts.half !== undefined ? [{ name: "half", value: fmt(opts.half) }] : []), { name: "calls", value: calls }] },
      ];
    };

    if (n < 0) {
      steps.push({ line: "flip", note: `n = ${n} is negative: x^${n} = (1/x)^${-n}. x becomes ${fmt(1 / x0)} and n becomes ${-n}${n === -2147483648 ? " (2³¹, which needs a 64-bit integer)" : ""}.`, view: view() });
      x = 1 / x0;
      N = -n;
    }
    steps.push({ line: "start", note: `power(x, ${N}): each call halves the exponent, so there are only ${chain.length} calls.`, view: view() });
    function power(k) {
      calls++;
      stack.push(k);
      if (k === 0) {
        steps.push({ line: ["call", "base"], note: `power(x, 0) = 1: the bottom of the recursion.`, view: view(k) });
        returned[0] = 1;
        stack.pop();
        return 1;
      }
      steps.push({ line: ["call", "half"], note: `power(x, ${k}): first get the half, power(x, ${Math.floor(k / 2)}).`, view: view(k) });
      const half = power(Math.floor(k / 2));
      const value = k % 2 === 0 ? half * half : half * half * x;
      returned[k] = value;
      steps.push({
        line: k % 2 === 0 ? "even" : "odd",
        note:
          k % 2 === 0
            ? `Back in power(x, ${k}): ${k} is even, so x^${k} = half² = ${fmt(half)}² = ${fmt(value)}.`
            : `Back in power(x, ${k}): ${k} is odd, so x^${k} = half² × x = ${fmt(half)}² × ${fmt(x)} = ${fmt(value)}.`,
        view: view(k, { half, mark: "match" }),
      });
      stack.pop();
      return value;
    }
    const answer = power(N);
    steps.push({
      line: "start",
      note: `Return ${fmt(answer)}. ${calls} calls for n = ${N}: O(log n). Calling power(x, k / 2) twice instead of storing it would make this O(n) again: for n = 2²⁰ that's 4,194,303 calls instead of 22.`,
      view: view(),
    });
    return steps;
  },
});
