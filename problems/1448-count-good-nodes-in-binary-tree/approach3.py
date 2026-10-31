# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
from collections import deque


class Solution(object):
    def goodNodes(self, root):
        count = 0  # @viz init
        queue = deque([(root, root.val)])  # (node, largest value above it)  # @viz init
        while queue:  # @viz loop
            node, best = queue.popleft()  # @viz pop
            if node.val >= best:  # @viz check
                count += 1  # @viz good
            best = max(best, node.val)  # @viz update
            for child in (node.left, node.right):  # @viz push
                if child:  # @viz push
                    queue.append((child, best))  # @viz push
        return count  # @viz return
