// For each start i, grow right until the window covers t; that's the shortest window starting at i.
DSAViz.register("0076-minimum-window-substring/approach1", {
  inputs: [
    { name: "s", type: "string", value: "ADOBECODEBANC", maxLength: 14 },
    { name: "t", type: "string", value: "ABC", maxLength: 6 },
  ],
  trace({ s, t }) {
    for (const [name, x] of [["s", s], ["t", t]]) if (!/^[A-Za-z]+$/.test(x)) throw new DSAViz.InputError(`${name} must be 1 or more letters (A–Z, a–z).`);
    const m = s.length;
    const need = {};
    for (const c of t) need[c] = (need[c] || 0) + 1;
    let bestStart = 0;
    let bestLen = m + 1;
    let scanned = 0;
    const steps = [];
    const bestText = () => (bestLen <= m ? `"${s.slice(bestStart, bestStart + bestLen)}"` : "none yet");
    const view = (i, j, o = {}) => {
      const marks = {};
      if (o.final) {
        if (bestLen <= m) for (let k = bestStart; k < bestStart + bestLen; k++) marks[k] = "match";
      } else {
        for (let k = 0; k < i; k++) marks[k] = "visited"; // starts already tried
        for (let k = i; k <= j; k++) marks[k] = o.found ? "match" : "window";
      }
      const pointers = o.final || j < i ? {} : j > i ? { i, j } : { i };
      return [
        { type: "array", label: "s (outlined = s[i..j]; grey = starts already tried)", values: [...s], marks, pointers },
        {
          type: "vars",
          items: [
            { name: "t", value: `"${t}"` },
            { name: "best", value: bestText(), mark: o.newBest ? "match" : "" },
            { name: "letters scanned", value: scanned },
          ],
        },
      ];
    };
    steps.push({ line: "init", note: `need = the letter counts of "${t}". Try every start i; from each one, grow right until s[i..j] has every letter of t.`, view: view(0, -1) });
    for (let i = 0; i < m; i++) {
      const have = {};
      let missing = t.length;
      let j = i;
      let found = false;
      for (; j < m; j++) {
        scanned++;
        const c = s[j];
        have[c] = (have[c] || 0) + 1;
        if (have[c] <= (need[c] || 0)) missing--;
        if (missing === 0) {
          found = true;
          break;
        }
      }
      if (!found) {
        steps.push({ line: ["start", "grow"], note: `From i = ${i}, grew to the end of s without covering "${t}" (still missing ${missing}). No window starts here${i + 1 < m ? "; the later starts won't cover it either, but this approach still tries them" : ""}.`, view: view(i, m - 1) });
        continue;
      }
      const len = j - i + 1;
      const newBest = len < bestLen;
      if (newBest) {
        bestStart = i;
        bestLen = len;
      }
      steps.push({
        line: ["start", "grow", "found", "record"],
        note: `From i = ${i}, grew to j = ${j}: "${s.slice(i, j + 1)}" (length ${len}) is the first to cover "${t}". ${newBest ? "New best." : `Not shorter; best stays ${bestText()}.`} Stop growing: anything longer from i is worse.`,
        view: view(i, j, { found: true, newBest }),
      });
    }
    steps.push({
      line: "return",
      note: `${bestLen <= m ? `Return ${bestText()}.` : `Return "".`} ${scanned} letters scanned for m = ${m}: every start scans again from scratch, O(m²).`,
      view: view(m, m, { final: true }),
    });
    return steps;
  },
});
