# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Solution(object):
    def lowestCommonAncestor(self, root, p, q):
        def path(target):  # the BST search path from the root down to target  # @viz path
            out, node = [], root  # @viz path
            while node is not target:  # @viz path
                out.append(node)  # @viz path
                node = node.left if target.val < node.val else node.right  # smaller: go left; bigger: go right  # @viz path
            out.append(node)  # @viz path
            return out  # @viz path
        a, b = path(p), path(q)  # @viz both
        lca = root  # @viz compare
        for x, y in zip(a, b):  # the two paths share a beginning  # @viz compare
            if x is not y:  # they split here  # @viz compare
                break  # @viz compare
            lca = x  # the deepest shared node so far  # @viz compare
        return lca  # @viz return
