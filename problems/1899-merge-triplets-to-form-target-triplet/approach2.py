class Solution(object):
    def mergeTriplets(self, triplets, target):
        merged = [0, 0, 0]  # @viz init
        for t in triplets:  # @viz scan
            if t[0] <= target[0] and t[1] <= target[1] and t[2] <= target[2]:  # safe: it can't push any value past the target  # @viz merge
                merged = [max(merged[0], t[0]), max(merged[1], t[1]), max(merged[2], t[2])]  # @viz merge
        return merged == list(target)  # merging every safe triplet gets as close as possible  # @viz return
