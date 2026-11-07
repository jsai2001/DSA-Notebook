#include <algorithm>
#include <functional>
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
        std::vector<std::pair<int, int>> all; // @viz feed
        auto add = [&](int u) { // only a user's last 10 can make the feed // @viz feed
            auto it = tweets.find(u); // @viz feed
            if (it == tweets.end()) return; // @viz feed
            auto& t = it->second; // @viz feed
            all.insert(all.end(), t.end() - std::min<size_t>(10, t.size()), t.end()); // @viz feed
        };
        add(userId); // @viz feed
        for (int u : follows[userId]) if (u != userId) add(u); // @viz feed
        std::sort(all.begin(), all.end(), std::greater<>()); // newest first // @viz sort
        std::vector<int> feed; // @viz return
        for (size_t i = 0; i < all.size() && i < 10; ++i) feed.push_back(all[i].second); // @viz return
        return feed; // @viz return
    }
    void follow(int followerId, int followeeId) {
        follows[followerId].insert(followeeId); // @viz follow
    }
    void unfollow(int followerId, int followeeId) {
        follows[followerId].erase(followeeId); // @viz unfollow
    }
};
