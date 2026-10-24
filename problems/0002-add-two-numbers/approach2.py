# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def addTwoNumbers(self, l1, l2):
        dummy = ListNode()  # @viz init
        tail = dummy  # @viz init
        carry = 0  # @viz init

        while l1 or l2 or carry:  # @viz loop
            total = carry  # @viz add
            if l1:  # @viz add
                total += l1.val  # @viz add
                l1 = l1.next  # @viz add
            if l2:  # @viz add
                total += l2.val  # @viz add
                l2 = l2.next  # @viz add

            tail.next = ListNode(total % 10)  # @viz append
            tail = tail.next  # @viz append
            carry = total // 10  # @viz append

        return dummy.next  # @viz return
