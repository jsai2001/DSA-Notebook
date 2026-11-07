# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def reorderList(self, head):
        stack = []  # @viz init
        node = head  # @viz init
        while node:  # push every node; the top of the stack is the tail  # @viz push
            stack.append(node)  # @viz push
            node = node.next  # @viz push
        cur = head  # @viz insert
        for _ in range((len(stack) - 1) // 2):  # this many nodes move from the back  # @viz insert
            last = stack.pop()  # the current tail  # @viz insert
            last.next = cur.next  # slip it in right after cur  # @viz insert
            cur.next = last  # @viz insert
            cur = last.next  # @viz insert
        stack[-1].next = None  # the node on top is the new tail: cut its old link  # @viz cut
