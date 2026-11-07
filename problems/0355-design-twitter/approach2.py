class Twitter(object):
    def __init__(self):
        self.time = 0  # @viz init
        self.tweets = {}  # user -> list of (time, tweetId), oldest first  # @viz init
        self.follows = {}  # user -> set of users they follow  # @viz init
    def postTweet(self, userId, tweetId):
        self.time += 1  # @viz post
        self.tweets.setdefault(userId, []).append((self.time, tweetId))  # @viz post
    def getNewsFeed(self, userId):
        all_tweets = []  # @viz feed
        for u in self.follows.get(userId, set()) | {userId}:  # @viz feed
            all_tweets += self.tweets.get(u, [])[-10:]  # only a user's last 10 can make the feed  # @viz feed
        all_tweets.sort(reverse=True)  # newest first  # @viz sort
        return [t for _, t in all_tweets[:10]]  # @viz return
    def follow(self, followerId, followeeId):
        self.follows.setdefault(followerId, set()).add(followeeId)  # @viz follow
    def unfollow(self, followerId, followeeId):
        self.follows.get(followerId, set()).discard(followeeId)  # @viz unfollow
