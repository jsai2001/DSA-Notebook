// Check every substring s[i..j] with two pointers; count the palindromes.
(function () {
DSAViz.register("0647-palindromic-substrings/approach1", {
  inputs: [{ name: "s", type: "string", value: "abaa", maxLength: 8 }],
  trace({ s }) {
    const w = parseWord(s);
    const n = w.length;
    const steps = [];
    let count = 0;
    let pairs = 0;
    const found = [];
    const view = (o = {}) => {
      const marks = {};
      if (o.range) for (let t = o.range[0]; t <= o.range[1]; t++) marks[t] = o.ok ? "match" : "cut";
      return [
        { type: "array", label: "s (green = palindrome, red = not)", values: [...w], marks, pointers: o.range ? { i: o.range[0], j: o.range[1] } : {} },
        { type: "array", label: "palindromes counted", values: [...found], wide: true, marks: o.ok ? { [found.length - 1]: "new" } : {} },
        { type: "vars", items: [{ name: "count", value: count, mark: o.ok ? "new" : "" }, { name: "letter pairs compared", value: pairs, mark: o.counted ? "new" : "" }] },
      ];
    };
    steps.push({ line: "init", note: `There are ${n} · ${n + 1} / 2 = ${(n * (n + 1)) / 2} substrings. Check each one.`, view: view() });
    for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
        let lo = i;
        let hi = j;
        let here = 0;
        while (lo < hi) {
          here++;
          if (w[lo] !== w[hi]) break;
          lo++;
          hi--;
        }
        pairs += here;
        const ok = lo >= hi;
        const piece = w.slice(i, j + 1);
        if (ok) {
          count++;
          found.push(piece);
        }
        steps.push({
          line: ok ? ["pick", "check", "count"] : ["pick", "check"],
          note: `s[${i}..${j}] = "${piece}": ${here ? `${here} pair${here === 1 ? "" : "s"} compared, ` : "one letter, "}${ok ? "a palindrome. count = " + count + "." : `"${w[lo]}" ≠ "${w[hi]}", not a palindrome.`}`,
          view: view({ range: [i, j], ok, counted: true }),
        });
      }
    }
    steps.push({ line: "return", note: `Return ${count}. That took ${pairs} letter-pair comparisons: O(n²) substrings, each up to O(n) to check.`, view: view() });
    return steps;
  },
});

function parseWord(s) {
  const w = s.trim();
  if (!/^[a-z]{1,8}$/.test(w)) throw new DSAViz.InputError("s: 1 to 8 lowercase letters, like aaa.");
  return w;
}
})();
