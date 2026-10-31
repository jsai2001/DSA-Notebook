// Brute force: build every string of 2n brackets from the bits of a counter and keep the balanced ones.
DSAViz.register("0022-generate-parentheses/approach1", {
  inputs: [{ name: "n", type: "int", value: "2", min: 1, max: 3 }],
  trace({ n }) {
    const steps = [];
    const result = [];
    const total = 1 << (2 * n);
    const view = (s, opts = {}) => {
      const widgets = [];
      if (s !== undefined) {
        const marks = {};
        const sub = [];
        let balance = 0;
        for (let k = 0; k < s.length; k++) {
          if (opts.stop !== undefined && k > opts.stop) {
            sub.push("");
            marks[k] = "ghost";
            continue;
          }
          balance += s[k] === "(" ? 1 : -1;
          sub.push(String(balance));
          if (opts.valid) marks[k] = "match";
          else if (k === opts.stop) marks[k] = "cut";
        }
        widgets.push({ type: "array", label: "s (running balance underneath)", values: s.split(""), sub, marks });
        widgets.push({ type: "vars", items: [{ name: "mask", value: `${opts.mask} = ${opts.mask.toString(2).padStart(2 * n, "0")}₂` }] });
      }
      widgets.push({
        type: "array",
        label: `result (${result.length})`,
        values: result.slice(),
        wide: true,
        marks: opts.kept ? { [result.length - 1]: "new" } : {},
      });
      return widgets;
    };

    steps.push({
      line: "init",
      note: `Try all ${total} strings of ${2 * n} brackets. Bit k of mask (bit 0 is the rightmost binary digit) says what goes at position k: 1 = '(', 0 = ')'.`,
      view: view(),
    });
    for (let mask = 0; mask < total; mask++) {
      let s = "";
      for (let k = 0; k < 2 * n; k++) s += (mask >> k) & 1 ? "(" : ")";
      let balance = 0;
      let stop;
      for (let k = 0; k < s.length; k++) {
        balance += s[k] === "(" ? 1 : -1;
        if (balance < 0) {
          stop = k;
          break;
        }
      }
      const ok = balance === 0;
      let note;
      if (stop !== undefined) note = `mask ${mask} → "${s}". The balance drops to -1 at position ${stop}: a ')' with nothing to close. Stop checking.`;
      else if (!ok) note = `mask ${mask} → "${s}". It never goes below 0 but ends at ${balance}: ${balance} '(' left open.`;
      else note = `mask ${mask} → "${s}". The balance never goes below 0 and ends at 0: valid.`;
      steps.push({ line: ["loop", "build", "check"], note, view: view(s, { mask, stop, valid: ok }) });
      if (ok) {
        result.push(s);
        steps.push({ line: "keep", note: `Keep "${s}".`, view: view(s, { mask, valid: true, kept: true }) });
      }
    }
    steps.push({
      line: "return",
      note: `Return ${result.length} out of ${total} strings checked. The total doubles twice for every extra pair, so most of the work is wasted on invalid strings: O(4ⁿ · n).`,
      view: view(),
    });
    return steps;
  },
});
