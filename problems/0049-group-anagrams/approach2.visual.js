// Sorted word as the key: anagrams sort to the same string, so a hash map groups them in one pass.
DSAViz.register("0049-group-anagrams/approach2", {
  inputs: [{ name: "strs", label: "strs (comma-separated; \"\" = empty word)", type: "string", value: "eat, tea, tan, ate, nat, bat", maxLength: 60, raw: true }],
  trace({ strs: text }) {
    const words = text.split(",").map((w) => w.trim()).map((w) => (w === '""' ? "" : w));
    if (!text.trim()) throw new DSAViz.InputError('Type some words separated by commas, like eat, tea, tan (use "" for an empty word).');
    if (words.some((w) => !/^[a-z]*$/.test(w))) throw new DSAViz.InputError('Words can only use lowercase letters a-z (use "" for an empty word).');
    if (words.length > 8) throw new DSAViz.InputError("Up to 8 words here, so the steps stay readable.");
    const show = (w) => (w === "" ? '""' : w);
    const steps = [];
    const groups = new Map();
    const view = (wi, opts = {}) => {
      const wmarks = {};
      for (let k = 0; k < (wi ?? words.length); k++) wmarks[k] = "visited";
      if (wi !== undefined) wmarks[wi] = "active";
      return [
        { type: "array", label: "strs", values: words.map(show), wide: true, marks: wmarks, pointers: wi !== undefined ? { s: wi } : {} },
        ...(opts.key !== undefined ? [{ type: "vars", items: [{ name: "key = sorted(s)", value: show(opts.key) }] }] : []),
        {
          type: "map",
          label: "groups: sorted letters → words",
          columns: ["key", "words"],
          entries: [...groups].map(([k, v]) => [show(k), `[${v.map(show).join(", ")}]`]),
          marks: opts.key !== undefined ? { [show(opts.key)]: opts.fresh ? "new" : "match" } : {},
        },
      ];
    };

    steps.push({ line: "init", note: "A hash map from a key to its group. Anagrams have the same letters, so sorting them gives the same string.", view: view() });
    words.forEach((s, wi) => {
      const key = [...s].sort().join("");
      steps.push({ line: ["word", "key"], note: `${show(s)} sorted is ${show(key)}.`, view: view(wi, { key: groups.has(key) ? key : undefined }) });
      const fresh = !groups.has(key);
      if (fresh) groups.set(key, []);
      groups.get(key).push(s);
      steps.push({
        line: "add",
        note: fresh ? `No group has key ${show(key)} yet: start one with ${show(s)}.` : `Key ${show(key)} is already there: add ${show(s)} to its group.`,
        view: view(wi, { key, fresh }),
      });
    });
    const out = [...groups.values()].map((g) => `[${g.map(show).join(", ")}]`);
    steps.push({ line: "return", note: `Return the map's groups: ${out.join(", ")}. One sort per word: O(n · k log k).`, view: view() });
    return steps;
  },
});
