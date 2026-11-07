// One list of every tweet; a feed scans it from the newest end, keeping tweets by the user or anyone they follow.
(function () {
DSAViz.register("0355-design-twitter/approach1", {
  inputs: [{ name: "ops", label: "calls (comma-separated)", type: "string", value: "post 1 5, follow 1 2, post 2 6, post 3 7, feed 1, unfollow 1 2, feed 1", maxLength: 200, raw: true }],
  trace({ ops: text }) {
    const ops = parseOps(text);
    const tweets = [], follows = new Map(), feeds = [];
    const tview = (marks = {}, pointers = {}) => ({ type: "array", label: "all tweets, oldest first (user: tweet)", values: tweets.length ? tweets.map(([u, t]) => `${u}: ${t}`) : ["—"], wide: true, marks: tweets.length ? marks : { 0: "ghost" }, pointers });
    const steps = [{ line: "init", note: "One list for every tweet, plus who follows whom.", view: [tview(), followView(follows)] }];
    for (const [op, a, b] of ops) {
      if (op === "post") { tweets.push([a, b]); steps.push({ line: "post", note: `postTweet(${a}, ${b}): add it to the end.`, view: [tview({ [tweets.length - 1]: "new" }), followView(follows)] }); continue; }
      if (op !== "feed") { const note = follower(follows, op, a, b); steps.push({ line: op, note, view: [tview(), followView(follows, a)] }); continue; }
      const who = new Set([...(follows.get(a) || []), a]);
      const feed = [], marks = {};
      let i = tweets.length - 1;
      for (; i >= 0; i--) {
        if (who.has(tweets[i][0])) { feed.push(tweets[i][1]); marks[i] = "match"; if (feed.length === 10) break; } else marks[i] = "visited";
      }
      feeds.push(feed);
      const looked = tweets.length - Math.max(i, 0);
      steps.push({ line: ["feed", "scan", "take", "return"], note: `getNewsFeed(${a}): users ${[...who].sort((x, y) => x - y).join(", ")}. Scan from the newest: looked at ${looked} tweet${looked === 1 ? "" : "s"}, kept ${feed.length} (green). Return [${feed.join(", ")}].`, view: [tview(marks), followView(follows, a), { type: "array", label: "feed", values: feed.length ? feed : ["—"], marks: feed.length ? {} : { 0: "ghost" } }] });
    }
    steps.push({ line: "return", note: `Return feeds: ${feeds.length ? showFeeds(feeds) : "none"}. Posting is O(1), but a feed may scan every tweet anyone has posted: O(T).`, view: [tview(), followView(follows)] });
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
