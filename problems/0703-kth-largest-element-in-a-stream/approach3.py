import heapq
class KthLargest(object):
    def __init__(self, k, nums):
        self.k = k  # @viz init
        self.heap = []  # min-heap of the k biggest values; its top is the k-th biggest  # @viz init
        for x in nums:  # @viz init
            self.add(x)  # @viz init
    def add(self, val):
        heapq.heappush(self.heap, val)  # @viz add
        if len(self.heap) > self.k:  # one too many: the smallest can't be in the top k  # @viz pop
            heapq.heappop(self.heap)  # @viz pop
        return self.heap[0]  # @viz answer
