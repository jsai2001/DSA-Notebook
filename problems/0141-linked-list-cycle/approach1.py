# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution(object):
    def hasCycle(self, head):
        seen = set()  # the nodes themselves, not their values  # @viz init
        node = head  # @viz init
        while node:  # @viz walk
            if node in seen:  # back at a node we've passed: a cycle  # @viz found
                return True  # @viz found
            seen.add(node)  # @viz walk
            node = node.next  # @viz walk
        return False  # reached the end (None): no cycle  # @viz none
