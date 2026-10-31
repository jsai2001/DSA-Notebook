# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def reverseKGroup(self, head, k):
        nodes = []  # @viz collect
        while head:  # @viz collect
            nodes.append(head)  # @viz collect
            head = head.next  # @viz collect
        for start in range(0, len(nodes) - k + 1, k):  # every full group; a shorter tail is skipped  # @viz group
            nodes[start:start + k] = nodes[start:start + k][::-1]  # reverse the group's order in the array  # @viz reverse
        for a, b in zip(nodes, nodes[1:]):  # relink the same nodes in the new order  # @viz link
            a.next = b  # @viz link
        nodes[-1].next = None  # @viz return
        return nodes[0]  # @viz return
