// Manacher: expand around centers in a "#"-padded string, but start each radius from its
// mirror inside the rightmost palindrome found so far.
DSAViz.register("0005-longest-palindromic-substring/approach4", {
  inputs: [{ name: "s", type: "string", value: "abacaba", maxLength: 7 }],

  trace({ s }) {
    if (!/^[A-Za-z0-9]+$/.test(s)) {
      throw new DSAViz.InputError("s needs 1 to 7 letters or digits (no spaces or symbols).");
    }
    const t = ["^", "#", ...Array.from(s).flatMap((c) => [c, "#"]), "$"];
    const p = Array(t.length).fill(null); // null = not computed yet
    const steps = [];
    let center = 0;
    let right = 0;
    let comparisons = 0;
    let saved = 0;

    // Start in s of the palindrome centered at t[i] with radius r (integer division, like the code).
    const startOf = (i, r) => Math.floor((i - r) / 2);
    const toS = (i, r) => s.slice(startOf(i, r), startOf(i, r) + r);
    const view = (i, opts = {}) => {
      const marks = {};
      if (i !== undefined && p[i] !== null) for (let k = i - p[i]; k <= i + p[i]; k++) marks[k] = "window";
      if (opts.mirror !== undefined) marks[opts.mirror] = "visited";
      if (i !== undefined) marks[i] = "active";
      if (opts.final) for (let k = opts.mid - p[opts.mid]; k <= opts.mid + p[opts.mid]; k++) marks[k] = "match";
      const pointers = {};
      if (i !== undefined) pointers.i = i;
      if (opts.mirror !== undefined) pointers.mirror = opts.mirror;
      if (right > 0) {
        pointers.center = center;
        pointers.right = right;
      }
      return [
        {
          type: "array", label: "t (with # between characters), p[i] underneath", values: t, compact: true,
          sub: p.map((v) => (v === null ? "" : v)), pointers, marks,
        },
        {
          type: "vars",
          items: [
            { name: "center", value: center },
            { name: "right", value: right, mark: opts.moved ? "new" : "" },
            { name: "comparisons", value: comparisons },
            { name: "skipped by mirror", value: saved, mark: opts.reused ? "match" : "" },
          ],
        },
      ];
    };

    p[0] = 0;
    steps.push({
      line: "build",
      note: `Put # between characters so every palindrome has odd length in t, with sentinels ^ and $ at the ends. p[i] will be the radius of the longest palindrome centered at t[i]; that radius equals its length in s.`,
      view: view(),
    });

    for (let i = 1; i < t.length - 1; i++) {
      let start = 0;
      let mirror;
      if (i < right) {
        mirror = 2 * center - i;
        start = Math.min(right - i, p[mirror]);
      }
      p[i] = start;
      saved += start;
      // Expand past what the mirror already guaranteed.
      let grew = 0;
      while (t[i + p[i] + 1] === t[i - p[i] - 1]) {
        comparisons++;
        p[i]++;
        grew++;
      }
      comparisons++; // the comparison that failed
      const lines = [];
      if (i < right) lines.push("mirror");
      else lines.push("loop");
      lines.push("expand");
      const headStart =
        i < right
          ? `i = ${i} is inside the palindrome ending at right = ${right}, so its mirror ${mirror} tells us p[i] >= min(${right} - ${i}, p[${mirror}] = ${p[mirror]}) = ${start} for free.`
          : `i = ${i} is past right = ${right}, so start from p[i] = 0.`;
      const expanded = grew
        ? ` Expanded ${grew} more: p[${i}] = ${p[i]}${p[i] ? ` ("${toS(i, p[i])}")` : ""}.`
        : ` t[${i + p[i] + 1}] = '${t[i + p[i] + 1]}' ≠ t[${i - p[i] - 1}] = '${t[i - p[i] - 1]}', so p[${i}] = ${p[i]}.`;
      steps.push({ line: lines, note: headStart + expanded, view: view(i, { mirror, reused: start > 0 }) });

      if (i + p[i] > right) {
        center = i;
        right = i + p[i];
        steps.push({
          line: "update",
          note: `This palindrome reaches further right than any before, so center = ${i}, right = ${right}.`,
          view: view(i, { moved: true }),
        });
      }
    }

    let mid = 1;
    for (let k = 1; k < t.length - 1; k++) if (p[k] > p[mid]) mid = k;
    const startIdx = startOf(mid, p[mid]);
    steps.push({
      line: "answer",
      note: `The largest radius is p[${mid}] = ${p[mid]}, so the answer starts at (${mid} - ${p[mid]}) // 2 = ${startIdx} in s: "${s.slice(startIdx, startIdx + p[mid])}". ${comparisons} character comparisons in total, ${saved} skipped thanks to mirrors: O(n).`,
      view: view(undefined, { final: true, mid }),
    });
    return steps;
  },
});
