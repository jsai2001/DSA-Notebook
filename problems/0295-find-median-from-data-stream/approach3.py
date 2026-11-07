import heapq
class MedianFinder(object):
    def __init__(self):
        self.low = []  # the smaller half, as a max-heap (values stored negated)  # @viz init
        self.high = []  # the bigger half, as a min-heap  # @viz init
    def addNum(self, num):
        heapq.heappush(self.low, -num)  # go through low first...  # @viz add
        heapq.heappush(self.high, -heapq.heappop(self.low))  # ...so low's biggest moves up: every low <= every high  # @viz add
        if len(self.high) > len(self.low):  # keep low the same size as high, or one bigger  # @viz balance
            heapq.heappush(self.low, -heapq.heappop(self.high))  # @viz balance
    def findMedian(self):
        if len(self.low) > len(self.high):  # odd count: the middle is low's top  # @viz median
            return float(-self.low[0])  # @viz median
        return (-self.low[0] + self.high[0]) / 2.0  # even: the mean of the two tops  # @viz median
