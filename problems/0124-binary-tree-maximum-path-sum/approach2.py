# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def maxPathSum(self, root):
        best = [root.val]  # at least one node is on every path  # @viz init
        def gain(node):  # the best path that starts at node and goes down one side  # @viz call
            if not node:  # @viz call
                return 0  # @viz call
            left = max(0, gain(node.left))  # a negative side only hurts: leave it out  # @viz left
            right = max(0, gain(node.right))  # @viz right
            best[0] = max(best[0], node.val + left + right)  # a path that bends here can use both sides  # @viz bend
            return node.val + max(left, right)  # going up, a path can only continue down one side  # @viz up
        gain(root)  # @viz init
        return best[0]  # @viz return
