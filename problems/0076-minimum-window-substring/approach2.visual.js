// Grow right; while the window covers t (have >= need for every letter of t), record it and drop the left letter.
DSAViz.register("0076-minimum-window-substring/approach2", {
  inputs: [
    { name: "s", type: "string", value: "ADOBECODEBANC", maxLength: 14 },
    { name: "t", type: "string", value: "ABC", maxLength: 6 },
  ],
  trace({ s, t }) {
    for (const [name, x] of [["s", s], ["t", t]]) if (!/^[A-Za-z]+$/.test(x)) throw new DSAViz.InputError(`${name} must be 1 or more letters (A–Z, a–z).`);
    const m = s.length;
    const tl = [...new Set(t)].sort(); // only t's letters matter for "covers"
    const need = {};
    const have = {};
    tl.forEach((c) => (need[c] = have[c] = 0));
    for (const c of t) need[c]++;
    let left = 0;
    let bestStart = 0;
    let bestLen = m + 1;
    const steps = [];
    const bestText = () => (bestLen <= m ? `"${s.slice(bestStart, bestStart + bestLen)}"` : "none yet");
    const covers = () => tl.every((c) => have[c] >= need[c]);
    const short = () => tl.filter((c) => have[c] < need[c]);
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
      tl.forEach((c, j) => {
        gm[`1,${j}`] = have[c] >= need[c] ? "match" : "compare";
        if (o.letter === c) gm[`1,${j}`] = "new";
      });
      return [
        { type: "array", label: "s (outlined = the window)", values: [...s], marks, pointers },
        { type: "grid", label: "t's letters (green = the window has enough)", rows: ["need", "have"], cols: tl, cells: [tl.map((c) => need[c]), tl.map((c) => have[c])], marks: gm, corner: "" },
        { type: "vars", items: [{ name: "best", value: bestText(), mark: o.newBest ? "match" : "" }] },
      ];
    };
    steps.push({ line: "init", note: `need = the letter counts of "${t}". Only these ${tl.length} letter${tl.length === 1 ? "" : "s"} matter: the window covers t when it has enough of each.`, view: view(-1) });
    for (let right = 0; right < m; right++) {
      const c = s[right];
      if (c in have) have[c]++;
      if (!covers()) {
        steps.push({ line: ["grow", "check"], note: `${c} comes in. Still short of ${short().join(", ")}: doesn't cover t yet.`, view: view(right, { in: right, letter: c }) });
        continue;
      }
      steps.push({ line: ["grow", "check"], note: `${c} comes in. Every count of t is covered: "${s.slice(left, right + 1)}" covers "${t}".`, view: view(right, { in: right, letter: c, covers: true }) });
      while (covers()) {
        const len = right - left + 1;
        const newBest = len < bestLen;
        if (newBest) {
          bestStart = left;
          bestLen = len;
        }
        steps.push({ line: "record", note: `"${s.slice(left, right + 1)}" (length ${len}). ${newBest ? "New best." : `best stays ${bestText()}.`}`, view: view(right, { covers: true, newBest }) });
        const out = s[left];
        if (out in have) have[out]--;
        left++;
        const still = covers();
        steps.push({
          line: ["shrink", "check"],
          note: `Drop ${out} from the left. ${still ? "Still covers t: record and drop again." : `Now short of ${short().join(", ")}: grow right again.`}`,
          view: view(right, { out: left - 1, letter: out, covers: still }),
        });
      }
    }
    steps.push({
      line: "return",
      note: bestLen <= m ? `Return ${bestText()}. Each step checks ${tl.length} count${tl.length === 1 ? "" : "s"}: O(k · m + n).` : `No window ever covered "${t}". Return "".`,
      view: view(m, { final: true }),
    });
    return steps;
  },
});
