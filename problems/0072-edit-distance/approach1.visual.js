// Top-down: dist(i, j) turns word1[i:] into word2[j:]; each (i, j) is worked out once and remembered.
DSAViz.register("0072-edit-distance/approach1", {
  inputs: [
    { name: "word1", type: "string", value: "abc", maxLength: 4 },
    { name: "word2", type: "string", value: "yabd", maxLength: 4 },
  ],
  trace({ word1, word2 }) {
    for (const [name, w] of [["word1", word1], ["word2", word2]]) if (!/^[a-z]*$/.test(w)) throw new DSAViz.InputError(`${name} can only use lowercase letters a–z (or be empty: "").`);
    const m = word1.length;
    const n = word2.length;
    // Grid shows every (i, j), including the "used up" edges i = m and j = n.
    const cells = Array.from({ length: m + 1 }, () => Array(n + 1).fill(""));
    const stack = [];
    const steps = [];
    let calls = 0;
    const rows = [...word1.split("").map((c, i) => `${i} ${c}`), `${m} end`];
    const cols = [...word2.split("").map((c, j) => `${c} ${j}`), `end ${n}`];
    const view = (o = {}) => {
      const marks = {};
      for (let i = 0; i <= m; i++) for (let j = 0; j <= n; j++) if (cells[i][j] !== "") marks[`${i},${j}`] = "visited";
      stack.forEach(([i, j]) => (marks[`${i},${j}`] = "window"));
      (o.from || []).forEach(([i, j]) => (marks[`${i},${j}`] = "compare"));
      if (o.at) marks[`${o.at[0]},${o.at[1]}`] = o.mark || "active";
      if (o.final) marks["0,0"] = "match";
      return [
        { type: "grid", label: "dist(i, j): edits to turn word1[i:] into word2[j:] (outlined = waiting on the call stack)", rows, cols, cells: cells.map((r) => r.slice()), marks, corner: "" },
        { type: "array", label: "call stack (bottom → top)", values: stack.map(([i, j]) => `dist(${i},${j})`), wide: true, marks: stack.length ? { [stack.length - 1]: "active" } : {} },
        { type: "vars", items: [{ name: "calls", value: calls }] },
      ];
    };
    steps.push({ line: ["init", "answer"], note: `Ask for dist(0, 0): all of "${word1}" into all of "${word2}". Each call looks at the first letter left in each word.`, view: view() });
    const dist = (i, j) => {
      calls++;
      stack.push([i, j]);
      let r;
      if (i === m || j === n) {
        r = i === m ? n - j : m - i;
        cells[i][j] = r;
        steps.push({
          line: ["call", "edge"],
          note: i === m && j === n ? `dist(${i}, ${j}): both words used up. 0 edits.` : i === m ? `dist(${i}, ${j}): word1 is used up. Insert the ${r} letter${r === 1 ? "" : "s"} left in word2: ${r}.` : `dist(${i}, ${j}): word2 is used up. Delete the ${r} letter${r === 1 ? "" : "s"} left in word1: ${r}.`,
          view: view({ at: [i, j], mark: "new" }),
        });
      } else if (cells[i][j] !== "") {
        r = cells[i][j];
        steps.push({ line: ["call", "memo"], note: `dist(${i}, ${j}) is already known: ${r}. No new calls.`, view: view({ at: [i, j], mark: "match" }) });
      } else if (word1[i] === word2[j]) {
        steps.push({ line: ["call", "memo", "same"], note: `"${word1[i]}" = "${word2[j]}": keep it for free. dist(${i}, ${j}) = dist(${i + 1}, ${j + 1}).`, view: view({ at: [i, j], from: [[i + 1, j + 1]] }) });
        r = dist(i + 1, j + 1);
        cells[i][j] = r;
        steps.push({ line: ["same", "memo"], note: `dist(${i}, ${j}) = ${r}. Remember it.`, view: view({ at: [i, j], mark: "new", from: [[i + 1, j + 1]] }) });
      } else {
        const from = [[i + 1, j + 1], [i + 1, j], [i, j + 1]];
        steps.push({ line: ["call", "memo", "edit"], note: `"${word1[i]}" ≠ "${word2[j]}": try replace (↘), delete ${word1[i]} (↓), insert ${word2[j]} (→), and keep the cheapest.`, view: view({ at: [i, j], from }) });
        const rep = dist(i + 1, j + 1);
        const del = dist(i + 1, j);
        const ins = dist(i, j + 1);
        r = 1 + Math.min(rep, del, ins);
        cells[i][j] = r;
        steps.push({ line: ["edit", "memo"], note: `dist(${i}, ${j}) = 1 + min(${rep}, ${del}, ${ins}) = ${r}. Remember it.`, view: view({ at: [i, j], mark: "new", from }) });
      }
      stack.pop();
      return r;
    };
    const answer = dist(0, 0);
    steps.push({
      line: "answer",
      note: `Return dist(0, 0) = ${answer}. ${calls} call${calls === 1 ? "" : "s"}: each (i, j) is worked out once and reused, so O(m·n). Without the memo the same pairs are redone again and again.`,
      view: view({ final: true }),
    });
    return steps;
  },
});
