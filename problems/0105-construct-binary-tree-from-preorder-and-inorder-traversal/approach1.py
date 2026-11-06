# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def buildTree(self, preorder, inorder):
        if not preorder:  # no values: no tree  # @viz empty
            return None  # @viz empty
        root = TreeNode(preorder[0])  # preorder starts with the root  # @viz root
        k = inorder.index(root.val)  # in inorder, everything before the root is its left subtree  # @viz find
        # The left subtree has k values: the next k of preorder, and the first k of inorder.
        root.left = self.buildTree(preorder[1:k + 1], inorder[:k])  # @viz left
        root.right = self.buildTree(preorder[k + 1:], inorder[k + 1:])  # @viz right
        return root  # @viz return
