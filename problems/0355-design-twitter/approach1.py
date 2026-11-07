class Twitter(object):
    def __init__(self):
        self.tweets = []  # every (userId, tweetId), oldest first  # @viz init
        self.follows = {}  # user -> set of users they follow  # @viz init
    def postTweet(self, userId, tweetId):
        self.tweets.append((userId, tweetId))  # @viz post
    def getNewsFeed(self, userId):
        who = self.follows.get(userId, set()) | {userId}  # @viz feed
        feed = []  # @viz feed
        for i in range(len(self.tweets) - 1, -1, -1):  # newest first, over everyone's tweets  # @viz scan
            if self.tweets[i][0] in who:  # @viz scan
                feed.append(self.tweets[i][1])  # @viz take
                if len(feed) == 10:  # @viz take
                    break  # @viz take
        return feed  # @viz return
    def follow(self, followerId, followeeId):
        self.follows.setdefault(followerId, set()).add(followeeId)  # @viz follow
    def unfollow(self, followerId, followeeId):
        self.follows.get(followerId, set()).discard(followeeId)  # @viz unfollow
