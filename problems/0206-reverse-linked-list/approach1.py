# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def reverseList(self, head):
        vals = []  # @viz copy
        node = head  # @viz copy
        while node:  # copy the values out, front to back  # @viz copy
            vals.append(node.val)  # @viz copy
            node = node.next  # @viz copy
        node = head  # @viz write
        while node:  # write them back, back to front  # @viz write
            node.val = vals.pop()  # @viz write
            node = node.next  # @viz write
        return head  # same nodes, values in reverse order  # @viz return
