# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def reverseKGroup(self, head, k):
        dummy = ListNode(0, head)  # in front, so the first group isn't a special case  # @viz init
        before = dummy  # the node just before the next group  # @viz init
        while True:
            end = before  # @viz find
            for _ in range(k):  # walk k nodes: is there a whole group left?  # @viz find
                end = end.next  # @viz find
                if not end:  # fewer than k left: they stay as they are  # @viz short
                    return dummy.next  # @viz short
            first, after = before.next, end.next  # the group is first..end; after is the node past it  # @viz group
            prev, cur = after, first  # reverse the group; first will end up pointing to after  # @viz group
            while cur is not after:  # @viz flip
                nxt = cur.next  # @viz flip
                cur.next = prev  # @viz flip
                prev, cur = cur, nxt  # @viz flip
            before.next = end  # end is the group's new first node  # @viz connect
            before = first  # first is now its last node, just before the next group  # @viz connect
