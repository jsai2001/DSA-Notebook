// Brute force by length: for each length, scan windows and stop at the first palindrome.
DSAViz.register("0005-longest-palindromic-substring/approach1", {
  inputs: [{ name: "s", type: "string", value: "babad", maxLength: 8 }],

  trace({ s }) {
    if (!/^[A-Za-z0-9]+$/.test(s)) {
      throw new DSAViz.InputError("s needs 1 to 8 letters or digits (no spaces or symbols).");
    }
    const n = s.length;
    const chars = Array.from(s);
    const steps = [];
    let longStr = s[0];
    let longAt = 0;
    let checks = 0;

    const view = (L, idx, opts = {}) => {
      const marks = {};
      if (idx !== undefined) {
        for (let k = idx; k < idx + L; k++) marks[k] = opts.pal ? "match" : "compare";
      }
      if (opts.final) for (let k = longAt; k < longAt + longStr.length; k++) marks[k] = "match";
      const vars = [];
      if (L !== undefined) vars.push({ name: "check_len", value: L });
      if (opts.window !== undefined) {
        vars.push({ name: "window", value: `"${opts.window}"`, mark: opts.pal ? "match" : "compare" });
        vars.push({ name: "reversed", value: `"${Array.from(opts.window).reverse().join("")}"` });
      }
      vars.push({ name: "long_str", value: `"${longStr}"`, mark: opts.newBest ? "match" : "" });
      vars.push({ name: "windows checked", value: checks });
      return [
        { type: "array", label: "s", values: chars, pointers: idx !== undefined ? { char_idx: idx } : {}, marks },
        { type: "vars", items: vars },
      ];
    };

    steps.push({
      line: "init",
      note: `Start with long_str = s[0] = "${s[0]}". Then try every length from 1 to ${n}, scanning windows left to right.`,
      view: view(),
    });

    for (let L = 1; L <= n; L++) {
      steps.push({
        line: L === 1 ? "length" : ["next", "length"],
        note: `check_len = ${L}: is there any palindrome of length ${L}?`,
        view: view(L),
      });
      let found = false;
      for (let idx = 0; idx + L <= n; idx++) {
        checks++;
        const w = s.slice(idx, idx + L);
        const pal = w === Array.from(w).reverse().join("");
        steps.push({
          line: "check",
          note: pal
            ? `s[${idx}:${idx + L}] = "${w}" reads the same reversed. It's a palindrome.`
            : `s[${idx}:${idx + L}] = "${w}" reversed is "${Array.from(w).reverse().join("")}". Not a palindrome.`,
          view: view(L, idx, { window: w, pal }),
        });
        if (pal) {
          longStr = w;
          longAt = idx;
          steps.push({
            line: "found",
            note: `Record long_str = "${w}" and break: no need to check other windows of length ${L}.`,
            view: view(L, idx, { window: w, pal, newBest: true }),
          });
          found = true;
          break;
        }
      }
      if (!found) {
        steps.push({
          line: "next",
          note: `No palindrome of length ${L}. Keep going anyway: a longer one can still exist (like "aba" has none of length 2).`,
          view: view(L),
        });
      }
    }

    steps.push({
      line: "return",
      note: `Return "${longStr}". That took ${checks} window checks, each copying and reversing a slice: O(n³) in the worst case.`,
      view: view(undefined, undefined, { final: true }),
    });
    return steps;
  },
});
