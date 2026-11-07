class Solution(object):
    def isNStraightHand(self, hand, groupSize):
        if len(hand) % groupSize:  # the cards must split evenly  # @viz init
            return False  # @viz init
        count = {}  # card -> copies left  # @viz init
        for x in hand:  # @viz init
            count[x] = count.get(x, 0) + 1  # @viz init
        for x in sorted(count):  # smallest card first  # @viz group
            c = count[x]  # every copy of x left must start its own group  # @viz group
            if c:  # @viz group
                for y in range(x, x + groupSize):  # start all c groups at once  # @viz take
                    if count.get(y, 0) < c:  # not enough y to go on  # @viz fail
                        return False  # @viz fail
                    count[y] -= c  # @viz take
        return True  # @viz return
