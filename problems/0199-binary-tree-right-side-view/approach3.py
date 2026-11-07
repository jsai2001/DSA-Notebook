# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def rightSideView(self, root):
        res = []  # res[d] = the first value seen at depth d  # @viz init
        def dfs(node, depth):  # @viz call
            if not node:  # @viz call
                return  # @viz call
            if depth == len(res):  # first visit to this depth: right first, so it's the rightmost  # @viz first
                res.append(node.val)  # @viz first
            dfs(node.right, depth + 1)  # right before left  # @viz right
            dfs(node.left, depth + 1)  # @viz left
        dfs(root, 0)  # @viz init
        return res  # @viz return
