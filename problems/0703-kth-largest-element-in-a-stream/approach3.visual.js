// A min-heap that never holds more than k values: the k biggest so far. Its top is the k-th biggest.
DSAViz.register("0703-kth-largest-element-in-a-stream/approach3", {
  inputs: [
    { name: "k", type: "int", value: "3", min: 1, max: 9 },
    { name: "nums", type: "int[]", value: "[4, 5, 8, 2]", minLength: 0, maxLength: 8, minValue: -10000, maxValue: 10000 },
    { name: "adds", label: "values passed to add, in order", type: "int[]", value: "[3, 5, 10, 9, 4]", minLength: 1, maxLength: 6, minValue: -10000, maxValue: 10000 },
  ],
  trace({ k, nums, adds }) {
    if (k > nums.length + 1) throw new DSAViz.InputError(`k can be at most nums.length + 1 = ${nums.length + 1}: after the first add there must be k values.`);
    const heap = [];
    const res = [];
    const steps = [];
    const sorted = () => heap.slice().sort((a, b) => a - b);
    const push = (v) => { heap.push(v); let drop = null; if (heap.length > k) { const s = sorted(); drop = s[0]; heap.splice(heap.indexOf(drop), 1); } return drop; };
    nums.forEach(push);
    steps.push({ line: ["init", "add", "pop"], note: `Add the ${nums.length} starting values one by one, keeping only the ${k} biggest: heap = [${sorted().join(", ")}].`, view: [{ type: "array", label: `heap, smallest first (at most k = ${k})`, values: sorted() }] });
    adds.forEach((v) => {
      const drop = push(v);
      res.push(Math.min(...heap));
      steps.push({ line: drop === null ? ["add", "answer"] : ["add", "pop", "answer"], note: `add(${v}): push it.${drop !== null ? ` That's ${k + 1} values: pop the smallest, ${drop}.` : ""} The top, ${res[res.length - 1]}, is the k-th biggest.`, view: [{ type: "array", label: `heap, smallest first (green = the top)`, values: sorted(), marks: { 0: "match" } }, { type: "array", label: "answers", values: res.slice(), marks: { [res.length - 1]: "new" } }] });
    });
    steps.push({ line: "answer", note: `Return [${res.join(", ")}]. Each add is O(log k), and memory stays at k values.`, view: [{ type: "array", label: "answers", values: res }] });
    return steps;
  },
});
