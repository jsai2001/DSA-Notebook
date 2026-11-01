class Solution(object):
    def combinationSum2(self, candidates, target):
        candidates = sorted(candidates)  # equal values sit next to each other  # @viz sort
        result, path = [], []  # @viz sort
        def backtrack(start, remaining):  # @viz call
            if remaining == 0:  # @viz done
                result.append(path[:])  # @viz done
                return  # @viz done
            for i in range(start, len(candidates)):  # @viz choose
                if i > start and candidates[i] == candidates[i - 1]:  # same value as the one just tried here  # @viz same
                    continue  # it would build the same combinations again  # @viz same
                if candidates[i] > remaining:  # this one and every later one are too big  # @viz prune
                    break  # @viz prune
                path.append(candidates[i])  # @viz choose
                backtrack(i + 1, remaining - candidates[i])  # i + 1: each number is used at most once  # @viz choose
                path.pop()  # @viz undo
        backtrack(0, target)  # @viz start
        return result  # @viz return
