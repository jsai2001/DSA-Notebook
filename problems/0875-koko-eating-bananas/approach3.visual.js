// Binary search on the speed: if k is fast enough, so is anything faster.
(function () {
function check(piles, h) {
  if (h < piles.length) throw new DSAViz.InputError(`h must be at least ${piles.length}: each pile takes at least one hour.`);
}
const hoursAt = (piles, k) => piles.reduce((s, p) => s + Math.ceil(p / k), 0);
const pview = (piles, k) => ({ type: "array", label: k ? `piles; caption = hours at speed ${k}` : "piles", values: piles, sub: k ? piles.map((p) => String(Math.ceil(p / k))) : undefined });
DSAViz.register("0875-koko-eating-bananas/approach3", {
  inputs: [
    { name: "piles", type: "int[]", value: "[30, 11, 23, 4, 20]", minLength: 1, maxLength: 10, minValue: 1, maxValue: 1000000000 },
    { name: "h", type: "int", value: "6", min: 1, max: 1000000000 },
  ],
  trace({ piles, h }) {
    check(piles, h);
    let lo = 1, hi = Math.max(...piles);
    const vars = (k, hrs, mark) => ({ type: "vars", items: [{ name: "lo", value: lo }, { name: "hi", value: hi }, ...(k ? [{ name: "k", value: k, mark: "active" }, { name: "hours", value: hrs, mark }] : []), { name: "h", value: h }] });
    const steps = [{ line: "init", note: `The answer is between 1 and max(piles) = ${hi}: at ${hi} every pile takes one hour.`, view: [pview(piles), vars()] }];
    let rounds = 0;
    while (lo < hi) {
      rounds++;
      const k = Math.floor((lo + hi) / 2);
      const hrs = hoursAt(piles, k);
      if (hrs <= h) {
        steps.push({ line: ["loop", "mid", "fast"], note: `k = ${k}: ${hrs} hours ≤ ${h}. Fast enough, so the answer is ${k} or slower: hi = ${k}.`, view: [pview(piles, k), vars(k, hrs, "match")] });
        hi = k;
      } else {
        steps.push({ line: ["loop", "mid", "slow"], note: `k = ${k}: ${hrs} hours > ${h}. Too slow: lo = ${k + 1}.`, view: [pview(piles, k), vars(k, hrs, "cut")] });
        lo = k + 1;
      }
    }
    steps.push({ line: "return", note: `Return ${lo}. lo = hi after ${rounds} round${rounds === 1 ? "" : "s"}, each a pass over the piles: O(n log max).`, view: [pview(piles, lo), vars()] });
    return steps;
  },
});
})();
