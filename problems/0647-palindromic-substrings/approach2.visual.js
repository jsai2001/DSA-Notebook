// Table pal[i][j]: s[i..j] is a palindrome when its ends match and its inside is one.
(function () {
DSAViz.register("0647-palindromic-substrings/approach2", {
  inputs: [{ name: "s", type: "string", value: "abaa", maxLength: 8 }],
  trace({ s }) {
    const w = parseWord(s);
    const n = w.length;
    const steps = [];
    const pal = Array.from({ length: n }, () => Array(n).fill(null));
    let count = 0;
    const view = (o = {}) => {
      const cells = pal.map((row, i) => row.map((v, j) => (j < i ? "" : v === null ? " " : v ? "✓" : "·")));
      const marks = {};
      pal.forEach((row, i) => row.forEach((v, j) => { if (v) marks[`${i},${j}`] = "match"; }));
      if (o.inside) marks[`${o.inside[0]},${o.inside[1]}`] = "window";
      if (o.at) marks[`${o.at[0]},${o.at[1]}`] = o.ok ? "new" : "active";
      const smarks = {};
      if (o.at) { smarks[o.at[0]] = "compare"; smarks[o.at[1]] = "compare"; }
      return [
        { type: "array", label: "s (yellow = the two ends being compared)", values: [...w], marks: smarks, pointers: o.at ? { i: o.at[0], j: o.at[1] } : {} },
        { type: "grid", label: "pal[i][j] (✓ = s[i..j] is a palindrome; yellow = just filled; outlined = the inside it used)", rows: [...Array(n).keys()], cols: [...Array(n).keys()], corner: "i \\ j", cells, marks },
        { type: "vars", items: [{ name: "count", value: count, mark: o.ok ? "new" : "" }] },
      ];
    };
    steps.push({ line: "init", note: "Fill pal[i][j] from the bottom row up (i from the end), so pal[i + 1][j - 1], the inside, is always filled first.", view: view() });
    for (let i = n - 1; i >= 0; i--) {
      for (let j = i; j < n; j++) {
        const short = j - i < 2;
        const ok = w[i] === w[j] && (short || pal[i + 1][j - 1]);
        pal[i][j] = ok;
        if (ok) count++;
        let why;
        if (w[i] !== w[j]) why = `"${w[i]}" ≠ "${w[j]}": no.`;
        else if (short) why = j === i ? "one letter: yes." : `"${w[i]}${w[j]}", two equal letters: yes.`;
        else why = `ends match, and the inside s[${i + 1}..${j - 1}] ${pal[i + 1][j - 1] ? "is" : "isn't"} a palindrome: ${ok ? "yes" : "no"}.`;
        steps.push({
          line: ok ? ["row", "cell", "count"] : ["row", "cell"],
          note: `pal[${i}][${j}], "${w.slice(i, j + 1)}": ${why}${ok ? ` count = ${count}.` : ""}`,
          view: view({ at: [i, j], ok, inside: !short && w[i] === w[j] ? [i + 1, j - 1] : null }),
        });
      }
    }
    steps.push({ line: "return", note: `Return ${count}, the number of ✓ cells. ${(n * (n + 1)) / 2} cells, each O(1): O(n²) time, but also O(n²) memory.`, view: view() });
    return steps;
  },
});

function parseWord(s) {
  const w = s.trim();
  if (!/^[a-z]{1,8}$/.test(w)) throw new DSAViz.InputError("s: 1 to 8 lowercase letters, like aaa.");
  return w;
}
})();
