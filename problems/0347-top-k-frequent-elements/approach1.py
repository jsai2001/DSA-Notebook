class Solution(object):
    def topKFrequent(self, nums, k):
        count = {}  # value -> how many times it appears  # @viz count
        for x in nums:  # @viz count
            count[x] = count.get(x, 0) + 1  # @viz count
        order = sorted(count, key=lambda x: -count[x])  # most frequent first  # @viz sort
        return order[:k]  # @viz return
