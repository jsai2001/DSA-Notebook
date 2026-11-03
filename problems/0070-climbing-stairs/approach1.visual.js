// Top-down: ways(k) = ways(k - 1) + ways(k - 2), each k worked out once and remembered.
DSAViz.register("0070-climbing-stairs/approach1", {
  inputs: [{ name: "n", type: "int", value: "5", min: 1, max: 10 }],
  trace({ n }) {
    const memo = Array(n + 1).fill("");
    const stack = [];
    const steps = [];
    let calls = 0;
    const view = (k, o = {}) => {
      const marks = {};
      memo.forEach((v, i) => v !== "" && (marks[i] = "visited"));
      stack.forEach((s) => (marks[s] = "window"));
      (o.from || []).forEach((i) => (marks[i] = "compare"));
      if (k !== undefined) marks[k] = o.mark || "active";
      if (o.final) marks[n] = "match";
      return [
        { type: "array", label: "ways(k) under each step k, filled in as calls return (outlined = waiting on the call stack)", values: memo.slice(), marks },
        { type: "array", label: "call stack (bottom → top)", values: stack.map((s) => `ways(${s})`), wide: true, marks: stack.length ? { [stack.length - 1]: "active" } : {} },
        { type: "vars", items: [{ name: "calls", value: calls }] },
      ];
    };
    steps.push({ line: ["init", "answer"], note: n <= 2 ? `Ask for ways(${n}). With ${n} step${n === 1 ? "" : "s"} it's a base case, answered directly.` : `Ask for ways(${n}). The last move onto step ${n} was either 1 step or 2 steps, so ways(${n}) = ways(${n - 1}) + ways(${n - 2}).`, view: view() });
    const ways = (k) => {
      calls++;
      stack.push(k);
      if (k <= 2) {
        memo[k] = k;
        steps.push({ line: ["call", "base"], note: k === 1 ? `ways(1) = 1: a single 1-step.` : `ways(2) = 2: 1 + 1, or one 2-step.`, view: view(k, { mark: "new" }) });
        stack.pop();
        return k;
      }
      if (memo[k] !== "") {
        steps.push({ line: ["call", "memo"], note: `ways(${k}) is already known: ${memo[k]}. No new calls.`, view: view(k, { mark: "match" }) });
        stack.pop();
        return memo[k];
      }
      steps.push({ line: ["call", "memo", "add"], note: `ways(${k}) isn't known yet: work out ways(${k - 1}) + ways(${k - 2}).`, view: view(k, { from: [k - 1, k - 2] }) });
      const a = ways(k - 1);
      const b = ways(k - 2);
      memo[k] = a + b;
      steps.push({ line: ["add", "memo"], note: `ways(${k}) = ${a} + ${b} = ${memo[k]}. Remember it.`, view: view(k, { mark: "new", from: [k - 1, k - 2] }) });
      stack.pop();
      return memo[k];
    };
    const answer = ways(n);
    steps.push({
      line: "answer",
      note: `${answer} way${answer === 1 ? "" : "s"} to climb ${n} step${n === 1 ? "" : "s"}. ${calls} call${calls === 1 ? "" : "s"}: each k is worked out once, so O(n).${n > 2 ? " Without the memo the same k's are worked out again and again, and the number of calls grows about 1.6× with every extra step." : ""}`,
      view: view(undefined, { final: true }),
    });
    return steps;
  },
});
