# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def removeNthFromEnd(self, head, n):
        dummy = ListNode(0, head)  # in front of head, so removing head isn't a special case  # @viz dummy
        fast = slow = dummy  # @viz dummy
        for _ in range(n + 1):  # fast goes n + 1 steps ahead: n nodes between them  # @viz gap
            fast = fast.next  # @viz gap
        while fast:  # move both until fast falls off the end  # @viz move
            fast = fast.next  # @viz move
            slow = slow.next  # @viz move
        slow.next = slow.next.next  # slow is just before the target: skip it  # @viz unlink
        return dummy.next  # @viz return
