class Solution(object):
    def combinationSum(self, candidates, target):
        candidates = sorted(candidates)  # sorted, so the loop can stop at the first one that's too big  # @viz sort
        result, path = [], []  # @viz sort
        def backtrack(start, remaining):  # @viz call
            if remaining == 0:  # path adds up to target  # @viz done
                result.append(path[:])  # @viz done
                return  # @viz done
            for i in range(start, len(candidates)):  # only from start on: each combination is built in one order  # @viz choose
                if candidates[i] > remaining:  # this one and every later one are too big  # @viz prune
                    break  # @viz prune
                path.append(candidates[i])  # @viz choose
                backtrack(i, remaining - candidates[i])  # i, not i + 1: the same number can be used again  # @viz choose
                path.pop()  # undo, so the next candidate can take its place  # @viz undo
        backtrack(0, target)  # @viz start
        return result  # @viz return
