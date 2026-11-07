class Solution(object):
    def twoSum(self, numbers, target):
        n = len(numbers)  # @viz init
        for i in range(n):  # @viz pair
            for j in range(i + 1, n):  # every pair i < j  # @viz pair
                if numbers[i] + numbers[j] == target:  # @viz check
                    return [i + 1, j + 1]  # the answer is 1-indexed  # @viz found
