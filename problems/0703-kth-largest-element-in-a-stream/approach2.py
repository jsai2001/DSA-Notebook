import bisect
class KthLargest(object):
    def __init__(self, k, nums):
        self.k = k  # @viz init
        self.nums = sorted(nums)  # kept sorted, smallest first  # @viz init
    def add(self, val):
        bisect.insort(self.nums, val)  # binary search for the spot, then shift the rest: O(n)  # @viz add
        return self.nums[-self.k]  # the k-th from the end  # @viz answer
