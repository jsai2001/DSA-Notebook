// BFS that tries every one-letter change of a word and looks it up in a set of unused words.
(function () {
DSAViz.register("0127-word-ladder/approach2", {
  inputs: [
    { name: "beginWord", type: "string", value: "hit", maxLength: 5 },
    { name: "endWord", type: "string", value: "cog", maxLength: 5 },
    { name: "wordList", label: "wordList (comma-separated)", type: "string", value: "hot, dot, dog, lot, log, cog", maxLength: 70, raw: true },
  ],
  trace({ beginWord, endWord, wordList }) {
    const { b, e, list } = parseLadder(beginWord, endWord, wordList);
    const steps = [];
    const words = new Set(list);
    const queue = [];
    let count = 1;
    let tries = 0;
    const view = (o = {}) => [
      { type: "set", label: "words (unused; a word leaves the set when it's queued)", items: [...words], marks: Object.fromEntries((o.hits || []).map((w) => [w, o.found === w ? "match" : "new"])) },
      { type: "array", label: "queue (front → back)", values: [...queue], wide: true, marks: o.front && queue.length ? { 0: "active" } : {} },
      {
        type: "vars",
        items: [
          ...(o.word ? [{ name: "word", value: o.word }] : []),
          ...(o.pattern ? [{ name: "changing", value: o.pattern }] : []),
          { name: "steps (words in the ladder)", value: count },
          { name: "one-letter changes tried", value: tries, mark: o.counted ? "new" : "" },
        ],
      },
    ];
    if (!words.has(e)) {
      steps.push({ line: "init", note: `endWord "${e}" isn't in wordList, so no ladder can end there. Return 0.`, view: view() });
      return steps;
    }
    words.delete(b);
    queue.push(b);
    steps.push({
      line: "init",
      note: `Put wordList in a set, so checking "is this a word?" is O(1). Start the queue with "${b}": a ladder of 1 word.`,
      view: view({ front: true }),
    });
    while (queue.length) {
      count++;
      steps.push({
        line: "level",
        note: `steps = ${count}: any word found from ${queue.map((w) => `"${w}"`).join(", ")} ends a ladder of ${count} words.`,
        view: view({ front: true }),
      });
      for (let k = queue.length; k > 0; k--) {
        const word = queue.shift();
        steps.push({ line: "pop", note: `Take "${word}". Try changing each of its ${word.length} letters to a…z.`, view: view({ word }) });
        for (let i = 0; i < word.length; i++) {
          const pattern = word.slice(0, i) + "*" + word.slice(i + 1);
          const hits = [];
          let found = null;
          for (const c of "abcdefghijklmnopqrstuvwxyz") {
            tries++;
            const nxt = word.slice(0, i) + c + word.slice(i + 1);
            if (!words.has(nxt)) continue;
            hits.push(nxt);
            if (nxt === e) {
              found = nxt;
              break;
            }
          }
          if (found) {
            steps.push({
              line: ["try", "hit", "found"],
              note: `${pattern}: "${found}" is in the set and it's endWord. Return ${count}.`,
              view: view({ word, pattern, hits, found, counted: true }),
            });
            return steps;
          }
          hits.forEach((w) => {
            words.delete(w);
            queue.push(w);
          });
          steps.push({
            line: hits.length ? ["try", "hit", "take"] : ["try", "hit"],
            note: hits.length
              ? `${pattern}: 26 tries, ${hits.map((w) => `"${w}"`).join(", ")} ${hits.length === 1 ? "is a word" : "are words"} not used yet. Queue ${hits.length === 1 ? "it" : "them"} and remove ${hits.length === 1 ? "it" : "them"} from the set.`
              : `${pattern}: 26 tries, no unused word.`,
            view: view({ word, pattern, hits, counted: true }),
          });
        }
      }
    }
    steps.push({ line: "none", note: `The queue is empty and "${e}" was never reached. Return 0.`, view: view() });
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
