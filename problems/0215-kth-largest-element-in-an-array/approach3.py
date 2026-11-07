import random
class Solution(object):
    def findKthLargest(self, nums, k):
        while True:  # @viz loop
            pivot = random.choice(nums)  # a random pivot: no input can be bad every time  # @viz pivot
            big = [x for x in nums if x > pivot]  # @viz split
            equal = nums.count(pivot)  # all copies of the pivot go together, so duplicates can't slow it down  # @viz split
            if k <= len(big):  # the answer is among the bigger values  # @viz left
                nums = big  # @viz left
            elif k <= len(big) + equal:  # the answer is the pivot itself  # @viz found
                return pivot  # @viz found
            else:  # it's among the smaller values  # @viz right
                k -= len(big) + equal  # skip the values above it  # @viz right
                nums = [x for x in nums if x < pivot]  # @viz right
