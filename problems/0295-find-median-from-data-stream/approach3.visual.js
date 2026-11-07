// Two heaps: low (a max-heap of the smaller half) and high (a min-heap of the bigger half). The median is at their tops.
(function () {
DSAViz.register("0295-find-median-from-data-stream/approach3", {
  inputs: [{ name: "ops", label: "operations (comma-separated)", type: "string", value: "add 1, add 2, find, add 3, find, add -5, find", maxLength: 140, raw: true }],
  trace({ ops: text }) {
    const ops = parseOps(text);
    const low = [], high = [], res = [];
    const view = (o = {}) => [{ type: "array", label: "low: the smaller half, max-heap (biggest first; green = top)", values: low.slice().sort((a, b) => b - a), marks: low.length && o.tops ? { 0: "match" } : o.lm || {} }, { type: "array", label: "high: the bigger half, min-heap (smallest first; green = top)", values: high.slice().sort((a, b) => a - b), marks: high.length && o.tops && low.length === high.length ? { 0: "match" } : o.hm || {} }, { type: "array", label: "medians returned", values: res.map(show), marks: o.rec ? { [res.length - 1]: "new" } : {} }];
    const steps = [{ line: "init", note: "Two empty heaps. low keeps the same size as high, or one more.", view: view() }];
    const top = (h, max) => (max ? Math.max(...h) : Math.min(...h));
    const take = (h, v) => h.splice(h.indexOf(v), 1);
    for (const [op, x] of ops) {
      if (op === "add") {
        low.push(x);
        const up = top(low, true); take(low, up); high.push(up);
        let note = `addNum(${x}): push it into low, then move low's biggest (${up}) to high. Now every value in low ≤ every value in high.`;
        if (high.length > low.length) { const down = top(high, false); take(high, down); low.push(down); note += ` high is bigger, so move its smallest (${down}) back to low.`; }
        steps.push({ line: ["add", "balance"], note, view: view() });
        continue;
      }
      const m = low.length > high.length ? top(low, true) : (top(low, true) + top(high, false)) / 2;
      res.push(m);
      steps.push({ line: "median", note: low.length > high.length ? `findMedian(): odd count, so it's low's top: ${show(m)}.` : `findMedian(): even count, so it's the mean of the tops: (${top(low, true)} + ${top(high, false)}) / 2 = ${show(m)}.`, view: view({ tops: true, rec: true }) });
    }
    steps.push({ line: ops[ops.length - 1][0] === "add" ? "balance" : "median", note: `Return [${res.map(show).join(", ")}]. Each add is O(log n) (a few heap pushes and pops); each find is O(1).`, view: view() });
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
