// Expand around each of the 2n - 1 centers (letters and gaps); each step outward is one more palindrome.
(function () {
DSAViz.register("0647-palindromic-substrings/approach3", {
  inputs: [{ name: "s", type: "string", value: "abaa", maxLength: 8 }],
  trace({ s }) {
    const w = parseWord(s);
    const n = w.length;
    const steps = [];
    let count = 0;
    const found = [];
    const view = (o = {}) => {
      const marks = {};
      if (o.range) for (let t = o.range[0]; t <= o.range[1]; t++) marks[t] = "match";
      if (o.stop) o.stop.forEach((t) => t >= 0 && t < n && (marks[t] = "cut"));
      return [
        { type: "array", label: "s (green = largest palindrome around this center, red = where it stopped)", values: [...w], marks, pointers: o.center !== undefined ? (o.center % 2 ? { lo: (o.center - 1) / 2, hi: (o.center + 1) / 2 } : { center: o.center / 2 }) : {} },
        { type: "array", label: "palindromes counted", values: [...found], wide: true, marks: Object.fromEntries((o.fresh || []).map((k) => [k, "new"])) },
        { type: "vars", items: [{ name: "center", value: o.center ?? "-" }, { name: "count", value: count, mark: o.fresh && o.fresh.length ? "new" : "" }] },
      ];
    };
    steps.push({ line: "init", note: `Every palindrome has a middle: a letter (odd length) or the gap between two letters (even length). That's ${2 * n - 1} centers. Grow outward from each.`, view: view() });
    for (let center = 0; center < 2 * n - 1; center++) {
      let lo = Math.floor(center / 2);
      let hi = lo + (center % 2);
      const fresh = [];
      let last = null;
      while (lo >= 0 && hi < n && w[lo] === w[hi]) {
        count++;
        found.push(w.slice(lo, hi + 1));
        fresh.push(found.length - 1);
        last = [lo, hi];
        lo--;
        hi++;
      }
      const where = center % 2 ? `the gap between ${(center - 1) / 2} and ${(center + 1) / 2}` : `letter ${center / 2}`;
      let stopWhy;
      if (lo < 0 || hi >= n) stopWhy = "it reached the end of s";
      else stopWhy = `"${w[lo]}" ≠ "${w[hi]}"`;
      steps.push({
        line: ["center", "grow"],
        note: fresh.length
          ? `Center ${center}, ${where}: ${fresh.map((k) => `"${found[k]}"`).join(", ")}. Stops because ${stopWhy}. +${fresh.length}, count = ${count}.`
          : `Center ${center}, ${where}: "${w[lo]}" ≠ "${w[hi]}", so no palindrome here.`,
        view: view({ center, range: last, stop: [lo, hi], fresh }),
      });
    }
    steps.push({ line: "return", note: `Return ${count}. Each center grows at most n / 2 steps: O(n²) time, O(1) memory.`, view: view() });
    return steps;
  },
});

function parseWord(s) {
  const w = s.trim();
  if (!/^[a-z]{1,8}$/.test(w)) throw new DSAViz.InputError("s: 1 to 8 lowercase letters, like aaa.");
  return w;
}
})();
