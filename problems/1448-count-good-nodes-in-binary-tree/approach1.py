# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
import sys


class Solution(object):
    def goodNodes(self, root):
        sys.setrecursionlimit(200000)  # a one-sided tree can be 10^5 levels deep

        def dfs(node, best):  # best = largest value from the root down to node's parent  # @viz call
            if not node:  # @viz empty
                return 0  # @viz empty
            count = 1 if node.val >= best else 0  # good: nothing above it is bigger  # @viz check
            best = max(best, node.val)  # @viz update
            count += dfs(node.left, best)  # @viz left
            count += dfs(node.right, best)  # @viz right
            return count  # @viz done

        return dfs(root, root.val)  # @viz start
