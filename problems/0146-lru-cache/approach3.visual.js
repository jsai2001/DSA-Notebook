// A hash map from key to node, plus a doubly linked list in order of use: every call is O(1).
(function () {
DSAViz.register("0146-lru-cache/approach3", {
  inputs: [
    { name: "capacity", type: "int", value: "2", min: 1, max: 4 },
    { name: "ops", label: "operations (comma-separated)", type: "string", value: "put 1 1, put 2 2, get 1, put 3 3, get 2, put 4 4, get 1, get 3, get 4", maxLength: 140, raw: true },
  ],
  trace({ capacity, ops: text }) {
    const ops = parseOps(text);
    const steps = [];
    const order = []; // keys, most recent first (the nodes between head and tail)
    const vals = new Map();
    const results = [];
    const view = (o = {}) => [
      {
        type: "list",
        label: `head ⇄ … ⇄ tail (most recent → least recent; capacity ${capacity})`,
        nodes: [{ value: "head", caption: "sentinel", mark: "ghost" }, ...order.map((k) => ({ value: `${k}:${vals.get(k)}`, caption: `key ${k}`, mark: o.key === k ? o.km || "new" : "" })), { value: "tail", caption: "sentinel", mark: "ghost" }],
      },
      { type: "set", label: "map keys (each points straight at its node)", items: order.map(String).sort((a, b) => a - b), marks: o.key !== undefined && order.includes(o.key) ? { [String(o.key)]: "match" } : {} },
      { type: "array", label: "get results so far", values: results.map(String), compact: true, marks: o.res ? { [results.length - 1]: "new" } : {} },
    ];
    steps.push({ line: "init", note: "Two sentinel nodes, head and tail, so adding and removing never needs a special case. The map gives each key's node in O(1).", view: view() });
    for (const op of ops) {
      const key = op[1];
      if (op[0] === "get") {
        if (!vals.has(key)) {
          results.push(-1);
          steps.push({ line: "miss", note: `get(${key}): not in the map. Return -1.`, view: view({ res: true }) });
        } else {
          order.splice(order.indexOf(key), 1);
          order.unshift(key);
          results.push(vals.get(key));
          steps.push({ line: ["miss", "hit"], note: `get(${key}): the map gives its node. Unlink it and put it right after head (most recent), four pointer changes. Return ${vals.get(key)}.`, view: view({ res: true, key, km: "match" }) });
        }
        continue;
      }
      const value = op[2];
      if (vals.has(key)) {
        vals.set(key, value);
        order.splice(order.indexOf(key), 1);
        order.unshift(key);
        steps.push({ line: ["update", "insert"], note: `put(${key}, ${value}): already cached. Update the value and move the node right after head.`, view: view({ key }) });
        continue;
      }
      let note = "";
      const line = ["update", "evict", "insert"];
      if (order.length === capacity) {
        const lru = order.pop();
        note = `full, so evict tail.prev, key ${lru} (least recently used), and remove ${lru} from the map: that's why each node stores its key. Then `;
        vals.delete(lru);
      }
      vals.set(key, value);
      order.unshift(key);
      steps.push({ line, note: `put(${key}, ${value}): ${note}${note ? "a" : "A"}dd a new node right after head.`, view: view({ key }) });
    }
    steps.push({ line: "insert", note: `Done: [${results.join(", ")}]. Every call was O(1): one map lookup and a few pointer changes.`, view: view() });
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
