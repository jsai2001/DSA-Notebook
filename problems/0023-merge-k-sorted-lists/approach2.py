# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def mergeKLists(self, lists):
        result = None  # @viz init
        for head in lists:  # @viz each
            result = self.mergeTwo(result, head)  # the answer so far absorbs one more list  # @viz merge
        return result  # @viz return

    def mergeTwo(self, a, b):  # Merge Two Sorted Lists (LeetCode 21)
        dummy = tail = ListNode()
        while a and b:
            if a.val <= b.val:
                tail.next, a = a, a.next
            else:
                tail.next, b = b, b.next
            tail = tail.next
        tail.next = a or b
        return dummy.next
