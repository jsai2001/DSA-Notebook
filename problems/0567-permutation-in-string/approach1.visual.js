// Sort s1 once, then sort every window of s2 with the same length and compare.
DSAViz.register("0567-permutation-in-string/approach1", {
  inputs: [
    { name: "s1", type: "string", value: "ab", maxLength: 5 },
    { name: "s2", type: "string", value: "eidbaooo", maxLength: 10 },
  ],
  trace({ s1, s2 }) {
    for (const [name, s] of [["s1", s1], ["s2", s2]]) if (!/^[a-z]+$/.test(s)) throw new DSAViz.InputError(`${name} must be 1 or more lowercase letters (a–z).`);
    const m = s1.length;
    const target = [...s1].sort().join("");
    const steps = [];
    const view = (i, o = {}) => {
      const marks = {};
      for (let k = 0; k < (i ?? (o.final ? s2.length : 0)); k++) marks[k] = "visited"; // windows already tried start here
      if (i !== undefined) for (let k = i; k < i + m; k++) marks[k] = o.hit ? "match" : "window";
      return [
        { type: "array", label: `s2 (outlined = the window of length ${m})`, values: [...s2], marks, pointers: i !== undefined ? { i } : {} },
        {
          type: "vars",
          items: [
            { name: "sorted(s1)", value: target },
            ...(i !== undefined ? [{ name: "sorted(window)", value: [...s2.slice(i, i + m)].sort().join(""), mark: o.hit ? "new" : "" }] : []),
          ],
        },
      ];
    };
    steps.push({ line: "init", note: `Any rearrangement of "${s1}" sorts to the same string, "${target}". So sort each window of ${m} letters and compare.`, view: view(undefined) });
    if (m > s2.length) {
      steps.push({ line: "return", note: `s2 is shorter than s1, so there's no window at all. Return false.`, view: view(undefined) });
      return steps;
    }
    for (let i = 0; i + m <= s2.length; i++) {
      const w = s2.slice(i, i + m);
      const sw = [...w].sort().join("");
      if (sw === target) {
        steps.push({ line: ["window", "found"], note: `Window "${w}" at ${i} sorts to "${sw}", the same as s1. Return true.`, view: view(i, { hit: true }) });
        return steps;
      }
      steps.push({ line: "window", note: `Window "${w}" at ${i} sorts to "${sw}" ≠ "${target}".`, view: view(i) });
    }
    steps.push({
      line: "return",
      note: `None of the ${s2.length - m + 1} windows matched. Return false. Each window is sorted from scratch: O(m log m) per window.`,
      view: view(undefined, { final: true }),
    });
    return steps;
  },
});
