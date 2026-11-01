class Solution(object):
    def combinationSum(self, candidates, target):
        result, path = [], []  # @viz start
        def dfs(i, remaining):  # decide about candidates[i], with `remaining` still to reach  # @viz call
            if remaining == 0:  # path adds up to target  # @viz done
                result.append(path[:])  # @viz done
                return  # @viz done
            if i == len(candidates) or remaining < 0:  # no candidates left, or overshot  # @viz dead
                return  # @viz dead
            path.append(candidates[i])  # take candidates[i]; stay at i, so it can be taken again  # @viz take
            dfs(i, remaining - candidates[i])  # @viz take
            path.pop()  # undo the take  # @viz undo
            dfs(i + 1, remaining)  # skip it: candidates[i] is never used again on this branch  # @viz skip
        dfs(0, target)  # @viz start
        return result  # @viz return
