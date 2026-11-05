class Solution(object):
    def subsets(self, nums):
        result, path = [], []  # @viz init
        def backtrack(i):  # decide nums[i], nums[i+1], ...; path = what's taken so far  # @viz call
            if i == len(nums):  # every number decided: path is one subset  # @viz done
                result.append(path[:])  # a copy: path keeps changing  # @viz done
                return  # @viz done
            path.append(nums[i])  # take nums[i]  # @viz take
            backtrack(i + 1)  # @viz take
            path.pop()  # undo, then leave nums[i] out  # @viz skip
            backtrack(i + 1)  # @viz skip
        backtrack(0)  # @viz init
        return result  # @viz return
