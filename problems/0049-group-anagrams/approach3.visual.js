// Letter counts as the key: count a..z in each word (O(k), no sort); anagrams have identical counts.
DSAViz.register("0049-group-anagrams/approach3", {
  inputs: [{ name: "strs", label: "strs (comma-separated; \"\" = empty word)", type: "string", value: "eat, tea, tan, ate, nat, bat", maxLength: 60, raw: true }],
  trace({ strs: text }) {
    const words = text.split(",").map((w) => w.trim()).map((w) => (w === '""' ? "" : w));
    if (!text.trim()) throw new DSAViz.InputError('Type some words separated by commas, like eat, tea, tan (use "" for an empty word).');
    if (words.some((w) => !/^[a-z]*$/.test(w))) throw new DSAViz.InputError('Words can only use lowercase letters a-z (use "" for an empty word).');
    if (words.length > 8) throw new DSAViz.InputError("Up to 8 words here, so the steps stay readable.");
    const show = (w) => (w === "" ? '""' : w);
    // Only the letters that appear, e.g. a1 e1 t1; the real key also holds the 23 zeros
    const countsOf = (w) => {
      const c = Array(26).fill(0);
      for (const ch of w) c[ch.charCodeAt(0) - 97]++;
      return c;
    };
    const label = (c) => c.map((n, i) => (n ? `${String.fromCharCode(97 + i)}${n}` : "")).filter(Boolean).join(" ") || "(all zero)";
    const steps = [];
    const groups = new Map();
    const view = (wi, opts = {}) => {
      const wmarks = {};
      for (let k = 0; k < (wi ?? words.length); k++) wmarks[k] = "visited";
      if (wi !== undefined) wmarks[wi] = "active";
      const widgets = [{ type: "array", label: "strs", values: words.map(show), wide: true, marks: wmarks, pointers: wi !== undefined ? { s: wi } : {} }];
      if (opts.counts) {
        const used = opts.counts.map((n, i) => [String.fromCharCode(97 + i), n]).filter(([, n]) => n);
        widgets.push({
          type: "array",
          label: `count for ${show(words[wi])} (letters that appear; all others 0)`,
          values: used.length ? used.map(([, n]) => n) : [],
          sub: used.map(([ch]) => ch),
          marks: Object.fromEntries(used.map((_, k) => [k, "new"])),
        });
      }
      widgets.push({
        type: "map",
        label: "groups: letter counts → words",
        columns: ["counts", "words"],
        entries: [...groups].map(([k, v]) => [k, `[${v.map(show).join(", ")}]`]),
        marks: opts.key !== undefined ? { [opts.key]: opts.fresh ? "new" : "match" } : {},
      });
      return widgets;
    };

    steps.push({ line: "init", note: "Instead of sorting, count each letter. Two words are anagrams exactly when all 26 counts match.", view: view() });
    words.forEach((s, wi) => {
      const c = countsOf(s);
      const key = label(c);
      steps.push({ line: ["word", "count"], note: `Count the letters of ${show(s)}: ${key}. One pass over the word, no sort.`, view: view(wi, { counts: c }) });
      const fresh = !groups.has(key);
      if (fresh) groups.set(key, []);
      groups.get(key).push(s);
      steps.push({
        line: ["key", "add"],
        note: fresh ? `No group has these counts yet: start one with ${show(s)}.` : `These counts are already a key: add ${show(s)} to that group.`,
        view: view(wi, { key, fresh }),
      });
    });
    const out = [...groups.values()].map((g) => `[${g.map(show).join(", ")}]`);
    steps.push({ line: "return", note: `Return the map's groups: ${out.join(", ")}. O(k) per word (plus the 26-entry key): O(n · k).`, view: view() });
    return steps;
  },
});
