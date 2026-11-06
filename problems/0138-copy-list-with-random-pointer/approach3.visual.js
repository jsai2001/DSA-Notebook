// No map: put each copy right after its original, set random through that, then split the lists.
(function () {
DSAViz.register("0138-copy-list-with-random-pointer/approach3", {
  inputs: [{ name: "head", label: "head ([value, random index] per node)", type: "string", value: "[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]", maxLength: 90, raw: true }],
  trace({ head }) {
    const L = parseList(head);
    const n = L.length;
    const steps = [];
    // The woven list: entries {i, copy}; copies get their random set in step 2.
    let woven = L.map((_, i) => ({ i, copy: false }));
    const crand = {};
    const name = (e) => (e.copy ? `${e.i}′` : `${e.i}`);
    const listView = (o = {}) => ({
      type: "list",
      label: o.label || "the list (under each node: its name, ′ = copy, then r→ where random points; ? = not set yet)",
      nodes: woven.map((e, k) => ({
        value: String(L[e.i].val),
        caption: `${name(e)} ${e.copy ? (e.i in crand ? (crand[e.i] === null ? "r→∅" : `r→${crand[e.i]}′`) : "r→?") : L[e.i].random === null ? "r→∅" : `r→${L[e.i].random}`}`,
        mark: o.at === k ? "active" : o.fresh === k ? "new" : e.copy ? "window" : "",
      })),
    });
    if (!n) {
      steps.push({ line: "init", note: "The list is empty: return null.", view: [listView()] });
      return steps;
    }
    steps.push({ line: "init", note: "No map this time. The trick: put each copy right after its original, so X's copy is always X.next.", view: [listView()] });
    for (let i = 0; i < n; i++) {
      const k = woven.findIndex((e) => !e.copy && e.i === i);
      woven.splice(k + 1, 0, { i, copy: true });
      steps.push({ line: "weave", note: `Step 1: insert ${i}′ right after ${i}.`, view: [listView({ at: k, fresh: k + 1 })] });
    }
    for (let i = 0; i < n; i++) {
      const r = L[i].random;
      crand[i] = r;
      const k = woven.findIndex((e) => !e.copy && e.i === i);
      steps.push({
        line: "random",
        note: r === null ? `Step 2: ${i}.random is null, so ${i}′.random stays null.` : `Step 2: ${i}.random = ${r}, and ${r}'s copy is ${r}.next = ${r}′. So ${i}′.random = ${i}.random.next = ${r}′.`,
        view: [listView({ at: k, fresh: k + 1 })],
      });
    }
    const copies = [];
    for (let i = 0; i < n; i++) {
      copies.push(i);
      woven = woven.filter((e) => !(e.copy && e.i === i));
      steps.push({
        line: "split",
        note: `Step 3: ${i}.next goes back to ${i + 1 < n ? i + 1 : "null"}, and ${i}′.next skips to ${i + 1 < n ? `${i + 1}′` : "null"}.`,
        view: [
          listView({ label: "original (back to how it was)", at: woven.findIndex((e) => e.i === i) }),
          { type: "list", label: "the copy", nodes: copies.map((c) => ({ value: String(L[c].val), caption: `${c}′ ${crand[c] === null ? "r→∅" : `r→${crand[c]}′`}`, mark: c === i ? "new" : "" })) },
        ],
      });
    }
    steps.push({
      line: "return",
      note: "Return 0′. The original list is unchanged, and the only extra memory is the copy itself: O(n) time, O(1) extra.",
      view: [listView({ label: "original" }), { type: "list", label: "the copy", nodes: copies.map((c) => ({ value: String(L[c].val), caption: `${c}′ ${crand[c] === null ? "r→∅" : `r→${crand[c]}′`}` })) }],
    });
    return steps;
  },
});

// Read LeetCode's form: [[val, random_index], ...], with null for no random pointer.
function parseList(text) {
  let a;
  try {
    a = JSON.parse(text.trim() || "[]");
  } catch (e) {
    throw new DSAViz.InputError("Type the list like [[7, null], [13, 0], [11, 4]]: each pair is [value, index of its random node or null].");
  }
  if (!Array.isArray(a) || a.some((p) => !Array.isArray(p) || p.length !== 2 || !Number.isInteger(p[0]) || !(p[1] === null || Number.isInteger(p[1])))) {
    throw new DSAViz.InputError("Each node is [value, random index or null], like [13, 0].");
  }
  if (a.length > 6) throw new DSAViz.InputError("Up to 6 nodes here, so the steps stay readable.");
  if (a.some(([v]) => v < -99 || v > 99)) throw new DSAViz.InputError("Values must be between -99 and 99 here.");
  if (a.some(([, r]) => r !== null && (r < 0 || r >= a.length))) throw new DSAViz.InputError(`A random index must be null or between 0 and ${a.length - 1}.`);
  return a.map(([val, random]) => ({ val, random }));
}
})();
