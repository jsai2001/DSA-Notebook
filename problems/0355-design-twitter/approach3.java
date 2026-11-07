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
        // each user's newest unread tweet: {time, user, index}; newest on top
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[0] - a[0]); // @viz feed
        Set<Integer> who = new HashSet<>(follows.getOrDefault(userId, Collections.emptySet())); // @viz feed
        who.add(userId); // @viz feed
        for (int u : who) { // @viz feed
            List<int[]> t = tweets.get(u); // @viz feed
            if (t != null && !t.isEmpty()) heap.add(new int[] {t.get(t.size() - 1)[0], u, t.size() - 1}); // @viz feed
        }
        List<Integer> feed = new ArrayList<>(); // @viz pop
        while (!heap.isEmpty() && feed.size() < 10) { // @viz pop
            int[] top = heap.poll(); // the newest of all the heads // @viz pop
            List<int[]> t = tweets.get(top[1]); // @viz pop
            feed.add(t.get(top[2])[1]); // @viz pop
            if (top[2] > 0) heap.add(new int[] {t.get(top[2] - 1)[0], top[1], top[2] - 1}); // that user's next older tweet takes its place // @viz next
        }
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
