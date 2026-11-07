# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Solution(object):
    def lowestCommonAncestor(self, root, p, q):
        parent = {root: None}  # each node's parent, found by walking the whole tree  # @viz walk
        stack = [root]  # @viz walk
        while stack:  # @viz walk
            node = stack.pop()  # @viz walk
            for child in (node.left, node.right):  # @viz walk
                if child:  # @viz walk
                    parent[child] = node  # @viz walk
                    stack.append(child)  # @viz walk
        ancestors = set()  # p and everything above it  # @viz up
        while p:  # @viz up
            ancestors.add(p)  # @viz up
            p = parent[p]  # @viz up
        while q not in ancestors:  # climb from q until the paths meet  # @viz meet
            q = parent[q]  # @viz meet
        return q  # @viz return
