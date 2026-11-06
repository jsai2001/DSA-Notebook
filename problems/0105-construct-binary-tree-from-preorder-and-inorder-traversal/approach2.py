# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def buildTree(self, preorder, inorder):
        where = {v: i for i, v in enumerate(inorder)}  # value -> its index in inorder: O(1) lookups  # @viz init
        self.next = 0  # the next unused value of preorder  # @viz init
        def build(lo, hi):  # build the subtree made of inorder[lo..hi]  # @viz call
            if lo > hi:  # no values here: no subtree  # @viz empty
                return None  # @viz empty
            root = TreeNode(preorder[self.next])  # preorder gives the roots in the order they're needed  # @viz root
            self.next += 1  # @viz root
            k = where[root.val]  # @viz find
            root.left = build(lo, k - 1)  # left first: preorder lists the whole left subtree before the right  # @viz left
            root.right = build(k + 1, hi)  # @viz right
            return root  # @viz return
        return build(0, len(inorder) - 1)  # @viz init
