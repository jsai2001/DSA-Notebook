// A list of [key, value] in order of use, least recent first. Every call scans it: O(capacity).
(function () {
DSAViz.register("0146-lru-cache/approach1", {
  inputs: [
    { name: "capacity", type: "int", value: "2", min: 1, max: 4 },
    { name: "ops", label: "operations (comma-separated)", type: "string", value: "put 1 1, put 2 2, get 1, put 3 3, get 2, put 4 4, get 1, get 3, get 4", maxLength: 140, raw: true },
  ],
  trace({ capacity, ops: text }) {
    const ops = parseOps(text);
    const steps = [];
    const items = [];
    const results = [];
    let scanned = 0;
    const view = (o = {}) => [
      { type: "array", label: `items (least recent → most recent; capacity ${capacity})`, values: items.map(([k, v]) => `${k}:${v}`), wide: true, marks: o.marks || {} },
      { type: "array", label: "get results so far", values: results.map(String), compact: true, marks: o.res ? { [results.length - 1]: "new" } : {} },
      { type: "vars", items: [{ name: "entries scanned so far", value: scanned, mark: o.counted ? "new" : "" }] },
    ];
    steps.push({ line: "init", note: `An empty cache with room for ${capacity}. Entries are kept in order of use: the front is the next to be evicted.`, view: view() });
    for (const op of ops) {
      const key = op[1];
      const i = items.findIndex(([k]) => k === key);
      scanned += i === -1 ? items.length : i + 1;
      if (op[0] === "get") {
        if (i === -1) {
          results.push(-1);
          steps.push({ line: ["get", "miss"], note: `get(${key}): scanned all ${items.length} entries, ${key} isn't there. Return -1.`, view: view({ res: true, counted: true }) });
        } else {
          const it = items.splice(i, 1)[0];
          items.push(it);
          results.push(it[1]);
          steps.push({ line: ["get", "miss", "hit"], note: `get(${key}): found it after scanning ${i + 1}. Move it to the back (most recent) and return ${it[1]}.`, view: view({ res: true, counted: true, marks: { [items.length - 1]: "match" } }) });
        }
        continue;
      }
      const value = op[2];
      let note;
      let line;
      if (i !== -1) {
        items.splice(i, 1);
        line = ["put", "update", "insert"];
        note = `put(${key}, ${value}): ${key} is already cached. Remove the old entry, then add ${key}:${value} at the back.`;
      } else if (items.length === capacity) {
        const [ek, ev] = items.shift();
        line = ["put", "update", "evict", "insert"];
        note = `put(${key}, ${value}): the cache is full. Evict the front, ${ek}:${ev} (least recently used), then add ${key}:${value} at the back.`;
      } else {
        line = ["put", "update", "evict", "insert"];
        note = `put(${key}, ${value}): new key and there's room. Add it at the back.`;
      }
      items.push([key, value]);
      steps.push({ line, note, view: view({ counted: true, marks: { [items.length - 1]: "new" } }) });
    }
    steps.push({ line: "insert", note: `Done: [${results.join(", ")}]. ${scanned} entries scanned for ${ops.length} calls: each call is O(capacity).`, view: view() });
    return steps;
  },
});

// Read "put 1 1, get 1, ..." into [["put", 1, 1], ["get", 1], ...].
function parseOps(text) {
  const parts = text.split(",").map((p) => p.trim()).filter(Boolean);
  if (!parts.length) throw new DSAViz.InputError("Type operations separated by commas, like put 1 1, get 1.");
  if (parts.length > 12) throw new DSAViz.InputError("Up to 12 operations here, so the steps stay readable.");
  return parts.map((p) => {
    const m = p.match(/^(get)\s+(\d{1,2})$|^(put)\s+(\d{1,2})\s+(\d{1,3})$/i);
    if (!m) throw new DSAViz.InputError(`"${p}": use get KEY or put KEY VALUE (keys 0-99, values 0-999).`);
    return m[1] ? ["get", +m[2]] : ["put", +m[4], +m[5]];
  });
}
})();
