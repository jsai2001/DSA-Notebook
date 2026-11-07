import heapq
class Twitter(object):
    def __init__(self):
        self.time = 0  # @viz init
        self.tweets = {}  # user -> list of (time, tweetId), oldest first  # @viz init
        self.follows = {}  # user -> set of users they follow  # @viz init
    def postTweet(self, userId, tweetId):
        self.time += 1  # @viz post
        self.tweets.setdefault(userId, []).append((self.time, tweetId))  # @viz post
    def getNewsFeed(self, userId):
        heap = []  # each user's newest unread tweet: (-time, tweetId, user, index)  # @viz feed
        for u in self.follows.get(userId, set()) | {userId}:  # @viz feed
            t = self.tweets.get(u)  # @viz feed
            if t:  # @viz feed
                heap.append((-t[-1][0], t[-1][1], u, len(t) - 1))  # @viz feed
        heapq.heapify(heap)  # @viz feed
        feed = []  # @viz pop
        while heap and len(feed) < 10:  # @viz pop
            _, tweetId, u, i = heapq.heappop(heap)  # the newest of all the heads  # @viz pop
            feed.append(tweetId)  # @viz pop
            if i > 0:  # that user's next older tweet takes its place  # @viz next
                heapq.heappush(heap, (-self.tweets[u][i - 1][0], self.tweets[u][i - 1][1], u, i - 1))  # @viz next
        return feed  # @viz return
    def follow(self, followerId, followeeId):
        self.follows.setdefault(followerId, set()).add(followeeId)  # @viz follow
    def unfollow(self, followerId, followeeId):
        self.follows.get(followerId, set()).discard(followeeId)  # @viz unfollow
