import heapq
class Solution(object):
    def maxSlidingWindow(self, nums, k):
        heap = []  # (-value, index): the biggest value is on top  # @viz init
        res = []  # @viz init
        for i, x in enumerate(nums):  # @viz push
            heapq.heappush(heap, (-x, i))  # @viz push
            if i >= k - 1:  # a full window ends at i  # @viz drop
                while heap[0][1] <= i - k:  # the top has slid out of the window: throw it away now  # @viz drop
                    heapq.heappop(heap)  # @viz drop
                res.append(-heap[0][0])  # @viz top
        return res  # @viz return
