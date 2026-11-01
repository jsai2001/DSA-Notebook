// Brute force: compare each word with one word from every group so far; join the first group it's an anagram of.
DSAViz.register("0049-group-anagrams/approach1", {
  inputs: [{ name: "strs", label: "strs (comma-separated; \"\" = empty word)", type: "string", value: "eat, tea, tan, ate, nat, bat", maxLength: 60, raw: true }],
  trace({ strs: text }) {
    const words = text.split(",").map((w) => w.trim()).map((w) => (w === '""' ? "" : w));
    if (!text.trim()) throw new DSAViz.InputError('Type some words separated by commas, like eat, tea, tan (use "" for an empty word).');
    if (words.some((w) => !/^[a-z]*$/.test(w))) throw new DSAViz.InputError('Words can only use lowercase letters a-z (use "" for an empty word).');
    if (words.length > 8) throw new DSAViz.InputError("Up to 8 words here, so the steps stay readable.");
    const show = (w) => (w === "" ? '""' : w);
    const sortedOf = (w) => [...w].sort().join("");
    const steps = [];
    const groups = [];
    let compares = 0;
    const view = (wi, opts = {}) => {
      const wmarks = {};
      for (let k = 0; k < (wi ?? words.length); k++) wmarks[k] = "visited";
      if (wi !== undefined) wmarks[wi] = "active";
      const gmarks = {};
      if (opts.g !== undefined) gmarks[opts.g] = opts.hit ? "match" : opts.fresh ? "new" : "compare";
      return [
        { type: "array", label: "strs", values: words.map(show), wide: true, marks: wmarks, pointers: wi !== undefined ? { s: wi } : {} },
        { type: "array", label: `groups (${groups.length})`, values: groups.map((g) => `[${g.map(show).join(", ")}]`), wide: true, marks: gmarks },
        { type: "vars", items: [{ name: "anagram checks", value: compares }] },
      ];
    };

    steps.push({ line: "init", note: "No groups yet. Each word is checked against one word from every group made so far.", view: view() });
    words.forEach((s, wi) => {
      steps.push({ line: "word", note: `Next word: ${show(s)}.`, view: view(wi) });
      let placed = false;
      for (let g = 0; g < groups.length; g++) {
        compares++;
        const same = groups[g][0].length === s.length && sortedOf(groups[g][0]) === sortedOf(s);
        if (same) {
          groups[g].push(s);
          steps.push({ line: ["compare", "join"], note: `${show(s)} vs ${show(groups[g][0])}: same letters, same counts. Join that group.`, view: view(wi, { g, hit: true }) });
          placed = true;
          break;
        }
        steps.push({
          line: "compare",
          note: `${show(s)} vs ${show(groups[g][0])}: ${groups[g][0].length !== s.length ? "different lengths" : `sorted, ${show(sortedOf(s))} ≠ ${show(sortedOf(groups[g][0]))}`}. Not an anagram.`,
          view: view(wi, { g }),
        });
      }
      if (!placed) {
        groups.push([s]);
        steps.push({ line: "new", note: `${show(s)} matched no group: it starts a new one.`, view: view(wi, { g: groups.length - 1, fresh: true }) });
      }
    });
    steps.push({
      line: "return",
      note: `Return ${groups.length} group${groups.length === 1 ? "" : "s"}: ${groups.map((g) => `[${g.map(show).join(", ")}]`).join(", ")}. ${compares} anagram checks: with many different words that grows like n², each check costing a sort.`,
      view: view(),
    });
    return steps;
  },
});
