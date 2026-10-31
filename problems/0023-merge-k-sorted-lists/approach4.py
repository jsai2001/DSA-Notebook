# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def mergeKLists(self, lists):
        if not lists:  # k = 0: nothing to merge  # @viz empty
            return None  # @viz empty
        step = 1  # lists[i] and lists[i + step] are the pairs to merge this round  # @viz init
        while step < len(lists):  # @viz round
            for i in range(0, len(lists) - step, 2 * step):  # @viz pair
                lists[i] = self.mergeTwo(lists[i], lists[i + step])  # @viz pair
            step *= 2  # half as many lists, each about twice as long  # @viz double
        return lists[0]  # @viz return

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
