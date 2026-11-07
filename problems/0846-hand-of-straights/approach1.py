class Solution(object):
    def isNStraightHand(self, hand, groupSize):
        if len(hand) % groupSize:  # the cards must split evenly  # @viz init
            return False  # @viz init
        hand = sorted(hand)  # @viz init
        while hand:  # @viz group
            start = hand[0]  # the smallest card left must start a group  # @viz group
            for x in range(start, start + groupSize):  # @viz take
                if x not in hand:  # a missing card breaks the run  # @viz fail
                    return False  # @viz fail
                hand.remove(x)  # removes the first x: O(n)  # @viz take
        return True  # @viz return
