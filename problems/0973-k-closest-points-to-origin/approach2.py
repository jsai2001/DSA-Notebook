import heapq
class Solution(object):
    def kClosest(self, points, k):
        heap = []  # max-heap of the k closest so far, as (-distance, x, y)  # @viz init
        for x, y in points:  # @viz push
            heapq.heappush(heap, (-(x * x + y * y), x, y))  # @viz push
            if len(heap) > k:  # one too many: drop the farthest  # @viz pop
                heapq.heappop(heap)  # @viz pop
        return [[x, y] for _, x, y in heap]  # @viz return
