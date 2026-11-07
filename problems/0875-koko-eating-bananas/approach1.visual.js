// Try speeds 1, 2, 3, ... and return the first that finishes within h hours.
(function () {
function check(piles, h) {
  if (h < piles.length) throw new DSAViz.InputError(`h must be at least ${piles.length}: each pile takes at least one hour.`);
}
const hoursAt = (piles, k) => piles.reduce((s, p) => s + Math.ceil(p / k), 0);
const pview = (piles, k) => ({ type: "array", label: k ? `piles; caption = hours at speed ${k}` : "piles", values: piles, sub: k ? piles.map((p) => String(Math.ceil(p / k))) : undefined });
DSAViz.register("0875-koko-eating-bananas/approach1", {
  inputs: [
    { name: "piles", type: "int[]", value: "[3, 6, 7, 11]", minLength: 1, maxLength: 10, minValue: 1, maxValue: 100 },
    { name: "h", type: "int", value: "8", min: 1, max: 1000 },
  ],
  trace({ piles, h }) {
    check(piles, h);
    const steps = [];
    let k = 1;
    steps.push({ line: "init", note: "Start at speed 1.", view: [pview(piles), { type: "vars", items: [{ name: "k", value: k, mark: "active" }, { name: "h", value: h }] }] });
    let tries = 0;
    for (;; k++) {
      tries++;
      const hrs = hoursAt(piles, k);
      const ok = hrs <= h;
      steps.push({ line: ok ? ["try", "return"] : ["try", "next"], note: `Speed ${k}: ${piles.map((p) => Math.ceil(p / k)).join(" + ")} = ${hrs} hours. ${ok ? `That's within ${h}.` : `More than ${h}: try ${k + 1}.`}`, view: [pview(piles, k), { type: "vars", items: [{ name: "k", value: k, mark: ok ? "match" : "cut" }, { name: "hours", value: hrs, mark: ok ? "match" : "cut" }, { name: "h", value: h }] }] });
      if (ok) break;
    }
    steps.push({ line: "return", note: `Return ${k}. ${tries} speed${tries > 1 ? "s" : ""} tried, one pass over the piles each. Up to max(piles) tries: O(n · max).`, view: [pview(piles, k)] });
    return steps;
  },
});
})();
