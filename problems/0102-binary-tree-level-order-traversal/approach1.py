# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def levelOrder(self, root):
        result = []  # result[d] = the values at depth d, left to right  # @viz init
        def dfs(node, depth):  # @viz call
            if not node:  # @viz call
                return  # @viz call
            if depth == len(result):  # the first node seen at this depth  # @viz new
                result.append([])  # @viz new
            result[depth].append(node.val)  # left is visited before right, so each level fills left to right  # @viz add
            dfs(node.left, depth + 1)  # @viz recurse
            dfs(node.right, depth + 1)  # @viz recurse
        dfs(root, 0)  # @viz init
        return result  # @viz return
