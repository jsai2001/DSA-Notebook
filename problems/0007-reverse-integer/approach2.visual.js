// Pop and push digits, checking before each push that rev * 10 + digit stays within the limit.
DSAViz.register("0007-reverse-integer/approach2", {
  inputs: [{ name: "x", type: "int", value: "1534236469", min: -2147483648, max: 2147483647 }],
  trace({ x }) {
    const steps = [];
    const sign = x < 0 ? -1 : 1;
    let n = Math.abs(x);
    const limit = sign > 0 ? 2 ** 31 - 1 : 2 ** 31;
    const cap = Math.floor(limit / 10);
    const lastMax = limit % 10;
    let rev = 0;
    const left = () => (n ? String(n).split("").map(Number) : []);
    const revDigits = () => (rev ? String(rev).split("").map(Number) : []);
    const view = (opts = {}) => {
      const l = left();
      const r = revDigits();
      const lmarks = {};
      if (opts.pop) lmarks[l.length - 1] = "active";
      const rmarks = {};
      if (opts.pushed) rmarks[r.length - 1] = "new";
      if (opts.done) r.forEach((_, k) => (rmarks[k] = "match"));
      return [
        { type: "array", label: "x (digits still to pop)", values: l, marks: lmarks },
        { type: "array", label: "rev (digits pushed so far)", values: r, marks: rmarks },
        {
          type: "vars",
          items: [
            { name: "limit", value: limit },
            { name: "limit // 10", value: cap, mark: opts.cmp ? "compare" : "" },
            { name: "rev", value: rev, mark: opts.over ? "compare" : opts.pushed ? "new" : "" },
            { name: "digit", value: opts.digit === undefined ? "–" : opts.digit, mark: opts.pop ? "active" : "" },
          ],
        },
      ];
    };

    steps.push({
      line: "init",
      note: `Work with |x| = ${n} and keep the sign (${sign > 0 ? "+" : "−"}). The result may be at most ${limit} in size (${sign > 0 ? "2³¹ − 1 for positive" : "2³¹ for negative"}).`,
      view: view(),
    });
    if (n === 0) {
      steps.push({ line: ["loop", "return"], note: `x is 0: there are no digits to pop. Return 0.`, view: view({ done: true }) });
      return steps;
    }

    while (n) {
      const digit = n % 10;
      steps.push({
        line: ["loop", "pop"],
        note: `Pop the last digit: ${n} % 10 = ${digit}.`,
        view: view({ pop: true, digit }),
      });
      n = Math.floor(n / 10);
      const over = rev > cap || (rev === cap && digit > lastMax);
      const why =
        rev > cap
          ? `rev = ${rev} is already bigger than limit // 10 = ${cap}, so rev × 10 would pass ${limit}.`
          : rev === cap
            ? `rev equals limit // 10 = ${cap}, so the digit may be at most ${lastMax}. It's ${digit}: ${over ? "too big" : "fine"}.`
            : `rev = ${rev} < limit // 10 = ${cap}, so rev × 10 + ${digit} is safely inside the limit.`;
      steps.push({ line: "check", note: `Check before pushing. ${why}`, view: view({ digit, cmp: true, over }) });
      if (over) {
        steps.push({
          line: "overflow",
          note: `It would overflow, so return 0. The too-big number is never built, so 32-bit math is enough.`,
          view: view({ digit, over: true }),
        });
        return steps;
      }
      rev = rev * 10 + digit;
      steps.push({
        line: "push",
        note: `Push it: rev = rev × 10 + ${digit} = ${rev}.`,
        view: view({ pushed: true, digit }),
      });
    }

    steps.push({
      line: ["loop", "return"],
      note: `No digits left. Put the sign back: return ${sign * rev}.`,
      view: view({ done: true }),
    });
    return steps;
  },
});
