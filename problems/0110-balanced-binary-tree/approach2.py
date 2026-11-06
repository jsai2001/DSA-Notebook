# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def isBalanced(self, root):
        def check(node):  # the height of this subtree, or -1 if it isn't balanced  # @viz call
            if not node:  # @viz empty
                return 0  # @viz empty
            left = check(node.left)  # @viz left
            if left == -1:  # a problem below: stop right away  # @viz left
                return -1  # @viz left
            right = check(node.right)  # @viz right
            if right == -1:  # @viz right
                return -1  # @viz right
            if abs(left - right) > 1:  # @viz bad
                return -1  # @viz bad
            return 1 + max(left, right)  # balanced: pass the height up  # @viz height
        return check(root) != -1  # @viz return
