// Bottom-up: parts[i] = every split of the suffix s[i:], built from shorter suffixes.
(function () {
DSAViz.register("0131-palindrome-partitioning/approach3", {
  inputs: [{ name: "s", type: "string", value: "aab", maxLength: 6 }],
  trace({ s }) {
    const w = parseWord(s);
    const n = w.length;
    const steps = [];
    const pal = Array.from({ length: n }, () => Array(n).fill(false));
    for (let i = n - 1; i >= 0; i--) for (let j = i; j < n; j++) pal[i][j] = w[i] === w[j] && (j - i < 2 || pal[i + 1][j - 1]);
    const parts = Array.from({ length: n + 1 }, () => []);
    parts[n] = [[]];
    let stored = 1;
    const show = (p) => (p.length ? p.join(" | ") : "(nothing left)");
    const view = (o = {}) => {
      const marks = {};
      if (o.i !== undefined) for (let t = o.i; t < n; t++) marks[t] = "window";
      if (o.range) for (let t = o.range[0]; t <= o.range[1]; t++) marks[t] = "match";
      const entries = [];
      for (let i = n; i >= (o.upto ?? n); i--) entries.push([`parts[${i}] = splits of "${w.slice(i)}"`, parts[i].map(show).join("  ·  ") || "—"]);
      return [
        { type: "array", label: "s (outlined = the suffix s[i:]; green = its first piece)", values: [...w], marks, pointers: o.i !== undefined ? { i: o.i } : {} },
        { type: "map", label: "parts", columns: ["suffix", "every way to split it"], entries, marks: o.i !== undefined ? { [`parts[${o.i}] = splits of "${w.slice(o.i)}"`]: "new" } : {} },
        { type: "vars", items: [{ name: "splits stored in all", value: stored }] },
      ];
    };
    steps.push({ line: ["table", "init"], note: `Fill the palindrome table pal[i][j] first (as in Approach 2). parts[${n}] is the empty suffix: one way to split it, with no pieces.`, view: view() });
    for (let i = n - 1; i >= 0; i--) {
      steps.push({ line: "suffix", note: `Suffix s[${i}:] = "${w.slice(i)}". Its first piece is s[${i}..end] for some end; every split of what's left is already in parts[end + 1].`, view: view({ i, upto: i + 1 }) });
      for (let end = i; end < n; end++) {
        if (!pal[i][end]) continue;
        const piece = w.slice(i, end + 1);
        const before = parts[i].length;
        for (const rest of parts[end + 1]) parts[i].push([piece, ...rest]);
        stored += parts[i].length - before;
        steps.push({
          line: ["try", "join"],
          note: `"${piece}" is a palindrome. Put it in front of each of the ${parts[end + 1].length} split${parts[end + 1].length === 1 ? "" : "s"} in parts[${end + 1}].`,
          view: view({ i, upto: i, range: [i, end] }),
        });
      }
    }
    steps.push({
      line: "return",
      note: `Return parts[0]: ${parts[0].length} way${parts[0].length === 1 ? "" : "s"}. Splits of every suffix were kept along the way (${stored} in all), so this uses more memory than backtracking.`,
      view: view({ upto: 0 }),
    });
    return steps;
  },
});

function parseWord(s) {
  const w = s.trim();
  if (!/^[a-z]{1,6}$/.test(w)) throw new DSAViz.InputError("s: 1 to 6 lowercase letters, like aab (longer words have too many splits to step through).");
  return w;
}
})();
