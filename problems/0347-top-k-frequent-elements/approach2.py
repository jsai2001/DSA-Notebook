import heapq
class Solution(object):
    def topKFrequent(self, nums, k):
        count = {}  # value -> how many times it appears  # @viz count
        for x in nums:  # @viz count
            count[x] = count.get(x, 0) + 1  # @viz count
        heap = []  # min-heap of (count, value): the k most frequent so far  # @viz push
        for x, c in count.items():  # @viz push
            heapq.heappush(heap, (c, x))  # @viz push
            if len(heap) > k:  # one too many: drop the least frequent  # @viz pop
                heapq.heappop(heap)  # @viz pop
        return [x for c, x in heap]  # @viz return
