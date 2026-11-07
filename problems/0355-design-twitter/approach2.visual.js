// Tweets per user with a time stamp; a feed gathers each followed user's last 10 and sorts them.
(function () {
DSAViz.register("0355-design-twitter/approach2", {
  inputs: [{ name: "ops", label: "calls (comma-separated)", type: "string", value: "post 1 5, follow 1 2, post 2 6, post 3 7, post 1 8, feed 1, unfollow 1 2, feed 1", maxLength: 200, raw: true }],
  trace({ ops: text }) {
    const ops = parseOps(text);
    let time = 0;
    const tweets = new Map(), follows = new Map(), feeds = [];
    const uview = (marks = {}) => ({ type: "map", label: "tweets per user (time: tweet), oldest first", columns: ["user", "tweets"], entries: [...tweets.keys()].sort((a, b) => a - b).map((u) => [u, tweets.get(u).map(([t, id]) => `${t}: ${id}`).join(", ")]), marks });
    const steps = [{ line: "init", note: "A clock, each user's tweets, and who follows whom.", view: [uview(), followView(follows)] }];
    for (const [op, a, b] of ops) {
      if (op === "post") { time++; if (!tweets.has(a)) tweets.set(a, []); tweets.get(a).push([time, b]); steps.push({ line: "post", note: `postTweet(${a}, ${b}) at time ${time}.`, view: [uview({ [a]: "new" }), followView(follows)] }); continue; }
      if (op !== "feed") { const note = follower(follows, op, a, b); steps.push({ line: op, note, view: [uview(), followView(follows, a)] }); continue; }
      const who = [...new Set([...(follows.get(a) || []), a])].sort((x, y) => x - y);
      const all = who.flatMap((u) => (tweets.get(u) || []).slice(-10));
      steps.push({ line: "feed", note: `getNewsFeed(${a}): gather the last 10 tweets (at most) of users ${who.join(", ")}: ${all.length} in all.`, view: [uview(Object.fromEntries(who.filter((u) => tweets.has(u)).map((u) => [u, "compare"]))), { type: "array", label: "gathered (time: tweet)", values: all.length ? all.map(([t, id]) => `${t}: ${id}`) : ["—"], wide: true, marks: all.length ? {} : { 0: "ghost" } }] });
      all.sort((x, y) => y[0] - x[0]);
      const feed = all.slice(0, 10).map(([, id]) => id);
      feeds.push(feed);
      steps.push({ line: ["sort", "return"], note: `Sort them newest first and keep the first 10: [${feed.join(", ")}].`, view: [{ type: "array", label: "sorted, newest first", values: all.length ? all.map(([t, id]) => `${t}: ${id}`) : ["—"], wide: true, marks: all.length ? Object.fromEntries(feed.map((_, i) => [i, "match"])) : { 0: "ghost" }, cut: all.length > 10 ? 10 : undefined }] });
    }
    steps.push({ line: "return", note: `Return feeds: ${feeds.length ? showFeeds(feeds) : "none"}. A feed sorts up to 10 tweets per followed user: O(10F log(10F)).`, view: [uview(), followView(follows)] });
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
