// Long multiplication by hand: one row per digit of num2 (shifted), then add the rows as strings.
DSAViz.register("0043-multiply-strings/approach1", {
  inputs: [
    { name: "num1", type: "string", value: "123", maxLength: 4 },
    { name: "num2", type: "string", value: "456", maxLength: 4 },
  ],
  trace({ num1, num2 }) {
    for (const [name, s] of [["num1", num1], ["num2", num2]]) {
      if (!/^(0|[1-9]\d*)$/.test(s)) throw new DSAViz.InputError(`${name} must be a whole number without leading zeros, like 123.`);
    }
    const steps = [];
    const rows = [];
    let total = "0";
    const add = (a, b) => String(BigInt(a) + BigInt(b)); // the page shows the result; the code adds digit by digit
    const view = (k, opts = {}) => {
      const n2marks = {};
      if (k !== undefined) {
        for (let j = 0; j < num2.length; j++) if (num2.length - 1 - j < k) n2marks[j] = "visited";
        n2marks[num2.length - 1 - k] = "active";
      }
      return [
        { type: "array", label: "num1", values: [...num1] },
        { type: "array", label: "num2 (one digit at a time, from the right)", values: [...num2], marks: n2marks },
        { type: "array", label: "rows: num1 × digit, shifted", values: rows.slice(), wide: true, marks: opts.newRow ? { [rows.length - 1]: "new" } : {} },
        { type: "vars", items: [{ name: "total", value: total, mark: opts.added ? "new" : "" }] },
      ];
    };

    if (num1 === "0" || num2 === "0") {
      steps.push({ line: "zero", note: `One of them is 0, so return "0". Without this check, "0" × "52" would come out as "00": the shifted rows add zeros.`, view: view() });
      return steps;
    }
    steps.push({ line: "init", note: "Multiply the way you would on paper: num1 times each digit of num2, shifted one more place each time, and add the rows up.", view: view() });
    for (let k = 0; k < num2.length; k++) {
      const d = Number(num2[num2.length - 1 - k]);
      if (d === 0) {
        steps.push({ line: "digit", note: `Digit ${k + 1} from the right is 0: its row would be all zeros, so skip it.`, view: view(k) });
        continue;
      }
      const row = String(BigInt(num1) * BigInt(d)) + "0".repeat(k);
      rows.push(row);
      steps.push({
        line: ["digit", "row"],
        note: `Digit ${d} (${k ? `${k} place${k === 1 ? "" : "s"} from the right` : "the ones place"}): ${num1} × ${d} = ${String(BigInt(num1) * BigInt(d))}${k ? `, plus ${k} zero${k === 1 ? "" : "s"} for the shift: ${row}` : ""}.`,
        view: view(k, { newRow: true }),
      });
      const before = total;
      total = add(total, row);
      steps.push({ line: "add", note: `Add it to the total as strings, digit by digit with a carry: ${before} + ${row} = ${total}.`, view: view(k, { added: true }) });
    }
    steps.push({
      line: "return",
      note: `Return "${total}". Each row costs O(m) and each string addition O(m + n), for n rows: O(n · (m + n)), and every row is a new string.`,
      view: view(),
    });
    return steps;
  },
});
