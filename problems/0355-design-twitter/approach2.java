import java.util.*;
class Twitter {
    private int time = 0; // @viz init
    private final Map<Integer, List<int[]>> tweets = new HashMap<>(); // user -> {time, tweetId}, oldest first // @viz init
    private final Map<Integer, Set<Integer>> follows = new HashMap<>(); // user -> users they follow // @viz init
    public Twitter() {} // @viz init
    public void postTweet(int userId, int tweetId) {
        tweets.computeIfAbsent(userId, k -> new ArrayList<>()).add(new int[] {++time, tweetId}); // @viz post
    }
    public List<Integer> getNewsFeed(int userId) {
        Set<Integer> who = new HashSet<>(follows.getOrDefault(userId, Collections.emptySet())); // @viz feed
        who.add(userId); // @viz feed
        List<int[]> all = new ArrayList<>(); // @viz feed
        for (int u : who) { // @viz feed
            List<int[]> t = tweets.getOrDefault(u, Collections.emptyList()); // @viz feed
            all.addAll(t.subList(Math.max(0, t.size() - 10), t.size())); // only a user's last 10 can make the feed // @viz feed
        }
        all.sort((a, b) -> b[0] - a[0]); // newest first // @viz sort
        List<Integer> feed = new ArrayList<>(); // @viz return
        for (int i = 0; i < all.size() && i < 10; i++) feed.add(all.get(i)[1]); // @viz return
        return feed; // @viz return
    }
    public void follow(int followerId, int followeeId) {
        follows.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId); // @viz follow
    }
    public void unfollow(int followerId, int followeeId) {
        Set<Integer> s = follows.get(followerId); // @viz unfollow
        if (s != null) s.remove(followeeId); // @viz unfollow
    }
}
