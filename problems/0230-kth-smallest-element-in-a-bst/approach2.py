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
        self.left = k  # how many values are still to be counted  # @viz init
        self.ans = None  # @viz init
        def inorder(node):  # @viz visit
            if not node or self.ans is not None:  # nothing here, or already found: stop  # @viz stop
                return  # @viz stop
            inorder(node.left)  # @viz visit
            self.left -= 1  # this node is the next smallest  # @viz count
            if self.left == 0:  # @viz found
                self.ans = node.val  # @viz found
                return  # @viz found
            inorder(node.right)  # @viz visit
        inorder(root)  # @viz init
        return self.ans  # @viz return
