// Two-ended BFS: grow from beginWord and from endWord, always the smaller side, until they meet.
(function () {
DSAViz.register("0127-word-ladder/approach3", {
  inputs: [
    { name: "beginWord", type: "string", value: "hit", maxLength: 5 },
    { name: "endWord", type: "string", value: "cog", maxLength: 5 },
    { name: "wordList", label: "wordList (comma-separated)", type: "string", value: "hot, dot, dog, lot, log, cog", maxLength: 70, raw: true },
  ],
  trace({ beginWord, endWord, wordList }) {
    const { b, e, list } = parseLadder(beginWord, endWord, wordList);
    const steps = [];
    const words = new Set(list);
    let front = new Set([b]);
    let back = new Set([e]);
    let frontFrom = "beginWord";
    let backFrom = "endWord";
    let count = 1;
    let tries = 0;
    const set = (s, label, marks = {}) => ({ type: "set", label, items: [...s], marks });
    const view = (o = {}) => [
      set(front, `front: growing now (from ${frontFrom})`, o.frontMarks || {}),
      set(back, `back: waiting (from ${backFrom})`, o.backMarks || {}),
      ...(o.grown ? [set(o.grown, "grown: front's next level", Object.fromEntries([...o.grown].map((w) => [w, o.fresh && o.fresh.includes(w) ? "new" : ""])))] : []),
      set(words, "words (unused)"),
      {
        type: "vars",
        items: [
          { name: "steps (words in the ladder)", value: count },
          { name: "one-letter changes tried", value: tries, mark: o.counted ? "new" : "" },
        ],
      },
    ];
    if (!words.has(e)) {
      steps.push({ line: "init", note: `endWord "${e}" isn't in wordList. Return 0 right away: otherwise the back side would start at a word that isn't allowed.`, view: view() });
      return steps;
    }
    words.delete(b);
    words.delete(e);
    steps.push({
      line: "init",
      note: `Search from both ends: front = {"${b}"}, back = {"${e}"}. A ladder of 1 word so far.`,
      view: view(),
    });
    while (front.size && back.size) {
      const swapped = front.size > back.size;
      if (swapped) {
        [front, back] = [back, front];
        [frontFrom, backFrom] = [backFrom, frontFrom];
        steps.push({
          line: ["loop", "swap"],
          note: `The back side is smaller (${front.size} vs ${back.size}): swap, so the next level is grown from the smaller side.`,
          view: view(),
        });
      }
      count++;
      const grown = new Set();
      steps.push({
        line: swapped ? "grow" : ["loop", "grow"],
        note: `steps = ${count}. Grow front (${front.size} word${front.size === 1 ? "" : "s"}, from ${frontFrom}) by one level.`,
        view: view({ grown }),
      });
      for (const word of front) {
        const fresh = [];
        let meet = null;
        outer: for (let i = 0; i < word.length; i++) {
          for (const c of "abcdefghijklmnopqrstuvwxyz") {
            tries++;
            const nxt = word.slice(0, i) + c + word.slice(i + 1);
            if (back.has(nxt)) {
              meet = nxt;
              break outer;
            }
            if (words.has(nxt)) {
              words.delete(nxt);
              grown.add(nxt);
              fresh.push(nxt);
            }
          }
        }
        if (meet) {
          steps.push({
            line: ["pop", "try", "meet"],
            note: `From "${word}": "${meet}" is in back, so the two searches meet. Return ${count}.`,
            view: view({ grown, fresh, frontMarks: { [word]: "active" }, backMarks: { [meet]: "match" }, counted: true }),
          });
          return steps;
        }
        steps.push({
          line: fresh.length ? ["pop", "try", "take"] : ["pop", "try"],
          note: `From "${word}": ${word.length} × 26 one-letter changes. ${
            fresh.length ? `${fresh.map((w) => `"${w}"`).join(", ")} ${fresh.length === 1 ? "is an unused word" : "are unused words"}: move ${fresh.length === 1 ? "it" : "them"} to grown.` : "No unused word, and nothing from back."
          }`,
          view: view({ grown, fresh, frontMarks: { [word]: "active" }, counted: true }),
        });
      }
      front = grown;
      steps.push({
        line: ["next", "loop"],
        note: front.size ? `front = grown: ${[...front].map((w) => `"${w}"`).join(", ")}.` : "grown is empty: this side can't go any further.",
        view: view(),
      });
    }
    steps.push({ line: "none", note: `One side ran out of words before the two met. Return 0.`, view: view() });
    return steps;
  },
});

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
