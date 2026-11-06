// Take or skip every number (sorted), and let a set keep one copy of each subset.
DSAViz.register("0090-subsets-ii/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[2, 1, 2]", minLength: 1, maxLength: 4, minValue: -10, maxValue: 10 }],
  trace({ nums: given }) {
    const nums = [...given].sort((a, b) => a - b);
    const n = nums.length;
    const steps = [];
    const seen = []; // in the order they were first added
    const path = [];
    const choice = nums.map(() => "");
    let made = 0;
    const fmt = (a) => `[${a.join(", ")}]`;
    const view = (i, o = {}) => {
      const marks = {};
      choice.forEach((c, k) => {
        if (c === "in") marks[k] = "match";
        else if (c === "out") marks[k] = "ghost";
      });
      if (i !== undefined && i < n) marks[i] = "active";
      const sm = {};
      if (o.hit !== undefined) sm[o.hit] = o.repeat ? "cut" : "new";
      return [
        { type: "array", label: "nums, sorted (green = taken, faded = left out)", values: nums, marks, pointers: i !== undefined && i < n ? { i } : {} },
        { type: "array", label: "path", values: path.slice(), marks: o.leaf ? Object.fromEntries(path.map((_, k) => [k, o.repeat ? "cut" : "match"])) : {} },
        { type: "array", label: `seen: a set (${seen.length} kept of ${made} made)`, values: seen.slice(), wide: true, marks: sm },
      ];
    };
    const sortedNote = given.join() === nums.join() ? "" : ` First sort: ${fmt(nums)}. Then equal subsets always come out in the same order.`;
    steps.push({ line: "init", note: `Make all ${2 ** n} take-or-skip choices and keep each subset once.${sortedNote}`, view: view() });
    function backtrack(i) {
      if (i === n) {
        made++;
        const key = fmt(path);
        const at = seen.indexOf(key);
        if (at >= 0) {
          steps.push({ line: ["call", "done"], note: `${key} is already in the set (made by different picks of equal numbers): not added again.`, view: view(i, { leaf: true, repeat: true, hit: at }) });
        } else {
          seen.push(key);
          steps.push({ line: ["call", "done"], note: `All decided: ${key}. New, so the set keeps it.`, view: view(i, { leaf: true, hit: seen.length - 1 }) });
        }
        return;
      }
      choice[i] = "in";
      path.push(nums[i]);
      steps.push({ line: ["call", "take"], note: `Take nums[${i}] = ${nums[i]}: path = ${fmt(path)}.`, view: view(i) });
      backtrack(i + 1);
      path.pop();
      choice[i] = "out";
      for (let k = i + 1; k < n; k++) choice[k] = "";
      steps.push({ line: "skip", note: `Leave nums[${i}] = ${nums[i]} out: path = ${fmt(path)}.`, view: view(i) });
      backtrack(i + 1);
      choice[i] = "";
    }
    backtrack(0);
    steps.push({
      line: "return",
      note: `Return the ${seen.length} in the set. ${made - seen.length ? `${made - seen.length} of the ${made} subsets made were repeats, built and then thrown away.` : "No repeats this time, but all 2ⁿ were still built."}`,
      view: view(),
    });
    return steps;
  },
});
