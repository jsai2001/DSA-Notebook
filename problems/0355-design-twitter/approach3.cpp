#include <queue>
#include <tuple>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
class Twitter {
    int time = 0; // @viz init
    std::unordered_map<int, std::vector<std::pair<int, int>>> tweets; // user -> (time, tweetId), oldest first // @viz init
    std::unordered_map<int, std::unordered_set<int>> follows; // user -> users they follow // @viz init
public:
    Twitter() {} // @viz init
    void postTweet(int userId, int tweetId) {
        tweets[userId].push_back({++time, tweetId}); // @viz post
    }
    std::vector<int> getNewsFeed(int userId) {
        // each user's newest unread tweet: (time, user, index); the max-heap gives the newest
        std::priority_queue<std::tuple<int, int, int>> heap; // @viz feed
        auto add = [&](int u) { // @viz feed
            auto it = tweets.find(u); // @viz feed
            if (it != tweets.end() && !it->second.empty()) // @viz feed
                heap.push({it->second.back().first, u, (int)it->second.size() - 1}); // @viz feed
        };
        add(userId); // @viz feed
        for (int u : follows[userId]) if (u != userId) add(u); // @viz feed
        std::vector<int> feed; // @viz pop
        while (!heap.empty() && feed.size() < 10) { // @viz pop
            auto [t, u, i] = heap.top(); // the newest of all the heads // @viz pop
            heap.pop(); // @viz pop
            feed.push_back(tweets[u][i].second); // @viz pop
            if (i > 0) heap.push({tweets[u][i - 1].first, u, i - 1}); // that user's next older tweet takes its place // @viz next
        }
        return feed; // @viz return
    }
    void follow(int followerId, int followeeId) {
        follows[followerId].insert(followeeId); // @viz follow
    }
    void unfollow(int followerId, int followeeId) {
        follows[followerId].erase(followeeId); // @viz unfollow
    }
};
