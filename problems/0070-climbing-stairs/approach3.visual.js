// M = [[1, 1], [1, 0]]; M^n holds ways(n). Fast power builds M^n from M^1, M^2, M^4, ... using the bits of n.
DSAViz.register("0070-climbing-stairs/approach3", {
  inputs: [{ name: "n", type: "int", value: "13", min: 1, max: 45 }],
  trace({ n }) {
    const mul = (x, y) => [
      [x[0][0] * y[0][0] + x[0][1] * y[1][0], x[0][0] * y[0][1] + x[0][1] * y[1][1]],
      [x[1][0] * y[0][0] + x[1][1] * y[1][0], x[1][0] * y[0][1] + x[1][1] * y[1][1]],
    ];
    const bits = n.toString(2).split("").map(Number); // most significant first
    let result = [[1, 0], [0, 1]];
    let base = [[1, 1], [1, 0]];
    let resPow = 0;
    let basePow = 1;
    let p = n;
    let round = 0; // how many low bits have been used
    let mults = 0;
    const steps = [];
    const grid = (label, m, mark) => ({
      type: "grid",
      label,
      rows: ["", ""],
      cols: ["", ""],
      cells: m.map((r) => r.slice()),
      marks: mark ? { "0,0": mark, "0,1": mark, "1,0": mark, "1,1": mark } : {},
      corner: "",
    });
    const view = (o = {}) => {
      const bm = {};
      bits.forEach((_, i) => {
        const fromRight = bits.length - 1 - i;
        if (fromRight < round) bm[i] = "visited";
        else if (fromRight === round && o.bit) bm[i] = bits[i] ? "match" : "active";
      });
      return [
        { type: "array", label: `n = ${n} in binary (one bit per round, from the right)`, values: bits, compact: true, marks: bm, sub: bits.map((_, i) => `2^${bits.length - 1 - i}`) },
        grid(`result = M^${resPow}  (top-left is ways(${resPow}))`, result, o.took ? "new" : o.final ? "match" : ""),
        grid(`base = M^${basePow}`, base, o.squared ? "new" : ""),
        { type: "vars", items: [{ name: "p", value: p }, { name: "matrix products", value: mults }] },
      ];
    };
    steps.push({
      line: "init",
      note: `M = [[1, 1], [1, 0]]. Multiplying by M turns [ways(k), ways(k − 1)] into [ways(k + 1), ways(k)], so M^${n} has ways(${n}) in its top-left. ${n} = ${bits.join("")} in binary.`,
      view: view(),
    });
    while (p) {
      const bit = p & 1;
      if (bit) {
        result = mul(result, base);
        resPow += basePow;
        mults++;
        steps.push({
          line: ["bit", "take", "mul"],
          note: `Bit for ${basePow} is 1: result = M^${resPow - basePow} × M^${basePow} = M^${resPow}. Powers add when you multiply.`,
          view: view({ bit: true, took: true }),
        });
      } else {
        steps.push({ line: "bit", note: `Bit for ${basePow} is 0: ${basePow} isn't part of ${n}, so result stays M^${resPow}.`, view: view({ bit: true }) });
      }
      base = mul(base, base);
      basePow *= 2;
      p >>= 1;
      round++;
      mults++;
      steps.push({
        line: ["square", "mul"],
        note: p
          ? `Square base: M^${basePow / 2} × M^${basePow / 2} = M^${basePow}, ready for the next bit. p = ${p}.`
          : `Square base to M^${basePow} anyway (it's never used). p = 0, so stop.${base[0][0] > 2147483647 ? ` Its top-left is ${base[0][0]}, past 2^31: with 32-bit ints this unused square is what overflows.` : ""}`,
        view: view({ squared: true }),
      });
    }
    steps.push({
      line: "answer",
      note: `Return result[0][0] = ways(${n}) = ${result[0][0]}. ${mults} matrix products for ${bits.length} bit${bits.length === 1 ? "" : "s"}: O(log n), against ${n - 1} additions for Approach 2.`,
      view: view({ final: true }),
    });
    return steps;
  },
});
