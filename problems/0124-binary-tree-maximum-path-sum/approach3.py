# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def maxPathSum(self, root):
        best = root.val  # @viz init
        gain = {None: 0}  # node -> best path starting at it and going down; filled children first  # @viz init
        stack = [(root, False)]  # (node, are its children done?)  # @viz init
        while stack:  # @viz loop
            node, children_done = stack.pop()  # @viz loop
            if not children_done:  # first visit: come back after both children  # @viz push
                stack.append((node, True))  # @viz push
                for child in (node.right, node.left):  # @viz push
                    if child:  # @viz push
                        stack.append((child, False))  # @viz push
                continue  # @viz push
            left, right = max(0, gain[node.left]), max(0, gain[node.right])  # second visit  # @viz visit
            best = max(best, node.val + left + right)  # a path that bends here  # @viz bend
            gain[node] = node.val + max(left, right)  # what it offers its parent  # @viz up
        return best  # @viz return
