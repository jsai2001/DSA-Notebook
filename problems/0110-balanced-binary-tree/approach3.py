# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def isBalanced(self, root):
        height = {None: 0}  # node -> height of its subtree, filled in children first  # @viz init
        stack = [(root, False)] if root else []  # (node, are its children done?)  # @viz init
        while stack:  # @viz loop
            node, children_done = stack.pop()  # @viz loop
            if not children_done:  # first visit: come back after both children  # @viz push
                stack.append((node, True))  # @viz push
                if node.right:  # @viz push
                    stack.append((node.right, False))  # @viz push
                if node.left:  # @viz push
                    stack.append((node.left, False))  # @viz push
                continue  # @viz push
            left, right = height[node.left], height[node.right]  # second visit: both heights are known  # @viz visit
            if abs(left - right) > 1:  # @viz bad
                return False  # @viz bad
            height[node] = 1 + max(left, right)  # @viz visit
        return True  # @viz return
