import heapq
class Solution(object):
    def isNStraightHand(self, hand, groupSize):
        if len(hand) % groupSize:  # the cards must split evenly  # @viz init
            return False  # @viz init
        count = {}  # card -> copies left  # @viz init
        for x in hand:  # @viz init
            count[x] = count.get(x, 0) + 1  # @viz init
        heap = list(count)  # the different cards; the smallest left is on top  # @viz init
        heapq.heapify(heap)  # @viz init
        while heap:  # @viz group
            start = heap[0]  # the smallest card left must start a group  # @viz group
            for x in range(start, start + groupSize):  # @viz take
                if count.get(x, 0) == 0:  # a missing card breaks the run  # @viz fail
                    return False  # @viz fail
                count[x] -= 1  # @viz take
                if count[x] == 0:  # x is used up  # @viz pop
                    if x != heap[0]:  # a smaller card is still left, and now it can never be in a group  # @viz fail
                        return False  # @viz fail
                    heapq.heappop(heap)  # @viz pop
        return True  # @viz return
