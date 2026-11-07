# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def invertTree(self, root):
        if not root:  # @viz base
            return None  # @viz base
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)  # both sides are read before either is changed  # @viz swap
        return root  # @viz return
