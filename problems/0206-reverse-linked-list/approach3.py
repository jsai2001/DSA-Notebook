# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def reverseList(self, head):
        prev, cur = None, head  # prev: the reversed part so far; cur: the rest  # @viz init
        while cur:  # @viz loop
            nxt = cur.next  # save the rest before cutting the link  # @viz save
            cur.next = prev  # turn this link around  # @viz flip
            prev, cur = cur, nxt  # step forward  # @viz step
        return prev  # the old last node  # @viz return
