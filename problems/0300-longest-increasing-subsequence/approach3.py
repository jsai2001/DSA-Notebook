import bisect
class Solution(object):
    def lengthOfLIS(self, nums):
        tails = []  # tails[L] = the smallest last value of any increasing subsequence of length L + 1  # @viz init
        for x in nums:  # @viz each
            k = bisect.bisect_left(tails, x)  # the first tail >= x (tails is always sorted)  # @viz search
            if k == len(tails):  # x is bigger than every tail: it makes a longer subsequence  # @viz extend
                tails.append(x)  # @viz extend
            else:  # x is a smaller end for length k + 1: keep the smaller one  # @viz replace
                tails[k] = x  # @viz replace
        return len(tails)  # @viz return
