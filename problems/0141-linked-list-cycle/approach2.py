# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution(object):
    def hasCycle(self, head):
        if not head:  # @viz init
            return False  # @viz init
        anchor, runner = head, head.next  # @viz init
        power = steps = 1  # how far runner may go before anchor jumps up to it  # @viz init
        while runner:  # @viz step
            if runner is anchor:  # runner came back around: a cycle  # @viz found
                return True  # @viz found
            if steps == power:  # used up this round: move anchor to runner, double the round  # @viz jump
                anchor = runner  # @viz jump
                power *= 2  # @viz jump
                steps = 0  # @viz jump
            runner = runner.next  # @viz step
            steps += 1  # @viz step
        return False  # runner fell off the end: no cycle  # @viz none
