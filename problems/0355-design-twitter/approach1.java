import java.util.*;
class Twitter {
    private final List<int[]> tweets = new ArrayList<>(); // every {userId, tweetId}, oldest first // @viz init
    private final Map<Integer, Set<Integer>> follows = new HashMap<>(); // user -> users they follow // @viz init
    public Twitter() {} // @viz init
    public void postTweet(int userId, int tweetId) {
        tweets.add(new int[] {userId, tweetId}); // @viz post
    }
    public List<Integer> getNewsFeed(int userId) {
        Set<Integer> who = follows.getOrDefault(userId, Collections.emptySet()); // @viz feed
        List<Integer> feed = new ArrayList<>(); // @viz feed
        for (int i = tweets.size() - 1; i >= 0; i--) { // newest first, over everyone's tweets // @viz scan
            int[] t = tweets.get(i); // @viz scan
            if (t[0] == userId || who.contains(t[0])) { // @viz scan
                feed.add(t[1]); // @viz take
                if (feed.size() == 10) break; // @viz take
            }
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
