// Expand around center: every palindrome mirrors around a character (odd) or a gap (even).
DSAViz.register("0005-longest-palindromic-substring/approach3", {
  inputs: [{ name: "s", type: "string", value: "babad", maxLength: 8 }],

  trace({ s }) {
    if (!/^[A-Za-z0-9]+$/.test(s)) {
      throw new DSAViz.InputError("s needs 1 to 8 letters or digits (no spaces or symbols).");
    }
    const n = s.length;
    const chars = Array.from(s);
    const steps = [];
    let start = 0;
    let best = 1;

    // left/right are the two indices being compared; s[left+1..right-1] is the palindrome so far.
    const view = (left, right, opts = {}) => {
      const marks = {};
      if (!opts.final) {
        for (let k = left + 1; k < right; k++) marks[k] = "window";
        if (left >= 0 && left < n) marks[left] = opts.mismatch ? "cut" : "compare";
        if (right >= 0 && right < n) marks[right] = opts.mismatch ? "cut" : "compare";
      } else {
        for (let k = start; k < start + best; k++) marks[k] = "match";
      }
      const pointers = {};
      if (!opts.final) {
        if (left >= 0) pointers.left = left;
        if (right < n) pointers.right = right;
      }
      return [
        { type: "array", label: "s", values: chars, pointers, marks },
        {
          type: "vars",
          items: [
            ...(opts.center ? [{ name: "center", value: opts.center }] : []),
            { name: "best", value: `${best} ("${s.slice(start, start + best)}")`, mark: opts.newBest ? "match" : "" },
          ],
        },
      ];
    };

    steps.push({
      line: "init",
      note: `Try all ${2 * n - 1} centers: each character (odd lengths) and each gap between two characters (even lengths). Expand outward while both ends match.`,
      view: view(-1, -1, {}),
    });

    for (let c = 0; c < n; c++) {
      for (const even of [false, true]) {
        let left = c;
        let right = even ? c + 1 : c;
        if (even && right >= n) continue; // no gap after the last character
        const label = even ? `gap ${c}|${c + 1}` : `index ${c}`;
        steps.push({
          line: "center",
          note: even
            ? `Even center: the gap between s[${c}] and s[${c + 1}]. Start with left = ${c}, right = ${c + 1}.`
            : `Odd center: s[${c}] = '${s[c]}'. Start with left = right = ${c}.`,
          view: view(left, right, { center: label }),
        });
        while (left >= 0 && right < n && s[left] === s[right]) {
          const same = left === right;
          steps.push({
            line: "step",
            note: same
              ? `left = right = ${left}: one character is a palindrome. Step outward.`
              : `s[${left}] = s[${right}] = '${s[left]}', so "${s.slice(left, right + 1)}" is a palindrome. Step outward.`,
            view: view(left - 1, right + 1, { center: label }),
          });
          left--;
          right++;
        }
        const len = right - left - 1;
        const why =
          left < 0 || right >= n
            ? "hit the end of the string"
            : `s[${left}] = '${s[left]}' ≠ s[${right}] = '${s[right]}'`;
        const newBest = len > best;
        if (newBest) {
          start = left + 1;
          best = len;
        }
        steps.push({
          line: "record",
          note:
            `Stop: ${why}. ` +
            (len ? `This center gives "${s.slice(left + 1, right)}" (length ${len})` : "Nothing matched at this gap") +
            (newBest ? ", a new best." : `; best stays ${best}.`),
          view: view(left, right, { center: label, mismatch: left >= 0 && right < n, newBest }),
        });
      }
    }

    steps.push({
      line: "return",
      note: `Return "${s.slice(start, start + best)}". Each center expands at most n/2 times: O(n²) time, O(1) extra space.`,
      view: view(-1, -1, { final: true }),
    });
    return steps;
  },
});
