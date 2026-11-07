#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
class Twitter {
    std::vector<std::pair<int, int>> tweets; // every (userId, tweetId), oldest first // @viz init
    std::unordered_map<int, std::unordered_set<int>> follows; // user -> users they follow // @viz init
public:
    Twitter() {} // @viz init
    void postTweet(int userId, int tweetId) {
        tweets.push_back({userId, tweetId}); // @viz post
    }
    std::vector<int> getNewsFeed(int userId) {
        auto& who = follows[userId]; // @viz feed
        std::vector<int> feed; // @viz feed
        for (int i = (int)tweets.size() - 1; i >= 0; --i) { // newest first, over everyone's tweets // @viz scan
            if (tweets[i].first == userId || who.count(tweets[i].first)) { // @viz scan
                feed.push_back(tweets[i].second); // @viz take
                if (feed.size() == 10) break; // @viz take
            }
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
