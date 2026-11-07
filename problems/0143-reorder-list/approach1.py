# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def reorderList(self, head):
        nodes = []  # @viz init
        while head:  # copy the nodes (not the values) into an array  # @viz copy
            nodes.append(head)  # @viz copy
            head = head.next  # @viz copy
        i, j = 0, len(nodes) - 1  # @viz link
        while i < j:  # take one from the front, then one from the back  # @viz link
            nodes[i].next = nodes[j]  # @viz link
            i += 1  # @viz link
            if i == j:  # odd length: they met in the middle  # @viz link
                break  # @viz link
            nodes[j].next = nodes[i]  # @viz link
            j -= 1  # @viz link
        nodes[i].next = None  # the new last node: cut the old link, or it loops  # @viz cut
