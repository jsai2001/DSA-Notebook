import heapq
class Solution(object):
    def lastStoneWeight(self, stones):
        # heapq is a min-heap, so store the weights as negatives: the smallest negative is the heaviest stone.
        heap = [-s for s in stones]  # @viz init
        heapq.heapify(heap)  # O(n)  # @viz init
        while len(heap) > 1:  # @viz loop
            y = -heapq.heappop(heap)  # heaviest  # @viz take
            x = -heapq.heappop(heap)  # second heaviest  # @viz take
            if y != x:  # equal stones both break; otherwise y - x goes back in  # @viz smash
                heapq.heappush(heap, -(y - x))  # @viz smash
        return -heap[0] if heap else 0  # @viz return
