# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
import sys
class Solution(object):
    def isSubtree(self, root, subRoot):
        sys.setrecursionlimit(10000)  # a one-sided tree can be 2000 levels deep
        if not root:  # ran off the tree: nothing down here can match  # @viz empty
            return False  # @viz empty
        if self.same(root, subRoot):  # does the subtree that starts here match exactly?  # @viz try
            return True  # @viz found
        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)  # @viz down

    def same(self, a, b):  # @viz same
        if not a or not b:  # @viz same
            return a is b  # both empty: same; only one empty: different  # @viz same
        return a.val == b.val and self.same(a.left, b.left) and self.same(a.right, b.right)  # @viz same
