# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def reverseKGroup(self, head, k):
        node = head  # @viz check
        for _ in range(k):  # is there a whole group of k nodes?  # @viz check
            if not node:  # fewer than k left: they stay as they are  # @viz short
                return head  # @viz short
            node = node.next  # @viz check
        # node is now the first node after this group
        prev = self.reverseKGroup(node, k)  # handle the rest first; this group will point to its answer  # @viz recurse
        cur = head  # @viz flip
        while cur is not node:  # reverse this group onto the handled rest  # @viz flip
            nxt = cur.next  # @viz flip
            cur.next = prev  # @viz flip
            prev, cur = cur, nxt  # @viz flip
        return prev  # the group's old last node is now its first  # @viz return
