// Keep the letter counts of a window of length m; sliding it right changes just two counts.
DSAViz.register("0567-permutation-in-string/approach2", {
  inputs: [
    { name: "s1", type: "string", value: "ab", maxLength: 5 },
    { name: "s2", type: "string", value: "eidbaooo", maxLength: 10 },
  ],
  trace({ s1, s2 }) {
    for (const [name, s] of [["s1", s1], ["s2", s2]]) if (!/^[a-z]+$/.test(s)) throw new DSAViz.InputError(`${name} must be 1 or more lowercase letters (a–z).`);
    const m = s1.length;
    const n = s2.length;
    const letters = [...new Set(s1 + s2)].sort();
    const need = {};
    const have = {};
    letters.forEach((c) => (need[c] = have[c] = 0));
    const steps = [];
    let counted = false;
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
        if (!counted) return;
        if (need[c] === have[c]) gm[`1,${j}`] = "match";
        if (o.changed && o.changed.includes(c)) gm[`1,${j}`] = "new";
      });
      return [
        { type: "array", label: `s2 (outlined = the window of length ${m})`, values: [...s2], marks, pointers },
        {
          type: "grid",
          label: "letter counts (green = equal; every other letter is 0 in both)",
          rows: ["need", "have"],
          cols: letters,
          cells: [letters.map((c) => (counted ? need[c] : 0)), letters.map((c) => (counted ? have[c] : 0))],
          marks: gm,
          corner: "",
        },
      ];
    };
    if (m > n) {
      steps.push({ line: "init", note: `s1 has ${m} letters but s2 only ${n}: no window fits. Return false.`, view: view(undefined) });
      return steps;
    }
    for (let k = 0; k < m; k++) {
      need[s1[k]]++;
      have[s2[k]]++;
    }
    counted = true;
    steps.push({ line: "init", note: `need = the letter counts of "${s1}". have = the counts of the first window, "${s2.slice(0, m)}".`, view: view(0) });
    const equal = () => letters.every((c) => need[c] === have[c]);
    for (let i = m; i < n; i++) {
      const start = i - m;
      if (equal()) {
        steps.push({ line: ["slide", "check", "found"], note: `have == need: "${s2.slice(start, i)}" uses exactly the letters of "${s1}". Return true.`, view: view(start, { hit: true }) });
        return steps;
      }
      steps.push({ line: ["slide", "check"], note: `"${s2.slice(start, i)}": have ≠ need (compare all 26 counts).`, view: view(start) });
      have[s2[i]]++;
      have[s2[start]]--;
      steps.push({
        line: "slide",
        note: `Slide right: ${s2[i]} comes in (have[${s2[i]}] + 1), ${s2[start]} goes out (have[${s2[start]}] − 1). Only two counts change.`,
        view: view(start + 1, { in: i, out: start, changed: [s2[i], s2[start]] }),
      });
    }
    const last = equal();
    steps.push({
      line: "return",
      note: last
        ? `The loop ends before checking the last window, "${s2.slice(n - m)}". have == need: Return true.`
        : `The last window, "${s2.slice(n - m)}", is checked after the loop: have ≠ need. Return false. O(26 · n) time.`,
      view: view(n - m, { hit: last }),
    });
    return steps;
  },
});
