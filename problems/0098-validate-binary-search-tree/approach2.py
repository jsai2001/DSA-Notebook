# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def isValidBST(self, root):
        prev = None  # the last value visited in order  # @viz init
        stack = []  # @viz init
        node = root  # @viz init
        while stack or node:  # in-order: left subtree, node, right subtree  # @viz loop
            while node:  # go as far left as possible  # @viz left
                stack.append(node)  # @viz left
                node = node.left  # @viz left
            node = stack.pop()  # the smallest value not visited yet  # @viz visit
            if prev is not None and node.val <= prev:  # in a BST the in-order values only go up  # @viz check
                return False  # @viz bad
            prev = node.val  # @viz visit
            node = node.right  # @viz right
        return True  # @viz return
