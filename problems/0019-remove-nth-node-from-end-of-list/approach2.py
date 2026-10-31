# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def removeNthFromEnd(self, head, n):
        dummy = ListNode(0, head)  # @viz dummy
        stack = []  # @viz dummy
        node = dummy  # @viz push
        while node:  # push every node, dummy included  # @viz push
            stack.append(node)  # @viz push
            node = node.next  # @viz push
        for _ in range(n):  # the last n nodes come off; the n-th one is the target  # @viz pop
            stack.pop()  # @viz pop
        prev = stack[-1]  # now on top: the node just before the target  # @viz unlink
        prev.next = prev.next.next  # @viz unlink
        return dummy.next  # @viz return
