# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def maxPathSum(self, root):
        def down(node):  # the best path that starts at node and only goes down (it may stop at node)  # @viz down
            if not node:  # @viz down
                return 0  # @viz down
            return node.val + max(0, down(node.left), down(node.right))  # @viz down
        best = [root.val]  # @viz init
        def visit(node):  # make every node the top of a path, one at a time  # @viz top
            if not node:  # @viz top
                return  # @viz top
            # The path bends at node: the best way down on each side, or nothing if that side is negative.
            here = node.val + max(0, down(node.left)) + max(0, down(node.right))  # @viz sum
            best[0] = max(best[0], here)  # @viz sum
            visit(node.left)  # @viz top
            visit(node.right)  # @viz top
        visit(root)  # @viz init
        return best[0]  # @viz return
