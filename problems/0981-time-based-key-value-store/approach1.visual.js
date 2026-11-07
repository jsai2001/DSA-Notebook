// Store each (key, time) on its own; a get tries time, time − 1, ... down to 1.
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
DSAViz.register("0981-time-based-key-value-store/approach1", {
  inputs: INPUT,
  trace({ ops: text }) {
    const ops = parseOps(text);
    const at = new Map(), gets = [];
    const mv = (mark) => ({ type: "map", label: "(key, time) → value", columns: ["key, time", "value"], entries: [...at], marks: mark ? { [mark]: "match" } : {} });
    const steps = [{ line: "init", note: "One hash map from (key, time) to value.", view: [mv()] }];
    for (const op of ops) {
      if (op[0] === "set") { at.set(`${op[1]}, ${op[3]}`, op[2]); steps.push({ line: "set", note: `set(${op[1]}, ${op[2]}, ${op[3]}).`, view: [mv(`${op[1]}, ${op[3]}`)] }); continue; }
      const [, key, t] = op;
      let found = "", tries = 0, hitKey = null;
      for (let s = t; s >= 1; s--) { tries++; if (at.has(`${key}, ${s}`)) { found = at.get(`${key}, ${s}`); hitKey = `${key}, ${s}`; break; } }
      gets.push(found);
      steps.push({ line: hitKey ? ["scan", "found"] : ["scan", "none"], note: hitKey ? `get(${key}, ${t}): tried times ${t} down to ${t - tries + 1} (${tries} lookup${tries > 1 ? "s" : ""}); found ${found}.` : `get(${key}, ${t}): tried ${tries} time${tries === 1 ? "" : "s"} down to 1, nothing. Return "".`, view: [mv(hitKey)] });
    }
    steps.push({ line: "none", note: `Return gets: ${showGets(gets)}. A get can try every time down to 1: O(timestamp), up to 10⁷.`, view: [mv()] });
    return steps;
  },
});
})();
