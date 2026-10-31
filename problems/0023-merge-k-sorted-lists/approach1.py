# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def mergeKLists(self, lists):
        nodes = []  # @viz collect
        for node in lists:  # @viz collect
            while node:  # @viz collect
                nodes.append(node)  # @viz collect
                node = node.next  # @viz collect
        nodes.sort(key=lambda node: node.val)  # @viz sort
        for a, b in zip(nodes, nodes[1:]):  # relink the same nodes in sorted order  # @viz link
            a.next = b  # @viz link
        if not nodes:  # no lists, or only empty ones  # @viz return
            return None  # @viz return
        nodes[-1].next = None  # @viz return
        return nodes[0]  # @viz return
