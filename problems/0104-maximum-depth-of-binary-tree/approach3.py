# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def maxDepth(self, root):
        best = 0  # @viz init
        stack = [(root, 1)] if root else []  # (node, its depth): a stack instead of the call stack  # @viz init
        while stack:  # @viz loop
            node, depth = stack.pop()  # @viz pop
            best = max(best, depth)  # @viz best
            if node.right:  # @viz push
                stack.append((node.right, depth + 1))  # @viz push
            if node.left:  # @viz push
                stack.append((node.left, depth + 1))  # @viz push
        return best  # @viz return
