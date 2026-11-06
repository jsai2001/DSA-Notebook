# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def isSameTree(self, p, q):
        if not p and not q:  # both missing: the same (nothing)  # @viz both
            return True  # @viz both
        if not p or not q:  # only one is missing: different shapes  # @viz one
            return False  # @viz one
        if p.val != q.val:  # @viz val
            return False  # @viz val
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)  # @viz recurse
