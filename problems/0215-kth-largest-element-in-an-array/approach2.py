import heapq
class Solution(object):
    def findKthLargest(self, nums, k):
        heap = []  # min-heap of the k biggest values seen so far  # @viz init
        for x in nums:  # @viz push
            heapq.heappush(heap, x)  # @viz push
            if len(heap) > k:  # one too many: drop the smallest  # @viz pop
                heapq.heappop(heap)  # @viz pop
        return heap[0]  # the smallest of the k biggest is the k-th biggest  # @viz return
