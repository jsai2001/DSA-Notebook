# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def isBalanced(self, root):
        def height(node):  # the number of nodes on the longest path down  # @viz height
            if not node:  # @viz height
                return 0  # @viz height
            return 1 + max(height(node.left), height(node.right))  # @viz height
        if not root:  # an empty tree is balanced  # @viz empty
            return True  # @viz empty
        if abs(height(root.left) - height(root.right)) > 1:  # this node's two sides differ too much  # @viz check
            return False  # @viz bad
        return self.isBalanced(root.left) and self.isBalanced(root.right)  # every node must pass, not just the root  # @viz recurse
