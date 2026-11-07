import bisect
class MedianFinder(object):
    def __init__(self):
        self.nums = []  # kept sorted  # @viz init
    def addNum(self, num):
        bisect.insort(self.nums, num)  # binary search for the spot, then shift: O(n)  # @viz add
    def findMedian(self):
        s, n = self.nums, len(self.nums)  # already sorted: just read the middle  # @viz median
        return float(s[n // 2]) if n % 2 else (s[n // 2 - 1] + s[n // 2]) / 2.0  # @viz median
