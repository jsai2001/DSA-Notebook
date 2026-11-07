class Solution(object):
    def minInterval(self, intervals, queries):
        ans = []  # @viz init
        for q in queries:  # @viz query
            best = -1  # @viz query
            for l, r in intervals:  # check every interval  # @viz check
                if l <= q <= r and (best == -1 or r - l + 1 < best):  # contains q and is smaller  # @viz check
                    best = r - l + 1  # @viz check
            ans.append(best)  # @viz answer
        return ans  # @viz return
