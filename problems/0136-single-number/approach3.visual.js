// XOR everything: x ^ x = 0 and x ^ 0 = x, so the pairs cancel and the single number is left.
(function () {
DSAViz.register("0136-single-number/approach3", {
  inputs: [{ name: "nums", type: "int[]", value: "[4, 1, 2, 1, 2]", minLength: 1, maxLength: 9, minValue: -99, maxValue: 99 }],
  trace({ nums }) {
    checkNums(nums);
    const steps = [];
    const bits = (x) => [...((x & 0xff) >>> 0).toString(2).padStart(8, "0")];
    let result = 0;
    const rows = [];
    const view = (o = {}) => {
      const cells = [...rows.map((x) => bits(x)), bits(result)];
      const marks = {};
      if (o.k !== undefined) for (let b = 0; b < 8; b++) marks[`${rows.length - 1},${b}`] = "window";
      for (let b = 0; b < 8; b++) if (cells[rows.length][b] === "1") marks[`${rows.length},${b}`] = o.done ? "match" : "new";
      return [
        { type: "array", label: "nums", values: nums, marks: o.k !== undefined ? { [o.k]: "active" } : {}, pointers: o.k !== undefined ? { x: o.k } : {} },
        {
          type: "grid",
          label: "bits (8-bit two's complement; outlined = the number just XORed in; last row = result)",
          rows: [...rows.map(String), "result"],
          cols: [7, 6, 5, 4, 3, 2, 1, 0],
          corner: "x \\ bit",
          cells,
          marks,
        },
        { type: "vars", items: [{ name: "result", value: result, mark: o.done ? "match" : "" }] },
      ];
    };
    steps.push({ line: "init", note: "result = 0. XOR flips the bits of result where x has a 1. Doing it twice with the same x flips them back.", view: view() });
    nums.forEach((x, k) => {
      const before = result;
      result ^= x;
      rows.push(x);
      steps.push({ line: "xor", note: `result = ${before} ^ ${x} = ${result}.${nums.indexOf(x) < k ? ` ${x} has now gone in twice, so its bits cancelled out.` : ""}`, view: view({ k }) });
    });
    steps.push({ line: "return", note: `Every pair cancelled; only the single number is left. Return ${result}. O(n) time, O(1) memory.`, view: view({ done: true }) });
    return steps;
  },
});

// Every value twice except one, as the problem promises.
function checkNums(nums) {
  const c = new Map();
  nums.forEach((x) => c.set(x, (c.get(x) || 0) + 1));
  const once = [...c].filter(([, k]) => k === 1);
  if ([...c.values()].some((k) => k > 2) || once.length !== 1) throw new DSAViz.InputError("Every number must appear exactly twice, except one that appears once, like [4, 1, 2, 1, 2].");
}
})();
