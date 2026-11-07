class Solution(object):
    def twoSum(self, numbers, target):
        n = len(numbers)  # @viz init
        for i in range(n):  # @viz pick
            need = target - numbers[i]  # @viz pick
            lo, hi = i + 1, n - 1  # search only AFTER i, so i isn't used twice  # @viz search
            while lo <= hi:  # @viz search
                mid = (lo + hi) // 2  # @viz search
                if numbers[mid] == need:  # @viz found
                    return [i + 1, mid + 1]  # @viz found
                if numbers[mid] < need:  # @viz search
                    lo = mid + 1  # @viz search
                else:  # @viz search
                    hi = mid - 1  # @viz search
