import sys
sys.setrecursionlimit(10000)  # one call per node: up to 5000 deep
# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def reverseList(self, head):
        if not head or not head.next:  # 0 or 1 node: already reversed  # @viz base
            return head  # @viz base
        new_head = self.reverseList(head.next)  # reverse everything after head  # @viz call
        head.next.next = head  # head's old next is now the tail: hang head after it  # @viz link
        head.next = None  # head is the new tail  # @viz link
        return new_head  # the old last node, passed all the way up  # @viz return
