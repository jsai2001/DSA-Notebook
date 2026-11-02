// Binary exponentiation: read n's bits from the lowest; x keeps squaring (x, x², x⁴, x⁸, …) and set bits multiply into result.
DSAViz.register("0050-powx-n/approach3", {
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
    let N = n < 0 ? -n : n; // a JS number holds 2^31 exactly
    const bits = N === 0 ? ["0"] : N.toString(2).split("");
    const L = bits.length;
    let result = 1;
    let used = 0; // exponent collected in result so far
    let k = 0; // current bit, counted from the right
    let rest = N;
    const view = (opts = {}) => {
      const marks = {};
      for (let j = 0; j < L; j++) {
        const bitIndex = L - 1 - j; // display left to right = high to low
        if (bitIndex < k) marks[j] = bits[j] === "1" ? "match" : "visited";
      }
      if (opts.at !== undefined && opts.at < L) marks[L - 1 - opts.at] = opts.mark || "active";
      return [
        {
          type: "array",
          label: `n = ${N} in binary (bold number = bit k; bit 0, the lowest, is on the right)`,
          values: bits,
          sub: bits.map((_, j) => String(L - 1 - j)),
          marks,
          compact: L > 12,
        },
        {
          type: "vars",
          items: [
            { name: "x (= b^(2^k))", value: fmt(x), mark: opts.squared ? "new" : "" },
            { name: "result", value: `${fmt(result)}${used ? ` = b^${used}` : ""}`, mark: opts.took ? "new" : "" },
            { name: "n left", value: rest },
          ],
        },
      ];
    };

    if (n < 0) {
      steps.push({ line: "flip", note: `n = ${n} is negative: x^${n} = (1/x)^${-n}. x becomes ${fmt(1 / x0)} and n becomes ${-n}${n === -2147483648 ? ", which is 2³¹ and only fits in a 64-bit integer: that's why the code uses long" : ""}.`, view: view() });
      x = 1 / x0;
    }
    steps.push({
      line: "init",
      note: N ? `${N} in binary is ${bits.join("")}, so b^${N} is the product of b^(2^k) for each set bit k, where b = ${n < 0 ? `1/${fmt(x0)}` : fmt(x0)}. result = 1; x starts at b and is squared each round: b, b², b⁴, …` : "n = 0: no bits to read, the answer is 1.",
      view: view(),
    });
    while (rest > 0) {
      if (rest % 2 === 1) {
        result *= x;
        used += 2 ** k;
        steps.push({ line: ["loop", "bit"], note: `Bit ${k} is 1: multiply result by x (b^${2 ** k}). result = ${fmt(result)} = b^${used}.`, view: view({ at: k, mark: "new", took: true }) });
      } else {
        steps.push({ line: ["loop", "bit"], note: `Bit ${k} is 0: b^${2 ** k} isn't part of the answer, so result stays ${fmt(result)}.`, view: view({ at: k, mark: "compare" }) });
      }
      x *= x;
      rest = Math.floor(rest / 2);
      k++;
      steps.push({
        line: "square",
        note: `Square x for the next bit: x = b^${2 ** k} = ${fmt(x)}. Shift n right: ${rest} left.${rest === 0 ? " No bits left." : ""}`,
        view: view({ at: k, squared: true }),
      });
    }
    steps.push({
      line: "return",
      note: `Return ${fmt(result)}. ${k} round${k === 1 ? "" : "s"}, one per bit of n: O(log n) time, O(1) space. Even n = 2³¹ − 1 needs only 31.`,
      view: view(),
    });
    return steps;
  },
});
