// The same table, but only the previous row is kept. The shorter text runs along the row.
DSAViz.register("1143-longest-common-subsequence/approach3", {
  inputs: [
    { name: "text1", type: "string", value: "abcde", maxLength: 7 },
    { name: "text2", type: "string", value: "ace", maxLength: 7 },
  ],
  trace({ text1: t1, text2: t2 }) {
    const text1 = t1, text2 = t2;
    if (!/^[a-z]+$/.test(text1) || !/^[a-z]+$/.test(text2)) throw new DSAViz.InputError("Both texts must be 1 to 7 lowercase letters.");
    const [a, b] = t2.length > t1.length ? [t2, t1] : [t1, t2];
    const n = b.length;
    let prev = Array(n + 1).fill(0);
    const steps = [];
    const view = (cur, j, mk) => [{ type: "grid", label: "two rows of the table (yellow = the cells used, green = new from a match, dark = new)", rows: ["prev", "cur"], cols: ["·", ...b], corner: "", cells: [prev.slice(), cur ? cur.concat(Array(n + 1 - cur.length).fill("")) : Array(n + 1).fill("")], marks: mk || {} }, { type: "vars", items: [{ name: "row letter", value: cur ? `'${cur.letter}'` : "-" }] }];
    steps.push({ line: "init", note: t2.length > t1.length ? `text2 is longer, so swap: rows run over "${a}", the row is "${b}" (${n + 1} cells).` : `The row runs over text2 "${b}" (${n + 1} cells). prev starts as all 0s.`, view: view() });
    for (const ch of a) {
      const cur = [0];
      cur.letter = ch;
      for (let j = 0; j < n; j++) {
        const same = ch === b[j];
        cur.push(same ? prev[j] + 1 : Math.max(prev[j + 1], cur[j]));
        steps.push({ line: ["row", "cell", "same", "diff"], note: same ? `'${ch}' = '${b[j]}': diagonal prev[${j}] + 1 = ${cur[j + 1]}.` : `'${ch}' ≠ '${b[j]}': max(up prev[${j + 1}] = ${prev[j + 1]}, left cur[${j}] = ${cur[j]}) = ${cur[j + 1]}.`, view: view(cur, j, same ? { [`0,${j}`]: "compare", [`1,${j + 1}`]: "match" } : { [`0,${j + 1}`]: "compare", [`1,${j}`]: "compare", [`1,${j + 1}`]: "active" }) });
      }
      prev = cur.slice();
    }
    steps.push({ line: "return", note: `Return ${prev[n]}. O(m·n) time, but only O(min(m, n)) space.`, view: view(null, 0, { [`0,${n}`]: "match" }) });
    return steps;
  },
});
