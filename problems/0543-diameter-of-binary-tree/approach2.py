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
        self.best = 0  # longest path seen so far, in edges  # @viz init
        def height(node):  # returns nodes on the longest path down; updates best on the way  # @viz call
            if not node:  # @viz empty
                return 0  # @viz empty
            left = height(node.left)  # @viz left
            right = height(node.right)  # @viz right
            self.best = max(self.best, left + right)  # the path that bends here has left + right edges  # @viz best
            return 1 + max(left, right)  # node's height, for its parent  # @viz return
        height(root)  # @viz start
        return self.best  # @viz answer
