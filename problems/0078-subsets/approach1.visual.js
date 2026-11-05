// Take or skip: one yes/no choice per number; when all are decided, path is one subset.
DSAViz.register("0078-subsets/approach1", {
  inputs: [{ name: "nums", type: "int[]", value: "[1, 2, 3]", minLength: 1, maxLength: 4, minValue: -10, maxValue: 10 }],
  trace({ nums }) {
    if (new Set(nums).size !== nums.length) throw new DSAViz.InputError("The numbers must all be different.");
    const n = nums.length;
    const steps = [];
    const result = [];
    const path = [];
    const choice = nums.map(() => ""); // "in" / "out" / "" for the numbers decided so far
    const fmt = (a) => `[${a.join(", ")}]`;
    const view = (i, o = {}) => {
      const marks = {};
      choice.forEach((c, k) => {
        if (c === "in") marks[k] = "match";
        else if (c === "out") marks[k] = "ghost";
      });
      if (i !== undefined && i < n) marks[i] = o.skip ? "cut" : "active";
      return [
        { type: "array", label: "nums (green = taken, faded = left out)", values: nums, marks, pointers: i !== undefined && i < n ? { i } : {} },
        { type: "array", label: "path", values: path.slice(), marks: o.done ? Object.fromEntries(path.map((_, k) => [k, "match"])) : o.added ? { [path.length - 1]: "new" } : {} },
        { type: "array", label: `result (${result.length} of ${2 ** n})`, values: result.map(fmt), wide: true, marks: o.done ? { [result.length - 1]: "new" } : {} },
      ];
    };
    steps.push({ line: "init", note: `Decide each number in turn: take it or leave it out. ${n} choices, so ${2 ** n} subsets.`, view: view() });
    function backtrack(i) {
      if (i === n) {
        result.push(path.slice());
        steps.push({ line: ["call", "done"], note: `All ${n} numbers decided: ${fmt(path)}. Add a copy to result.`, view: view(i, { done: true }) });
        return;
      }
      choice[i] = "in";
      path.push(nums[i]);
      steps.push({ line: ["call", "take"], note: `Take ${nums[i]}: path = ${fmt(path)}. Decide the next number.`, view: view(i, { added: true }) });
      backtrack(i + 1);
      path.pop();
      choice[i] = "out";
      for (let k = i + 1; k < n; k++) choice[k] = "";
      steps.push({ line: "skip", note: `Back at ${nums[i]}: pop it (path = ${fmt(path)}) and try the other choice, leaving it out.`, view: view(i, { skip: true }) });
      backtrack(i + 1);
      choice[i] = "";
    }
    backtrack(0);
    steps.push({ line: "return", note: `Return all ${result.length} subsets. 2ⁿ leaves, each copied in O(n): O(n · 2ⁿ).`, view: view() });
    return steps;
  },
});
