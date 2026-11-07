// Store every value; each findMedian sorts a copy and reads the middle.
(function () {
DSAViz.register("0295-find-median-from-data-stream/approach1", {
  inputs: [{ name: "ops", label: "operations (comma-separated)", type: "string", value: "add 1, add 2, find, add 3, find, add -5, find", maxLength: 140, raw: true }],
  trace({ ops: text }) {
    const ops = parseOps(text);
    const nums = [], res = [];
    const steps = [{ line: "init", note: "Start with an empty list.", view: [{ type: "array", label: "nums (arrival order)", values: [] }] }];
    for (const [op, x] of ops) {
      if (op === "add") { nums.push(x); steps.push({ line: "add", note: `addNum(${x}): append it. O(1).`, view: [{ type: "array", label: "nums (arrival order)", values: nums.slice(), marks: { [nums.length - 1]: "new" } }, { type: "array", label: "medians returned", values: res.map(show) }] }); continue; }
      const s = nums.slice().sort((a, b) => a - b), n = s.length, m = median(s);
      res.push(m);
      steps.push({ line: ["sort", "median"], note: `findMedian(): sort a copy of all ${n} values. ${n % 2 ? `The middle one is ${s[(n - 1) / 2]}` : `The two middles are ${s[n / 2 - 1]} and ${s[n / 2]}, mean ${show(m)}`}.`, view: [{ type: "array", label: "sorted copy (green = middle)", values: s, marks: n % 2 ? { [(n - 1) / 2]: "match" } : { [n / 2 - 1]: "match", [n / 2]: "match" } }, { type: "array", label: "medians returned", values: res.map(show), marks: { [res.length - 1]: "new" } }] });
    }
    steps.push({ line: ops[ops.length - 1][0] === "add" ? "add" : "median", note: `Return [${res.map(show).join(", ")}]. Each find sorts everything: O(n log n) per find.`, view: [{ type: "array", label: "medians returned", values: res.map(show) }] });
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
