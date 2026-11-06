# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def isValidBST(self, root):
        def all_values(node):  # every value in this subtree  # @viz collect
            if not node:  # @viz collect
                return []  # @viz collect
            return [node.val] + all_values(node.left) + all_values(node.right)  # @viz collect
        def check(node):  # @viz call
            if not node:  # @viz call
                return True  # @viz call
            # Every value on the left must be smaller, every value on the right bigger.
            if any(v >= node.val for v in all_values(node.left)):  # @viz left
                return False  # @viz left
            if any(v <= node.val for v in all_values(node.right)):  # @viz right
                return False  # @viz right
            return check(node.left) and check(node.right)  # @viz recurse
        return check(root)  # @viz return
