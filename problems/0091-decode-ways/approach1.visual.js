// Plain recursion: ways(i) tries s[i] alone and s[i..i+1] as the next letter, and adds up the ways for the rest.
DSAViz.register("0091-decode-ways/approach1", {
  inputs: [{ name: "s", type: "string", value: "1121", maxLength: 6 }],
  trace({ s }) {
    if (!/^[0-9]+$/.test(s)) throw new DSAViz.InputError("s must be 1 or more digits (0–9).");
    const n = s.length;
    const steps = [];
    const stack = []; // the calls in progress: their i
    const letters = []; // the letters picked along the current path
    const calls = Array(n + 1).fill(0); // how many times ways(i) has run
    let found = 0;
    const view = (i, o = {}) => {
      const marks = {};
      for (let k = 0; k < i && k < n; k++) marks[k] = "visited";
      if (o.take) for (let k = i; k < i + o.take; k++) marks[k] = "active";
      if (o.bad !== undefined) marks[o.bad] = "cut";
      return [
        { type: "array", label: "s (faded = already turned into letters)", values: [...s], marks, pointers: i < n ? { i } : {} },
        { type: "array", label: "letters so far", values: letters.slice(), marks: o.done ? Object.fromEntries(letters.map((_, k) => [k, "match"])) : {}, wide: true },
        { type: "array", label: "times ways(i) ran, for i = 0..n (above 1 = repeated work)", values: calls.slice(), marks: Object.fromEntries(calls.map((c, k) => [k, c > 1 ? "cut" : c ? "visited" : ""]).filter(([, m]) => m)), compact: true },
        { type: "vars", items: [{ name: "decodings found", value: found, mark: o.done ? "new" : "" }, { name: "call stack", value: stack.length ? stack.map((k) => `ways(${k})`).join(" → ") : "empty" }] },
      ];
    };
    const letter = (code) => `${code}=${String.fromCharCode(64 + Number(code))}`;
    steps.push({ line: "answer", note: `ways(i) counts the ways to decode s[i:]. Start with ways(0).`, view: view(0) });
    function ways(i) {
      calls[i]++;
      stack.push(i);
      if (i === n) {
        found++;
        steps.push({ line: ["call", "base"], note: `ways(${n}): nothing left, so this is one finished decoding: ${letters.join(" ")}. Return 1.`, view: view(i, { done: true }) });
        stack.pop();
        return 1;
      }
      if (s[i] === "0") {
        steps.push({ line: ["call", "zero"], note: `ways(${i}): s[${i}] is "0", and no letter starts with 0. Return 0.`, view: view(i, { bad: i }) });
        stack.pop();
        return 0;
      }
      steps.push({ line: ["call", "one"], note: `ways(${i})${calls[i] > 1 ? ` (run #${calls[i]}: the same question again)` : ""}: take "${s[i]}" alone as ${letter(s[i])}.`, view: view(i, { take: 1 }) });
      letters.push(letter(s[i]));
      let total = ways(i + 1);
      letters.pop();
      const two = s.slice(i, i + 2);
      if (i + 1 < n && Number(two) >= 10 && Number(two) <= 26) {
        steps.push({ line: "two", note: `Back in ways(${i}): "${two}" is also a letter, ${letter(two)}. Try it.`, view: view(i, { take: 2 }) });
        letters.push(letter(two));
        total += ways(i + 2);
        letters.pop();
      } else if (i + 1 < n) steps.push({ line: "two", note: `Back in ways(${i}): "${two}" ${two[0] === "0" ? "starts with 0" : "is over 26"}, not a letter.`, view: view(i, { bad: i + 1 }) });
      steps.push({ line: "sum", note: `ways(${i}) = ${total}.`, view: view(i) });
      stack.pop();
      return total;
    }
    const total = ways(0);
    const extra = calls.reduce((a, c) => a + Math.max(0, c - 1), 0);
    steps.push({ line: "answer", note: `Return ${total}.${extra ? ` ${extra} of the calls asked a question already answered: that repeated work is what grows exponentially.` : ""}`, view: view(n) });
    return steps;
  },
});
