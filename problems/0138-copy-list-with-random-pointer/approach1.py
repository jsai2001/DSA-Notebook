# Definition for a Node.
# class Node:
#     def __init__(self, x, next=None, random=None):
#         self.val = int(x)
#         self.next = next
#         self.random = random
class Solution(object):
    def copyRandomList(self, head):
        copies = {None: None}  # original -> copy; None maps to None  # @viz init
        cur = head  # @viz init
        while cur:  # pass 1: one copy per node, not linked yet  # @viz make
            copies[cur] = Node(cur.val)  # @viz make
            cur = cur.next  # @viz make
        cur = head  # @viz link
        while cur:  # pass 2: link the copies the same way as the originals  # @viz link
            copies[cur].next = copies[cur.next]  # @viz link
            copies[cur].random = copies[cur.random]  # @viz link
            cur = cur.next  # @viz link
        return copies[head]  # @viz return
