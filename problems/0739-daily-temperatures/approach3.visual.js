// Monotonic stack: keep the days still waiting, coldest on top. A warmer day pops every colder day it beats.
DSAViz.register("0739-daily-temperatures/approach3", {
  inputs: [{ name: "temperatures", type: "int[]", value: "[73, 74, 75, 71, 69, 72, 76, 73]", minLength: 1, maxLength: 10, minValue: 30, maxValue: 100 }],
  trace({ temperatures: t }) {
    const n = t.length;
    const ans = Array(n).fill(0);
    const stack = [];
    const steps = [];
    const view = (i, popped = []) => [{ type: "array", label: "temperatures (dark = today)", values: t, marks: i === undefined ? {} : { [i]: "active" }, pointers: i === undefined ? {} : { i } }, { type: "array", label: "stack: days still waiting (day: temperature; top on the right, yellow = just pushed)", values: stack.map((d) => `${d}: ${t[d]}`), wide: true, marks: stack.length && i !== undefined ? { [stack.length - 1]: "new" } : {} }, { type: "array", label: "ans (green = just set)", values: ans.slice(), marks: Object.fromEntries(popped.map((d) => [d, "match"])) }];
    steps.push({ line: "init", note: "An empty stack of days waiting for a warmer day.", view: view() });
    for (let i = 0; i < n; i++) {
      const popped = [];
      while (stack.length && t[stack[stack.length - 1]] < t[i]) { const j = stack.pop(); ans[j] = i - j; popped.push(j); }
      stack.push(i);
      steps.push({ line: ["day", "pop", "push"], note: `Day ${i} (${t[i]}).${popped.length ? ` It's warmer than ${popped.map((j) => `day ${j} (${t[j]})`).join(", ")}: pop ${popped.length > 1 ? "them" : "it"} and set the wait${popped.length > 1 ? "s" : ""}.` : stack.length > 1 ? ` Not warmer than day ${stack[stack.length - 2]} (${t[stack[stack.length - 2]]}) on top.` : ""} Push day ${i}.`, view: view(i, popped) });
    }
    steps.push({ line: "return", note: `Return [${ans.join(", ")}]. Days left on the stack (${stack.join(", ")}) never get a warmer day. Each day is pushed and popped once: O(n).`, view: view() });
    return steps;
  },
});
