// A hash map with "last used" times, plus a min-heap of (time, key). Old heap entries are skipped when popped.
(function () {
DSAViz.register("0146-lru-cache/approach2", {
  inputs: [
    { name: "capacity", type: "int", value: "2", min: 1, max: 4 },
    { name: "ops", label: "operations (comma-separated)", type: "string", value: "put 1 1, put 2 2, get 1, put 3 3, get 2, put 4 4, get 1, get 3, get 4", maxLength: 140, raw: true },
  ],
  trace({ capacity, ops: text }) {
    const ops = parseOps(text);
    const steps = [];
    const data = new Map();
    const heap = [];
    const results = [];
    let clock = 0;
    const touch = (k) => {
      clock++;
      data.get(k)[1] = clock;
      heap.push([clock, k]);
      heap.sort((a, b) => a[0] - b[0]);
    };
    const view = (o = {}) => {
      const hmarks = {};
      heap.forEach(([t, k], idx) => { if (!data.has(k) || data.get(k)[1] !== t) hmarks[idx] = "ghost"; });
      (o.popped || []).forEach((idx) => (hmarks[idx] = "cut"));
      return [
        { type: "map", label: `data (key → value, time of last use; capacity ${capacity})`, columns: ["key", "value, time"], entries: [...data].map(([k, [v, t]]) => [String(k), `${v}, t=${t}`]), marks: o.key !== undefined ? { [String(o.key)]: o.km || "new" } : {} },
        { type: "array", label: "heap of (time, key), smallest time first (dashed = old entry, the key was used again)", values: heap.map(([t, k]) => `t${t}:${k}`), wide: true, marks: hmarks },
        { type: "array", label: "get results so far", values: results.map(String), compact: true, marks: o.res ? { [results.length - 1]: "new" } : {} },
        { type: "vars", items: [{ name: "clock", value: clock }] },
      ];
    };
    steps.push({ line: "init", note: "Every use gets a new time from the clock. The least recently used key has the smallest current time; the heap finds it.", view: view() });
    for (const op of ops) {
      const key = op[1];
      if (op[0] === "get") {
        if (!data.has(key)) {
          results.push(-1);
          steps.push({ line: "miss", note: `get(${key}): not in data. Return -1.`, view: view({ res: true }) });
        } else {
          touch(key);
          results.push(data.get(key)[0]);
          steps.push({ line: ["miss", "hit"], note: `get(${key}): found. Its time becomes ${clock}, and (t${clock}, ${key}) goes on the heap. The old heap entry stays, now out of date. Return ${data.get(key)[0]}.`, view: view({ res: true, key, km: "match" }) });
        }
        continue;
      }
      const value = op[2];
      if (data.has(key)) {
        data.get(key)[0] = value;
        touch(key);
        steps.push({ line: ["update", "insert"], note: `put(${key}, ${value}): already cached. Update the value; its time becomes ${clock}.`, view: view({ key }) });
        continue;
      }
      if (data.size === capacity) {
        const skipped = [];
        let evicted;
        while (true) {
          const [t, k] = heap.shift();
          if (data.get(k)[1] === t) { evicted = [k, t]; break; }
          skipped.push(`(t${t}, ${k})`);
        }
        data.delete(evicted[0]);
        steps.push({
          line: ["update", "evict"],
          note: `put(${key}, ${value}): full. Pop the heap${skipped.length ? `, skipping out-of-date ${skipped.join(", ")}` : ""}, until (t${evicted[1]}, ${evicted[0]}), which matches ${evicted[0]}'s current time. Evict ${evicted[0]}.`,
          view: view(),
        });
      }
      data.set(key, [value, 0]);
      touch(key);
      steps.push({ line: ["update", "evict", "insert"], note: `Add ${key} with value ${value} and time ${clock}.`, view: view({ key }) });
    }
    steps.push({ line: "insert", note: `Done: [${results.join(", ")}]. Each call is O(log n), but the heap keeps old entries until they're popped: ${heap.length} entries for ${data.size} keys here.`, view: view() });
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
