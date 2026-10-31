# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def removeNthFromEnd(self, head, n):
        length = 0  # @viz count
        node = head  # @viz count
        while node:  # first pass: count the nodes  # @viz count
            length += 1  # @viz count
            node = node.next  # @viz count
        dummy = ListNode(0, head)  # in front of head, so removing head isn't a special case  # @viz dummy
        prev = dummy  # @viz dummy
        for _ in range(length - n):  # second pass: stop just before the target  # @viz walk
            prev = prev.next  # @viz walk
        prev.next = prev.next.next  # skip over the target  # @viz unlink
        return dummy.next  # @viz return
