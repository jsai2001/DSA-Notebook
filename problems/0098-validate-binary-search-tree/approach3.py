# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def isValidBST(self, root):
        def check(node, low, high):  # every value in this subtree must be strictly between low and high  # @viz call
            if not node:  # an empty subtree breaks no rule  # @viz empty
                return True  # @viz empty
            if not (low < node.val < high):  # @viz check
                return False  # @viz bad
            # Going left, this node's value becomes the new upper limit; going right, the new lower limit.
            return check(node.left, low, node.val) and check(node.right, node.val, high)  # @viz recurse
        return check(root, float("-inf"), float("inf"))  # no limits at the root  # @viz return
