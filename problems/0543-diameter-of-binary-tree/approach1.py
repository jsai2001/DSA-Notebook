# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
import sys
class Solution(object):
    def diameterOfBinaryTree(self, root):
        sys.setrecursionlimit(50000)  # a one-sided tree can be 10^4 levels deep
        def height(node):  # nodes on the longest path down from node (0 for None)
            if not node:
                return 0
            return 1 + max(height(node.left), height(node.right))
        def diameter(node):  # @viz call
            if not node:  # @viz empty
                return 0  # @viz empty
            through = height(node.left) + height(node.right)  # edges on the longest path that bends at node  # @viz through
            return max(through, diameter(node.left), diameter(node.right))  # or it lies inside one subtree  # @viz best
        return diameter(root)  # @viz start
