# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def reorderList(self, head):
        slow = fast = head  # step 1: find the middle  # @viz middle
        while fast.next and fast.next.next:  # @viz middle
            slow = slow.next  # @viz middle
            fast = fast.next.next  # @viz middle
        second = slow.next  # step 2: cut after the middle and reverse the second half  # @viz reverse
        slow.next = None  # @viz reverse
        prev = None  # @viz reverse
        while second:  # @viz reverse
            second.next, prev, second = prev, second, second.next  # @viz reverse
        first, second = head, prev  # step 3: merge, one from each half  # @viz merge
        while second:  # the second half is never longer than the first  # @viz merge
            n1, n2 = first.next, second.next  # @viz merge
            first.next = second  # @viz merge
            second.next = n1  # @viz merge
            first, second = n1, n2  # @viz merge
