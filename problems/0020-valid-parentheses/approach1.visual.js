// Repeatedly remove adjacent matching pairs until nothing changes; valid if nothing is left.
DSAViz.register("0020-valid-parentheses/approach1", {
  inputs: [{ name: "s", type: "string", value: "{[()]}", maxLength: 14 }],
  trace({ s }) {
    if (!s.length || !/^[()[\]{}]+$/.test(s)) throw new DSAViz.InputError("s needs 1 to 14 characters, all from ( ) [ ] { }.");
    const steps = [];
    let pass = 0;
    // Marks the characters that str.replace(pair, "") removes, scanning left to right.
    const matchesOf = (str, pair) => {
      const hit = [];
      let from = 0;
      for (;;) {
        const at = str.indexOf(pair, from);
        if (at < 0) break;
        hit.push(at, at + 1);
        from = at + 2;
      }
      return hit;
    };
    const view = (str, hit = [], opts = {}) => [
      {
        type: "array", label: opts.label || "s", values: str.length ? [...str] : [],
        marks: Object.fromEntries(hit.map((k) => [k, "compare"])), compact: str.length > 10,
      },
      { type: "vars", items: [{ name: "pass", value: pass }, { name: "length", value: str.length, mark: opts.done ? (str.length ? "compare" : "match") : "" }] },
    ];
    steps.push({ line: "loop", note: `Each pass removes every adjacent matching pair: "()" first, then "[]", then "{}". Removing one pair can make a new pair touch.`, view: view(s) });
    let cur = s;
    for (;;) {
      pass++;
      let next = cur;
      for (const pair of ["()", "[]", "{}"]) {
        const hit = matchesOf(next, pair);
        if (!hit.length) {
          steps.push({ line: "remove", note: `Pass ${pass}: no "${pair}" in "${next}".`, view: view(next) });
          continue;
        }
        steps.push({ line: "remove", note: `Pass ${pass}: remove ${hit.length / 2} "${pair}" (highlighted).`, view: view(next, hit) });
        next = next.split(pair).join("");
      }
      if (next.length === cur.length) {
        steps.push({
          line: "check",
          note: `Pass ${pass} removed nothing, so stop.`,
          view: view(next, [], { done: true }),
        });
        cur = next;
        break;
      }
      steps.push({ line: "shrink", note: `Pass ${pass} went from ${cur.length} to ${next.length} characters: "${next}". Go again.`, view: view(next) });
      cur = next;
    }
    steps.push({
      line: "return",
      note: cur.length
        ? `"${cur}" is left: nothing in it can cancel, so return false.`
        : `Everything cancelled out: return true. On deep nesting each pass removes only the innermost pair, so it can take n / 2 passes: O(n²).`,
      view: view(cur, [], { done: true, label: "what's left" }),
    });
    return steps;
  },
});
