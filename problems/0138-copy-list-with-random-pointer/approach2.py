# Definition for a Node.
# class Node:
#     def __init__(self, x, next=None, random=None):
#         self.val = int(x)
#         self.next = next
#         self.random = random
class Solution(object):
    def copyRandomList(self, head):
        copies = {}  # original -> copy  # @viz init

        def copy_of(node):  # get the copy, making it the first time it's needed
            if node is None:  # @viz get
                return None  # @viz get
            if node not in copies:  # @viz get
                copies[node] = Node(node.val)  # @viz get
            return copies[node]  # @viz get

        cur = head  # @viz init
        while cur:  # one pass  # @viz walk
            c = copy_of(cur)  # @viz walk
            c.next = copy_of(cur.next)  # may make the next copy early  # @viz link
            c.random = copy_of(cur.random)  # may make a copy far ahead, or reuse one behind  # @viz link
            cur = cur.next  # @viz walk
        return copy_of(head)  # @viz return
