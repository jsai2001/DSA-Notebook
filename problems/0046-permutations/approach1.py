class Solution(object):
    def permute(self, nums):
        result, path = [], []  # @viz init
        used = [False] * len(nums)  # used[i]: nums[i] is already in path  # @viz init
        def backtrack():  # @viz call
            if len(path) == len(nums):  # every number placed  # @viz done
                result.append(path[:])  # a copy: path keeps changing  # @viz done
                return  # @viz done
            for i in range(len(nums)):  # try each number not used yet in the next position  # @viz choose
                if used[i]:  # @viz skip
                    continue  # @viz skip
                used[i] = True  # @viz choose
                path.append(nums[i])  # @viz choose
                backtrack()  # @viz choose
                path.pop()  # undo, so the next number can take this position  # @viz undo
                used[i] = False  # @viz undo
        backtrack()  # @viz init
        return result  # @viz return
