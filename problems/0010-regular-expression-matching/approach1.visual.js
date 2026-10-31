// Plain recursion: match(i, j) tries every way to use each "x*". No memo, so calls can repeat.
DSAViz.register("0010-regular-expression-matching/approach1", {
  inputs: [
    { name: "s", type: "string", value: "aab", maxLength: 7 },
    { name: "p", type: "string", value: "c*a*b", maxLength: 7 },
  ],
  trace({ s, p }) {
    if (!/^[a-z]*$/.test(s)) throw new DSAViz.InputError("s can only use lowercase letters a–z.");
    if (!p.length) throw new DSAViz.InputError("p can't be empty.");
    if (!/^[a-z.*]+$/.test(p)) throw new DSAViz.InputError("p can only use lowercase letters, '.' and '*'.");
    for (let k = 0; k < p.length; k++) {
      if (p[k] === "*" && (k === 0 || p[k - 1] === "*")) {
        throw new DSAViz.InputError("Each '*' needs a letter or '.' right before it, like a* or .*");
      }
    }
    const LIMIT = 300;
    const m = s.length;
    const n = p.length;
    const stack = [];
    const steps = [];
    const seen = new Map(); // "i,j" -> how many times called
    let calls = 0;
    const strip = (str, k, name) => {
      const marks = { [str.length]: "ghost" };
      if (k !== undefined && k < str.length) marks[k] = "active";
      return { type: "array", label: name === "j" ? "p" : "s", values: [...str, "end"], marks, pointers: k === undefined ? {} : { [name]: k } };
    };
    const push = (step) => {
      if (steps.length >= LIMIT) {
        throw new DSAViz.InputError(
          `Without a memo this input needs over ${LIMIT} steps: the same (i, j) keeps being solved again. That blow-up is why Approach 2 saves answers. Try a shorter s or p here.`
        );
      }
      steps.push(step);
    };
    const view = (i, j, repeat) => {
      const pStrip = strip(p, j, "j");
      if (j !== undefined && j + 1 < n && p[j + 1] === "*") pStrip.marks[j + 1] = "window";
      return [
        strip(s, i, "i"),
        pStrip,
        { type: "array", label: "call stack: match(i, j), bottom → top", values: stack.slice(), wide: true, marks: stack.length ? { [stack.length - 1]: "active" } : {} },
        {
          type: "vars",
          items: [
            { name: "calls so far", value: calls },
            { name: "repeated calls", value: [...seen.values()].reduce((a, v) => a + v - 1, 0), mark: repeat ? "compare" : "" },
          ],
        },
      ];
    };

    push({
      line: "start",
      note: `match(i, j) asks: does s[i:] match p[j:]? Start with the whole of both: match(0, 0).`,
      view: view(),
    });

    function match(i, j) {
      calls++;
      const key = `${i},${j}`;
      const before = seen.get(key) || 0;
      seen.set(key, before + 1);
      stack.push(`(${i}, ${j})`);
      push({
        line: "call",
        note: `match(${i}, ${j}): does "${s.slice(i)}" match "${p.slice(j)}"?` + (before ? ` (Solved ${before} time${before === 1 ? "" : "s"} already: wasted work.)` : ""),
        view: view(i, j, before > 0),
      });
      let ans;
      let retLine;
      if (j === n) {
        ans = i === m;
        retLine = "end";
        push({
          line: "end",
          note: ans ? `The pattern is used up, and so is s: match.` : `The pattern is used up but "${s.slice(i)}" is left: no match.`,
          view: view(i, j),
        });
      } else {
        const first = i < m && (p[j] === s[i] || p[j] === ".");
        const why =
          i >= m
            ? `s is used up, so nothing can match '${p[j]}'`
            : first
              ? `'${p[j]}' matches s[${i}] = '${s[i]}'`
              : `'${p[j]}' doesn't match s[${i}] = '${s[i]}'`;
        if (j + 1 < n && p[j + 1] === "*") {
          retLine = "star";
          push({
            line: ["first", "star"],
            note: `${why}. "${p[j]}*" can repeat: first try it zero times, skipping to match(${i}, ${j + 2}).`,
            view: view(i, j),
          });
          ans = match(i, j + 2);
          if (!ans && first) {
            push({
              line: "star",
              note: `Zero didn't work. Use one '${p[j]}' for s[${i}] and stay on "${p[j]}*": match(${i + 1}, ${j}).`,
              view: view(i, j),
            });
            ans = match(i + 1, j);
          }
        } else {
          retLine = "single";
          push({
            line: ["first", "single"],
            note: first ? `${why}. Move both on: match(${i + 1}, ${j + 1}).` : `${why}, so this is a dead end.`,
            view: view(i, j),
          });
          ans = first && match(i + 1, j + 1);
        }
      }
      push({ line: retLine, note: `match(${i}, ${j}) returns ${ans}.`, view: view(i, j) });
      stack.pop();
      return ans;
    }

    const answer = match(0, 0);
    const repeats = [...seen.values()].reduce((a, v) => a + v - 1, 0);
    push({
      line: "start",
      note: `Return ${answer}. ${calls} calls, ${repeats} of them repeats of a question already answered. On long inputs that grows exponentially.`,
      view: view(),
    });
    return steps;
  },
});
