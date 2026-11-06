import bisect
class Solution(object):
    def lastStoneWeight(self, stones):
        stones = sorted(stones)  # sort once, then keep it sorted  # @viz init
        while len(stones) > 1:  # @viz loop
            y = stones.pop()  # heaviest  # @viz take
            x = stones.pop()  # second heaviest  # @viz take
            if y != x:  # @viz smash
                bisect.insort(stones, y - x)  # binary search for its place, then insert there  # @viz insert
        return stones[0] if stones else 0  # @viz return
