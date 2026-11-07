import sys
sys.setrecursionlimit(20000)  # a BST of 10^4 nodes can be one long chain: 10^4 calls deep
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def kthSmallest(self, root, k):
        vals = []  # @viz init
        def inorder(node):  # left, node, right: a BST comes out sorted  # @viz visit
            if node:  # @viz visit
                inorder(node.left)  # @viz visit
                vals.append(node.val)  # @viz add
                inorder(node.right)  # @viz visit
        inorder(root)  # every value, smallest first  # @viz init
        return vals[k - 1]  # @viz return
