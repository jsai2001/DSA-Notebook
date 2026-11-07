// Tweets per user; a feed merges the users' lists with a heap of their newest unread tweets, popping 10 times at most.
(function () {
DSAViz.register("0355-design-twitter/approach3", {
  inputs: [{ name: "ops", label: "calls (comma-separated)", type: "string", value: "post 1 5, follow 1 2, post 2 6, post 3 7, post 1 8, feed 1, unfollow 1 2, feed 1", maxLength: 200, raw: true }],
  trace({ ops: text }) {
    const ops = parseOps(text);
    let time = 0;
    const tweets = new Map(), follows = new Map(), feeds = [];
    const uview = (marks = {}) => ({ type: "map", label: "tweets per user (time: tweet), oldest first", columns: ["user", "tweets"], entries: [...tweets.keys()].sort((a, b) => a - b).map((u) => [u, tweets.get(u).map(([t, id]) => `${t}: ${id}`).join(", ")]), marks });
    const steps = [{ line: "init", note: "A clock, each user's tweets, and who follows whom.", view: [uview(), followView(follows)] }];
    const heap = [];
    const less = (x, y) => x[0] > y[0]; // newer on top
    const up = () => { let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (!less(heap[i], heap[p])) break; [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } };
    const down = () => { let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < heap.length && less(heap[l], heap[m])) m = l; if (r < heap.length && less(heap[r], heap[m])) m = r; if (m === i) break; [heap[i], heap[m]] = [heap[m], heap[i]]; i = m; } };
    const hview = (marks = {}) => ({ type: "tree", label: "heap of each user's newest unread tweet id (newest on top)", values: heap.map(([, id]) => id), captions: Object.fromEntries(heap.map(([, , u], i) => [i, `user ${u}`])), marks });
    for (const [op, a, b] of ops) {
      if (op === "post") { time++; if (!tweets.has(a)) tweets.set(a, []); tweets.get(a).push([time, b]); steps.push({ line: "post", note: `postTweet(${a}, ${b}) at time ${time}.`, view: [uview({ [a]: "new" }), followView(follows)] }); continue; }
      if (op !== "feed") { const note = follower(follows, op, a, b); steps.push({ line: op, note, view: [uview(), followView(follows, a)] }); continue; }
      const who = [...new Set([...(follows.get(a) || []), a])].sort((x, y) => x - y);
      heap.length = 0;
      for (const u of who) { const t = tweets.get(u); if (t && t.length) { heap.push([t[t.length - 1][0], t[t.length - 1][1], u, t.length - 1]); up(); } }
      const feed = [];
      const fview = () => ({ type: "array", label: "feed", values: feed.length ? [...feed] : ["—"], marks: feed.length ? { [feed.length - 1]: "new" } : { 0: "ghost" } });
      steps.push({ line: "feed", note: `getNewsFeed(${a}): users ${who.join(", ")}. Put each one's newest tweet in the heap (${heap.length} in all).`, view: [uview(), hview(), fview()] });
      while (heap.length && feed.length < 10) {
        const [, id, u, i] = heap[0];
        feed.push(id);
        heap[0] = heap[heap.length - 1]; heap.pop(); down();
        let note = `Pop the newest head: tweet ${id} by user ${u}. Add it to the feed.`;
        const line = ["pop"];
        if (i > 0) { const [t2, id2] = tweets.get(u)[i - 1]; heap.push([t2, id2, u, i - 1]); up(); note += ` User ${u}'s next older tweet, ${id2}, takes its place.`; line.push("next"); }
        steps.push({ line, note, view: [uview({ [u]: "compare" }), hview(), fview()] });
      }
      feeds.push(feed);
      steps.push({ line: "return", note: `${heap.length ? "10 tweets: stop." : "The heap is empty: no more tweets."} Return [${feed.join(", ")}].`, view: [uview(), fview()] });
    }
    steps.push({ line: "return", note: `Return feeds: ${feeds.length ? showFeeds(feeds) : "none"}. A feed builds a heap of F heads and pops at most 10: O(F + 10 log F).`, view: [uview(), followView(follows)] });
    return steps;
  },
});
function parseOps(text) {
  const parts = text.split(",").map((p) => p.trim()).filter(Boolean);
  if (!parts.length) throw new DSAViz.InputError('Write calls like "post 1 5, follow 1 2, feed 1".');
  if (parts.length > 16) throw new DSAViz.InputError("At most 16 calls here (kept small so the steps stay readable).");
  const ids = new Set();
  return parts.map((p) => {
    const w = p.toLowerCase().split(/\s+/);
    const nums = w.slice(1).map(Number);
    const want = { post: 2, feed: 1, follow: 2, unfollow: 2 }[w[0]];
    if (want === undefined || nums.length !== want || nums.some((x) => !Number.isInteger(x))) throw new DSAViz.InputError(`"${p}": use post user tweet, feed user, follow a b, or unfollow a b.`);
    if (nums.slice(0, w[0] === "post" ? 1 : 2).some((u) => u < 1 || u > 9)) throw new DSAViz.InputError("User ids are 1 to 9 here.");
    if (w[0] === "post") {
      if (nums[1] < 0 || nums[1] > 10000) throw new DSAViz.InputError("Tweet ids are 0 to 10000.");
      if (ids.has(nums[1])) throw new DSAViz.InputError(`Tweet id ${nums[1]} is used twice. Each tweet id is unique.`);
      ids.add(nums[1]);
    }
    if ((w[0] === "follow" || w[0] === "unfollow") && nums[0] === nums[1]) throw new DSAViz.InputError("A user can't follow or unfollow themselves.");
    return [w[0], ...nums];
  });
}
const showFeeds = (feeds) => feeds.map((f) => `[${f.join(", ")}]`).join("; ");
const followView = (follows, mark) => ({ type: "map", label: "follows", columns: ["user", "follows"], entries: [...follows.keys()].sort((a, b) => a - b).map((u) => [u, [...follows.get(u)].sort((a, b) => a - b).join(", ") || "—"]), marks: mark ? { [mark]: "active" } : {} });
function follower(follows, op, a, b) {
  if (!follows.has(a)) follows.set(a, new Set());
  if (op === "follow") { follows.get(a).add(b); return `follow(${a}, ${b}): ${b}'s tweets now show in ${a}'s feed.`; }
  const had = follows.get(a).delete(b);
  return had ? `unfollow(${a}, ${b}).` : `unfollow(${a}, ${b}): ${a} didn't follow ${b}, so nothing changes (no error).`;
}
})();
