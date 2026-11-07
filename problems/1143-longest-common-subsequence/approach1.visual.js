// lcs(i, j) = LCS of text1[i:] and text2[j:]: same letter → 1 + lcs(i+1, j+1), else the better of skipping one letter.
DSAViz.register("1143-longest-common-subsequence/approach1", {
  inputs: [
    { name: "text1", type: "string", value: "abcde", maxLength: 7 },
    { name: "text2", type: "string", value: "ace", maxLength: 7 },
  ],
  trace({ text1, text2 }) {
    if (!/^[a-z]+$/.test(text1) || !/^[a-z]+$/.test(text2)) throw new DSAViz.InputError("Both texts must be 1 to 7 lowercase letters.");
    const m = text1.length, n = text2.length;
    const memo = Array.from({ length: m }, () => Array(n).fill(null));
    const steps = [];
    let calls = 0;
    const MAX = 120;
    let hidden = 0;
    const view = (i, j, mark) => [{ type: "grid", label: "memo[i][j] = lcs(i, j), the LCS of text1[i:] and text2[j:]: rows are text1, columns text2 (blank = not known yet; dark = a different letter, yellow = new, green = known)", rows: [...text1], cols: [...text2], corner: "", cells: memo.map((r) => r.map((v) => (v === null ? "" : v))), marks: i !== undefined && i < m && j < n ? { [`${i},${j}`]: mark } : {} }, { type: "vars", items: [{ name: "calls", value: calls }] }];
    const push = (s) => (steps.length < MAX ? steps.push(s) : hidden++);
    push({ line: "init", note: "lcs(i, j) is remembered the first time it's worked out.", view: view() });
    const lcs = (i, j) => {
      calls++;
      if (i === m || j === n) return 0;
      if (memo[i][j] !== null) { push({ line: "call", note: `lcs(${i}, ${j}) is already known: ${memo[i][j]}.`, view: view(i, j, "match") }); return memo[i][j]; }
      let r;
      if (text1[i] === text2[j]) {
        r = 1 + lcs(i + 1, j + 1);
        memo[i][j] = r;
        push({ line: ["call", "same"], note: `text1[${i}] = text2[${j}] = '${text1[i]}': take it. lcs(${i}, ${j}) = 1 + lcs(${i + 1}, ${j + 1}) = ${r}.`, view: view(i, j, "new") });
      } else {
        const a = lcs(i + 1, j), b = lcs(i, j + 1);
        r = Math.max(a, b);
        memo[i][j] = r;
        push({ line: ["call", "diff"], note: `'${text1[i]}' ≠ '${text2[j]}': drop one. max(lcs(${i + 1}, ${j}) = ${a}, lcs(${i}, ${j + 1}) = ${b}) = ${r}.`, view: view(i, j, "compare") });
      }
      return r;
    };
    const ans = lcs(0, 0);
    steps.push({ line: "return", note: `Return ${ans}. ${calls} calls${hidden ? ` (${hidden} steps not shown)` : ""}; each (i, j) is worked out once: O(m·n).`, view: view(0, 0, "match") });
    return steps;
  },
});
