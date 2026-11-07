class MedianFinder(object):
    def __init__(self):
        self.nums = []  # every value, in arrival order  # @viz init
    def addNum(self, num):
        self.nums.append(num)  # O(1)  # @viz add
    def findMedian(self):
        s = sorted(self.nums)  # sort a copy every time  # @viz sort
        n = len(s)  # @viz sort
        return float(s[n // 2]) if n % 2 else (s[n // 2 - 1] + s[n // 2]) / 2.0  # the middle, or the mean of the two middles  # @viz median
