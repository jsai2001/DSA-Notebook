class KthLargest(object):
    def __init__(self, k, nums):
        self.k = k  # @viz init
        self.nums = list(nums)  # every value seen  # @viz init
    def add(self, val):
        self.nums.append(val)  # @viz add
        self.nums.sort(reverse=True)  # sort everything again, biggest first  # @viz sort
        return self.nums[self.k - 1]  # @viz answer
