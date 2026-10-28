// Build by place value: the last digit goes to the highest place, then check the range once at the end.
DSAViz.register("0007-reverse-integer/approach1", {
  inputs: [{ name: "x", type: "int", value: "-123", min: -2147483648, max: 2147483647 }],
  trace({ x }) {
    const LO = -(2 ** 31);
    const HI = 2 ** 31 - 1;
    const steps = [];
    let n = Math.abs(x);
    const positive = x >= 0;
    const digits = String(n).split("").map(Number);
    let decimal = digits.length - 1;
    let rev = 0;
    let taken = 0; // digits already moved, from the right
    const view = (opts = {}) => {
      const marks = {};
      for (let k = digits.length - taken; k < digits.length; k++) marks[k] = "visited";
      if (opts.active !== undefined) marks[opts.active] = "active";
      return [
        {
          type: "array", label: "no_sign_int (digits left to move)", values: digits, marks,
          pointers: opts.active !== undefined ? { "% 10": opts.active } : {},
        },
        {
          type: "vars",
          items: [
            { name: "no_sign_int", value: n },
            { name: "decimal", value: decimal },
            { name: "rev_int", value: rev, mark: opts.changed ? "new" : opts.bad ? "compare" : opts.done ? "match" : "" },
            { name: "sign", value: positive ? "True (x ≥ 0)" : "False (x < 0)" },
          ],
        },
      ];
    };

    steps.push({
      line: "init",
      note: `The answer must fit in a 32-bit signed int: from ${LO} to ${HI}. Start with rev_int = 0.`,
      view: view(),
    });
    steps.push({
      line: "sign",
      note: `Work with the size only: no_sign_int = |${x}| = ${n}. Remember the sign (${positive ? "positive" : "negative"}) to put back at the end.`,
      view: view(),
    });
    steps.push({
      line: "digits",
      note: `${n} has ${digits.length} digit${digits.length === 1 ? "" : "s"}, so the last digit belongs at place 10^${decimal}${decimal ? ` = ${10 ** decimal}` : ""}.`,
      view: view(),
    });

    while (decimal) {
      const d = n % 10;
      const place = 10 ** decimal;
      const idx = digits.length - 1 - taken;
      rev += d * place;
      steps.push({
        line: ["loop", "place"],
        note: `Last digit ${n} % 10 = ${d}, times 10^${decimal} = ${place}: rev_int += ${d * place} → ${rev}.`,
        view: view({ active: idx, changed: true }),
      });
      decimal -= 1;
      n = Math.floor(n / 10);
      taken += 1;
      steps.push({
        line: "next",
        note: `Drop that digit (no_sign_int // 10 = ${n}) and move one place lower (decimal = ${decimal}).`,
        view: view(),
      });
    }

    rev += n;
    taken += 1;
    steps.push({
      line: ["loop", "last"],
      note: `decimal is 0, so the loop stops with one digit left: ${n}. It goes in the ones place: rev_int = ${rev}.`,
      view: view({ active: 0, changed: true }),
    });

    if (!positive) rev = -rev;
    steps.push({
      line: "restore",
      note: positive ? `x was positive, so rev_int stays ${rev}.` : `x was negative, so flip the sign: rev_int = ${rev}.`,
      view: view(),
    });

    const out = rev < LO || rev > HI;
    steps.push({
      line: "check",
      note: out
        ? `${rev} is outside ${LO} … ${HI}, so it doesn't fit in 32 bits.`
        : `${rev} is inside ${LO} … ${HI}, so it fits.`,
      view: view({ bad: out }),
    });
    steps.push({
      line: out ? "overflow" : "return",
      note: out
        ? `Return 0. Python could hold ${rev} anyway; in C++ or Java this approach needs 64-bit numbers, which the problem says to avoid.`
        : `Return ${rev}.`,
      view: view({ done: !out, bad: out }),
    });
    return steps;
  },
});
