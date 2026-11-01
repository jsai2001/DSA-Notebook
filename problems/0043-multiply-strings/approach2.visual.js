// One result array: num1[i] × num2[j] lands on places i + j and i + j + 1; carry into the left place right away.
DSAViz.register("0043-multiply-strings/approach2", {
  inputs: [
    { name: "num1", type: "string", value: "123", maxLength: 4 },
    { name: "num2", type: "string", value: "45", maxLength: 4 },
  ],
  trace({ num1, num2 }) {
    for (const [name, s] of [["num1", num1], ["num2", num2]]) {
      if (!/^(0|[1-9]\d*)$/.test(s)) throw new DSAViz.InputError(`${name} must be a whole number without leading zeros, like 123.`);
    }
    const m = num1.length;
    const n = num2.length;
    const steps = [];
    const pos = Array(m + n).fill(0);
    const view = (i, j, opts = {}) => {
      const pmarks = {};
      if (opts.lo !== undefined) pmarks[opts.lo] = opts.placed ? "new" : "active";
      if (opts.hi !== undefined) pmarks[opts.hi] = opts.placed ? "new" : "compare";
      if (opts.final) pos.forEach((_, k) => (pmarks[k] = k === 0 && pos[0] === 0 ? "ghost" : "match"));
      return [
        { type: "array", label: "num1", values: [...num1], marks: i !== undefined ? { [i]: "active" } : {}, pointers: i !== undefined ? { i } : {} },
        { type: "array", label: "num2", values: [...num2], marks: j !== undefined ? { [j]: "active" } : {}, pointers: j !== undefined ? { j } : {} },
        { type: "array", label: `pos (${m + n} places; index 0 is the leftmost)`, values: pos.slice(), marks: pmarks },
        ...(opts.calc ? [{ type: "vars", items: [{ name: "total", value: opts.calc }] }] : []),
      ];
    };

    if (num1 === "0" || num2 === "0") {
      steps.push({ line: "zero", note: `One of them is 0, so return "0". Without this check the array would be all zeros, and stripping them would leave an empty string.`, view: view() });
      return steps;
    }
    steps.push({
      line: "init",
      note: `An m-digit number times an n-digit number has at most m + n = ${m + n} digits. pos holds them; num1[i] × num2[j] belongs at places i + j and i + j + 1.`,
      view: view(),
    });
    for (let i = m - 1; i >= 0; i--) {
      for (let j = n - 1; j >= 0; j--) {
        const lo = i + j + 1;
        const hi = i + j;
        const prod = Number(num1[i]) * Number(num2[j]);
        const total = prod + pos[lo];
        steps.push({
          line: "mul",
          note: `num1[${i}] × num2[${j}] = ${num1[i]} × ${num2[j]} = ${prod}, plus what's already in pos[${lo}] (${pos[lo]}): ${total}.`,
          view: view(i, j, { lo, hi, calc: `${prod} + ${pos[lo]} = ${total}` }),
        });
        pos[lo] = total % 10;
        pos[hi] += Math.floor(total / 10);
        steps.push({
          line: "place",
          note: `Keep ${total % 10} in pos[${lo}] and carry ${Math.floor(total / 10)} into pos[${hi}] (now ${pos[hi]}). pos[${hi}] may go above 9 for a moment; the next product that lands there carries it on.`,
          view: view(i, j, { lo, hi, placed: true }),
        });
      }
    }
    const result = pos.join("").replace(/^0+/, "");
    steps.push({
      line: "return",
      note: `Join the places: ${pos.join("")}${pos[0] === 0 ? `, and drop the leading 0 (the product had only ${m + n - 1} digits)` : ""}. Return "${result}". m × n digit products, one array: O(m · n) time, O(m + n) space.`,
      view: view(undefined, undefined, { final: true }),
    });
    return steps;
  },
});
