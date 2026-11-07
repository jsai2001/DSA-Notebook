class Solution(object):
    def mergeTriplets(self, triplets, target):
        target = tuple(target)  # @viz init
        seen = set()  # every triplet you can make by merging some of them  # @viz init
        for t in triplets:  # @viz add
            t = tuple(t)  # @viz add
            seen |= {tuple(map(max, s, t)) for s in seen} | {t}  # merge t into each one so far, or use t alone  # @viz add
            if target in seen:  # @viz found
                return True  # @viz found
        return False  # @viz return
