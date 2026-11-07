# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def invertTree(self, root):
        def mirror(node):  # a new tree: the mirror image of node's subtree  # @viz call
            if not node:  # @viz base
                return None  # @viz base
            copy = TreeNode(node.val)  # @viz copy
            copy.left = mirror(node.right)  # the left side of the copy is the mirrored right side  # @viz copy
            copy.right = mirror(node.left)  # @viz copy
            return copy  # @viz copy
        return mirror(root)  # the original tree isn't changed  # @viz return
