# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def maxDepth(self, root):
        if not root:  # no node: depth 0  # @viz empty
            return 0  # @viz empty
        left = self.maxDepth(root.left)  # @viz left
        right = self.maxDepth(root.right)  # @viz right
        return 1 + max(left, right)  # this node, plus the deeper side  # @viz return
