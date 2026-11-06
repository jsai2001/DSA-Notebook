class Solution(object):
    def lastStoneWeight(self, stones):
        stones = stones[:]  # work on a copy  # @viz init
        while len(stones) > 1:  # @viz loop
            stones.sort()  # the two heaviest are now at the end  # @viz sort
            y = stones.pop()  # heaviest  # @viz take
            x = stones.pop()  # second heaviest  # @viz take
            if y != x:  # equal stones both break; otherwise y - x is left  # @viz smash
                stones.append(y - x)  # @viz smash
        return stones[0] if stones else 0  # @viz return
