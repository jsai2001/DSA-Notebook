// Keep the values sorted: each add inserts at the right spot (binary search, then shift). find just reads the middle.
(function () {
DSAViz.register("0295-find-median-from-data-stream/approach2", {
  inputs: [{ name: "ops", label: "operations (comma-separated)", type: "string", value: "add 1, add 2, find, add 3, find, add -5, find", maxLength: 140, raw: true }],
  trace({ ops: text }) {
    const ops = parseOps(text);
    const s = [], res = [];
    const steps = [{ line: "init", note: "Start with an empty sorted list.", view: [{ type: "array", label: "nums (sorted)", values: [] }] }];
    for (const [op, x] of ops) {
      if (op === "add") {
        let lo = 0, hi = s.length; while (lo < hi) { const mid = (lo + hi) >> 1; if (s[mid] <= x) lo = mid + 1; else hi = mid; }
        s.splice(lo, 0, x);
        steps.push({ line: "add", note: `addNum(${x}): binary search says index ${lo}; insert there and shift the ${s.length - 1 - lo} value${s.length - 1 - lo === 1 ? "" : "s"} after it.`, view: [{ type: "array", label: "nums (sorted; yellow = inserted)", values: s.slice(), marks: { [lo]: "new" } }, { type: "array", label: "medians returned", values: res.map(show) }] });
        continue;
      }
      const n = s.length, m = median(s);
      res.push(m);
      steps.push({ line: "median", note: `findMedian(): already sorted, so read the middle: ${show(m)}. O(1).`, view: [{ type: "array", label: "nums (sorted; green = middle)", values: s.slice(), marks: n % 2 ? { [(n - 1) / 2]: "match" } : { [n / 2 - 1]: "match", [n / 2]: "match" } }, { type: "array", label: "medians returned", values: res.map(show), marks: { [res.length - 1]: "new" } }] });
    }
    steps.push({ line: ops[ops.length - 1][0] === "add" ? "add" : "median", note: `Return [${res.map(show).join(", ")}]. Each add is O(n) because of the shifting; each find is O(1).`, view: [{ type: "array", label: "medians returned", values: res.map(show) }] });
    return steps;
  },
});

function parseOps(text) {
  const parts = text.split(",").map((s) => s.trim()).filter(Boolean);
  if (!parts.length) throw new DSAViz.InputError("Give operations like: add 1, add 2, find");
  if (parts.length > 12) throw new DSAViz.InputError("At most 12 operations here, so the steps stay readable.");
  let added = 0;
  return parts.map((p) => {
    let m = p.match(/^add\s+(-?\d+)$/);
    if (m) { const x = Number(m[1]); if (Math.abs(x) > 100000) throw new DSAViz.InputError("Values are -100000 to 100000."); added++; return ["add", x]; }
    if (/^find$/.test(p)) { if (!added) throw new DSAViz.InputError("find needs at least one add before it."); return ["find", 0]; }
    throw new DSAViz.InputError(`"${p}": use "add 5" or "find".`);
  });
}
const median = (s) => { const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const show = (v) => (Number.isInteger(v) ? `${v}.0` : String(v));
})();
