// Count each number on its own: clear its lowest 1 until it's 0.
(function () {
DSAViz.register("0338-counting-bits/approach1", {
  inputs: [{ name: "n", type: "int", value: "5", min: 0, max: 16 }],
  trace({ n }) {
    const ans = [];
    const steps = [];
    const view = (marks = {}, vars) => [
      { type: "array", label: "ans; index = number", values: ans.length ? [...ans] : ["—"], marks: ans.length ? marks : { 0: "ghost" }, sub: ans.length ? ans.map((_, i) => bin(i)) : undefined },
      ...(vars ? [{ type: "vars", items: vars }] : []),
    ];
    steps.push({ line: "init", note: `Count the 1 bits of every number from 0 to ${n}, one number at a time.`, view: view() });
    for (let i = 0; i <= n; i++) {
      let x = i, c = 0;
      steps.push({ line: "num", note: `i = ${i} = ${bin(i)} in binary.`, view: view({}, [{ name: "i", value: i }, { name: "x", value: bin(x), mark: "active" }, { name: "count", value: c }]) });
      while (x) {
        const y = x & (x - 1);
        c++;
        steps.push({ line: "clear", note: `x & (x - 1): ${bin(x)} → ${bin(y)}. The lowest 1 is gone. count = ${c}.`, view: view({}, [{ name: "i", value: i }, { name: "x", value: bin(y), mark: "new" }, { name: "count", value: c, mark: "new" }]) });
        x = y;
      }
      ans.push(c);
      steps.push({ line: "store", note: `x is 0: ${i} has ${c} one bit${c === 1 ? "" : "s"}. ans[${i}] = ${c}.`, view: view({ [i]: "new" }) });
    }
    steps.push({ line: "return", note: `Return [${ans.join(", ")}]. Each number costs one round per 1 bit: O(n log n).`, view: view(Object.fromEntries(ans.map((_, i) => [i, "match"]))) });
    return steps;
  },
});
const bin = (x) => x.toString(2);
})();
