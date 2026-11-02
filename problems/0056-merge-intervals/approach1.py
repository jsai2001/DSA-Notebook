class Solution(object):
    def merge(self, intervals):
        merged = []  # disjoint intervals so far, in no particular order  # @viz init
        for start, end in intervals:  # @viz each
            keep = []  # the ones the new interval doesn't touch  # @viz each
            for s, e in merged:  # @viz check
                if s <= end and start <= e:  # they overlap (touching counts)  # @viz check
                    start, end = min(start, s), max(end, e)  # absorb it  # @viz absorb
                else:  # @viz check
                    keep.append([s, e])  # @viz check
            merged = keep + [[start, end]]  # @viz add
        return sorted(merged)  # in order of start, like the other approaches  # @viz return
