// Sort both strings: anagrams sort to the same text.
DSAViz.register("0242-valid-anagram/approach1", {
  inputs: [
    { name: "s", type: "string", value: "anagram", maxLength: 10 },
    { name: "t", type: "string", value: "nagaram", maxLength: 10 },
  ],
  trace({ s, t }) {
    if (!/^[a-z]+$/.test(s) || !/^[a-z]+$/.test(t)) throw new DSAViz.InputError("s and t must be 1 to 10 lowercase letters.");
    const a = [...s].sort(), b = [...t].sort();
    const same = a.join("") === b.join("");
    const k = a.findIndex((ch, i) => ch !== b[i]);
    const first = k < 0 && a.length !== b.length ? Math.min(a.length, b.length) : k;
    return [
      { line: "sort", note: `Sort the letters of both: "${a.join("")}" and "${b.join("")}".`, view: [{ type: "array", label: "sorted s", values: a }, { type: "array", label: "sorted t", values: b }] },
      { line: "sort", note: `Return ${same}. ${same ? "The sorted letters are the same." : `They first differ at position ${first}.`} Sorting costs O(n log n).`, view: [{ type: "array", label: "sorted s", values: a, marks: same ? Object.fromEntries(a.map((_, i) => [i, "match"])) : first < a.length ? { [first]: "cut" } : {} }, { type: "array", label: "sorted t", values: b, marks: same ? Object.fromEntries(b.map((_, i) => [i, "match"])) : first < b.length ? { [first]: "cut" } : {} }] },
    ];
  },
});
