// BFS, comparing the word just taken from the queue with every unused word in the list.
(function () {
DSAViz.register("0127-word-ladder/approach1", {
  inputs: [
    { name: "beginWord", type: "string", value: "hit", maxLength: 5 },
    { name: "endWord", type: "string", value: "cog", maxLength: 5 },
    { name: "wordList", label: "wordList (comma-separated)", type: "string", value: "hot, dot, dog, lot, log, cog", maxLength: 70, raw: true },
  ],
  trace({ beginWord, endWord, wordList }) {
    const { b, e, list } = parseLadder(beginWord, endWord, wordList);
    const steps = [];
    const used = new Set(); // list words already queued
    const queue = [];
    let count = 1;
    let compares = 0;
    const view = (o = {}) => {
      const marks = {};
      list.forEach((w, k) => {
        if (o.taken && o.taken.includes(w)) marks[k] = "new";
        else if (used.has(w)) marks[k] = "ghost";
        else if (o.checked && o.checked.includes(w)) marks[k] = "compare";
      });
      if (o.found) marks[list.indexOf(o.found)] = "match";
      return [
        { type: "array", label: "wordList (grey = used, yellow = compared now, new = one letter apart)", values: list, wide: true, marks },
        { type: "array", label: "queue (front → back)", values: [...queue], wide: true, marks: queue.length && o.front ? { 0: "active" } : {} },
        {
          type: "vars",
          items: [
            ...(o.word ? [{ name: "word", value: o.word }] : []),
            { name: "steps (words in the ladder)", value: count },
            { name: "letter-by-letter comparisons", value: compares, mark: o.counted ? "new" : "" },
          ],
        },
      ];
    };
    if (!list.includes(e)) {
      steps.push({ line: "init", note: `endWord "${e}" isn't in wordList, so no ladder can end there. Return 0.`, view: view() });
      return steps;
    }
    used.add(b);
    queue.push(b);
    steps.push({
      line: "init",
      note: `Keep a set of the words not used yet, and start the queue with "${b}". The ladder so far has 1 word.`,
      view: view({ front: true }),
    });
    let first = true;
    while (queue.length) {
      steps.push({
        line: first ? "level" : ["next", "level"],
        note: `${first ? "" : `steps = ${count}. `}Every word in the queue now ends a ladder of ${count} word${count === 1 ? "" : "s"}: ${queue.map((w) => `"${w}"`).join(", ")}.`,
        view: view({ front: true }),
      });
      first = false;
      for (let k = queue.length; k > 0; k--) {
        const word = queue.shift();
        if (word === e) {
          steps.push({ line: ["pop", "found"], note: `Take "${word}": it's endWord. Return ${count}.`, view: view({ word, found: word }) });
          return steps;
        }
        const unused = list.filter((w) => !used.has(w));
        compares += unused.length;
        const taken = unused.filter((w) => oneApart(word, w));
        taken.forEach((w) => {
          used.add(w);
          queue.push(w);
        });
        steps.push({
          line: taken.length ? ["pop", "found", "scan", "take"] : ["pop", "found", "scan"],
          note:
            `Take "${word}" and compare it with all ${unused.length} unused word${unused.length === 1 ? "" : "s"}. ` +
            (taken.length
              ? `${taken.map((w) => `"${w}"`).join(", ")} ${taken.length === 1 ? "differs" : "differ"} by one letter: queue ${taken.length === 1 ? "it" : "them"} and mark ${taken.length === 1 ? "it" : "them"} used.`
              : "None differ by exactly one letter."),
          view: view({ word, checked: unused, taken, counted: true }),
        });
      }
      count++;
    }
    steps.push({ line: "none", note: `The queue is empty and "${e}" was never reached. Return 0.`, view: view() });
    return steps;
  },
});

function oneApart(a, b) {
  let diff = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i] && ++diff > 1) return false;
  return diff === 1;
}

// Read and check the three inputs (the same check in each Word Ladder visualizer).
function parseLadder(beginWord, endWord, wordList) {
  const b = beginWord.trim();
  const e = endWord.trim();
  const list = wordList.split(",").map((w) => w.trim()).filter(Boolean);
  const word = /^[a-z]{1,5}$/;
  if (!word.test(b)) throw new DSAViz.InputError("beginWord: 1 to 5 lowercase letters, like hit.");
  if (!word.test(e)) throw new DSAViz.InputError("endWord: 1 to 5 lowercase letters, like cog.");
  if (e.length !== b.length) throw new DSAViz.InputError("endWord must have as many letters as beginWord.");
  if (b === e) throw new DSAViz.InputError("beginWord and endWord must be different.");
  if (!list.length) throw new DSAViz.InputError("Type the words separated by commas, like hot, dot, dog.");
  if (list.length > 10) throw new DSAViz.InputError("Up to 10 words here, so the steps stay readable.");
  const bad = list.find((w) => !/^[a-z]+$/.test(w) || w.length !== b.length);
  if (bad !== undefined) throw new DSAViz.InputError(`Every word needs ${b.length} lowercase letters, like beginWord ("${bad}" doesn't).`);
  if (new Set(list).size !== list.length) throw new DSAViz.InputError("Each word can appear only once.");
  return { b, e, list };
}
})();
