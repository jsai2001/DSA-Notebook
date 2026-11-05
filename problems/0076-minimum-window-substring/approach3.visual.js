// need[c] counts down as letters come in (below 0 = extra copies); missing == 0 means the window covers t.
DSAViz.register("0076-minimum-window-substring/approach3", {
  inputs: [
    { name: "s", type: "string", value: "ADOBECODEBANC", maxLength: 14 },
    { name: "t", type: "string", value: "ABC", maxLength: 6 },
  ],
  trace({ s, t }) {
    for (const [name, x] of [["s", s], ["t", t]]) if (!/^[A-Za-z]+$/.test(x)) throw new DSAViz.InputError(`${name} must be 1 or more letters (A–Z, a–z).`);
    const m = s.length;
    const letters = [...new Set(s + t)].sort();
    const inT = new Set(t);
    const need = {};
    letters.forEach((c) => (need[c] = 0));
    for (const c of t) need[c]++;
    let missing = t.length;
    let left = 0;
    let bestStart = 0;
    let bestLen = m + 1;
    const steps = [];
    const bestText = () => (bestLen <= m ? `"${s.slice(bestStart, bestStart + bestLen)}"` : "none yet");
    const view = (right, o = {}) => {
      const marks = {};
      if (o.final) {
        if (bestLen <= m) for (let k = bestStart; k < bestStart + bestLen; k++) marks[k] = "match";
      } else {
        for (let k = left; k <= right; k++) marks[k] = o.covers ? "match" : "window";
        if (o.in !== undefined) marks[o.in] = "new";
        if (o.out !== undefined) marks[o.out] = "cut";
      }
      const pointers = {};
      if (!o.final && right >= 0) {
        pointers.left = Math.min(left, m - 1);
        pointers.right = right;
      }
      const gm = {};
      letters.forEach((c, j) => {
        if (inT.has(c) && need[c] <= 0) gm[`0,${j}`] = "match";
        else if (need[c] < 0) gm[`0,${j}`] = "visited";
        if (o.letter === c) gm[`0,${j}`] = "new";
      });
      return [
        { type: "array", label: "s (outlined = the window)", values: [...s], marks, pointers },
        { type: "grid", label: "need: how many more the window needs (green = t's letter covered; below 0 = extra)", rows: ["need"], cols: letters, cells: [letters.map((c) => need[c])], marks: gm, corner: "" },
        {
          type: "vars",
          items: [
            { name: "missing", value: missing, mark: o.mchange ? "new" : "" },
            { name: "best", value: bestText(), mark: o.newBest ? "match" : "" },
          ],
        },
      ];
    };
    steps.push({ line: "init", note: `need = the letter counts of "${t}". missing = ${t.length}: every letter of t is still missing.`, view: view(-1) });
    for (let right = 0; right < m; right++) {
      const c = s[right];
      const wanted = need[c] > 0;
      if (wanted) missing--;
      need[c]--;
      steps.push({
        line: "grow",
        note: wanted
          ? `${c} comes in. t still needed it, so missing − 1 = ${missing}. need[${c}] = ${need[c]}.`
          : `${c} comes in. ${inT.has(c) ? `t has enough ${c}'s already` : `t has no ${c}`}, so missing stays ${missing}. need[${c}] = ${need[c]} (extra).`,
        view: view(right, { in: right, letter: c, mchange: wanted }),
      });
      if (missing !== 0) continue;
      steps.push({ line: "check", note: `missing == 0: "${s.slice(left, right + 1)}" covers "${t}". Now make it as short as possible.`, view: view(right, { covers: true }) });
      while (need[s[left]] < 0) {
        const out = s[left];
        need[out]++;
        left++;
        steps.push({ line: "shrink", note: `need[${out}] was below 0, so that ${out} is extra: drop it. need[${out}] = ${need[out]}. The window still covers t.`, view: view(right, { covers: true, out: left - 1, letter: out }) });
      }
      const len = right - left + 1;
      const newBest = len < bestLen;
      if (newBest) {
        bestStart = left;
        bestLen = len;
      }
      steps.push({
        line: "record",
        note: `need[${s[left]}] is ${need[s[left]]}, so s[left] = ${s[left]} can't go. "${s.slice(left, right + 1)}" (length ${len}) is the shortest window ending here. ${newBest ? "New best." : `best stays ${bestText()}.`}`,
        view: view(right, { covers: true, newBest }),
      });
      const gone = s[left];
      need[gone]++;
      missing++;
      left++;
      steps.push({
        line: "release",
        note: `Give up ${gone} to look for something shorter: need[${gone}] = ${need[gone]}, missing = 1. Keep growing right.`,
        view: view(right, { out: left - 1, letter: gone, mchange: true }),
      });
    }
    steps.push({
      line: "return",
      note: bestLen <= m ? `Return ${bestText()}. Each letter came in once and left at most once: O(m + n).` : `No window ever covered "${t}". Return "".`,
      view: view(m, { final: true }),
    });
    return steps;
  },
});
