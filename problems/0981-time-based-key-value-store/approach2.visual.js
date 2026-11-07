// Each key keeps (time, value) pairs in time order. A get walks back from the newest to the first one at or before the time.
(function () {
const INPUT = [{ name: "ops", label: "calls (comma-separated)", type: "string", value: "set foo bar 1, get foo 1, get foo 3, set foo bar2 4, get foo 4, get foo 5, get foo 0", maxLength: 200, raw: true }];
function parseOps(text) {
  const parts = text.split(",").map((p) => p.trim()).filter(Boolean);
  if (!parts.length) throw new DSAViz.InputError('Write calls like "set foo bar 1, get foo 3".');
  if (parts.length > 14) throw new DSAViz.InputError("At most 14 calls here (kept small so the steps stay readable).");
  let last = 0;
  return parts.map((p) => {
    const w = p.split(/\s+/);
    if (w[0] === "set" && w.length === 4 && /^[a-z]+$/.test(w[1]) && /^[a-z0-9]+$/.test(w[2]) && /^\d+$/.test(w[3])) {
      const t = Number(w[3]);
      if (t < 1 || t > 100) throw new DSAViz.InputError("Timestamps are 1 to 100 here.");
      if (t <= last) throw new DSAViz.InputError(`set timestamps must keep increasing: ${t} comes after ${last}.`);
      last = t;
      return ["set", w[1], w[2], t];
    }
    if (w[0] === "get" && w.length === 3 && /^[a-z]+$/.test(w[1]) && /^\d+$/.test(w[2])) {
      const t = Number(w[2]);
      if (t > 100) throw new DSAViz.InputError("Timestamps are 0 to 100 here.");
      return ["get", w[1], t];
    }
    throw new DSAViz.InputError(`"${p}": use set key value time or get key time (lowercase keys).`);
  });
}
const showGets = (g) => `[${g.map((v) => (v === "" ? '""' : v)).join(", ")}]`;
DSAViz.register("0981-time-based-key-value-store/approach2", {
  inputs: INPUT,
  trace({ ops: text }) {
    const ops = parseOps(text);
    const store = new Map(), gets = [];
    const sv = (key, marks = {}) => ({ type: "array", label: `pairs for "${key}" (time: value)`, values: (store.get(key) || []).length ? store.get(key).map(([t, v]) => `${t}: ${v}`) : ["—"], wide: true, marks: (store.get(key) || []).length ? marks : { 0: "ghost" } });
    const steps = [{ line: "init", note: "Each key gets a list of (time, value). set times only grow, so each list is sorted.", view: [{ type: "vars", items: [{ name: "keys stored", value: store.size }] }] }];
    for (const op of ops) {
      if (op[0] === "set") { if (!store.has(op[1])) store.set(op[1], []); store.get(op[1]).push([op[3], op[2]]); steps.push({ line: "set", note: `set(${op[1]}, ${op[2]}, ${op[3]}): append.`, view: [sv(op[1], { [store.get(op[1]).length - 1]: "new" })] }); continue; }
      const [, key, t] = op;
      const pairs = store.get(key) || [];
      let i = pairs.length - 1;
      const marks = {};
      while (i >= 0 && pairs[i][0] > t) { marks[i] = "visited"; i--; }
      if (i >= 0) marks[i] = "match";
      gets.push(i >= 0 ? pairs[i][1] : "");
      steps.push({ line: i >= 0 ? ["scan", "found"] : ["scan", "none"], note: i >= 0 ? `get(${key}, ${t}): walk back from the newest; ${pairs.length - 1 - i} pair${pairs.length - 1 - i === 1 ? " is" : "s are"} too new. ${pairs[i][0]}: ${pairs[i][1]} is the latest at or before ${t}.` : `get(${key}, ${t}): ${pairs.length ? "every pair is newer than " + t : "no pairs for " + key}. Return "".`, view: [sv(key, marks)] });
    }
    steps.push({ line: "none", note: `Return gets: ${showGets(gets)}. Fast for recent times, but an old time walks the whole list: O(pairs) per get.`, view: [{ type: "vars", items: [{ name: "keys stored", value: store.size }] }] });
    return steps;
  },
});
})();
