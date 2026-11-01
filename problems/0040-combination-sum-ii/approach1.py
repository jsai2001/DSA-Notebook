class Solution(object):
    def combinationSum2(self, candidates, target):
        candidates = sorted(candidates)  # sorted, so equal combinations become equal tuples  # @viz sort
        found, path = set(), []  # a set throws away combinations it has already seen  # @viz sort
        def dfs(i, remaining):  # decide about candidates[i]  # @viz call
            if remaining == 0:  # @viz done
                found.add(tuple(path))  # @viz done
                return  # @viz done
            if i == len(candidates) or remaining < 0:  # no candidates left, or overshot  # @viz dead
                return  # @viz dead
            path.append(candidates[i])  # take it (once), then move on  # @viz take
            dfs(i + 1, remaining - candidates[i])  # @viz take
            path.pop()  # @viz undo
            dfs(i + 1, remaining)  # skip it  # @viz skip
        dfs(0, target)  # @viz start
        return [list(combo) for combo in found]  # @viz return
