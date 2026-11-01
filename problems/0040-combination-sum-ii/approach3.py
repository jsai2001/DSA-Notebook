from collections import Counter
class Solution(object):
    def combinationSum2(self, candidates, target):
        counts = sorted(Counter(candidates).items())  # (value, how many times it appears), smallest first  # @viz count
        result, path = [], []  # @viz count
        def backtrack(k, remaining):  # decide how many copies of the k-th distinct value to use  # @viz call
            if remaining == 0:  # @viz done
                result.append(path[:])  # @viz done
                return  # @viz done
            if k == len(counts) or counts[k][0] > remaining:  # no values left, or this and every later one too big  # @viz dead
                return  # @viz dead
            value, count = counts[k]  # @viz none
            most = min(count, remaining // value)  # can't use more copies than exist, or than fit  # @viz none
            backtrack(k + 1, remaining)  # use no copies of value  # @viz none
            for used in range(1, most + 1):  # then 1 copy, 2 copies, ... most copies  # @viz copies
                path.append(value)  # @viz copies
                backtrack(k + 1, remaining - used * value)  # @viz copies
            del path[len(path) - most:]  # take those copies off again  # @viz undo
        backtrack(0, target)  # @viz start
        return result  # @viz return
