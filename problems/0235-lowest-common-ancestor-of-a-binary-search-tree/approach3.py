# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Solution(object):
    def lowestCommonAncestor(self, root, p, q):
        node = root  # @viz init
        while True:  # @viz loop
            if p.val < node.val and q.val < node.val:  # both are smaller: both are in the left subtree  # @viz left
                node = node.left  # @viz left
            elif p.val > node.val and q.val > node.val:  # both bigger: both on the right  # @viz right
                node = node.right  # @viz right
            else:  # they split here (or one of them is this node)  # @viz found
                return node  # @viz found
