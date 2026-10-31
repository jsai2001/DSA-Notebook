class Solution(object):
    def threeSum(self, nums):
        nums.sort()  # @viz init
        result = []  # @viz init
        n = len(nums)  # @viz init
        for i in range(n - 2):  # @viz fix
            if nums[i] > 0:  # the smallest of the three is positive: no sum can be 0  # @viz stop
                break  # @viz stop
            if i > 0 and nums[i] == nums[i - 1]:  # same first number as last time  # @viz skip
                continue  # @viz skip
            lo, hi = i + 1, n - 1  # @viz fix
            while lo < hi:  # @viz loop
                total = nums[i] + nums[lo] + nums[hi]  # @viz sum
                if total < 0:  # too small: a bigger middle number  # @viz less
                    lo += 1  # @viz less
                elif total > 0:  # too big: a smaller last number  # @viz more
                    hi -= 1  # @viz more
                else:
                    result.append([nums[i], nums[lo], nums[hi]])  # @viz found
                    lo += 1  # @viz found
                    hi -= 1  # @viz found
                    while lo < hi and nums[lo] == nums[lo - 1]:  # skip repeats of the middle number  # @viz dedupe
                        lo += 1  # @viz dedupe
        return result  # @viz return
