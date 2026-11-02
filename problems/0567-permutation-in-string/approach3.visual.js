// One array of differences (window − s1) and a count of letters whose difference is 0; a match is 26 zeros.
DSAViz.register("0567-permutation-in-string/approach3", {
  inputs: [
    { name: "s1", type: "string", value: "abc", maxLength: 5 },
    { name: "s2", type: "string", value: "bbcxcba", maxLength: 10 },
  ],
  trace({ s1, s2 }) {
    for (const [name, s] of [["s1", s1], ["s2", s2]]) if (!/^[a-z]+$/.test(s)) throw new DSAViz.InputError(`${name} must be 1 or more lowercase letters (a–z).`);
    const m = s1.length;
    const n = s2.length;
    const letters = [...new Set(s1 + s2)].sort();
    const diff = {};
    "abcdefghijklmnopqrstuvwxyz".split("").forEach((c) => (diff[c] = 0));
    let zeros = 26;
    let counted = false;
    const steps = [];
    const view = (start, o = {}) => {
      const marks = {};
      if (start !== undefined) for (let k = start; k < start + m; k++) marks[k] = o.hit ? "match" : "window";
      if (o.in !== undefined) marks[o.in] = "new";
      if (o.out !== undefined) marks[o.out] = "cut";
      const pointers = {};
      if (o.in !== undefined) pointers.in = o.in;
      if (o.out !== undefined) pointers.out = o.out;
      const gm = {};
      letters.forEach((c, j) => {
        if (counted && diff[c] === 0) gm[`0,${j}`] = "match";
        if (o.letter === c) gm[`0,${j}`] = "new";
      });
      return [
        { type: "array", label: `s2 (outlined = the window of length ${m})`, values: [...s2], marks, pointers },
        { type: "grid", label: "diff = window count − s1 count (green = 0, agrees)", rows: ["diff"], cols: letters, cells: [letters.map((c) => (counted ? diff[c] : 0))], marks: gm, corner: "" },
        {
          type: "vars",
          items: [
            { name: "zeros (of 26)", value: zeros, mark: o.zchange ? "new" : "" },
            { name: "letters not shown", value: `${26 - letters.length}, all 0` },
          ],
        },
      ];
    };
    if (m > n) {
      steps.push({ line: "init", note: `s1 has ${m} letters but s2 only ${n}: no window fits. Return false.`, view: view(undefined) });
      return steps;
    }
    for (let k = 0; k < m; k++) {
      diff[s1[k]]--;
      diff[s2[k]]++;
    }
    zeros = Object.values(diff).filter((d) => d === 0).length;
    counted = true;
    steps.push({
      line: "init",
      note: `diff starts as (counts of "${s2.slice(0, m)}") − (counts of "${s1}"). ${zeros} of the 26 letters agree. A window is a permutation of s1 exactly when all 26 do.`,
      view: view(0),
    });
    // Change diff[c] by step and keep zeros right: leaving 0 loses one, arriving at 0 gains one.
    const bump = (c, step) => {
      const before = zeros;
      if (diff[c] === 0) zeros--;
      diff[c] += step;
      if (diff[c] === 0) zeros++;
      const was = diff[c] - step;
      return { note: `diff[${c}]: ${was} → ${diff[c]}.${was === 0 ? ` It agreed before, so zeros − 1.` : ""}${diff[c] === 0 ? ` Now it agrees, so zeros + 1.` : ""} zeros = ${zeros}.`, changed: zeros !== before };
    };
    for (let i = m; i < n; i++) {
      const start = i - m;
      if (zeros === 26) {
        steps.push({ line: ["slide", "check", "found"], note: `zeros == 26: every letter agrees, so "${s2.slice(start, i)}" is a permutation of "${s1}". Return true.`, view: view(start, { hit: true }) });
        return steps;
      }
      steps.push({ line: ["slide", "check"], note: `"${s2.slice(start, i)}": zeros = ${zeros}, not 26. Slide right.`, view: view(start) });
      const a = bump(s2[i], 1);
      steps.push({ line: "add", note: `${s2[i]} comes in. ${a.note}`, view: view(start, { in: i, letter: s2[i], zchange: a.changed }) });
      const d = bump(s2[start], -1);
      steps.push({ line: "drop", note: `${s2[start]} goes out. ${d.note}`, view: view(start + 1, { in: i, out: start, letter: s2[start], zchange: d.changed }) });
    }
    const last = zeros === 26;
    steps.push({
      line: "return",
      note: last
        ? `The last window, "${s2.slice(n - m)}", is checked after the loop: zeros == 26. Return true.`
        : `The last window, "${s2.slice(n - m)}", is checked after the loop: zeros = ${zeros}. Return false. O(1) work per slide, O(n) in total.`,
      view: view(n - m, { hit: last }),
    });
    return steps;
  },
});
