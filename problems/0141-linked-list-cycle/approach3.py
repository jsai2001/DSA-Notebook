# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution(object):
    def hasCycle(self, head):
        slow = fast = head  # @viz init
        while fast and fast.next:  # fast needs two nodes ahead to take its step  # @viz loop
            slow = slow.next  # one step  # @viz move
            fast = fast.next.next  # two steps  # @viz move
            if slow is fast:  # in a cycle, fast gains one node per step and catches slow  # @viz found
                return True  # @viz found
        return False  # fast reached the end: no cycle  # @viz none
