# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def addTwoNumbers(self, l1, l2):
        output = ListNode()  # @viz init
        prev = ListNode()  # @viz init
        head = output  # @viz init
        carry = 0  # @viz init

        while l1 is not None and l2 is not None:  # @viz while1
            result = l1.val + l2.val + carry  # @viz digit1
            output.val = result % 10  # @viz digit1
            carry = result // 10  # @viz digit1
            prev = output  # @viz grow1
            output.next = ListNode()  # @viz grow1
            output = output.next  # @viz grow1
            l1 = l1.next  # @viz grow1
            l2 = l2.next  # @viz grow1

        while l1 is not None:  # @viz while2
            result = l1.val + carry  # @viz digit2
            output.val = result % 10  # @viz digit2
            carry = result // 10  # @viz digit2
            prev = output  # @viz grow2
            output.next = ListNode()  # @viz grow2
            output = output.next  # @viz grow2
            l1 = l1.next  # @viz grow2

        while l2 is not None:  # @viz while3
            result = l2.val + carry  # @viz digit3
            output.val = result % 10  # @viz digit3
            carry = result // 10  # @viz digit3
            prev = output  # @viz grow3
            output.next = ListNode()  # @viz grow3
            output = output.next  # @viz grow3
            l2 = l2.next  # @viz grow3

        if carry == 1:  # @viz carry
            output.val = 1  # @viz carryval
            prev = output  # @viz carryval
            output.next = ListNode()  # @viz carryval

        prev.next = None  # cut off the extra trailing node  # @viz trim
        return head  # @viz return
