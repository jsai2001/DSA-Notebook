# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def addTwoNumbers(self, l1, l2):
        def to_int(node):
            digits = []
            while node:
                digits.append(str(node.val))
                node = node.next
            return int("".join(reversed(digits)))  # digits are stored ones-first

        total = str(to_int(l1) + to_int(l2))  # Python ints have no size limit
        dummy = tail = ListNode()
        for d in reversed(total):
            tail.next = ListNode(int(d))
            tail = tail.next
        return dummy.next
