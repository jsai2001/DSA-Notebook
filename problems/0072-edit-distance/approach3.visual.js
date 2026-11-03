// The table, one row at a time: before row[j] is overwritten it still holds the cell above; diag saves the one above-left.
DSAViz.register("0072-edit-distance/approach3", {
  inputs: [
    { name: "word1", type: "string", value: "horse", maxLength: 6 },
    { name: "word2", type: "string", value: "ros", maxLength: 6 },
  ],
  trace({ word1, word2 }) {
    for (const [name, w] of [["word1", word1], ["word2", word2]]) if (!/^[a-z]*$/.test(w)) throw new DSAViz.InputError(`${name} can only use lowercase letters a–z (or be empty: "").`);
    const swapped = word1.length < word2.length;
    const a = swapped ? word2 : word1;
    const b = swapped ? word1 : word2;
    const n = b.length;
    const row = [...Array(n + 1).keys()];
    const done = [row.slice()]; // the rows the code has already overwritten, kept here only for the picture
    let diag = null;
    let above = null;
    let i = 0;
    const steps = [];
    const cols = ['""', ...b.split("").map((c, j) => `${c} ${j + 1}`)];
    const view = (o = {}) => {
      const gm = {};
      done.forEach((r, k) => r.forEach((_, j) => (gm[`${k},${j}`] = "visited")));
      const rm = {};
      if (o.j !== undefined) {
        rm[o.j] = "new";
        if (o.j > 0) rm[o.j - 1] = "compare";
      }
      if (o.final) rm[n] = "match";
      return [
        { type: "grid", label: "rows already finished (the code doesn't keep these)", rows: done.map((_, k) => (k ? `${k} ${a[k - 1]}` : '""')), cols, cells: done.map((r) => r.slice()), marks: gm, corner: "" },
        { type: "array", label: i ? `row: the only array kept (becoming row ${i}, "${a.slice(0, i)}")` : "row: the only array kept (row 0)", values: row.slice(), marks: rm, pointers: o.j !== undefined ? { j: o.j } : {} },
        { type: "vars", items: [{ name: "diag (↖)", value: diag ?? "-" }, { name: "above (↑)", value: above ?? "-" }] },
      ];
    };
    steps.push({
      line: "init",
      note: `${swapped ? `word2 is longer, so swap them: the distance is the same both ways, and the row stays short. ` : ""}row starts as row 0 of the table: [${row.join(", ")}], building "${b}" from "" one insert at a time.`,
      view: view(),
    });
    for (i = 1; i <= a.length; i++) {
      diag = row[0];
      above = null;
      row[0] = i;
      steps.push({ line: "row", note: `Row ${i} ("${a.slice(0, i)}"). Save diag = old row[0] = ${diag}, then row[0] = ${i}: ${i} deletion${i === 1 ? " turns" : "s turn"} it into "".`, view: view({ j: 0 }) });
      for (let j = 1; j <= n; j++) {
        above = row[j];
        let note;
        if (a[i - 1] === b[j - 1]) {
          row[j] = diag;
          note = `"${a[i - 1]}" = "${b[j - 1]}": row[${j}] = diag = ${diag}.`;
        } else {
          row[j] = 1 + Math.min(diag, above, row[j - 1]);
          note = `"${a[i - 1]}" ≠ "${b[j - 1]}": row[${j}] = 1 + min(diag ${diag}, above ${above}, left ${row[j - 1]}) = ${row[j]}.`;
        }
        diag = above; // shown already updated, so the box matches the note
        steps.push({ line: "cell", note: `${note} Then diag = ${above}, the old row[${j}], for the next cell.`, view: view({ j }) });
      }
      done.push(row.slice());
    }
    steps.push({
      line: "answer",
      note: `Return row[${n}] = ${row[n]}. Same O(m·n) time as the full table, but only O(min(m, n)) space: one row of ${n + 1} number${n ? "s" : ""}.`,
      view: view({ final: true }),
    });
    return steps;
  },
});
