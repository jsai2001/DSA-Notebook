# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def addTwoNumbers(self, l1, l2):
        output = ListNode()
        prev = ListNode()
        head = output
        carry = 0

        while l1 is not None and l2 is not None:
            result = l1.val + l2.val + carry
            output.val = result % 10
            carry = result // 10
            prev = output
            output.next = ListNode()
            output = output.next
            l1 = l1.next
            l2 = l2.next

        while l1 is not None:
            result = l1.val + carry
            output.val = result % 10
            carry = result // 10
            prev = output
            output.next = ListNode()
            output = output.next
            l1 = l1.next

        while l2 is not None:
            result = l2.val + carry
            output.val = result % 10
            carry = result // 10
            prev = output
            output.next = ListNode()
            output = output.next
            l2 = l2.next

        if carry == 1:
            output.val = 1
            prev = output
            output.next = ListNode()

        prev.next = None  # cut off the extra trailing node
        return head
